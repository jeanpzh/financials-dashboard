CREATE TABLE "category" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"type" text,
	"color" text
);
--> statement-breakpoint
CREATE TABLE "goals" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"targetAmount" integer,
	"currentAmount" integer,
	"deadline" date,
	"category" text,
	"createdAt" date
);
--> statement-breakpoint
CREATE TABLE "monthlyData" (
	"month" text,
	"income" integer,
	"expenses" integer
);
--> statement-breakpoint
CREATE TABLE "netWorthData" (
	"date" date,
	"assets" integer,
	"liabilities" integer,
	"netWorth" integer
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"description" text,
	"amount" integer,
	"type" text,
	"category" text,
	"date" timestamp,
	"account" uuid
);
--> statement-breakpoint
CREATE TABLE "typeOfAccounts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"type" text,
	"balance" integer
);
--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_typeOfAccounts_id_fk" FOREIGN KEY ("account") REFERENCES "public"."typeOfAccounts"("id") ON DELETE no action ON UPDATE no action;