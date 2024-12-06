"use server";

import { ReactNode } from "react";
import { supabase } from "./db";
import bcrypt from "bcrypt";
import { createSession } from "./auth";
import { redirect } from "next/navigation";
import { verifyUser } from "./dal";

export interface PlatformLink {
  id: number;
  icon: ReactNode;
  name: string;
  url?: string | URL;
  error?: string;
  input?: string;
  regex?: string | RegExp | `${string}`;
}

export interface SavePlatformLink {
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

export interface ProfileData {
  fName: string;
  lName: string;
  img?: string;
  email: string;
  // error?: InputError[];
}

export type FormState = { success?: boolean; message?: string, data?: any[] } | undefined;
interface Creds {
  email: string;
  password: string;
}

export async function getUser(email: Creds["email"]) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email, $1", [email]);

  if (data && data?.length > 0) {
    return { success: true, email: email };
  } else if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: false,
    message: `${email} is not registered on devlinks`,
  };
}

export async function createUser(state: FormState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const checkUser = await getUser(email);
  if (checkUser.success) {
    return {
      success: false,
      message: `user ${email} already exists, try logging in`,
    } satisfies FormState;
  }
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  const { error } = await supabase.from("users").insert({
    email: email,
    password: hash,
  });

  if (error)
    return { success: false, message: error.message } satisfies FormState;

  await createSession(email);

  redirect("/");
}

export async function insertLink(links: PlatformLink[]) {
  const { email } = await verifyUser();

  links.forEach(async (link) => {
    const { error } = await supabase.from("links").insert({
      user_email: email,
      url: link.input,
      name: link.name,
      regex: link.regex,
      icon: link.name,
    });

    if (error) {
      return { success: false, message: error.message } satisfies FormState;
    }
  });

  return {
    success: true,
    message: "Links Saved successfully",
  } satisfies FormState;
}

export async function getMovie() {
  const { email } = await verifyUser();

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("user_email, $1", [email]);

    if (error) {
      return { success: false, message: error.message } satisfies FormState;
      
    }
    return { success: true, data: data } satisfies FormState;

}
