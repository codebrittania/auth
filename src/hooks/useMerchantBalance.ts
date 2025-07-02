import { useQuery } from "@tanstack/react-query";
import { cryptUraApi } from "../api/CryptUraApi";

export const useMerchantBalance = () => {
  return useQuery({
    queryKey: ["merchantBalance"],
    queryFn: () => cryptUraApi.getMerchantBalance(),
    gcTime: 1000 * 60 * 30,
    retry: 3,
    refetchInterval: 1000 * 60 * 10,
  });
};
