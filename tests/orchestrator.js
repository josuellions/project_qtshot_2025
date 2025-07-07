import retry from "async-retry";

import database from "infra/database.js";

const statusCode = {
  SUCCESS: 200,
  CREATE: 201,
};

async function testLogExec(action) {
  const URL_fetch = `${process.env.BASE_API_URL}/status`;

  const getTestLogExec = {
    true: async function fetchStatusPageFull(_, tryNumber) {
      const response = await fetch(URL_fetch);

      process.stdout.write(
        `Attempt: ${tryNumber}x | HTTP error status: ${response.status} \n`,
      );

      console.log(response.status);

      if (response.status !== statusCode.SUCCESS) {
        throw Error();
      }
    },
    false: async function fetchStatusPage() {
      const response = await fetch(URL_fetch);

      if (response.status !== statusCode.SUCCESS) {
        throw Error();
      }
    },
  };

  return getTestLogExec[action];
}

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    const getFetchStatusPage = await testLogExec(process.env.TEST_LOG_FULL);

    return retry(getFetchStatusPage, {
      retries: 10,
      maxTimeout: 1000, //1s
    });
  }
}

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  statusCode,
};

export default orchestrator;
