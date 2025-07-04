import Image from "next/image";
import Link from "next/link";

import photo_opp from "../../../assets/img/photo_opp.png";
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

      <section className="flex flex-col w-full mt-0 mb-8 min-h-162 bg-red-400 ">
        <div className="flex flex-col bg-stone-50 w-full h-full aspect-[9/16] items-end justify-end">
          <div className="flex flex-col w-36 h-44 bg-stone-200 rounded-md mr-4 mb-4 items-end justify-end">
            <div className="flex w-full">
              <p className="text-start p-2">
                <small>Fazer download</small>
              </p>
            </div>
            <div className="flex w-28 h-32 bg-stone-50 rounded-md mr-4 mb-4"></div>
          </div>
        </div>
        <div className="flex flex-col max-h-14 h-14 bg-stone-200  w-full text-center justify-center">
          <p>nome_da_imagem</p>
        </div>
      </section>

      <div className="flex w-full flex-row gap-4">
        <Link
          className="flex bg-stone-600 h-12 w-full text-stone-100 font-bold justify-center items-center"
          href={"/"}
        >
          Finalizar
        </Link>

        {/* <button className="flex bg-stone-500 h-12 w-full text-stone-100 font-bold justify-center items-center">
          Continuar
        </button> */}
      </div>
    </div>
  );
}
