import database from "../../../../../infra/database";

export default async function handlerImage(req, res) {
  const { id } = req.query;

  const result = await database.query({
    text: `SELECT id, imageBase64 FROM participants WHERE id = $1`,
    values: [id],
  });

  const { imagebase64 } = result.rows[0];

  // console.log(">> IMAGE API");
  // console.log(imagebase64);

  const base64Data = imagebase64.split(",")[1];
  const imageBuffer = Buffer.from(base64Data, "base64");

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Content-Disposition", `inline; filename="${id}"`);

  return res.status(200).send(imageBuffer);
}
