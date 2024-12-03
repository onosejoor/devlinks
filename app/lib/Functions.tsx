"use server";

import { ReactNode } from "react";
import { supabase } from "./db";
import bcrypt from "bcrypt";

export interface PlatformLink {
  id: number;
  icon: ReactNode;
  name: string;
  url?: string | URL;
  error?: string;
  input?: string;
  regex?: string | RegExp | `${string}`;
}

export interface InputError {
  name: PlatformLink['name']
  error: PlatformLink['error']
}

export interface ProfileData {
  fName: string;
  lName: string;
  img?: string;
  email: string;
  error?: InputError[]
}

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

export async function createUser({ email, password }: Creds) {
  const checkUser = await getUser(email);
  if (checkUser.success) {
    return {
      success: false,
      message: `user ${email} already exists, try logging in`,
    };
  }
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
}

export async function userFunction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  
}
