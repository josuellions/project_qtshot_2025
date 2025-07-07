import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET to /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch(`${process.env.BASE_API_URL}/status`);
      expect(response.status).toBe(orchestrator.statusCode.SUCCESS);

      const resposeBody = await response.json();
      expect(resposeBody.update_at).toBeDefined();

      const parserUpdateAt = new Date(resposeBody.update_at).toISOString();
      expect(resposeBody.update_at).toEqual(parserUpdateAt);

      expect(resposeBody.dependencies.database.version).toEqual(
        `${process.env.POSTGRES_VERSION}`,
      );

      expect(resposeBody.dependencies.database.max_connections).toEqual(
        parseInt(`${process.env.POSTGRES_MAX_CONNECTIONS}`),
      );

      expect(resposeBody.dependencies.database.opened_connections).toEqual(
        parseInt(`${process.env.POSTGRES_OPENED_CONNECTIONS}`),
      );
    });
  });
});
