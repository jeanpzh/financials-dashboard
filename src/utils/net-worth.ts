import { Transaction } from "@/lib/types/transaction";

interface NetWorthData {
  date: string;
  netWorth: number;
  assets: number;
  liabilities: number;
}

/**
 * Gets the current value for a specific metric from net worth data
 */
export function getCurrentValue(data: NetWorthData[], metric: keyof Omit<NetWorthData, 'date'>): number {
  if (!data || data.length === 0) return 0;
  const lastEntry = data[data.length - 1];
  return typeof lastEntry[metric] === 'number' ? lastEntry[metric] as number : 0;
}

/**
 * Calculates the percentage change for a specific metric
 */
export function getPercentageChange(
  data: NetWorthData[],
  metric: keyof Omit<NetWorthData, 'date'>,
  isReduction = false
): number {
  if (!data || data.length < 2) return 0;

  const firstValue = typeof data[0][metric] === 'number' ? data[0][metric] as number : 0;
  const currentValue = typeof data[data.length - 1][metric] === 'number' ? data[data.length - 1][metric] as number : 0;

  if (firstValue === 0) return 0;

  const change = ((currentValue - firstValue) / Math.abs(firstValue)) * 100;
  return isReduction ? -change : change;
}

export function getNetworthData(transactions: Transaction[]): NetWorthData[] {
  if (!transactions) return [];

  const netWorthData = transactions.reduce<NetWorthData[]>((acc, transaction) => {
    const date = transaction.date?.slice(0, 7) ?? ''; // YYYY-MM format
    const amount = transaction.amount ?? 0;
    const type = transaction.type;

    const last = acc[acc.length - 1];
    const newTransaction: NetWorthData = {
      date,
      assets: last.assets,
      liabilities: last.liabilities,
      netWorth: last.netWorth,
    };

    if (type === "Ingresos") {
      newTransaction.assets += amount;
      newTransaction.netWorth += amount;
    } else {
      newTransaction.liabilities += amount;
      newTransaction.netWorth -= amount;
    }

    acc.push(newTransaction);
    return acc;
  }, [{ date: "", assets: 0, liabilities: 0, netWorth: 0 }]);

  return netWorthData.slice(1);
}
