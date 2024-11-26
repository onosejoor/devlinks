"use server";

import { ReactNode } from "react";

export interface PlatformLink {
  id: number;
  icon: ReactNode;
  name: string;
  url?: string | URL;
  error?: string;
  input?: string;
  regex?: string | RegExp | `${string}`
}

export interface ProfileData {
  fName: string
  lName: string
  img?: string
  email: string
}