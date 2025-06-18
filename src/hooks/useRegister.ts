// src/hooks/useRegister.ts
import { useMutation } from "@tanstack/react-query";
import { cryptUraApi } from "../api/CryptUraApi";

export const useRegister = () => {
  return useMutation({
    mutationFn: cryptUraApi.register,
  });
};
