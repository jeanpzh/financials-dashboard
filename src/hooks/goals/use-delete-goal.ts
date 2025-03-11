import { useModalStore } from "@/lib/store/useModalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteGoal } from "@/app/actions/goals";

export const useDeleteGoal = () => {
    const { closeModal } = useModalStore();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["delete-goal"],
        mutationFn: async (id: number) => deleteGoal(id),
        onSuccess: () => {
            toast.success("Goal deleted successfully");
            closeModal();
            queryClient.invalidateQueries({ queryKey: ["goals"] });
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });
};