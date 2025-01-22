"use server";

import { revalidatePath } from "next/cache";

import { supabase } from "./db";
import { verifyUser } from "./dal";

import {
  PlatformLink,
  DBPlatformLink,
  ProfileData,
  FormState,
  ProfileTypeWithoutError,
} from "./types";
import { redirect } from "next/navigation";

const ID_ERROR_TEXT = process.env.ID_ERROR_TEXT;

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

export async function insertLink(links: PlatformLink[]) {
  const { email } = await verifyUser();

  const { data, error: selectError } = await supabase
    .from("links")
    .select("*")
    .eq("user_email", email);

  if (selectError) {
    return {
      success: false,
      message: selectError.message,
    } satisfies FormState;
  }

  const existingLinkNames = links.map((link) => link.id);
  const linksNotInArray = data.filter(
    (link) => !existingLinkNames.includes(link.id)
  );

  for (const link of linksNotInArray) {
    await supabase
      .from("links")
      .delete()
      .eq("name", link.name)
      .eq("user_email", email);
  }

  try {
    for (const link of links) {
      const find = data?.find((d) => d.id === link.id);

      if (find) {
        await supabase
          .from("links")
          .update({ url: link.url })
          .eq("id", link.id)
          .eq("user_email", email);
      } else {
        const { error } = await supabase.from("links").insert({
          user_email: email,
          url: link.url,
          name: link.name,
          regex: link.regex,
          icon: link.name,
        });
        if (error) {
          throw new Error(error.message);
        }
      }
    }
    revalidatePath("/");
    return {
      success: true,
      message: "Your changes have been successfully saved!",
    } satisfies FormState;
  } catch (error: any | unknown) {
    return {
      success: false,
      message: error.message,
    } satisfies FormState;
  }
}

export async function getLinks(payload?: string) {
  const checkUserAuth = await verifyUser();

  const email = payload || checkUserAuth.email;

  if (!email) {
    return { success: false, message: "Not Authenticated" };
  }

  const { data: linksData, error: linksError } = await supabase
    .from("links")
    .select("*")
    .eq("user_email", email);

  if (linksError) {
    return { success: false, message: linksError.message } satisfies FormState;
  }

  const { data: profileRequest, error: profileError } = await supabase
    .from("profile")
    .select("*")
    .eq("user_email", email);

  if (profileError) {
    return {
      success: false,
      message: profileError.message,
    } satisfies FormState;
  }

  const [profileData] = profileRequest || [];

  return { success: true, data: linksData, profile: profileData };
}

export async function getProfile() {
  try {
    const { email: user_email } = await verifyUser();

    if (!user_email) {
      return { success: false, message: "Not Authenticated" };
    }
    const { data, error: profileError } = await supabase
      .from("profile")
      .select("*")
      .eq("user_email", user_email);

    if (profileError) {
      return {
        success: false,
        message: profileError.message,
      };
    }
    const { data: links, success } = await getLinks("");
    if (!success) {
      return {
        success: false,
        message: "Error getting data",
      };
    }

    return {
      success: true,
      profile: data[0] as ProfileTypeWithoutError,
      links: links as DBPlatformLink | any[],
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An nexpected error occured",
    };
  }
}

export async function getPreviewProfile(payload: string) {
  try {
    const { email } = await verifyUser();

    const checkUser = await supabase
      .from("users")
      .select("email")
      .eq("email", payload);

    if (!checkUser.data?.length) {
      return {
        success: false,
        message: ID_ERROR_TEXT,
      };
    }
    const isCurrentUser = email && email === checkUser.data[0].email;

    const { data, error: profileError } = await supabase
      .from("profile")
      .select("*")
      .eq("user_email", payload);

    if (profileError) {
      return {
        success: false,
        message: profileError.message,
      };
    }
    const { data: links, success } = await getLinks(payload);
    if (!success) {
      return {
        success: false,
        message: "Error getting data",
      };
    }

    return {
      success: true,
      profile: data[0] as ProfileTypeWithoutError,
      links: links as DBPlatformLink[] | any[],
      isCurrentUser: isCurrentUser,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An unexpected error occured",
    };
  }
}

export const decodeString = async (encodedString: string) => {
  try {
    const decodedString = atob(encodedString);

    return decodedString;
  } catch (error: any) {
    console.log(error.message);

    redirect("/profile");
  }
};
