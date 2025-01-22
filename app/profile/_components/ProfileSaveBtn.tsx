import { MouseEvent, useContext } from "react";
import { ProfileContext } from "../../_components/Context";
import { InputError } from "../../_lib/types";

export default function ProfileSaveBtn({ disabled }: { disabled?: boolean }) {
  const { profile, setProfile } = useContext(ProfileContext);

  function save(e: MouseEvent<HTMLButtonElement>) {
    const include = ["fName", "lName"];
    const profileArray = Object.keys(profile);
    const error: InputError = {}
    profileArray.forEach((profileData) => {
      if (
        include.includes(profileData) &&
        !profile[profileData as keyof InputError].trim()
      ) {
        e.preventDefault();
        error[profileData as keyof InputError] = "Can't be empty"
        return setProfile((prev) => {
          return {
            ...prev,
            error: error
          };
        });
      }
    });
  }
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={(e) => save(e)}
      className={
        "rounded-md  disabled:text-lightGray autofill:bg-white hover:bg-lightPurple hover:shadow-lg shadow-lightGray w-fit ml-auto text-white disabled:shadow-none disabled:border-lightGray border border-ogColor disabled:bg-veryLightPurple disabled:cursor-not-allowed px-5 py-[5px] bg-ogColor "
      }
    >
      Save
    </button>
  );
}
