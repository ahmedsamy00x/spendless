"use server";
import { cookies } from "next/headers";

const EXPIRES_AT = 60 * 60 * 1000;

export async function createSession(accessToken: string, refreshToken: string) {
  const expiresAt = new Date(Date.now() + EXPIRES_AT);

  const session = {
    access_token: accessToken,
    refresh_token: refreshToken,
    expiresAt,
  };

  const cookieStore = await cookies();

  cookieStore.set("session", JSON.stringify(session), {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  return session ? JSON.parse(session.value) : null;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
