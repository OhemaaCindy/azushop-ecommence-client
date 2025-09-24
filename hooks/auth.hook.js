import { createUser, loginUser, logout } from "@/services/auth.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";


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




// export const useLogout = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: logout,
//     onSuccess: () => {
//       // Clear token and cache
//       localStorage.removeItem("token");
//       queryClient.removeQueries({ queryKey: ["user-info"], });
//        queryClient.setQueryData(["user-info"], null);
//       queryClient.clear();

//     }
//   });
// };

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // 1. Set query data to null first (immediate UI update)
      queryClient.setQueryData(["user-info"], null);
      
      // 2. Remove token
      localStorage.removeItem("token");
      
      // 3. Clear all queries (this removes the need for removeQueries)
      queryClient.clear();
    },
    onError: (error) => {
      // Even if logout fails, clear local data
      localStorage.removeItem("token");
      queryClient.setQueryData(["user-info"], null);
      queryClient.clear();
    }
  });
};