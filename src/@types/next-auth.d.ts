import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      avatarUrl: string;
      accessToken: string;
    };
  }
}
