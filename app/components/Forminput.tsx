"use client";

import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { InputError } from "../lib/Functions";

type Props = {
  type: "email" | "password";
  placeholder: string;
  className?: string;
  svg: ReactNode;
  name: "email" | "password" | "confirm_password";
  error?: InputError[] | undefined;
  change: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function FormInput({
  type,
  placeholder,
  className,
  svg,
  name,
  change,
  error,
}: Props) {
  const [focus, setFocus] = useState(false);

  return (
    <>
      <div
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`cursor-pointer flex ${
          focus && "shadow-ogColor border-ogColor"
        } items-center gap-3 px-3  bg-white border border-lightGray rounded-md `}
      >
        <span className="self-center">{svg}</span>
        <input
          type={type}
          name={name}
          className={`bg-transparent autofill:bg-red ${className} py-3 w-full h-full cursor-pointer outline-none border-0 placeholder:text-lightGray`}
          placeholder={placeholder}
          onChange={change}
        />
        {/* {inputError && <span className="text-red whitespace-nowrap self-center">{inputError.error}</span>} */}
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
