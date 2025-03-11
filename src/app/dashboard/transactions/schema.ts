import { z } from "zod";

export const transactionSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.string().min(1, "Amount is required"),
  date: z.string().min(1, "Date is required"),
  category: z.number().min(1, "Category is required"),
  type: z.number().min(1, "Type is required"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
