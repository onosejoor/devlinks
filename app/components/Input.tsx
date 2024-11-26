import { HTMLInputTypeAttribute } from "react";

type Props = {
  placeholder: string;
  type: HTMLInputTypeAttribute;
};
const Input = ({ placeholder, type }: Props) => {
  return (
    <>
      <input
        type={type}
        name="input"
        className={`bg-transparent py-3 w-full focus:shadow-ogColor focus:border focus:border-ogColor h-full cursor-pointer outline-none border-0 placeholder:text-lightGray`}
        placeholder={placeholder}
      />
    </>
  );
};


export default Input