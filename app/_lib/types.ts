import { ReactNode } from "react";

export interface PlatformLink {
  id: number;
  icon: ReactNode;
  name: string;
  url?: string | URL;
  placeholder?: string;
  error?: string;
  regex?: string | RegExp | `${string}`;
}

export interface DBPlatformLink {
  id: number;
  icon: string;
  name: string;
  url?: string | URL;
  regex?: string | RegExp | `${string}`;
}

export type Input = {
  email: string;
  password: string;
  confirm_password: string;
};
export type KeyError = {
  email?: string;
  password?: string;
};

export type PasswordChecker = {
  confirm_password?: string;
  password?: string;
};

export type SignUpError = KeyError & {
  confirm_password?: string;
};

export interface InputError {
  fName?: string;
  lName?: string;
}

export type ProfileInsertProps = Omit<ProfileData, "error" | "img"> & {
  id?: string;
};

export interface ProfileData {
  fName: string;
  lName: string;
  img?: string;
  email: string;
  imageFile?: File | Blob;
  error?: InputError;
}

export type ProfileTypeWithoutError = Omit<ProfileData, "imageFile" | "error">;

export type FormState =
  | { success?: boolean; message?: string; data?: DBPlatformLink | any[] }
  | undefined;
