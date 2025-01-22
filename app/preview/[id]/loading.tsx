export default function Loading() {
  return (
    <div>
      <div className="bg-[#633CFF] rounded-bl-[32px] rounded-br-[32px] absolute top-0 h-[calc(100vh-60vh)] 2xl:h-[300px] w-full left-0"></div>

      <div className="fixed bg-darkGray opacity-50 inset-0 z-[50] touch-none"></div>
      <div className="bg-white rounded-md w-[200px] -translate-x-1/2 fixed top-1/2 left-1/2 z-[100] overflow-hidden h-[4px]">
        <div className="w-full h-full rounded-md animate-marquee bg-ogColor"></div>
      </div>
      <main className="grid gap-10 relative">
        <div className="sm:w-[350px] shadow-preview-card w-[calc(100%-50px)] mx-auto min-h-[400px] py-12 px-14 bg-white rounded-xl grid gap-10 justify-items-center">
          <div className="grid gap-7">
            <div className="h-[140px] mx-auto rounded-full w-[140px] border-4 object-cover border-ogColor bg-darkGray animate-pulse"></div>
            <div className="flex flex-col gap-2 items-center ">
              <h1 className="bg-gray text-4xl font-bold capitalize h-[10px] animate-pulse"></h1>
            </div>
          </div>

          <div className="grid gap-5 w-full">
            {[...Array(4)].map((array, index) => (
              <div
                key={index}
                className="h-[50px] w-full rounded-xl animate-pulse bg-darkGray"
              ></div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
