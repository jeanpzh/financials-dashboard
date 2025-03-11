import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/app/actions/goals";

export const useGetCategories = (type: "all" | "options") => {
  return useQuery({
    queryKey: ["categories", type],
    queryFn: () => getCategories({ type }),
    staleTime: 1000 * 60 * 24,
  });
};
