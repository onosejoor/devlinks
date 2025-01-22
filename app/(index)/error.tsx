"use client";

import Img from "../_components/Img";

export default function ErrorPage({
  error,
  reset,
}: {
  error?: Error & { digest: string };
  reset?: () => void;
}) {
  console.log(error);

  return (
    <div className="grid gap-5 justify-items-center ">
      <Img
        src="/images/errorIcon.svg"
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
        onClick={reset}
        className="px-5 py-3 bg-lightPurple ring-1 ring-ogColor rounded-md w-fit mx-auto"
      >
        Retry
      </button>
    </div>
  );
}
