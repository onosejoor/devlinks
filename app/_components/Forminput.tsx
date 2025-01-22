"use client";

import { ChangeEvent, ReactNode } from "react";

type Props = {
  type: "email" | "password" | "url";
  placeholder: string;
  svg?: ReactNode;
  name: string;
  error?: string;
  action: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string ;
  className?: string;
};

export default function FormInput({
  type,
  placeholder,
  svg,
  name,
  action,
  error,
  value,
  className,
}: Props) {
  return (
    
      <div
        className={`cursor-pointer flex has-[:focus]:shadow-ogColor has-[:focus]:border-ogColor items-center gap-3 px-3 ${
          error && "border-red"
        }  bg-white border border-lightGray rounded-md `}
      >
        {svg && <span className="self-center">{svg}</span>}
        <input
          type={type}
          name={name}
          className={`bg-transparent ${className} autofill:bg-red py-3 w-full h-full cursor-pointer outline-none border-0 placeholder:text-darkGray`}
          placeholder={placeholder}
          onChange={action}
          value={value}
        />
        {error && (
          <span className="text-red capitalize whitespace-nowrap self-center">
            {error}
          </span>
        )}
      </div>
  
  );
}
