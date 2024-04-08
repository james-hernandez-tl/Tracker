import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import hashToken from "./helpers/hashToken";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ["/login", "/signup", "/verifyemail", "/"];
  const isPublicPath = publicPaths.includes(path);

  const token = hashToken(request);

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/login",
    "/signup",
    "/verifyemail",
    "/profile",
    "/dashboard",
  ],
};
