
import { addCategory, deleteCategory, updateCategory } from "@/services/category.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCategory,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get-all-tracks"] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess(_, variables) {
      // queryClient.invalidateQueries({ queryKey: ["get-all-tracks"] });
      queryClient.invalidateQueries({
        queryKey: ["get-single-track", variables.id],
      });
    },
  });
};

//   useMutation<DeleteTrackResponse, AuthErrorRes>({
//     mutationFn: (id) => deleteTrack(id),
//   });

// export const useDeleteTrack = () =>
//   useMutation<DeleteTrackResponse, AuthErrorRes>({
//     mutationFn: (id) => deleteTrack(id),
//   });

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCategory(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get-all-tracks"] });
    },
  });
};
