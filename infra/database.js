import { Client } from "pg";

function getSSLValue() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV === "production" ? true : false;
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValue(),
  });

  await client.connect();

  return client;
}

async function query(queryObjects) {
  let client;

  try {
    client = await getNewClient();
    const result = await client.query(queryObjects);

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await client.end();
  }
}

const database = {
  query,
  getNewClient,
};

export default database;
