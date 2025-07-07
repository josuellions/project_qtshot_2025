"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/ui/header";
import Button from "@/components/ui/button";
import Body from "@/components/ui/body";
import Image from "next/image";

export default function QRCode() {
  const router = useRouter();
  const [photo, setPhoto] = useState<any | null>(null);
  //const [isModal, setIsModal] = useState<boolean>(false);

  const handlerQRCode = () => {
    // setIsModal(true);
    // setTimeout(
    //   () => {
    setPhoto(null);
    //startCamera();
    //setIsModal(true);
    router.push("/");
    //   },
    //   60 * 60 * 2,
    // );
  };

  useEffect(() => {
    const getPhoto = localStorage.getItem("photo-opp");
    if (getPhoto) {
      setPhoto(JSON.parse(getPhoto));
    }
  }, []);

  return (
    <>
      <Header className=" justify-center" />

      <Body className="relative pb-8 z-0">
        <div className="flex flex-col w-full h-1/4 items-center bg-transparent rounded-md gap-4  px-10 left-0 top-0">
          <h3 className="text-4xl text-stone-600 font-bold">Obrigado!</h3>
          <p className="text-center text-stone-500">
            Escanei esse QRCode para realizar o download da imagem através do
            link.
          </p>
        </div>
        <div className="flex flex-col w-full h-1/2 py-4 px-10 items-end justify-end ">
          <div className="relative flex w-full h-screen bg-stone-50 border-2 border-stone-600 rounded-2xl  justify-center items-center">
            {photo ? (
              <Image
                className="w-full h-full shadow-lg object-contain z-0 justify-center items-center"
                fill
                unoptimized
                src={`${photo?.url_qrcode}`}
                alt="QRCode"
              />
            ) : (
              <p>QRCODE</p>
            )}
          </div>
        </div>
      </Body>

      <div className="flex w-full">
        <Button
          className=" bg-stone-600 text-stone-100"
          onClick={handlerQRCode}
        >
          Finalizar
        </Button>
      </div>
    </>
  );
}
