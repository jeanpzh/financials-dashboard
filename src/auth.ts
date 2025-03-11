import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accounts, sessions, users, verificationTokens } from "./db/schema";
import authConfig from "@/lib/auth/auth.config";
import { db } from "./db/drizzle";

export const { handlers, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  ...authConfig,
});
