import { ChangeEvent, DragEvent, useContext } from "react";
import axios from "axios";

import { ProfileContext } from "../_components/Context";
import { showToast } from "../_hooks/useToast";

import Input from "./_components/Input";
import ProfileSaveBtn from "./_components/ProfileSaveBtn";

export default function Profile() {
  const { profile, setProfile } = useContext(ProfileContext);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (files && files[0]) {
        setProfile((prev) => {
          return {
            ...prev,
            imageFile: files[0],
            img: URL.createObjectURL(files[0]),
          };
        });
      }
    } else {
      setProfile((prev) => {
        return {
          ...prev,
          [name]: value,
          error: { [name]: "" },
        };
      });
    }
  }

  function handleDrag(e: DragEvent) {
    e.preventDefault();
    const targetFile = e.dataTransfer.files;
    if (targetFile && targetFile[0]) {
      setProfile((prev) => {
        return {
          ...prev,
          img: URL.createObjectURL(targetFile[0]),
          imageFile: targetFile[0],
        };
      });
    }
  }

  async function submit() {
    const formData = new FormData();
    formData.append("fName", profile.fName);
    formData.append("lName", profile.lName);
    formData.append("email", profile.email);
    if (profile.imageFile) {
      formData.append("imageFile", profile.imageFile);
    }
    const sendProfileData = await axios.post("/api/profile", formData);
    const { message, success } = sendProfileData.data;

    showToast({
      saveIcon: true,
      message: message,
      variants: success ? "success" : "error",
    });
    return;
  }
  return (
    <>
      <form
        action={submit}
        className="flex-1 flex flex-col gap-7 p-7 bg-white rounded-md"
      >
        <div className="grid gap-4">
          <h1 className="font-bold text-2xl">Profile Details</h1>

          <p className="text-darkGray">
            Add your details to create a personal touch to your profile.
          </p>
        </div>
        <div className="bg-veryLightGray p-3 rounded-md justify-items-center text-center md:text-left grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3  gap-3 items-center">
          <p className="text-darkGray font-semibold">Profile Picture</p>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrag}
            className="bg-veryLightPurple h-[190px] w-[190px] rounded-md bg-opacity-50 bg-no-repeat bg-cover"
            style={{
              backgroundImage: profile.img ? `url(${profile.img})` : undefined,
            }}
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
                {profile.img ? "change image" : "+ upload image"}
              </p>
              <input
                type="file"
                name=""
                id="dropfile"
                className="hidden"
                onChange={handleChange}
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
        <div className="flex flex-col gap-5 rounded-md bg-veryLightGray p-3">
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 justify-between sm:sm:items-center">
            <label
              htmlFor="first name"
              className="capitalize whitespace-nowrap text-darkGray"
            >
              first name*
            </label>
            <Input
              name={"fName"}
              onChange={handleChange}
              value={profile.fName}
              error={profile.error?.fName}
              type="text"
              placeholder="eg. John "
              className="placeholder:text-darkGray bg-white  px-3 rounded-md border border-transparent"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-5 justify-between sm:items-center sm:gap-10">
            <label
              htmlFor="last name"
              className="capitalize text-darkGray whitespace-nowrap"
            >
              last name*
            </label>
            <Input
              name={"lName"}
              value={profile.lName}
              onChange={handleChange}
              error={profile.error?.lName}
              type="text"
              placeholder="eg. Appleseed"
              className="placeholder:text-darkGray bg-white  px-3 rounded-md border border-transparent"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-5 justify-between sm:items-center sm:gap-10">
            <label
              htmlFor="Email"
              className="capitalize text-darkGray whitespace-nowrap"
            >
              email
            </label>
            <Input
              value={profile.email}
              onChange={handleChange}
              name={"email"}
              type="email"
              placeholder="eg. email@example.com"
              className="placeholder:text-darkGray bg-white  px-3 rounded-md border border-transparent"
            />
          </div>
        </div>

        <hr className="text-lightPurple" />
        <ProfileSaveBtn />
      </form>
    </>
  );
}
