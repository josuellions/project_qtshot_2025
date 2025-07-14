import * as fs from "fs";
import path from "path";

const status = {
  create: 201,
  success: 200,
  allowed: 405,
};

const dirPath = path.resolve("../files/json");

async function SaveCountJson(getCount) {
  try {
    if (!fs.existsSync(`${dirPath}/access_count.json`)) {
      await fs.mkdirSync(dirPath, { recursive: true });
    }

    await fs.writeFileSync(
      `${dirPath}/access_count.json`,
      await JSON.stringify({
        info: {
          update_at: new Date().toISOString(),
          count_access: getCount + 1,
        },
      }),
    );
  } catch (error) {
    console.log(dirPath);
    console.log(error);
  }
}

async function GetCountJson() {
  try {
    if (!fs.existsSync(`${dirPath}/access_count.json`)) {
      //console.log(dirPath);
      return {
        info: {
          update_at: dirPath,
          count_access: 0,
        },
      };
    }

    const getAccessCount = await fs.readFileSync(
      `${dirPath}/access_count.json`,
      "utf-8",
    );

    return await JSON.parse(getAccessCount);
  } catch (error) {
    console.log(dirPath);
    console.log(error);
  }
}

export default async function access(req, res) {
  let responseStatus = status.allowed;
  const allowedMethods = ["GET", "POST"];

  if (!allowedMethods.includes(req.method)) {
    return res.status(responseStatus).json({
      error: `Method "${req.method}" not allowed!`,
    });
  }

  const userAgent = req.headers["user-agent"];
  const referer = req.headers["referer"];

  if ((!userAgent || !referer) && req.method === "POST") {
    return res.status(400).json({ message: "Cabeçalhos HTTP inválidos." });
  }

  const validUserAgents = ["Mozilla", "Chrome", "Safari", "Edge"];
  const isUserAgentValid = validUserAgents.some((agent) =>
    userAgent.includes(agent),
  );

  if (!isUserAgentValid && req.method === "POST") {
    return res.status(400).json({ message: "User-Agent inválido." });
  }

  const getCountJson = await GetCountJson();

  if (req.method === allowedMethods[0]) {
    const dateAt = new Date().toISOString();
    const version = process.env.GET_VERSION;

    res.status(200).json({
      date_at: dateAt,
      dependencies: {
        info: {
          version,
          update_at: getCountJson.info.update_at,
          count_access: getCountJson.info.count_access,
        },
      },
    });
  }

  if (req.method === allowedMethods[1]) {
    const getCount = getCountJson.info.count_access;
    await SaveCountJson(getCount);

    res.status(200).json({ message: `Count ${access + 1}` });
  }
}
