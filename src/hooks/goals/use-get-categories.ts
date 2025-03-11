import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/app/actions/goals";
import { Category } from "@/lib/types/category";

type CategoryOption = {
  value: number;
  label: string;
};

type GetCategoriesResponse<T extends "all" | "options"> = T extends "all" 
  ? Category[] 
  : CategoryOption[];

export const useGetCategories = <T extends "all" | "options">(type: T) => {
  return useQuery<GetCategoriesResponse<T>>({
    queryKey: ["categories", type],
    queryFn: async () => {
      const result = await getCategories({ type });
      return result as GetCategoriesResponse<T>;
    },
    staleTime: 1000 * 60 * 24,
  });
};
