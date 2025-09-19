import { createUser, loginUser, logout } from "@/services/auth.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useRegister = () => {
  return useMutation({
    mutationFn: createUser,
   
  });
};

// export const useLogin = () => {
//    const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: loginUser,
//    onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["user-info"] });
//     },
//   });
// };



export const useLogin = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data, variables, context) => {
      // store token
      localStorage.setItem("token", data.token);

      // refresh user info
      queryClient.invalidateQueries({ queryKey: ["user-info"] });

      // pass back to component
      onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error("Login failed:", error);
      onError?.(error, variables, context);
    },
  });
};


export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear token and cache
      localStorage.removeItem("token");
      queryClient.removeQueries({ queryKey: ["user-info"] });
      queryClient.clear();

      // Optional: redirect to login
      // window.location.href = "/login";
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};