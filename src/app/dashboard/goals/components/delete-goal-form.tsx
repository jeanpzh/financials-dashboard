"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useDeleteGoal } from "@/hooks/goals/use-delete-goal";
import { useModalStore } from "@/lib/store/useModalStore";
import { Goal } from "@/lib/types/goal";


export default function DeleteGoalForm() {
  const { item, closeModal } = useModalStore();
  const { mutate: deleteGoal } = useDeleteGoal();
  const goal = item as Goal | null;
  const handleDelete = () => {
    try {
      if (!goal) return;
      deleteGoal(goal.id);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error: ", error.message);
      }
    }
  };

  return (
    <>
    {goal && (  
      <div className="py-4">
        <p className="font-medium">{goal.name}</p>
        <p className="text-sm text-muted-foreground">
          {goal.category}
        </p>
      </div>
    )}
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => closeModal()}
          >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          >
          Delete
        </Button>
      </DialogFooter>
    </>
  );
}
