import Image from "next/image";
import Link from "next/link";

import photo_opp from "../../../assets/img/photo_opp.png";
import logo from "../../../assets/img/logo.png";

export default function Home() {
  return (
    <div className="flex flex-col md:max-w-[1024px] justify-center items-center min-h-screen grid-4 gap-24">
      <header className="flex h-full w-full justify-center items-start">
        <div className="center">
          <div className="logo">
            <Image src={logo} alt="logo NEX.lab" width={120} height={62} />
          </div>

          {/* <nav>
            <a href="#" className="active bg-gray-800">
              Logs
            </a>
          </nav> */}
        </div>
      </header>

      <section className="flex w-full h-full mt-16 mb-16">
        <div className="center">
          <Image src={photo_opp} alt="Photo Opp" />
        </div>
      </section>

      <div className="flex w-full">
        {/* <button className="flex bg-stone-500 h-12 w-full text-stone-100 font-bold justify-center items-center">
          Iniciar
        </button> */}
        <Link
          className="flex bg-stone-500 h-12 w-full text-stone-100 font-bold justify-center items-center"
          href={"/photo"}
        >
          Iniciar
        </Link>
      </div>
      <footer className="flex w-full justify-center ">
        <p>
          <small>&#174; 2025 - v0.0.1</small>
        </p>
      </footer>
    </div>
  );
}
