const { exec } = require("node:child_process");

const DATABASE_OFFLINE = -1;

function checkPostgres() {
  exec(
    `docker exec postgres-dev-qrshot pg_isready --host localhost`,
    handleReturn,
  );

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === DATABASE_OFFLINE) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    process.stdout.write("\n🟢 Postgres está pronto e aceitando conexões!\n\n");
  }
}

process.stdout.write("\n\n🔴 Aguardando postgres aceitar conexões");

checkPostgres();
