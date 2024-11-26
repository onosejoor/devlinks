import { DragEndEvent } from "@dnd-kit/core";
import { ProfileContext } from "../components/Context";
import { ChangeEvent, useContext, useState } from "react";

export default function Profile() {
  const { profile, setProfile } = useContext(ProfileContext);

  function handleDrop(e: ChangeEvent<HTMLInputElement>) {
    const f = new FileReader();
    const targetFile = e.target.files;

    if (targetFile && targetFile[0]) {
      f.readAsDataURL(targetFile[0]);
      f.onloadend = (ev) => {
        const file = ev.target?.result;
        setProfile((prev) => {
          return {
            ...prev,
            img: `${file}`,
          };
        });
      };
    }
  }
  return (
    <>
      <form
        // action={save}
        className="flex-1 flex flex-col gap-7 p-7 bg-white rounded-md"
      >
        <div className="grid gap-4">
          <h1 className="font-bold text-2xl">Profile Details</h1>

          <p className="text-darkGray">
            {" "}
            Add your details to create a personal touch to your profile.
          </p>
        </div>

        <div className="bg-veryLightGray p-3 rounded-md grid grid-cols-3  gap-3 items-center">
          <p className="text-darkGray">Profile Picture</p>

          <div
            className="bg-veryLightPurple h-[190px] w-[190px] rounded-md bg-opacity-50 bg-no-repeat bg-cover"
            style={{ backgroundImage: profile.img? `url(${profile.img})` : undefined }}
          >
            <label
              htmlFor="dropfile"
              className="h-full w-full items-center flex flex-col  gap-3 justify-center  cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                className={`fill-ogColor ${profile.img && "fill-white"}`}
                viewBox="0 0 40 40"
              >
                <path d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z" />
              </svg>
              <p
                className={`text-ogColor capitalize font-semibold ${
                  profile.img && "text-white"
                } `}
              >
                + upload image
              </p>
              <input
                type="file"
                name=""
                id="dropfile"
                className="hidden"
                onChange={handleDrop}
                accept="image/*"
              />
            </label>
          </div>

          <div>
            <p className="text-darkGray">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
