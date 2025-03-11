"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTransactions } from "@/hooks/transactions/use-get-transactions";
import { Transaction } from "@/lib/types/transaction";
import {
  formatCurrency,
  getTotalExpenses,
  getTotalIncome,
} from "@/utils/dashboard";
import { ArrowDownRight, ArrowUpRight, Target } from "lucide-react";

function SummaryCard({
  title,
  value,
  icon,
  color,
  loading,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  loading: boolean;
}) {
  return (
    <>
      {loading ? (
        <Skeleton className="h-24" />
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold text-${color}`}>{value}</div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export function SummaryCards() {
  const { data: transactions, isLoading } = useGetTransactions();
  const totalIncome = getTotalIncome(transactions as Transaction[]) ?? [];
  const totalExpenses = getTotalExpenses(transactions as Transaction[]) ?? [];
  const totalSavings = totalIncome - totalExpenses;
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-24" />
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            title="Ingresos"
            value={formatCurrency(totalIncome)}
            icon={<ArrowUpRight className="h-4 w-4 text-primary" />}
            color="primary"
            loading={false}
          />
          <SummaryCard
            title="Gastos"
            value={formatCurrency(totalExpenses)}
            icon={<ArrowDownRight className="h-4 w-4 text-error" />}
            color="error"
            loading={false}
          />
          <SummaryCard
            title="Ahorros"
            value={formatCurrency(totalSavings)}
            icon={<Target className="h-4 w-4 text-success" />}
            color="success"
            loading={false}
          />
        </div>
      )}
    </>
  );
}
