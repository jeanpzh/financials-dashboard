import {
  integer,
  text,
  pgTable,
  uuid,
  date,
  serial,
  timestamp,
  primaryKey,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const goals = pgTable("goals", {
  id: serial().primaryKey(),
  name: text(),
  targetAmount: integer(),
  currentAmount: integer(),
  deadline: date(),
  categoryId: integer().references(() => category.id),
  createdAt: date(),
  userId: text().references(() => users.id),
});

export const transactions = pgTable("transactions", {
  id: uuid().defaultRandom().primaryKey(),
  description: text(),
  amount: integer(),
  typeId: integer().references(() => transactionTypes.id),
  category: integer().references(() => category.id),
  date: date(),
  userId: text().references(() => users.id),
});
export const transactionTypes = pgTable("transactionTypes", {
  id: serial().primaryKey(),
  type: text(),
});


export const category = pgTable("category", {
  id: serial().primaryKey(),
  name: text(),
  type: text(),
  color: text(),
  userId: text().references(() => users.id),
});


export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);

export type User = typeof users.$inferSelect;
export type Account = typeof accounts.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type VerificationToken = typeof verificationTokens.$inferSelect;
export type Authenticator = typeof authenticators.$inferSelect;
export type Goal = typeof goals.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type TransactionType = typeof transactionTypes.$inferSelect;
export type Category = typeof category.$inferSelect;
