// import * as z from "zod";

// const fileSchema = z
//   .instanceof(File, { message: "Please upload a file" })
//   .refine((file) => file.size <= 5 * 1024 * 1024, {
//     message: "File size must be less than 1MB",
//   })
//   .refine(
//     (file) =>
//       ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
//         file.type
//       ),
//     {
//       message: "Only JPEG, PNG, GIF, and WebP files are allowed",
//     }
//   );

// export const productSchema = z.object({
//     name: z.string().min(1,{message:"Enter name of product"}),
//     category: z.string().min(1, { message: "Select Category" }),
//     description: z.string().min(1,{message:"Enter description"}),
//     price: z.coerce.number({message:"Enter price"}),
//     quantity: z.coerce.number({message:"Enter quantity"}) ,
//     brand: z.string().min(1,{message:"Enter brand name"}),
//     images: fileSchema, // Make optional or required based on your needs
//     rating: z.coerce.number().min(1, "Please select a rating").max(5),
//     size: z.string().min(1, "Please select size"),
//     color: z.string().min(1, "Please select color"),

// });


import * as z from "zod";

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

export const productSchema = z.object({
  name: z.string().min(1, { message: "Enter name of product" }),
  category: z.string().min(1, { message: "Select Category" }),
  description: z.string().min(1, { message: "Enter description" }),
  price: z.coerce.number({ message: "Enter price" }),
  quantity: z.coerce.number({ message: "Enter quantity" }),
  brand: z.string().min(1, { message: "Enter brand name" }),

  // ✅ Now supports multiple files
// images: z
//   .array(fileSchema)
//   .min(1, { message: "Upload at least 1 image" })
//   .max(4, { message: "You can only upload up to 4 images" }),
images: z.array(fileSchema).min(1, { message: "At least 1 product image is required" }),

  rating: z.coerce.number().min(1, "Please select a rating").max(5),
  size: z.string().min(1, "Please select size"),
  color: z.string().min(1, "Please select color"),
});

