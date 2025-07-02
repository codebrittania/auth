import { useQuery } from "@tanstack/react-query";
import { cryptUraApi } from "../../../api/CryptUraApi";

export const useSummaryStats = () => {
  return useQuery({
    queryKey: ["summaryStats"],
    queryFn: () => cryptUraApi.getSummaryStats(),
    gcTime: 1000 * 60 * 30,
    retry: 1,
    refetchInterval: 1000 * 60 * 10,
  });
};
