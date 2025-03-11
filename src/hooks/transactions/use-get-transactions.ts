import { getAllTransactions } from "@/app/actions/transactions";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
    staleTime: 1000 * 60 * 24,
  });
};
