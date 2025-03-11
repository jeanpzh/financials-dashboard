"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useGetGoals } from "@/hooks/goals/use-get-goals";
import { useGetTransactions } from "@/hooks/transactions/use-get-transactions";
import { SummaryCards } from "./components/summary-cards";
import { RecentTransactions } from "./components/recent-transactions";
import { GoalsOverview } from "./components/goals-overview";
import { Target } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { LayoutDashboardIcon } from "lucide-react";
import {
  calculateGoalProgress,
  formatCurrency,
  getRecentTransactions,
} from "@/utils/dashboard";
import { Transaction } from "@/lib/types/transaction";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: transactions = [], isLoading: transactionsLoading } =
    useGetTransactions();
  const { data: goals , isLoading: goalsLoading } = useGetGoals();
  const recentTransactions = getRecentTransactions(
    5,
    transactions as Transaction[]
  );

  const activeGoals = goals?.slice(0, 4) ?? [];

  if (transactionsLoading || goalsLoading) {
    return (
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between space-y-2">
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[120px]" />
          ))}
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <Skeleton className="h-10 w-[300px]" />
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Skeleton className="col-span-4 h-[300px]" />
              <Skeleton className="col-span-3 h-[300px]" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Panel Principal</h1>
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          icon={LayoutDashboardIcon}
          title="No hay datos disponibles"
          description="Comienza registrando tus transacciones para ver un resumen de tus finanzas u objetivos que tengas."
          actionLabel="Registrar transacción"
          actionLink="/dashboard/transactions"
        />
      ) : (
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="goals">Objetivos</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <SummaryCards />
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <RecentTransactions
                transactions={recentTransactions}
              />
              <GoalsOverview goals={activeGoals} />
            </div>
          </TabsContent>
          <TabsContent value="goals" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {goals &&
                goals.map((goal) => {
                  const progress = calculateGoalProgress(
                    goal.currentAmount || 0,
                    goal.targetAmount || 0
                  );
                  return (
                    <Card key={goal.id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {goal.name}
                        </CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Progreso
                          </span>
                          <span className="text-sm font-medium">
                            {progress}%
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Actual
                          </span>
                          <span className="text-sm font-medium">
                            {formatCurrency(goal.currentAmount || 0)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Objetivo
                          </span>
                          <span className="text-sm font-medium">
                            {formatCurrency(goal.targetAmount || 0)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Fecha límite
                          </span>
                          <span className="text-sm font-medium">
                            {goal.deadline}
                          </span>
                        </div>
                        <Badge variant="outline">{goal.category}</Badge>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
