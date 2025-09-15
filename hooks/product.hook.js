
import { addProduct, updateProduct } from "@/services/product.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProduct,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get-all-tracks"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess(_, variables) {
      // queryClient.invalidateQueries({ queryKey: ["get-all-tracks"] });
      queryClient.invalidateQueries({
        queryKey: ["get-single-track", variables.id],
      });
    },
  });
};



// export const useDeleteTrack = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (id) => deleteTrack(id),
//     onSuccess() {
//       queryClient.invalidateQueries({ queryKey: ["get-all-tracks"] });
//     },
//   });
// };
