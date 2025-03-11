import { createTransaction } from "@/app/actions/transactions";
import { useModalStore } from "@/lib/store/useModalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();
  return useMutation({
    mutationKey: ["create-transaction"],
    mutationFn: createTransaction,
    onSuccess: () => {
      toast.success("Transaction created successfully");
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
