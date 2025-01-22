import { verifyUser } from "@/app/_lib/dal";
import { supabase } from "@/app/_lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { email, isAuth } = await verifyUser();

    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "Not Authenticated" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("user_email, $1", [email]);
       console.log(data);

    if (error) {
      throw new Error(error.message);
    }
    return NextResponse.json({ success: true, data: data });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
