import { cookies } from "next/headers";
import { decrypt } from "./auth";

export async function verifyUser() {
  const cookie = (await cookies()).get("devlink_session")?.value;
  const session = await decrypt(cookie);

  if (session?.email) {
    return { isAuth: true, email: session.email };
  }
  return { isAuth: false, message: "user not signed in" };
}
