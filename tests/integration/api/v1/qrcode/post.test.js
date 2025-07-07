import { describe } from "node:test";

describe("POST /api/v1/qrcode", () => {
  describe("Anonymous user", () => {
    describe("Generate QRCode", () => {
      test("Validate method accepted", async () => {
        const response = await fetch(`${process.env.BASE_API_URL}/qrcode`, {
          method: "PUT",
        });

        expect(response.status).toBe(405);
      });

      test("Validate invalid image", async () => {
        const response = await fetch(`${process.env.BASE_API_URL}/qrcode`, {
          method: "POST",
        });

        const responseBody = await response.json();

        expect(response.status).toBe(400);
        expect(responseBody.error).toBe("Imagem ou formato invalido!");
      });

      test("Validate invalid image format", async () => {
        const response = await fetch(`${process.env.BASE_API_URL}/qrcode`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: "base64" }),
        });

        const responseBody = await response.json();
        console.log(responseBody.error);

        expect(response.status).toBe(400);
        expect(responseBody.error).toBe("Formato da imagem inválido!");
      });
    });
  });
});
