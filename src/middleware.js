//middleware.js
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import pb from "./lib/pocketbase";

export async function middleware(request) {
  //print request method and url
  console.log(`[middleware] ${request.method} ${request.url}`);
  //declare variables here

  //read the cookie set in the setCookie endpoint
  const cookieStore = cookies();
  const isAuth = cookieStore.get("isLoggedIn");
  let isLoggedIn = false;
  if (isAuth?.value === "true") {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  if (
    request.nextUrl.pathname &&
    request.nextUrl.pathname.startsWith("/auth")
  ) {
    //if already logged in and goes to login/signup redirect to home page
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return;
  }

  //From here configure protected routes

  //check if user is logged in
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  //continue without any request changes
  return NextResponse.next();
}

export const config = {
  matcher: [
    //ignore any url that starts with:
    // api, _next/static, _next/image, favicon.ico
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
