"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

import Image from "next/image";
import Header from "@/components/ui/header";
import Body from "@/components/ui/body";
import Button from "@/components/ui/button";

export default function Preview() {
  const router = useRouter();
  const [photo, setPhoto] = useState<any | null>(null);
  const [isModal, setIsModal] = useState<boolean>(false);

  const handlerQRCode = async () => {
    setIsModal(true);
    setTimeout(
      () => {
        setIsModal(false);
        router.push("/qrcode");
      },
      60 * 60 * 1,
    );
  };

  useEffect(() => {
    const getPhoto = localStorage.getItem("photo-opp");

    if (getPhoto) {
      setPhoto(JSON.parse(getPhoto));
    }
  }, []);

  return (
    <>
      <Header className="justify-start bg-stone-200 border-2 border-stone-400" />

      <Body className="relative pb-8 z-0">
        <div className="relative flex flex-col bg-stone-50 w-full h-full aspect-[9/16] items-end justify-end">
          {photo ? (
            <Image
              className="w-[360px] shadow-lg object-cover z-0 relative"
              unoptimized
              fill
              src={`${photo?.url_image}`}
              alt="Foto capturada"
            />
          ) : (
            <div className="w-full h-full max-w-md shadow-md">
              <p className="text-stone-100 font-semibold">Preview Foto</p>
            </div>
          )}
          <div className="flex flex-col w-40 h-52 relative z-10 bg-stone-200 rounded-md mr-4 mb-4 items-center justify-center">
            <div className="relative flex flex-col w-full justify-center items-start">
              <p className="text-start p-2">
                <small>Fazer download</small>
              </p>
            </div>
            <div className="relative flex flex-col max-w-32 max-h-40 w-32 h-40 bg-stone-50 rounded-md  mb-4 justify-center items-center">
              <Image
                className="w-32 h-40 max-w-32 max-h-40 shadow-lg object-contain z-0 justify-center items-center"
                unoptimized
                fill
                src={`${photo?.url_qrcode}`}
                alt="QRCode"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full max-h-12 h-12 p-1 bg-stone-200 border-2 border-stone-500 text-center justify-center">
          <p>we make tech simple</p>
        </div>
      </Body>
      <div className="flex w-full">
        <Button
          className="bg-stone-600 h-12 text-stone-100"
          onClick={handlerQRCode}
        >
          Finalizar
        </Button>
      </div>

      {/* MODAL */}
      {isModal && (
        <div className="absolute flex w-full h-screen z-10 bg-stone-500/50 left-0 top-0 items-center justify-center flex-col p-10">
          <div className="flex flex-col items-center bg-stone-100 rounded-md px-8 py-8 gap-4">
            {" "}
            <h3 className="text-4xl text-stone-600 font-bold">Obrigado!</h3>
            <p className="text-center text-stone-500">
              Por registra esse momento, realize o download da imagem através do
              link no QRCode.
            </p>
            <Loader className="animate-spin w-12 h-12 text-stone-400" />
          </div>
        </div>
      )}
    </>
  );
}
