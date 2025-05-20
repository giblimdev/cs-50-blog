// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {});
  console.log("Session Cookie:", sessionCookie);
  const { pathname } = request.nextUrl;

  if (!sessionCookie) {
    const loginUrl = new URL("/auth/sign-in", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*", "/dev/:path*"],
};
/*dans mon application next utilisant betterAuth get session cooky retourne t il role ?*/
