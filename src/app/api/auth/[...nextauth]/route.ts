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

// type ICredentials = {
//   email: string;
//   password: string;
//   rememberMe: boolean;
// };

export const authOptions: NextAuthOptions = {
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
          cookies().set("accessToken", userResponse.accessToken);

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
            const res = await fetch(`${process.env.API_URL}token/refresh`, {
              method: "PATCH",
              credentials: "include",
              headers: {
                Cookie: document.cookie,
              },
            });
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
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}
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
//           return userResponse;
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }: any) {
//       if (user) {
//         const currentTime = Math.floor(Date.now() / 1000);
//         const decodeToken = decodeAccessToken(user.accessToken);

//         if (decodeToken.exp < currentTime) {
//           console.log("accessToken expirado, renovando...");
//           try {
//             const response = await fetch(
//               `${process.env.API_URL}token/refresh`,
//               {
//                 method: "PATCH",
//                 credentials: "include",
//                 headers: {
//                   Cookie: document.cookie,
//                 },
//               }
//             );
//             console.log(response);
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
// });
// }

export { auth as GET, auth as POST };

// const handler = NextAuth(authOptions);

// async jwt({ token, user }: any) {
//   return { ...token, ...user };
// },
// async session({ session, token, user }: any) {
//   return session;
// },
