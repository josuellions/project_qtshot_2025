import { randomUUID } from "node:crypto";
import { resolve } from "node:path";
import QRCode from "qrcode";
import fs from "fs";

const status = {
  create: 201,
  success: 200,
  bad_request: 400,
  not_allowed: 405,
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

function requestValidation(req, res) {
  console.log(">> VALIDAT");
  if (req.method !== "POST") {
    console.log(">> ERROR: METHOD DIFERENTE DE POST");
    return res.status(status.not_allowed).json({
      error: `Method "${req.method}" not allowed!`,
    });
  }

  const { image } = req.body;

  if (!image || typeof image !== "string") {
    console.log(">> ERROR: IMAGEM INVALIDA");
    return res.status(status.bad_request).json({
      error: `Imagem ou formato invalido!`,
    });
  }

  const imagemMatch = image.match(/^data:image\/png;base64,(.+)$/);

  if (!imagemMatch) {
    console.log(">> ERROR: FORMATO DA IMAGEM INVALIDA");
    return res.status(status.bad_request).json({
      error: `Formato da imagem inválido!`,
    });
  }
}

async function uploadImage(req, filename) {
  const { image } = req.body;
  const imagemMatch = image.match(/^data:image\/png;base64,(.+)$/);
  const base64Data = imagemMatch[1];

  const buffer = Buffer.from(base64Data, "base64");

  const imagePath = resolve("public", "uploads", "images", filename);

  await fs.writeFileSync(imagePath, buffer);

  const fullImageURL = await generateFullURL(
    req.headers.origin,
    "images",
    filename,
  );

  return fullImageURL;
}

async function generateQRCode(req, filename, fullURL) {
  const qrCodePath = resolve("public", "uploads", "qrcodes", filename);
  await QRCode.toFile(qrCodePath, fullURL, {
    type: "png",
    with: 300,
  });

  const fullqrCodeURL = await generateFullURL(
    req.headers.origin,
    "qrcodes",
    filename,
  );

  return fullqrCodeURL;
}

function generateFileName() {
  const id = randomUUID();
  const timestamp = Date.now().toLocaleString().replace(/\./g, "");

  const filename = `${timestamp}-${id}.png`;

  return filename;
}

function generateFullURL(origin, directory, filename) {
  const directoryURL = `/uploads/${directory}/${filename}`;
  const fullURL = `${origin}${directoryURL}`;

  return { url: directoryURL, fullURL: fullURL };
}

export default async function handlerQRCode(req, res) {
  await requestValidation(req, res);

  const filename = await generateFileName();

  const fullImageURL = await uploadImage(req, filename);

  console.log(fullImageURL);

  const fullqrCodeURL = await generateQRCode(
    req,
    filename,
    fullImageURL.fullURL,
  );

  return res.status(status.success).json({
    url_image: fullImageURL.url,
    url_qrcode: fullqrCodeURL.url,
  });
}

/*
watch -n 1 'curl -s -X GET http://localhost:3000/api/v1/status | jq'
curl -s -X DELETE http://localhost:3000/api/v1/migrations | jq
*/
