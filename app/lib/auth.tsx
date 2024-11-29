import "server-only";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setExpirationTime("7d")
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function creteSession(email: string) {
  const date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const encodeSession = await encrypt({ email });

  (await cookies()).set("devlink_session", encodeSession, {
    httpOnly: true,
    expires: date,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}

