"use client";
import { ArrowBackIcon, CopyIcon } from "@/app/_components/ui/Icons";
import { showToast } from "@/app/_hooks/useToast";
import Link from "next/link";

export default function PreviewNav() {
  const handleCopy = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    showToast({
      saveIcon: "link",
      message: "The link has been copied to your clipboard!",
      variants: "success",
    });
  };

  return (
    <nav className="px-6 py-4 bg-white relative z-10 rounded-xl">
      <ul className="flex list-none justify-between ">
        <li>
          <Link href={"/profile"}>
            <button className="capitalize px-5 py-2 border  border-ogColor  rounded-md">
              <span className="xs:hidden block ">
                <ArrowBackIcon />
              </span>
              <span className="font-semibold xs:block hidden text-ogColor text-base capitalize">
                back to editor
              </span>
            </button>
          </Link>
        </li>
        <li>
          <button
            className="capitalize px-5 py-2 bg-ogColor  rounded-md"
            onClick={handleCopy}
          >
            <span className="xs:hidden block ">
              <CopyIcon />
            </span>
            <span className="font-semibold text-white xs:block hidden text-base capitalize">
              share link
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
