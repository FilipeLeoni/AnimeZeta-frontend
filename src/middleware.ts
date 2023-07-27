import { NextRequest, NextResponse } from "next/server";

export default async function Middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  const loginUrl = new URL("/auth/login", request.url);

  if (!token) {
    if (request.nextUrl.pathname === "/auth/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/mylist"],
};
