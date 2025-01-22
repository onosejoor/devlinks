import dynamic from "next/dynamic";
import { getLinks } from "../_lib/functions";
import MainSection from "./_components/Main";
import Nav from "../_components/Nav";

const CustomErrorPage = dynamic(() => import("../_components/CustomError"));

export default async function Home() {
  const { data, profile, success, message } = await getLinks();

  return (
    <>
      <Nav />
      {success ? (
        <MainSection linksArray={data} profileData={profile} />
      ) : (
        <CustomErrorPage message={message} />
      )}
    </>
  );
}
