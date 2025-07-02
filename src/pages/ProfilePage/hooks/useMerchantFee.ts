import { useQuery } from "@tanstack/react-query";
import { cryptUraApi } from "../../../api/CryptUraApi";

export const useMerchantFee = () => {
  return useQuery({
    queryKey: ["merchantFee"],
    queryFn: () => cryptUraApi.getMerchantFee(),
    gcTime: 1000 * 60 * 300,
    retry: 1,
  });
};
