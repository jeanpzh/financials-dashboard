import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@/lib/types/transaction";
import { useGetTransactions } from "../transactions/use-get-transactions";

interface NetWorthData {
  date: string;
  netWorth: number;
  assets: number;
  liabilities: number;
}

function calculateNetWorthData(transactions: Transaction[]): NetWorthData[] {
  if (!transactions || transactions.length === 0) return [];

  // Sort transactions by date
  const sortedTransactions = [...transactions].sort((a, b) => 
    (a.date ?? '').localeCompare(b.date ?? '')
  );

  // Group transactions by month and calculate running totals
  let runningAssets = 0;
  let runningLiabilities = 0;

  const monthlyData = sortedTransactions.reduce<Record<string, NetWorthData>>((acc, transaction) => {
    const monthKey = transaction.date?.slice(0, 7) ?? ''; // YYYY-MM format
    if (!monthKey) return acc;

    const amount = transaction.amount ?? 0;
    if (transaction.type === "Ingresos") {
      runningAssets += amount;
    } else {
      runningLiabilities += amount;
    }

    acc[monthKey] = {
      date: monthKey,
      netWorth: runningAssets - runningLiabilities,
      assets: runningAssets,
      liabilities: runningLiabilities
    };

    return acc;
  }, {});

  // Convert to array and sort by date
  return Object.values(monthlyData).sort((a, b) => a.date.localeCompare(b.date));
}

export function useGetNetWorth() {
  const { data: transactions , isLoading} = useGetTransactions();

  return useQuery<NetWorthData[]>({
    queryKey: ["netWorth"],
    queryFn: () => calculateNetWorthData(transactions ?? []),
    enabled: !!transactions,
  });
}
