"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { PlatformLink, ProfileData } from "../lib/Functions";

type UserContextType = {
  links: PlatformLink[];
  setLinks: Dispatch<SetStateAction<PlatformLink[]>>;
};

export const Context = createContext<UserContextType>({
  links: [],
  setLinks: () => [],
});

type UserProfileType = {
  profile: ProfileData;
  setProfile: Dispatch<SetStateAction<ProfileData>>;
};

export const ProfileContext = createContext<UserProfileType>({
  profile: {},
  setProfile: () => {},
});
