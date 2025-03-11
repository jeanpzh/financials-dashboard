import { z } from "zod";

export const goalSchema = z.object({
  name: z.string().min(1, "Name is required"),
  targetAmount: z.string().min(1, "Target amount is required"),
  currentAmount: z.string().min(1, "Current amount is required"),
  deadline: z.string().min(1, "Deadline is required"),
  category: z.number().min(1, "Category is required"),
});

export type GoalFormData = z.infer<typeof goalSchema>;
