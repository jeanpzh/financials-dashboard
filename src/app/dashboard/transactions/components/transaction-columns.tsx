import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "@/lib/types/transaction";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUpRight, ArrowDownRight, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/utils/dashboard";

interface TransactionColumnProps {
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export const getTransactionColumns = ({
  onEdit,
  onDelete,
}: TransactionColumnProps): ColumnDef<Transaction>[] => [
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Descripción</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <div className="flex items-center gap-2">
          <div
            className={`rounded-full p-1 ${
              type === "Ingresos"
                ? "bg-emerald-100 dark:bg-emerald-900"
                : "bg-rose-100 dark:bg-rose-900"
            }`}
          >
            {type === "Ingresos" ? (
              <ArrowUpRight className="h-3 w-3 text-emerald-500" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-rose-500" />
            )}
          </div>
          {row.original.description}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Categoría</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "account",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Cuenta</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Fecha</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Monto</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.original.amount;
      return (
        <div className={`text-right ${
          row.original.type === "Ingresos" ? "text-emerald-500" : "text-rose-500"
        }`}>
          {row.original.type === "Ingresos" ? "+" : "-"}
          {formatCurrency(amount ?? 0)}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(transaction)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(transaction)}>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
