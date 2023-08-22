import NextAuth from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/mylist", "/profile"],
};
