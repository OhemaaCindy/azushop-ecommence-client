import { createUser, loginUser, logout } from "@/services/auth.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useRegister = () => {
  return useMutation({
    mutationFn: createUser,
   
  });
};

export const useLogin = () => {
   const queryClient = useQueryClient()
  return useMutation({
    mutationFn: loginUser,
   onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    },
  });
};

export const useLogout = () => {
   const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logout,
   onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    },
  });
};

