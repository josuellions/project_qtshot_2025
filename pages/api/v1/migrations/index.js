import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";

import database from "infra/database";

const status = {
  create: 201,
  success: 200,
  allowed: 405,
};

export default async function migrations(req, res) {
  let responseStatus = status.allowed;
  const allowedMethods = ["GET", "POST"];

  if (!allowedMethods.includes(req.method)) {
    return res.status(responseStatus).json({
      error: `Method "${req.method}" not allowed!`,
    });
  }

  const dbClient = await database.getNewClient();
  const defaultMigrations = {
    //databaseUrl: process.env.DATABASE_URL,
    dbClient,
    dir: resolve("infra", "migrations"),
    migrationsTable: "pgmigrations",
    direction: "up",
    verbose: true,
    dryRun: true, //Simula radar migrations
  };

  try {
    const migrations = await migrationRunner({
      ...defaultMigrations,
      dryRun: req.method === "GET" ? true : false, //rodar efetivamente migrations
    });
    responseStatus =
      migrations.length > 0 && req.method === "POST"
        ? status.create
        : status.success;

    return res.status(responseStatus).json(migrations);
  } catch (error) {
    console.log(">>ERROR: Migrations Runner");
    console.log(error);
  } finally {
    await dbClient.end();
  }
}
