import CustomErrorPage from "../_components/CustomError";
import Nav from "../_components/Nav";
import { getProfile } from "../_lib/functions";

import { DBPlatformLink } from "../_lib/types";

import ProfileSection from "./Home";

export default async function Page() {
  const { profile, links, success, message } = await getProfile();

  return (
    <>
      <Nav />
      {success ? (
        <ProfileSection
          links={links as DBPlatformLink[]}
          userProfile={profile || null}
        />
      ) : (
        <CustomErrorPage message={message} />
      )}
    </>
  );
}
