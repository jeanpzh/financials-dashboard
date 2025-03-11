"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/utils/dashboard";
import { EmptyState } from "@/components/ui/empty-state";
import { Receipt } from "lucide-react";
import { Transaction } from "@/lib/types/transaction";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Loader from "@/components/loader";

interface RecentTransactionsProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export function RecentTransactions({
  transactions = [],
  isLoading,
}: RecentTransactionsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transacciones Recientes</CardTitle>
          <CardDescription>Últimas 5 transacciones</CardDescription>
        </CardHeader>
        <CardContent>
          <Loader  />
        </CardContent>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transacciones Recientes</CardTitle>
          <CardDescription>Últimas 5 transacciones</CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Receipt}
            title="Sin transacciones"
            description="No hay transacciones registradas aún."
            actionLabel="Registrar transacción"
            actionLink="/dashboard/transactions/new"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transacciones Recientes</CardTitle>
        <CardDescription>Has realizado {transactions.length} transacciones este mes.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center">
              <div
                className={`rounded-full p-2 ${
                  transaction.type === "Ingresos"
                    ? "bg-emerald-100 dark:bg-emerald-900"
                    : "bg-rose-100 dark:bg-rose-900"
                }`}
              >
                {transaction.type === "Ingresos" ? (
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-rose-500" />
                )}
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {transaction.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaction.category}
                </p>
              </div>
              <div className="ml-auto font-medium">
                <div
                  className={
                    transaction.type === "Ingresos"
                      ? "text-emerald-500"
                      : "text-rose-500"
                  }
                >
                  {transaction.type === "Ingresos" ? "+" : "-"}
                  {formatCurrency(transaction.amount ?? 0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
