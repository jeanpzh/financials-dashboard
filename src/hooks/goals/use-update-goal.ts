import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGoal } from "@/app/actions/goals";
import { GoalFormData } from "@/app/dashboard/goals/schema";
import { useModalStore } from "@/lib/store/useModalStore";
import { toast } from "sonner";

export const useUpdateGoal = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();

  return useMutation({
    mutationFn: ({ id, item }: { id: number; item: GoalFormData }) =>
      updateGoal(id, item),
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ["goals"] });
        toast.success(data?.message);
        closeModal();
      } else {
        toast.error(data?.error);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
