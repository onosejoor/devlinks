import { getUser } from "@/app/_lib/functions";
import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { supabase } from "@/app/_lib/db";
import { createSession } from "@/app/_lib/auth";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const checkUser = await getUser(email);
    if (checkUser.success) {
      return NextResponse.json({
        success: false,
        message: `user ${email} already exists, try logging in`,
      });
    }
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const { error } = await supabase.from("users").insert({
      email: email,
      password: hash,
    });

    if (error)
      return NextResponse.json({
        success: false,
        message: error.message,
      });

    await createSession(email);

    // NextResponse.redirect(new URL("/", req.url));
    return NextResponse.json({
      success: true,
      message: "User successfully created!",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
