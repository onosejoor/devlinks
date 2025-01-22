import { ChangeEvent, HTMLInputTypeAttribute } from "react";

type Props = {
  placeholder: string;
  type: HTMLInputTypeAttribute;
  className: string;
  name: string;
  error?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
const Input = ({
  placeholder,
  type,
  className,
  onChange,
  name,
  value,
  error,
}: Props) => {
  return (
    <div
      className={`cursor-pointer flex w-full sm:w-[500px] has-[:focus]:shadow-ogColor has-[:focus]:border-ogColor items-center justify-between pr-3 ${
        error && "border-red"
      }  bg-white border border-lightGray rounded-md `}
    >
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`${className} bg-transparent py-3 flex-1 text-darkGray  h-full cursor-pointer outline-none border-0 placeholder:text-lightGray`}
        placeholder={placeholder}
      />
      {error && (
        <span className="text-red whitespace-nowrap self-center">{error}</span>
      )}
    </div>
  );
};

export default Input;
