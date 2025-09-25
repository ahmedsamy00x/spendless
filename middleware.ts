import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("session");
  const hasSession = sessionCookie?.value;

  // Parse session to check if it's valid and not expired
  let isValidSession = false;
  if (hasSession) {
    try {
      const session = JSON.parse(hasSession);
      const now = new Date();
      const expiresAt = new Date(session.expiresAt);
      isValidSession = expiresAt > now && !!session.access_token;
    } catch {
      // Invalid session format
      isValidSession = false;
    }
  }

  const { pathname } = req.nextUrl;

  // Protected routes (require authentication)
  const protectedRoutes = ["/dashboard"];
  // Auth routes (redirect if already authenticated)
  const authRoutes = ["/login", "/signup"];

  // Check if current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  // Check if current path is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !isValidSession) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && isValidSession) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
  ],
};
