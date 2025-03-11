import { DialogFooter } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { goalSchema, GoalFormData } from "../schema";
import Field from "@/components/field";
import { useModalStore } from "@/lib/store/useModalStore";
import { DrizzleError } from "drizzle-orm";
import { useGetCategories } from "@/hooks/goals/use-get-categories";
import { Goal } from "@/lib/types/goal";
import { useCreateGoal } from "@/hooks/goals/use-create-goal";
import { useUpdateGoal } from "@/hooks/goals/use-update-goal";

export default function GoalForm({ type }: { type: "edit" | "create" }) {
  const { closeModal, item } = useModalStore();
  const goal = item as Goal | null;
  const { handleSubmit, control } = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      name: type === "edit" ? goal?.name || "" : "",
      targetAmount:
        type === "edit" ? Number(goal?.targetAmount || 0).toString() : "0",
      currentAmount:
        type === "edit" ? Number(goal?.currentAmount || 0).toString() : "0",
      deadline: type === "edit" ? goal?.deadline || "" : "",
      category: type === "edit" ? goal?.categoryId || 0 : 0,
    },
  });

  const { data: items, isLoading } = useGetCategories("options");
  const categories = items as { label: string; value: number }[];
  const { mutate: createGoal } = useCreateGoal();
  const { mutate: updateGoal } = useUpdateGoal();

  const onSubmit = (data: GoalFormData) => {
    try {
      if (type === "edit") {
        if (!goal) return;
        updateGoal({ id: goal.id, item: data });
        return;
      }
      createGoal(data);
    } catch (error) {
      if (error instanceof DrizzleError) {
        console.log("Error: ", error.message);
      } else if (error instanceof Error) {
        console.log("Error: ", error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4 w-full">
        <Field control={control} label="Goal Name" name="name" type="input" />
        <div className="grid grid-cols-2 gap-4">
          <Field
            control={control}
            label="Target Amount"
            name="targetAmount"
            type="input"
          />
          <Field
            control={control}
            label="Current Amount"
            name="currentAmount"
            type="input"
          />
        </div>
        <Field control={control} label="Deadline" name="deadline" type="date" />
        <Field
          control={control}
          label="Category"
          name="category"
          type="select"
          options={categories ?? []}
          placeholder="Select a category"
        />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : type === "edit" ? "Edit" : "Create"}
        </Button>
      </DialogFooter>
    </form>
  );
}
