import {z} from "zod";

export const addressSchema = z.object({
    "address": z.string().min(1,"Enter Address"),
    "city": z.string().min(1,"Enter city"),
    "postalCode": z.string().min(1,"Please enter postal code"),
    "country": z.string().min(1,"Please enter country"),
    
});
 