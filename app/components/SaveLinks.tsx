import { MouseEvent, useContext } from "react";
import { Context } from "./Context";
import { matchUrlPattern } from "../lib/ClientFunctions";

export default function SaveLinks({disabled} :  {disabled: boolean}) {
  const { links, setLinks } = useContext(Context);

  function save(e: MouseEvent<HTMLButtonElement>) {
    links.forEach((link) => {
      if (!link.input?.trim()) {
        e.preventDefault();
        setLinks((prev) => {
          return prev.map((pre) =>
            pre.id === link.id ? { ...pre, error: "Can't be empty" } : pre
          );
        });
      }
    });

    links.forEach(async (lin) => {
      if (!lin.input) {
        return;
      }
      const url1 = lin.input;
      const find = matchUrlPattern(url1, `${lin.regex}`);
      if (!find) {
        e.preventDefault();
        setLinks((prev) => {
          return prev.map((pre) =>
            pre.id === lin.id ? { ...pre, error: "Please check the URL" } : pre
          );
        });
      }
    });
  }
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={(e) => save(e)}
      className={"rounded-md  disabled:text-lightGray autofill:bg-white hover:bg-lightPurple hover:shadow-lg shadow-lightGray w-fit ml-auto text-white disabled:shadow-none disabled:border-lightGray border border-ogColor disabled:bg-veryLightPurple disabled:cursor-not-allowed px-5 py-[5px] bg-ogColor "}
    >
      Save
    </button>
  );
}
