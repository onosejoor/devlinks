import { Dispatch, SetStateAction } from "react";
import { PlatformLink } from "../../_lib/types";

type Props = {
  setSelectedLinks: (plat: PlatformLink) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  plat: PlatformLink;
  name: string;
};

export default function Platform({
  setSelectedLinks,
  setOpen,
  plat,
  name,
}: Props) {
  return (
    <>
      <div
        className="grid gap-2 group/platform cursor-pointer"
        onClick={() => {
          setSelectedLinks(plat);
          setOpen(false);
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className={`*:fill-darkGray group-hover/platform:*:fill-ogColor ${
              plat.name === name && "*:fill-ogColor"
            }`}
          >
            {plat.icon}
          </span>
          <p
            className={`text-darkGray text-lg font-medium group-hover/platform:text-ogColor  ${
              plat.name === name && "text-ogColor"
            }`}
          >
            {plat.name}
          </p>
        </div>
        <hr className="text-lightGray" />
      </div>
    </>
  );
}
