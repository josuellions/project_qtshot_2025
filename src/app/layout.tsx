import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";

// Configure a fonte com pesos e subset
const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-titillium",
});

export const metadata: Metadata = {
  title: "Photo Opp",
  description: "App para captura de image e gerar link QRCode para download",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${titillium.variable} bg-gradient-to-b from-stone-50 via-stone-100 to-stone-300 text-gray-900`}
      >
        <main className="flex flex-col justify-center items-center min-h-screen p-10 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
