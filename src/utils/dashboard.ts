import { Transaction } from "@/lib/types/transaction";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function calculateGoalProgress(current: number, target: number): number {
  return Math.min(Math.round((current / target) * 100), 100);
}

export function getRecentTransactions(
  count = 5,
  transactions: Transaction[]
): Transaction[] {
  if (!transactions || !Array.isArray(transactions)) {
    return [];
  }
  return [...transactions]
    ?.sort(
      (a, b) =>
        new Date(b.date as string).getTime() -
        new Date(a.date as string).getTime()
    )
    .slice(0, count);
}

export function getTotalIncome(transactions: Transaction[]): number {
  return transactions
    ?.filter((t) => t.type === "Ingresos")
    .reduce((sum, t) => sum + (t.amount ?? 0), 0);
}

export function getTotalExpenses(transactions: Transaction[]): number {
  return transactions
    ?.filter((t) => t.type === "Egresos")
    .reduce((sum, t) => sum + (t.amount ?? 0), 0);
}

