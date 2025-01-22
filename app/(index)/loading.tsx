import NothingHere from "../_components/ui/NothingHere";
import PhoneMockup from "../profile/_components/Phone";

export default function Loading() {
  return (
    <div className="flex gap-[50px]">
      <div className="fixed bg-darkGray opacity-50 inset-0 z-[50] touch-none"></div>
      <div className="bg-white rounded-md w-[200px] -translate-x-1/2 fixed top-1/2 left-1/2 z-[100] overflow-hidden h-[4px]">
        <div className="w-full h-full rounded-md animate-marquee bg-ogColor"></div>
      </div>
      <PhoneMockup />
      <form className="flex-1 flex flex-col gap-5 p-7 bg-white rounded-md">
        <div className="flex flex-col  gap-10">
          <div className="grid gap-3">
            <h1 className="text-gray font-bold text-2xl">
              Customize your links
            </h1>

            <p className="text-darkGray">
              Add/edit/remove links below and then share all your profiles with
              the world
            </p>
          </div>
          <button
            type="button"
            className="border hover:bg-veryLightPurple disabled:bg-veryLightGray disabled:text-lightGray disabled:cursor-not-allowed border-ogColor rounded-md text-ogColor py-2 font-bold"
            disabled={true}
          >
            + Add new link
          </button>
        </div>
        <div className="flex flex-col gap-10 min-h-[450px] md:max-h-[500px] no-scrollbar relative md:overflow-scroll">
          <NothingHere />
        </div>

        <hr className="text-lightPurple" />
        <button
          type="button"
          disabled
          className={
            "rounded-md  disabled:text-lightGray autofill:bg-white hover:bg-lightPurple hover:shadow-lg shadow-lightGray w-fit ml-auto text-white disabled:shadow-none disabled:border-lightGray border border-ogColor disabled:bg-veryLightPurple disabled:cursor-not-allowed px-5 py-[5px] bg-ogColor "
          }
        >
          Save
        </button>
      </form>
    </div>
  );
}
