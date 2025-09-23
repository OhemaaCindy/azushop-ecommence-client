import { createAddress } from "@/services/address.services";
import { useMutation } from "@tanstack/react-query";

export const useAddAddress = () => {
  return useMutation({
    mutationFn: createAddress,
    
  });
};

