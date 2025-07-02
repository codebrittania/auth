import { useQuery } from "@tanstack/react-query";
import { cryptUraApi } from "../../../api/CryptUraApi";

export const useStatsBalances = () => {
  return useQuery({
    queryKey: ["statsBalances"],
    queryFn: () => cryptUraApi.getStatsBalances(),
    gcTime: 1000 * 60 * 30,
    retry: 1,
    refetchInterval: 1000 * 60 * 10,
  });
};
