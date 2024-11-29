"use client";

import { ReactNode, useState } from "react";

type Props = {
  type: "email" | "password";
  placeholder: string;
  className?: string;
  svg: ReactNode;
};

export default function FormInput({
  type,
  placeholder,
  className,
  svg,
}: Props) {
  const [focus, setFocus] = useState(false);

  return (
    <>
      <div
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`cursor-pointer flex ${
          focus && "shadow-ogColor border border-ogColor"
        } items-center gap-3 px-3 bg-white border border-lightGray rounded-md `}
      >
        <span className="self-center">{svg}</span>
        <input
          type={type}
          name={type || "confirm_password"}
          className={`bg-transparent autofill:bg-red ${className} py-3 w-full h-full cursor-pointer outline-none border-0 placeholder:text-lightGray`}
          placeholder={placeholder}
        />
      </div>
    </>
  );
}

{
  /* {link.error && (
          <p className="text-red self-center whitespace-nowrap">{link.error}</p>
        )} */
  {
    /* <input
        type={type}
        name="input"
        className={`${className} bg-transparent py-3 text-darkGray focus:shadow-ogColor focus:border focus:border-ogColor h-full cursor-pointer outline-none border-0 placeholder:text-lightGray`}
        placeholder={placeholder}
      /> */
  }
}
