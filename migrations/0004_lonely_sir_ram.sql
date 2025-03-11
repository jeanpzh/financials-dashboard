ALTER TABLE "monthlyData" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "netWorthData" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "typeOfAccounts" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "monthlyData" CASCADE;--> statement-breakpoint
DROP TABLE "netWorthData" CASCADE;--> statement-breakpoint
DROP TABLE "typeOfAccounts" CASCADE;--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_account_typeOfAccounts_id_fk";
--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN "userId" text;--> statement-breakpoint
ALTER TABLE "goals" ADD COLUMN "userId" text;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "userId" text;--> statement-breakpoint
ALTER TABLE "category" ADD CONSTRAINT "category_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "goals" ADD CONSTRAINT "goals_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN "account";