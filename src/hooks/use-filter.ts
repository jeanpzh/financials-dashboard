import { useState } from "react";
import { Transaction } from "@/lib/types/transaction";
import { Goal } from "@/lib/types/goal";
import { calculateGoalProgress } from "@/utils/dashboard";
type SortStrategy<T> = (a: T, b: T) => number;

interface FilterConfig<T> {
  data: T[];
  initialSortBy?: string;
  initialSortOrder?: "asc" | "desc";
  initialFilterType?: string;
  sortStrategies: Record<string, SortStrategy<T>>;
  filterPredicate?: (
    item: T,
    filterType: string,
    searchTerm: string
  ) => boolean;
}

export function useFilter<T>({
  data,
  initialSortBy = "date",
  initialSortOrder = "desc",
  initialFilterType = "all",
  sortStrategies,
  filterPredicate,
}: FilterConfig<T>) {
  const [filterType, setFilterType] = useState<string>(initialFilterType);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>(initialSortBy);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(initialSortOrder);

  const filterData = () => {
    if (!data) return [];

    return data
      .filter((item) =>
        filterPredicate ? filterPredicate(item, filterType, searchTerm) : true
      )
      .sort((a, b) => {
        const compareFn =
          sortStrategies[sortBy] || sortStrategies[initialSortBy];
        const comparison = compareFn(a, b);
        return sortOrder === "asc" ? comparison : -comparison;
      });
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  return {
    filterType,
    setFilterType,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filteredData: filterData(),
    handleSort,
  };
}

const transactionSortStrategies: Record<
  string,
  (a: Transaction, b: Transaction) => number
> = {
  date: (a, b) =>
    new Date(a.date || new Date()).getTime() -
    new Date(b.date || new Date()).getTime(),
  amount: (a, b) => (a.amount ?? 0) - (b.amount ?? 0),
  description: (a, b) => a.description?.localeCompare(b.description ?? "") ?? 0,
  category: (a, b) => a.category?.localeCompare(b.category ?? "") ?? 0,
};

export const transactionSortByOptions = {
  date: "DATE",
  amount: "AMOUNT",
  description: "DESCRIPTION",
  category: "CATEGORY",
};

export const useFilterTransactions = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const transactionFilterPredicate = (
    transaction: Transaction,
    filterType: string,
    searchTerm: string
  ) => {
    const matchesType = filterType === "all" || transaction.type === filterType;
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch =
      transaction.description?.toLowerCase().includes(searchTermLower) ||
      transaction.category?.toLowerCase().includes(searchTermLower) 

    return matchesType && matchesSearch;
  };

  return useFilter({
    data: transactions,
    sortStrategies: transactionSortStrategies,
    filterPredicate: transactionFilterPredicate as (
      item: Transaction,
      filterType: string,
      searchTerm: string
    ) => boolean,
  });
};

export const goalSortByOptions = {
  name: "NAME",
  targetAmount: "TARGET AMOUNT",
  currentAmount: "CURRENT AMOUNT",
  progress: "PROGRESS",
  deadline: "DEADLINE",
  category: "CATEGORY",
};

export const goalSortStrategies: Record<string, (a: Goal, b: Goal) => number> =
  {
    name: (a, b) => a.name?.localeCompare(b.name ?? "") ?? 0,
    targetAmount: (a, b) => (a.targetAmount ?? 0) - (b.targetAmount ?? 0),
    currentAmount: (a, b) => (a.currentAmount ?? 0) - (b.currentAmount ?? 0),
    progress: (a, b) =>
      calculateGoalProgress(a.currentAmount ?? 0, a.targetAmount ?? 0) -
      calculateGoalProgress(b.currentAmount ?? 0, b.targetAmount ?? 0),
    deadline: (a, b) =>
      new Date(a.deadline ?? new Date()).getTime() -
      new Date(b.deadline ?? new Date()).getTime(),
    category: (a, b) => a.category?.localeCompare(b.category ?? "") ?? 0,
  };

export const useFilterGoals = ({ goals }: { goals: Goal[] }) => {
  const goalFilterPredicate = (
    goal: Goal,
    filterType: string,
    searchTerm: string
  ) => {
    const matchesType = filterType === "all" || goal.category === filterType;
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch =
      goal.name?.toLowerCase().includes(searchTermLower) ||
      goal.category?.toLowerCase().includes(searchTermLower);

    return matchesType && matchesSearch;
  };

  return useFilter({
    data: goals,
    initialSortBy: "name",
    sortStrategies: goalSortStrategies,
    filterPredicate: goalFilterPredicate as (
      item: Goal,
      filterType: string,
      searchTerm: string
    ) => boolean,
  });
};
