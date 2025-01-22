import MobileLink from "@/app/_components/MobileLink";
import PreviewNav from "../_components/PreviewNav";
import Img from "@/app/_components/Img";

import { decodeString, getPreviewProfile } from "@/app/_lib/functions";
import { ProfileTypeWithoutError } from "@/app/_lib/types";
import Link from "next/link";
import { redirect } from "next/navigation";
import CustomErrorPage from "@/app/_components/CustomError";

const ID_ERROR_TEXT = process.env.ID_ERROR_TEXT;

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const decodeID = await decodeString(id);

  const { profile, links, isCurrentUser, success, message } =
    await getPreviewProfile(decodeID);

  if (message === ID_ERROR_TEXT) {
    redirect("/profile");
  }

  if (success) {
    const { email, img, fName, lName }: ProfileTypeWithoutError = profile!;
    return (
      <>
        <div className="bg-[#633CFF] rounded-bl-[32px] rounded-br-[32px] absolute top-0 h-[calc(100vh-60vh)] 2xl:h-[300px] w-full left-0"></div>
        <main className="grid gap-10 relative">
          {isCurrentUser && <PreviewNav />}
          <div className="sm:!w-[350px] shadow-preview-card w-full xs:w-[calc(100%-50px)] mx-auto min-h-[400px] py-12 px-5 xs:px-14 bg-white rounded-xl grid gap-10 justify-items-center">
            <div className="grid gap-7">
              {img && (
                <Img
                  src={img}
                  alt={fName}
                  className="xs:h-[140px] mx-auto rounded-full h-[100px] w-[100px] xs:w-[140px] border-4 object-cover border-ogColor"
                />
              )}
              <div className="flex flex-col gap-2 items-center text-center">
                <h1 className="text-gray text-4xl font-bold capitalize">{`${fName} ${lName}`}</h1>
                <p className="text-darkGray ">{email}</p>
              </div>
            </div>

            <div className="grid gap-5 w-full">
              {links?.map((link) => {
                return (
                  <Link target="_blank" key={link.id} href={link.url}>
                    <MobileLink
                      name={link.name}
                      icon={link.icon}
                      className="h-fit py-4 !rounded-xl"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </main>
      </>
    );
  }
  return <CustomErrorPage />
}
