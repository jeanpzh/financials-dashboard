"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Transaction } from "@/lib/types/transaction";
import { formatCurrency } from "@/utils/dashboard";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface RecentTransactionsProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export function RecentTransactions({
  transactions,
  isLoading,
}: RecentTransactionsProps) {
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-96" />
      ) : (
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Transacciones Recientes</CardTitle>
            <CardDescription>
              Has realizado {transactions.length} transacciones este mes.
            </CardDescription>
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
      )}
    </>
  );
}
