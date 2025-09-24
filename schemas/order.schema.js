import { z } from "zod";

export const orderSchema = z.object({
      address: z.string().min(1, "Address is required"),

  // paymentMethod: z
  //   .string()
  //   .min(1, "Payment method is required")
  //   .refine((val) => ["stripe", "momo", "card"].includes(val), {
  //     message: "Invalid payment method",
  //   }),

  // shippingAddress: z.object({
  //   address: z.string().min(1, "Address is required"),
  //   city: z.string().min(1, "City is required"),
  //   postalCode: z.string().min(1, "Postal code is required"),
  //   country: z.string().min(1, "Country is required"),
  // }),

  // orderItems: z
  //   .array(
  //     z.object({
  //       name: z.string().min(1, "Item name is required"),
  //       qty: z.number().min(1, "Quantity must be at least 1"),
  //       image: z.string().url("Image must be a valid URL").optional(),
  //       price: z.number().min(0, "Price must be greater than 0"),
  //       product: z.string().min(1, "Product ID is required"),
  //     })
  //   )
  //   .min(1, "At least one item is required"),
});
