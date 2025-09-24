
import { addOrder, payOrder } from "@/services/order.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddOrder = () => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addOrder,
    // onSuccess() {
    //   queryClient.invalidateQueries({ queryKey: [""] });
    // },
  });
};

export const usePayOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: payOrder,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get-all-tracks"] });
    },
  });
};



