import Img from "../Img";

export default function NothingHere() {
  return (
    <>
      <div className="grid place-items-center gap-5 bg-veryLightGray rounded-md px-5 py-10">
        <Img
          src="/images/illustration-empty.svg"
          alt="empty link image"
          className="h-[200px] w-full "
        />

        <h2 className="text-2xl text-gray font-bold ">
          Let&apos;s get you started
        </h2>

        <p className="text-darkGray w-full md:w-3/5 text-center">
          Use the &quot;Add new link&quot; button to get started. Once you have
          more than one link, you can reorder and edit them. We&apos;re here to
          help you share your profiles with everyone!
        </p>
      </div>
    </>
  );
}
