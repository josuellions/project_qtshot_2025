import Image from "next/image";
import Link from "next/link";

import logo from "../../../assets/img/logo.png";
export default function Photo() {
  return (
    <div className="flex flex-col md:max-w-[1024px] items-center min-h-screen grid-3 w-full h-screen">
      <header className="flex h-full w-full justify-start items-start max-h-28 p-4 bg-stone-200 my-0">
        <div className="center">
          <div className="logo">
            <Image src={logo} alt="logo NEX.lab" width={120} height={62} />
          </div>
        </div>
      </header>

      <section className="flex flex-col w-full mt-0 mb-16 min-h-152 bg-red-400 ">
        <div className="flex flex-col bg-black w-full h-full aspect-[9/16]">
          <video
            className="w-full h-full max-w-md shadow-md"
            autoPlay
            playsInline
          ></video>
        </div>
        <div className="flex flex-col max-h-14 h-14 bg-stone-100 border-2 border-stone-500 w-full text-center justify-center">
          <p>nome_da_imagem</p>
        </div>
      </section>

      <div className="flex w-full flex-row gap-4">
        <Link
          className="flex bg-stone-200 h-12 w-full text-stone-500 font-bold justify-center items-center border-stone-500 border-2"
          href={"/"}
        >
          Refazer
        </Link>

        {/* <button className="flex bg-stone-500 h-12 w-full text-stone-100 font-bold justify-center items-center">
          Continuar
        </button> */}
        <Link
          className="flex bg-stone-500 h-12 w-full text-stone-100 font-bold justify-center items-center"
          href={"/qrcode"}
        >
          Continuar
        </Link>
      </div>
    </div>
  );
}
