import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGoal } from "@/app/actions/goals";
import { GoalFormData } from "@/app/dashboard/goals/schema";
import { useModalStore } from "@/lib/store/useModalStore";
import { toast } from "sonner";

export const useCreateGoal = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();

  return useMutation({
    mutationFn: (data: GoalFormData) => createGoal(data),
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ["goals"] });
        toast.success(data.message);
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
