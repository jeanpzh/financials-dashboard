"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Goal } from "@/lib/types/goal";
import { calculateGoalProgress, formatCurrency } from "@/utils/dashboard";
import { Skeleton } from "@/components/ui/skeleton";

interface GoalsOverviewProps {
  goals: Goal[];
  isLoading: boolean;
}


export function GoalsOverview({ goals, isLoading }: GoalsOverviewProps) {
  if (isLoading) return <Skeleton className="h-96" />;
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Objetivos</CardTitle>
          <CardDescription>
            Tienes {goals.length} objetivos activos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {goals.map((goal) => {
              const progress = calculateGoalProgress(
                goal.currentAmount ?? 0,
                goal.targetAmount ?? 0
              );
              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center">
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{goal.name}</span>
                        <Badge variant="outline" className="ml-auto">
                          {goal.category}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                          {formatCurrency(goal.currentAmount ?? 0)} de{" "}
                          {formatCurrency(goal.targetAmount ?? 0)}
                        </span>
                        <span>{progress}%</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
