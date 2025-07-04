import database from "@/infra/database";

async function status(_, res) {
  const updateAt = new Date().toISOString();
  const databaseVersion = await database.query("SHOW server_version;");
  const databaseVersionValue =
    databaseVersion.rows[0].server_version.split(" ")[0];

  const databaseConnections = await database.query("SHOW max_connections");
  const databaseConnectionsValue = databaseConnections.rows[0].max_connections;

  const databaseOpenConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [`${process.env.POSTGRES_DB}`],
  });
  const databaseOpenConnectionsValue = databaseOpenConnections.rows[0].count;

  res.status(200).json({
    update_at: updateAt,
    dependecies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseConnectionsValue),
        opened_connections: parseInt(databaseOpenConnectionsValue),
      },
    },
  });
}

export default status;
