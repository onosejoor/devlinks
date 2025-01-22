import { DragIcon } from "@/app/_components/ui/Icons";

const PlatformLoader = () => (
  <div className="bg-veryLightGray rounded-md p-5 grid gap-2">
    <div className="flex items-center justify-between ">
      <div className="flex items-center font-bold text-gray gap-2">
        <span>
          <DragIcon />
        </span>
        Link #
      </div>
      <button
        type="button"
        className="bg-transparent hover:underline border-none text-darkGray"
      >
        Remove
      </button>
    </div>
    <div className="flex flex-col  gap-5">
      <div className="grid gap-1 relative">
        <label htmlFor="platform" className="text-darkGray">
          Platform
        </label>
        <div
          className={`flex py-2 px-3 items-center w-full h-10 cursor-pointer border-1 animate-pulse rounded-md bg-gray  justify-between `}
        ></div>
      </div>
      <label htmlFor="platform" className="text-darkGray">
        Link
      </label>
      <div className="h-10  animate-pulse bg-gray rounded-md w-full"></div>
    </div>
  </div>
);

export default PlatformLoader;
