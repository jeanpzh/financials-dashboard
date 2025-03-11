import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET,
} from "@/lib/config/env";

export default {
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
    error: "/error",
    verifyRequest: "/verify-request",
  },
  secret: NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  logger: {
    error(error) {
      console.log(error.message);
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
} satisfies NextAuthConfig;
