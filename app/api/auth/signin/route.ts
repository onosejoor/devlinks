import { getUser } from "@/app/_lib/functions";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { supabase } from "@/app/_lib/db";
import { createSession } from "@/app/_lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password, email } = await req.json();

    const checkUser = await getUser(email);
    if (!checkUser.success) {
      throw new Error(`user '${email}' does not exist!`);
    }
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)!;

    const [firstData] = data!;

    const comparePassword = await bcrypt.compare(password, firstData.password);

    if (!comparePassword) throw new Error(`Incorrect password!`);

    await createSession(email);

    return NextResponse.json({
      success: true,
      message: "Logged in successfully!",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.status }
    );
  }
}
