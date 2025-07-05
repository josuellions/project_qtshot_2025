"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Header from "@/components/ui/header";
import Button from "@/components/ui/button";
import Body from "@/components/ui/body";

export default function Photo() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const handlerCapture = useCallback(async () => {
    const photo = videoRef.current;
    const canvas = canvasRef.current;

    if (photo && canvas) {
      const width = photo.videoWidth;
      const height = photo.videoHeight;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(photo, 0, 0, width, height);
        const imgData = canvas.toDataURL("image/png");
        console.log(imgData);
        setPhoto(imgData);
        localStorage.setItem("photo-opp", imgData);
        //router.push("/qrcode");
        //setPhoto(ph.src);
      }
    }
  }, []);

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
            <button
              className="flex w-full h-full max-w-md shadow-md justify-center items-center"
              onClick={handlerCapture}
            >
              <video
                className="w-full h-full max-w-md shadow-md"
                ref={videoRef}
                muted
                autoPlay
                playsInline
              />
            </button>
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

        <Button
          className="bg-stone-500 text-stone-100 "
          onClick={() => router.push("/preview")}
        >
          Continuar
        </Button>
      </div>
    </>
  );
}
