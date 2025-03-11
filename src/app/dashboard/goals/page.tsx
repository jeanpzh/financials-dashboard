"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, Filter } from "lucide-react";
import { useGetGoals } from "@/hooks/goals/use-get-goals";
import { useFilterGoals } from "@/hooks/use-filter";
import { useModalStore } from "@/lib/store/useModalStore";
import { DataTable } from "@/components/ui/data-table";
import { getGoalColumns } from "./components/goal-columns";
import { EmptyState } from "@/components/ui/empty-state";
import { Target } from "lucide-react";

export default function GoalsPage() {
  const { openModal } = useModalStore();
  const { data: goals, isLoading } = useGetGoals();
  const { filteredData: filteredGoals, searchTerm, setSearchTerm } = useFilterGoals(
    { goals : goals ?? [] }
  );  

  const columns = getGoalColumns({
    onEdit: (goal) => openModal("EDIT_GOAL", goal),
    onDelete: (goal) => openModal("DELETE_GOAL", goal),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Objetivos</h1>
        <Button onClick={() => openModal("CREATE_GOAL")}>
          <Plus className="mr-2 h-4 w-4" />
          Añadir un objetivo
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar objetivos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Todos los objetivos</DropdownMenuItem>
              {goals?.map((goal) => (
                <DropdownMenuItem key={goal.id}>{goal.category}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos los objetivos</CardTitle>
          <CardDescription>
            Sigue y gestiona tus objetivos financieros
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredGoals}
            columns={columns}
            isLoading={isLoading}
            loadingMessage="Cargando..."
            emptyMessage="No hay objetivos."
          />
        </CardContent>
      </Card>
    </div>
  );
}
