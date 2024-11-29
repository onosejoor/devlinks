import { ChangeEvent, HTMLInputTypeAttribute, useContext } from "react";
import { ProfileContext } from "./Context";

type Props = {
  placeholder: string;
  type: HTMLInputTypeAttribute;
  className: string;
  name: string;
  value: string;
};
const Input = ({ placeholder, type, className, name, value }: Props) => {
  const { setProfile } = useContext(ProfileContext);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;

    setProfile((prev) => {
      return {
        ...prev,
        [name]: text,
      };
    });
  }
  return (
    <>
      <input
        type={type}
        name="input"
        value={value}
        onChange={onChange}
        className={`${className} bg-transparent py-3 text-darkGray focus:shadow-ogColor focus:border focus:border-ogColor h-full cursor-pointer outline-none border-0 placeholder:text-lightGray`}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
