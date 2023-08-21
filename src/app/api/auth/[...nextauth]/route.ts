import { useApi } from "@/hooks/useApi";
import api from "@/services/api";
import { decodeAccessToken } from "@/utils/decodeAccessToken";
import Cookies from "js-cookie";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import nookies from "nookies";
import { cookies } from "next/headers";

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },

//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req: any) {
//         const response: any = await fetch(`${process.env.API_URL}sessions`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(credentials),
//           credentials: "include",
//         });

//         const userResponse = await response.json();

//         if (response.ok) {
//           const refreshToken = response.headers.get("set-cookie");
//           cookies().set("refreshToken", refreshToken, {
//             maxAge: 7 * 24 * 60 * 60,
//           });
//           cookies().set("accessToken", userResponse.accessToken, {
//             maxAge: 1 * 60 * 60,
//           });

//           return userResponse;
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, trigger, session }: any) {
//       if (trigger === "update") {
//         return { ...token, ...session.user };
//       }
//       if (user) {
//         const currentTime = Math.floor(Date.now() / 1000);
//         const decodeToken = decodeAccessToken(user.accessToken);
//         console.log(user.token);
//         if (decodeToken.exp < currentTime) {
//           try {
//             const refreshTokenCookie = cookies().get("refreshToken");
//             if (refreshTokenCookie) {
//               const refreshTokenValue = refreshTokenCookie.value;
//               const response = await fetch(
//                 `${process.env.API_URL}token/refresh`,
//                 {
//                   method: "PATCH",
//                   credentials: "include",
//                   headers: {
//                     Cookie: refreshTokenValue,
//                   },
//                 }
//               );

//               if (response.ok) {
//                 const refreshToken: any = response.headers.get("set-cookie");
//                 cookies().set("refreshToken", refreshToken, {
//                   maxAge: 7 * 24 * 60 * 60,
//                 });

//                 const newAccessToken = await response.json();
//                 token.accessToken = newAccessToken.accessToken;

//                 cookies().set("accessToken", newAccessToken.accessToken, {
//                   maxAge: 1 * 60 * 60,
//                 });
//               }
//             }
//           } catch (error) {
//             console.error("Failed to refresh accessToken:", error);
//           }
//         }

//         token.accessToken = user.accessToken;
//       }
//       return { ...token, ...user };
//     },

//     async session({ session, token, user }: any) {
//       session.user = token;
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/auth/login",
//   },
// };

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//   return await NextAuth(req, res, authOptions);
// }

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req: any) {
        const response: any = await fetch(`${process.env.API_URL}sessions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
          credentials: "include",
        });

        const userResponse = await response.json();

        if (response.ok) {
          const refreshToken = response.headers.get("set-cookie");
          cookies().set("refreshToken", refreshToken, {
            maxAge: 7 * 24 * 60 * 60,
          });
          cookies().set("accessToken", userResponse.accessToken, {
            maxAge: 1 * 60 * 60,
          });

          return userResponse;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        const currentTime = Math.floor(Date.now() / 1000);
        const decodeToken = decodeAccessToken(user.accessToken);
        if (decodeToken.exp < currentTime) {
          try {
            const refreshTokenCookie = cookies().get("refreshToken");
            if (refreshTokenCookie) {
              const refreshTokenValue = refreshTokenCookie.value;
              const response = await fetch(
                `${process.env.API_URL}token/refresh`,
                {
                  method: "PATCH",
                  credentials: "include",
                  headers: {
                    Cookie: refreshTokenValue,
                  },
                }
              );

              if (response.ok) {
                const refreshToken: any = response.headers.get("set-cookie");
                cookies().set("refreshToken", refreshToken, {
                  maxAge: 7 * 24 * 60 * 60,
                });

                const newAccessToken = await response.json();
                user.accessToken = newAccessToken.accessToken;
                token.accessToken = newAccessToken.accessToken;

                cookies().set("accessToken", newAccessToken.accessToken, {
                  maxAge: 1 * 60 * 60,
                });
              }
            }
          } catch (error) {
            console.error("Failed to refresh accessToken:", error);
          }
        }

        token.accessToken = user.accessToken;
      }
      return { ...token, ...user };
    },

    async session({ session, token, user }: any) {
      session.user = token;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };

// async jwt({ token, user }: any) {
//   return { ...token, ...user };
// },
// async session({ session, token, user }: any) {
//   return session;
// },
