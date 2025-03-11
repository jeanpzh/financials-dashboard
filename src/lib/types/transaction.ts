import { getAllTransactions } from "@/app/actions/transactions";

export type Transaction = NonNullable<
  Awaited<ReturnType<typeof getAllTransactions>>
>[number];
