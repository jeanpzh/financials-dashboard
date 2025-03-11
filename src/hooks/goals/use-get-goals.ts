import { getGoals } from "@/app/actions/goals";
import { useQuery } from "@tanstack/react-query";

export const useGetGoals = () => {
  return useQuery({
    queryKey: ["goals"],
    queryFn: getGoals,
    staleTime: 1000 * 60 * 24,
  });
};
