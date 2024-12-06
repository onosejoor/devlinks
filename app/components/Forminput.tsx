"use client";

import { ChangeEvent, ReactNode, useState } from "react";

type Props = {
  type: "email" | "password";
  placeholder: string;
  svg: ReactNode;
  name: "email" | "password" | "confirm_password";
  error?: string;
  change: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export default function FormInput({
  type,
  placeholder,
  svg,
  name,
  change,
  error,
  value,
}: Props) {
  const [focus, setFocus] = useState(false);

  return (
    <>
      <div
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`cursor-pointer flex ${
          focus && "shadow-ogColor border-ogColor"
        } items-center gap-3 px-3 ${
          error && "border-red"
        }  bg-white border border-lightGray rounded-md `}
      >
        <span className="self-center">{svg}</span>
        <input
          type={type}
          name={name}
          className={`bg-transparent autofill:bg-red py-3 w-full h-full cursor-pointer outline-none border-0 placeholder:text-darkGray`}
          placeholder={placeholder}
          onChange={change}
          value={value}
        />
        {error && (
          <span className="text-red whitespace-nowrap self-center">
            {error}
          </span>
        )}
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
