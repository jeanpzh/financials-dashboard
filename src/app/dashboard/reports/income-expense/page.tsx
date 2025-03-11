"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "@/components/chart";
import ChartCard from "../components/chart-card";
import { CustomTooltip } from "../components/custom-tool-tip";
import {
  calculateSavings,
  calculateSavingsRate,
  getCategoryColor,
  getExpensesPieData,
  getIncomePieData,
  getMonthlyData,
} from "@/utils/income-expenses";
import { formatCurrency } from "@/utils/dashboard";
import { useGetTransactions } from "@/hooks/transactions/use-get-transactions";
import { useGetCategories } from "@/hooks/goals/use-get-categories";
import { EmptyState } from "@/components/ui/empty-state";
import { PieChartIcon } from "lucide-react";
import ReportSkeleton from "../components/income-expense-skeleton";

export default function IncomeExpensePage() {
  const { data: transactions = [], isLoading: transactionsLoading } =
    useGetTransactions();
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategories("all");

  const incomePieData = getIncomePieData(transactions);
  const expensesPieData = getExpensesPieData(transactions);
  const monthlyResponse = getMonthlyData({ transactions });
  const monthlyData =
    monthlyResponse && monthlyResponse.month ? [monthlyResponse] : [];

  const hasData =
    (transactions?.length ?? 0) > 0 && (categories?.length ?? 0) > 0;

  if (transactionsLoading || categoriesLoading) {
    return <ReportSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ingresos y Gastos</h1>
        <p className="text-muted-foreground">
          Compara tus ingresos y gastos para tomar decisiones financieras
        </p>
      </div>

      {!hasData ? (
        <EmptyState
          icon={PieChartIcon}
          title="No hay datos disponibles"
          description="Comienza registrando tus transacciones y asignándoles categorías para ver el análisis de ingresos y gastos."
          actionLabel="Registrar transacción"
          actionLink="/dashboard/transactions"
        />
      ) : (
        <Tabs defaultValue="monthly">
          <TabsList>
            <TabsTrigger value="monthly">Comparación Mensual</TabsTrigger>
            <TabsTrigger value="categories">Por Categoría</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-6">
            <ChartCard
              title="Ingresos Mensuales vs Gastos"
              description="Compara tus ingresos y gastos en el último año"
              height="h-[400px]"
            >
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <CustomTooltip
                  formatter={(value: any) => formatCurrency(value as number)}
                />
                <Legend />
                <Bar dataKey="income" name="Income" fill="#4ade80" />
                <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" />
              </BarChart>
            </ChartCard>

            <div className="grid gap-4 md:grid-cols-2">
              <ChartCard
                title="Ahorros Mensuales"
                description="La diferencia entre tus ingresos y gastos"
                height="h-[300px]"
              >
                <BarChart data={calculateSavings(monthlyData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CustomTooltip
                    formatter={(value: any) => formatCurrency(value as number)}
                  />
                  <Bar dataKey="savings" name="Savings" fill="#3b82f6" />
                </BarChart>
              </ChartCard>
              <ChartCard
                title="Porcentaje de ahorro"
                description="Porcentaje de ingresos ahorrados cada mes"
                height="h-[300px]"
              >
                <BarChart data={calculateSavingsRate(monthlyData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis unit="%" />
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    labelStyle={{ color: "var(--foreground)" }}
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                    }}
                  />
                  <Bar
                    dataKey="savingsRate"
                    name="Savings Rate"
                    fill="#8b5cf6"
                  />
                </BarChart>
              </ChartCard>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <ChartCard
                title="Ingresos por categoría"
                description="Desglose de tus fuentes de ingresos"
                height="h-[300px]"
              >
                <PieChart>
                  <Pie
                    data={incomePieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {incomePieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          getCategoryColor(entry.name, categories) ?? "#ccc"
                        }
                      />
                    ))}
                  </Pie>
                  <CustomTooltip
                    formatter={(value: any) => formatCurrency(value as number)}
                  />
                </PieChart>
              </ChartCard>
              <ChartCard
                title="Gastos por categoría"
                description="Desglose de tus gastos"
                height="h-[300px]"
              >
                <PieChart>
                  <Pie
                    data={expensesPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expensesPieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          getCategoryColor(entry.name, categories) ?? "#ccc"
                        }
                      />
                    ))}
                  </Pie>
                  <CustomTooltip
                    formatter={(value: any) => formatCurrency(value as number)}
                  />
                </PieChart>
              </ChartCard>
            </div>

            <ChartCard
              title="Ingresos por categoría"
              description="Desglose de tus fuentes de ingresos"
              height="h-[300px]"
            >
              <PieChart>
                <Pie
                  data={incomePieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incomePieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getCategoryColor(entry.name, categories) ?? "#ccc"}
                    />
                  ))}
                </Pie>
                <CustomTooltip
                  formatter={(value: any) => formatCurrency(value as number)}
                />
              </PieChart>
            </ChartCard>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
