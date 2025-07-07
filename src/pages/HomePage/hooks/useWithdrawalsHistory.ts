import { useQuery } from "@tanstack/react-query";
import { cryptUraApi } from "../../../api/CryptUraApi";

export const useWithdrawalsHistory = () => {
  return useQuery({
    queryKey: ["withdrawalsHistory"],
    queryFn: () => cryptUraApi.getWithdrawalsHistory(),
    gcTime: 1000 * 60 * 30,
    retry: 1,
    refetchInterval: 1000 * 60 * 10,
  });
};
