import { createUser, loginUser, logout } from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";


export const useRegister = () => {
  return useMutation({
    mutationFn: createUser,
   
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
   
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
   
  });
};