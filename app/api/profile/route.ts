import { verifyUser } from "@/app/_lib/dal";
import { supabase } from "@/app/_lib/db";
import { ProfileData } from "@/app/_lib/types";
import uploadImage from "@/app/_lib/upload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const { email, lName, fName, imageFile } = Object.fromEntries(formData) as {
      email: string;
      lName: string;
      fName: string;
      imageFile: File;
    };

    const { email: user_email } = await verifyUser();

    if (!user_email) {
      throw new Error("Not Authenticated");
    }
    const { data, error: selectError } = await supabase
      .from("profile")
      .select("*")
      .eq("user_email", user_email);

    if (selectError) {
      throw new Error(selectError.message);
    }

    const [firstRow] = data;

    const { image } = await uploadImage(imageFile, firstRow?.imgId);

    const profileData: ProfileData = {
      ...(fName && { fName: fName.trim() }),
      ...(lName && { lName: lName.trim() }),
      email: email,
      ...(image && { img: image }),
    };

    if (!firstRow) {
      const { error } = await supabase
        .from("profile")
        .insert({ ...profileData, user_email });
      if (error) {
        throw new Error(error.message);
      }
    } else {
      const { error } = await supabase
        .from("profile")
        .update({ ...profileData, user_email })
        .eq("user_email", user_email);
      if (error) {
        return NextResponse.json({ success: false, message: error.message });
      }
    }

    return NextResponse.json(
      { success: true, message: "Your changes have been successfully saved!" },
      { status: 200 }
    );
  } catch (error: any | unknown) {
    console.log(error.message);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { email, isAuth } = await verifyUser();

    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "Not Authenticated" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("user_email, $1", [email]);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ data: data[0] });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.status }
    );
  }
}
