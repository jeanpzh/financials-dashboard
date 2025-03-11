import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useDeleteTransaction } from "@/hooks/transactions/use-delete-transaction";
import { useModalStore } from "@/lib/store/useModalStore";
import { Transaction } from "@/lib/types/transaction";
import { formatCurrency } from "@/utils/dashboard";
import React from "react";

export default function DeleteTransactionForm() {
  const { mutate: deleteTransaction } = useDeleteTransaction();
  const { item: selectedTransaction, closeModal } = useModalStore();
  const transactionToDelete = selectedTransaction as Transaction | null;
  const handleDelete = () => {
    try {
      if (!transactionToDelete) return;
      deleteTransaction(transactionToDelete.id);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error: ", error.message);
      }
    }
  };

  return (
    <>
      {transactionToDelete && (
        <div className="py-4">
          <p className="font-medium">{transactionToDelete.description}</p>
          <p className="text-sm text-muted-foreground">
            {transactionToDelete.date} •{" "}
            {formatCurrency(transactionToDelete.amount ?? 0)}
          </p>
        </div>
      )}
      <DialogFooter>
        <Button variant="outline" onClick={() => closeModal()}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </DialogFooter>
    </>
  );
}
