"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, Filter } from "lucide-react";
import { useGetTransactions } from "@/hooks/transactions/use-get-transactions";
import { useFilterTransactions } from "@/hooks/use-filter";
import { useModalStore } from "@/lib/store/useModalStore";
import { DataTable } from "@/components/ui/data-table";
import { getTransactionColumns } from "./components/transaction-columns";

export default function TransactionsPage() {
  const { data: transactions, isLoading } = useGetTransactions();
  const { openModal } = useModalStore();
  const {
    filteredData: filteredTransactions,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
  } = useFilterTransactions({
    transactions: transactions ?? [],
  });

  const columns = getTransactionColumns({
    onEdit: (transaction) => openModal("EDIT_TRANSACTION", transaction),
    onDelete: (transaction) => openModal("DELETE_TRANSACTION", transaction),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transacciones</h1>
        <Button onClick={() => openModal("CREATE_TRANSACTION")}>
          <Plus className="mr-2 h-4 w-4" />
          Añadir transacción
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar transacciones..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                {filterType === "all"
                  ? "Todos los tipos"
                  : filterType === "Ingresos"
                  ? "Ingresos"
                  : "Egresos"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterType("all")}>
                Ambos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("Ingresos")}>
                Ingresos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("Egresos")}>
                Egresos
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas las transacciones</CardTitle>
          <CardDescription>
            Sigue tus transacciones y mantén un registro de tus gastos e
            ingresos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredTransactions ?? []}
            columns={columns}
            isLoading={isLoading}
            loadingMessage="Cargando..."
            emptyMessage="No hay transacciones."
          />
        </CardContent>
      </Card>
    </div>
  );
}
