"use client";
import PhoneMockup from "../ui/Phone";
import { ProfileData } from "../lib/Functions";
import { ProfileContext } from "../components/Context";
import Profile from "../ui/Profile";
import { useState } from "react";

export default function ProfileSection() {
  const [profile, setProfile] = useState<ProfileData>({
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
          />
          <Profile />
        </ProfileContext.Provider>
      </main>
    </>
  );
}
