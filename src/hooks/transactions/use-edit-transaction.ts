import { updateTransaction } from "@/app/actions/transactions";
import { useModalStore } from "@/lib/store/useModalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();
  return useMutation({
    mutationKey: ["update-transaction"],
    mutationFn: async ({ item, id }: { item: any; id: string }) =>
      updateTransaction(item, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction updated successfully");
      closeModal();
    },
    onError: (error) => {
      console.log("Error: ", error.message);
      toast.error(error.message);
    },
  });
};
