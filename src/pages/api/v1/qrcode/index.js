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

export default async function handlerQRCode(req, res) {
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

  const base64Data = imagemMatch[1];
  const buffer = Buffer.from(base64Data, "base64");
  const timestamp = Date.now().toLocaleString().replace(/\./g, "");
  const id = randomUUID();
  const imageFilename = `${timestamp}-${id}.png`;
  const qrCodeFilename = `${timestamp}-${id}.png`;

  const imagePath = resolve("public", "uploads", "images", imageFilename);
  const qrCodePath = resolve("public", "uploads", "qrcodes", qrCodeFilename);
  console.log(imagePath);
  fs.writeFileSync(imagePath, buffer);

  const imageURL = `/uploads/images/${imageFilename}`;
  const fullImageURL = `${req.headers.origin}${imageURL}`;

  await QRCode.toFile(qrCodePath, fullImageURL, {
    type: "png",
    with: 300,
  });

  const qrCodeURL = `/uploads/qrcodes/${qrCodeFilename}`;
  const fullqrCodeURL = `${req.headers.origin}${qrCodeURL}`;

  return res.status(status.success).json({
    url_image: fullImageURL,
    url_qrcode: fullqrCodeURL,
    //qrCodeURL,
  });
}

/*
watch -n 1 'curl -s -X GET https://clone-tabnews.maxcode42.com.br/api/v1/status | jq'
curl -s -X DELETE https://clone-tabnews.maxcode42.com.br/api/v1/migrations | jq
*/
