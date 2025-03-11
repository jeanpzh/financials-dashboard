
import { DialogFooter } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { transactionSchema, TransactionFormData } from "../schema";
import Field from "@/components/field";
import { useModalStore } from "@/lib/store/useModalStore";
import { DrizzleError } from "drizzle-orm";
import { useGetAllOptions } from "@/hooks/transactions/use-get-options";
import { useCreateTransaction } from "@/hooks/transactions/use-create-transaction";
import { useUpdateTransaction } from "@/hooks/transactions/use-edit-transaction";
import { Transaction } from "@/lib/types/transaction";

export default function TransactionForm({ type }: { type: "edit" | "create" }) {
  const { closeModal, item } = useModalStore();
  const transaction = item as Transaction | null;
  const { handleSubmit, control } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: type === "edit" ? transaction?.description || "" : "",
      amount:
        type === "edit" ? Number(transaction?.amount || 0).toString() : "0",
      type: type === "edit" ? transaction?.typeId || 0 : 0,
      category: type === "edit" ? transaction?.categoryId || 0 : 0,
      date: type === "edit" ? transaction?.date || "" : "",
    },
  });

  const { mutate: createTransaction } = useCreateTransaction();
  const { mutate: updateTransaction } = useUpdateTransaction();
  const { data: options, isLoading } = useGetAllOptions();

  const onSubmit = (data: TransactionFormData) => {
    try {
      // parse amount to float
      if (type === "edit") {
        if (!transaction) return;

        updateTransaction({
          id: transaction.id,
          item: data,
        });
        return;
      }
      createTransaction(data);
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
        <Field
          control={control}
          label="Descripción"
          name="description"
          type="input"
        />
        <div className="grid grid-cols-2 gap-4">
          <Field control={control} label="Monto" name="amount" type="input" />
          <Field control={control} label="Fecha" name="date" type="date" />
        </div>
        <Field
          control={control}
          label="Tipo"
          name="type"
          type="select"
          options={options?.types}
          placeholder="Selecciona un tipo"
        />
        <Field
          control={control}
          label="Categoría"
          name="category"
          type="select"
          options={options?.categories}
          placeholder="Selecciona una categoría"
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
