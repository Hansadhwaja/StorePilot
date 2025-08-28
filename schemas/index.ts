import { z } from "zod";

//PurchaseFormSchema

export const purchaseItemSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  category: z.string().optional(),
  unit: z.string().optional(),
  sellingPrice: z.coerce.number().min(0).optional(),
  costPrice: z.coerce.number().min(0, "Cost price is required"),
  qty: z.coerce.number().min(1, "Quantity must be at least 1"),
  subtotal: z.coerce.number().min(1),
});

export const purchaseFormSchema = z.object({
  date: z.string().nonempty("Select a date"),
  fairCharges: z.coerce.number().min(0),
  items: z.array(purchaseItemSchema).min(1, "At least one product is required"),
});

export type PurchaseFormValues = z.infer<typeof purchaseFormSchema>;

//ProductFormSchema

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.string().optional(),
  unit: z.string().min(1, "Unit is required"),
  sellingPrice: z.coerce
    .number({ invalid_type_error: "Selling Price is required" })
    .nonnegative(),
  costPrice: z.coerce
    .number({ invalid_type_error: "Cost Price is required" })
    .nonnegative(),
  stockQty: z.coerce
    .number({ invalid_type_error: "Stock Quantity is required" })
    .nonnegative(),
});

export type ProductFormValues = z.infer<typeof productSchema>;