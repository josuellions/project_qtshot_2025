import { ComponentProps, ReactNode } from "react";

interface BodyProps extends ComponentProps<"body"> {
  children: ReactNode;
}
export default function Body({ className, ...props }: BodyProps) {
  return (
    <section
      className={`flex w-full h-full flex-col justify-center items-center`}
    >
      <div
        className={`flex flex-col w-full h-full grid-cols-2 aspect-[9/16] items-center justify-center ${className}`}
      >
        {props.children}
      </div>
    </section>
  );
}
