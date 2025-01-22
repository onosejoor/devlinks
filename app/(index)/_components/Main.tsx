"use client";

import { useState } from "react";

import PhoneMockup from "../../profile/_components/Phone";
import LinkCreateSection from "./LinkCreateSection";
import { DBPlatformLink, PlatformLink, ProfileData } from "@/app/_lib/types";

import { Context } from "../../_components/Context";


interface PageProps {
  linksArray: DBPlatformLink[] | any[] | undefined;
  profileData: ProfileData | null;
}

export default function MainSection({ linksArray, profileData }: PageProps) {
  const [links, setLinks] = useState<PlatformLink[] | DBPlatformLink[]>(
    linksArray || []
  );

  const { fName, lName, email, img } = profileData || {};

  return (
    <>
      <main className="flex gap-[30px] my-5">
        <Context.Provider value={{ links, setLinks }}>
          <PhoneMockup
            links={links}
            fName={fName}
            lName={lName}
            email={email}
            imgSrc={img}
          />
          <LinkCreateSection />
        </Context.Provider>
      </main>
    </>
  );
}
