import { getOptions } from "@/app/actions/transactions";
import { useModalStore } from "@/lib/store/useModalStore";
import { useQuery } from "@tanstack/react-query";

export const useGetAllOptions = () => {
  const { isOpen } = useModalStore();
  return useQuery({
    queryKey: ["options"],
    queryFn: getOptions,
    staleTime: 1000 * 60 * 24,
    enabled: isOpen,
  });
};
