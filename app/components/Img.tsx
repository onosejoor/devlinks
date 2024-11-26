import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export default function Img(prop: Props) {
  return (
    <>
      <Image
        src={prop.src}
        className={prop.className}
        alt={prop.alt}
        width={1080}
        height={1080}
      />
    </>
  );
}
