"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/button";

export default function Camera() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1080 },
          height: { ideal: 1920 },
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("É necessário permissão de acesso a câmera.");
      console.log(err);
    }
  }, []);

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
        router.push("/photo");
      }
    }
  }, []);

  // const handlerCaptureClear = () => {
  //   setPhoto(null);
  //   startCamera();
  // };

  useEffect(() => {
    startCamera();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full h-full aspect-[9/16] items-center justify-end ">
        {photo ? (
          <Image
            className="w-360px shadow-lg"
            unoptimized
            width={360}
            height={640}
            src={photo} // base64
            alt="Foto capturada"
          />
        ) : (
          <>
            <video
              className="absolute flex flex-col object-cover z-0 left-0 top-0   w-full h-full max-w-md shadow-md"
              ref={videoRef}
              muted
              autoPlay
              playsInline
            />
            <Button
              className="absolute max-w-24 max-h-32 min-w-24 min-h-24 z-10 rounded-full mb-4 border-8 border-stone-300 bg-stone-100 shadow-md"
              onClick={handlerCapture}
            >
              {""}
            </Button>
          </>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </>
  );
}
