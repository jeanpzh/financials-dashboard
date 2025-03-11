import { deleteTransaction } from "@/app/actions/transactions";
import { useModalStore } from "@/lib/store/useModalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteTransaction = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-transaction"],
    mutationFn: async (id: string) => deleteTransaction(id),
    onSuccess: () => {
      toast.success("Transaction deleted successfully");
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
