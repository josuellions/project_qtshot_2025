import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.clearDatabase();
  await orchestrator.waitForAllServices();
});

describe("GET to /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving pending migrations", async () => {
      const response = await fetch(`${process.env.BASE_API_URL}/migrations`);
      expect(response.status).toBe(orchestrator.statusCode.SUCCESS);

      const responseBody = await response.json();

      expect(Array.isArray(responseBody)).toBe(true);

      //Verifica se está retornado > 0
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});
