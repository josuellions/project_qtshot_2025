import React from "react";
import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./styles/globals.css";

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
        className={`${titillium.variable}  md:flex xl:flex-col  md:justify-center md:items-center bg-gradient-to-br from-stone-100 via-stone-100 to-stone-400 text-gray-900`}
      >
        <main className="flex flex-col w-full md:max-w-[1024px] xl:max-w-[480px] md:overflow-hidden md:p-10 h-screen min-h-screen justify-center items-center p-5">
          {children}
        </main>
      </body>
    </html>
  );
}
