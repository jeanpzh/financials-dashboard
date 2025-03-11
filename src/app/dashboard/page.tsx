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
import {
  calculateGoalProgress,
  formatCurrency,
  getRecentTransactions,
} from "@/utils/dashboard";
import { Transaction } from "@/lib/types/transaction";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: transactions, isLoading } = useGetTransactions();
  const { data: goals } = useGetGoals();
  const recentTransactions = getRecentTransactions(
    5,
    transactions as Transaction[]
  );

  const activeGoals = goals?.slice(0, 4) ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Panel Principal</h1>
      </div>

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
              isLoading={isLoading}
            />
            <GoalsOverview goals={activeGoals} isLoading={isLoading} />
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
                        <span className="text-sm font-medium">{progress}%</span>
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
    </div>
  );
}
