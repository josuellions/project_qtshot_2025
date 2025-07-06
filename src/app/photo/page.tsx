"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Header from "@/components/ui/header";
import Button from "@/components/ui/button";
import Body from "@/components/ui/body";

export default function Photo() {
  const router = useRouter();
  // const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  // const [qrCode, setqrCode] = useState<string | null>(null);

  const fetchQRCode = async () => {
    const res = await fetch(`api/v1/qrcode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: photo }),
    });

    const data = await res.json();

    // setqrCode(data.qrCodeURL);
    await localStorage.setItem("photo-opp", JSON.stringify(data));

    await router.push("/preview");
  };

  const handlerCaptureClear = () => {
    setPhoto(null);
    router.push("/camera");
  };

  useEffect(() => {
    const getPhoto = localStorage.getItem("photo-opp");

    if (getPhoto) {
      setPhoto(getPhoto);
    }
  }, []);

  return (
    <>
      <Header className="items-start bg-stone-200 border-2 border-stone-400" />

      <Body className="relative pb-8">
        <div className="relative flex flex-col bg-stone-50 w-full h-full aspect-[9/16] items-end justify-end">
          {photo ? (
            <Image
              className="w-[360px] shadow-lg object-cover z-0 relative"
              unoptimized
              fill
              src={photo}
              alt="Foto capturada"
            />
          ) : (
            "Captura Foto"
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        <div className="flex flex-col w-full max-h-12 h-12 p-1 bg-stone-100 border-2 border-stone-500 text-center justify-center">
          <p>we make tech simple</p>
        </div>
      </Body>
      <div className="flex w-full flex-row gap-4">
        <Button
          className="bg-stone-200 text-stone-500 border-stone-500 border-2"
          onClick={handlerCaptureClear}
        >
          Refazer
        </Button>

        <Button className="bg-stone-500 text-stone-100 " onClick={fetchQRCode}>
          Continuar
        </Button>
      </div>
    </>
  );
}
