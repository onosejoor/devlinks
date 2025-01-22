"use client";
import PhoneMockup from "./_components/Phone";
import { DBPlatformLink, ProfileData } from "../_lib/types";
import { ProfileContext } from "../_components/Context";
import Profile from "./Profile";
import { useState } from "react";
 
export default function ProfileSection({
  links,
  userProfile,
}: {
  links: DBPlatformLink[] | any[] | undefined;
  userProfile: ProfileData | null;
}) {
  const [profile, setProfile] = useState<ProfileData>(userProfile || {
    fName: "",
    lName: "",
    img: "",
    email: "",
  });

  return (
    <>
      <main className="flex gap-[30px]  my-5">
        <ProfileContext.Provider value={{ profile, setProfile }}>
          <PhoneMockup
            imgSrc={profile?.img}
            fName={profile.fName}
            email={profile.email}
            lName={profile.lName}
            links={links}
          />
          <Profile />
        </ProfileContext.Provider>
      </main>
    </>
  );
}
