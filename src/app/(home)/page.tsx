"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import photo_opp from "../../../assets/img/photo_opp.png";
import Header from "@/components/ui/header";
import Button from "@/components/ui/button";
import Body from "@/components/ui/body";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Header className="justify-center" />

      <Body className="p-12">
        <Image src={photo_opp} alt="Photo Opp" />
      </Body>

      <div className="flex w-full">
        <Button
          className=" bg-stone-500 text-stone-100"
          onClick={() => router.push("/camera")}
        >
          Iniciar
        </Button>
      </div>

      <footer className="flex w-full justify-center mt-4">
        <p>
          <small>&#174; {new Date().getFullYear()} - v0.0.1</small>
        </p>
      </footer>
    </>
  );
}
