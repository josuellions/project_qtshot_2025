import { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
}

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      //
      className={`flex h-12 w-full font-bold justify-center items-center ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
}
