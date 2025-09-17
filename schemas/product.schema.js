import * as z from "zod";


export const productSchema = z.object({
    "name": z.string().min(1,{message:"Enter name of product"}),
    "category": z.string({message:"Select Category"}).min(1, {message: "Category is required"}),
    "description": z.string().min(1,{message:"Enter description"}),
    "price": z.coerce.number({message:"Enter price"}),
    "quantity": z.coerce.number({message:"Enter quantity"}) ,
    "brand": z.string().min(1,{message:"Enter brand name"}),
});
