

import { z } from "zod";

const fileSchema = z
  .instanceof(File, { message: "Please upload a file" })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "File size must be less than 5MB",
  })
  .refine(
    (file) =>
      ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
        file.type
      ),
    {
      message: "Only JPEG, PNG, GIF, and WebP files are allowed",
    }
  );

export const categorySchema = z.object({
  name: z.string().min(3, "Enter category name"),
  image: fileSchema,
});
