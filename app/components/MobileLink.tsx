import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  name: string;
  bgColor?: string;
}

export default function MobileLink({ icon, name, bgColor }: Props) {
  return (
    <>
      <div
        style={{
          backgroundColor: bgColor,
          border: bgColor === "white" ? "1px solid darkGray" : "initial",
        }}
        className=" bg-gray w-full rounded-md h-[45px] flex justify-between p-3 items-center"
      >
        <div className="flex gap-2 items-center">
          <span className="*:fill-white">{icon}</span>
          <p className="text-white">
            {name}
          </p>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              fill="#fff"
              d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
