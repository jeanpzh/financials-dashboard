import { Category } from "@/lib/types/category";
import { Transaction } from "@/lib/types/transaction";

/**
 * Calculates summary by category for a specific transaction type
 */
export function calculateByCategory(
  transactionType: "Ingresos" | "Egresos",
  transactionData: Transaction[]
) {
  return transactionData
    .filter((t) => t.type === transactionType)
    .reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category as string]) {
        acc[category as string] = 0;
      }
      acc[category as string] += transaction.amount as number;
      return acc;
    }, {} as Record<string, number>);
}

/**
 * Converts category data to pie chart format
 */
export function toPieChartFormat(categoryData: Record<string, number>) {
  return Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));
}

/**
 * Gets category color from name
 */
export function getCategoryColor(name: string, categories: Category[]) {
  const category = categories.find((c) => c.name === name);
  return category ? category.color : "#ccc";
}

/**
 * Calculates income by category
 */
export function getIncomeByCategory(transactionData: Transaction[]) {
  return calculateByCategory("Ingresos", transactionData);
}

/**
 * Calculates expenses by category
 */
export function getExpensesByCategory(transactionData: Transaction[]) {
  return calculateByCategory("Egresos", transactionData);
}

/**
 * Gets income data in pie chart format
 */
export function getIncomePieData(transactionData: Transaction[]) {
  return toPieChartFormat(getIncomeByCategory(transactionData));
}

/**
 * Gets expense data in pie chart format
 */
export function getExpensesPieData(transactionData: Transaction[]) {
  return toPieChartFormat(getExpensesByCategory(transactionData));
}

/**
 * Calculates savings from monthly data
 */
export function calculateSavings(monthlyData: any[]) {
  return monthlyData?.map((item) => ({
    month: item.month,
    savings: item.income - item.expenses,
  }));
}

/**
 * Calculates savings rate from monthly data
 */
export function calculateSavingsRate(monthlyData: any[]) {
  return monthlyData.map((item) => ({
    month: item.month,
    savingsRate: Math.round(
      ((item.income - item.expenses) / item.income) * 100
    ),
  }));
}

/**
 * Gets consolidated category breakdown for income and expenses
 */
export function getCategoryBreakdown(
  incomeByCategory: Record<string, number>,
  expensesByCategory: Record<string, number>
) {
  return [
    ...Object.entries(incomeByCategory).map(([name, value]) => ({
      name,
      income: value,
      expense: 0,
    })),
    ...Object.entries(expensesByCategory).map(([name, value]) => ({
      name,
      income: incomeByCategory[name] || 0,
      expense: value,
    })),
  ].filter(
    (item, index, self) => index === self.findIndex((t) => t.name === item.name)
  );
}
interface MonthlyItem {
  month: string;
  income: number;
  expenses: number;
}

interface Response {
  month: string | null;
  income: number | null;
  expenses: number | null;
}
enum Months {
  Enero = "01",
  Febrero = "02",
  Marzo = "03",
  Abril = "04",
  Mayo = "05",
  Junio = "06",
  Julio = "07",
  Agosto = "08",
  Septiembre = "09",
  Octubre = "10",
  Noviembre = "11",
  Diciembre = "12",
}

export function getMonthlyData({
  transactions,
}: {
  transactions: Transaction[];
}): Response {
  if (!transactions) return { month: null, income: null, expenses: null };
  const monthlyData = transactions.reduce<Record<string, MonthlyItem>>(
    (acc, transaction) => {
      const monthNumber = transaction.date?.split("-")[1] ?? "";
      const month =
        Object.entries(Months).find(
          ([_, value]) => value === monthNumber
        )?.[0] ?? "";
      if (!acc[month]) {
        acc[month] = {
          month,
          income: 0,
          expenses: 0,
        };
      }
      if (transaction.type === "Ingresos") {
        acc[month].income += transaction.amount as number;
      } else {
        acc[month].expenses += transaction.amount as number;
      }
      return acc;
    },
    {}
  );

  const result = Object.values(monthlyData)[0] ?? {
    month: null,
    income: null,
    expenses: null,
  };
  console.log("result", result);
  return result;
}
