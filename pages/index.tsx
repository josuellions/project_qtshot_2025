import Image from "next/image";

import { AlignJustify } from "lucide-react";

import photo_opp from "@/assets/img/photo_opp.png";
import logo from "@/assets/img/logo.png";

export default function Home() {
  return (
    <>
      <header>
        <div className="center">
          <div className="logo">
            <Image src={logo} alt="logo NEX.lab" width={120} height={62} />
          </div>
          <a href="#" className={`menu`}>
            <AlignJustify />
          </a>

          <nav>
            <a href="#" className="active bg-gray-800">
              Logs
            </a>
          </nav>
        </div>
      </header>

      <section className="banner">
        <div className="center">
          <Image src={photo_opp} alt="Photo Opp" />
        </div>
      </section>

      <div className="h-20 w-40">
        <button onClick={() => {}}>Iniciar</button>
      </div>
      <footer>
        <p>
          <small>&#174; 2025 - v0.0.1</small>
        </p>
      </footer>
    </>
  );
}
