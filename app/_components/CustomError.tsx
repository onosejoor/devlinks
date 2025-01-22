"use client";

import { useRouter } from "next/navigation";
import Img from "../_components/Img";
import { showToast } from "../_hooks/useToast";
import { useEffect } from "react";

export default function CustomErrorPage({ message }: { message?: string }) {
  useEffect(() =>
    showToast({
      saveIcon: false,
      message: message!,
      position: "top",
      variants: "error",
    })
  );
  const router = useRouter();

  const refreshPage = () => router.refresh();
  return (
    <div className="grid gap-5 justify-items-center ">
      <Img
        src="/images/internetError.svg"
        alt="error image"
        className="h-[400px] "
      />

      <h1 className="text-red text-[40px] font-bold sm:w-[calc(100%-40%)] text-center mx-auto">
        Oops, an error occured while processing the data
      </h1>

      <p className="text-gray capitalize font-bold text-lg">
        try checking your internet connetion
      </p>

      <button
        onClick={refreshPage}
        className="px-5 py-3 bg-lightPurple ring-1 ring-ogColor rounded-md w-fit mx-auto"
      >
        Retry
      </button>
    </div>
  );
}
