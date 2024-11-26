"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  link: string;
  icon: ReactNode;
  text: string;
}

export default function NavLink({ link, icon, text }: Props) {
  const router = usePathname();
  return (
    <>
      <li>
        {" "}
        <Link href={link}>
          <button
            className={`px-5 group/nav py-2 ${
              link === router && "bg-veryLightPurple"
            } items-center justify-center flex gap-2 rounded-md`}
          >
            <span className={`${link === router && "*:fill-ogColor"}`}>{icon}</span>
            <span className={`hidden sm:block  capitalize font-bold text-darkGray group-hover/nav:text-ogColor ${link === router && "text-ogColor"}`}>
              {text}
            </span>
          </button>
        </Link>{" "}
      </li>
    </>
  );
}
