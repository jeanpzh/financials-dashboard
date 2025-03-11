import { ColumnDef } from "@tanstack/react-table";
import { Goal } from "@/lib/types/goal";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { calculateGoalProgress, formatCurrency } from "@/utils/dashboard";

interface GoalColumnProps {
  onEdit: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
}

export const getGoalColumns = ({
  onEdit,
  onDelete,
}: GoalColumnProps): ColumnDef<Goal>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Nombre</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span>{row.original.name}</span>
          <Badge variant="outline" className="w-fit mt-1">
            {row.original.category}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "progress",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Progreso</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const progress = calculateGoalProgress(
        row.original.currentAmount ?? 0,
        row.original.targetAmount ?? 0
      );
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {progress}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      );
    },
  },
  {
    accessorKey: "currentAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Actual</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-right">
          {formatCurrency(row.original.currentAmount ?? 0)}
        </div>
      );
    },
  },
  {
    accessorKey: "targetAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Meta</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-right">
          {formatCurrency(row.original.targetAmount ?? 0)}
        </div>
      );
    },
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Fecha límite</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const goal = row.original;
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(goal)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(goal)}>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
