import { Transaction } from "@/lib/types/transaction";

export function getCurrentValue(data: any[], key: string): number {
  if (data.length === 0) {
    return 0;
  }
  return data[data.length - 1][key];
}

export function getPercentageChange(
  data: any[],
  key: string,
  isReduction: boolean = false
): string {
  if (data.length === 0) {
    return "0";
  }

  const first = data[0][key];
  const last = data[data.length - 1][key];
  const change = isReduction ? first - last : last - first;
  return ((change / first) * 100).toFixed(1);
}
export type NetWorthData = {
  date: string;
  assets: number;
  liabilities: number;
  netWorth: number;
};
export function getNetworthData(transactions: Transaction[]): NetWorthData[] {
  if (!transactions) return [];
  const netWorthData = transactions.reduce<NetWorthData[]>(
    (acc, transaction) => {
      const { date, amount, type } = transaction;
      const last = acc[acc.length - 1];
      const newTransaction = {
        date,
        assets: last.assets,
        liabilities: last.liabilities,
        netWorth: last.netWorth,
      };
      if (type === "Ingresos") {
        newTransaction.assets += amount as number;
      } else {
        newTransaction.liabilities += amount as number;
      }
      newTransaction.netWorth =
        newTransaction.assets - newTransaction.liabilities;
      acc.push(newTransaction as any);
      return acc;
    },
    [{ date: "", assets: 0, liabilities: 0, netWorth: 0 }]
  );
  return netWorthData.slice(1);
}
