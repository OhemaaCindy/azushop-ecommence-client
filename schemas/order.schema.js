import { z } from "zod";

export const orderSchema = z.object({
      address: z.string().min(1, "Address is required"),

});

export const payorderSchema = z.object({
      phone: z.string().min(1, "Please enter your number"),

});
