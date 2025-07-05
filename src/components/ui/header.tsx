import { ComponentProps, ReactNode } from "react";
import Image from "next/image";

import logo from "../../../assets/img/logo.png";

interface HeaderProps extends ComponentProps<"header"> {
  children?: ReactNode;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header
      className={`flex h-full w-full max-h-28 p-4 my-0 items-center ${className}`}
    >
      <div className="center">
        <div className="logo">
          <Image src={logo} alt="logo NEX.lab" width={120} height={62} />
        </div>
      </div>
    </header>
  );
}
