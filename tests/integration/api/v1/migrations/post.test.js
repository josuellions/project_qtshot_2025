import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.clearDatabase();
  await orchestrator.waitForAllServices();
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const response = await fetch(`${process.env.BASE_API_URL}/migrations`, {
          method: "POST",
        });
        expect(response.status).toBe(orchestrator.statusCode.CREATE);

        const responseBody = await response.json();

        expect(Array.isArray(responseBody)).toBe(true);

        //Verifica se está retornado > 0
        expect(responseBody.length).toBeGreaterThan(0);
      });
      test("For the second time", async () => {
        const response = await fetch(`${process.env.BASE_API_URL}/migrations`, {
          method: "POST",
        });
        expect(response.status).toBe(orchestrator.statusCode.SUCCESS);

        const responseBody = await response.json();

        expect(Array.isArray(responseBody)).toBe(true);

        //Verifica se está retornado > 0
        expect(responseBody.length).toBe(0);
      });
    });
  });
});
