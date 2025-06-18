// src/hooks/useLogin.ts 
import { useMutation } from "@tanstack/react-query";
import { cryptUraApi } from "../api/CryptUraApi";

export const useLogin = () => {
  return useMutation({
    mutationFn: cryptUraApi.login,
  });
};
