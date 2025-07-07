"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProductForm, { ProductFormValues } from "./ProductForm";
import { updateProduct } from "@/lib/actions/productActions";
import { useState } from "react";
import { toast } from "sonner";
import { Edit2 } from "lucide-react";

interface EditProductDialogProps {
  id: string;
  name: string;
  category?: string;
  unit: string;
  sellingPrice: number;
  costPrice: number;
  stockQty?: number;
}

export default function EditProductDialog({
  id,
  name,
  category,
  unit,
  sellingPrice,
  costPrice,
  stockQty,
}: EditProductDialogProps) {
  const [open, setOpen] = useState(false);

  async function handleUpdate(data: ProductFormValues) {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category || "");
      formData.append("unit", data.unit);
      formData.append("sellingPrice", data.sellingPrice.toString());
      formData.append("costPrice", data.costPrice.toString());
      formData.append("stockQty", data.stockQty.toString());

      await updateProduct(id, formData);
      toast.success("Product updated successfully.");
      setOpen(false);
    } catch (err: unknown) {
      console.error("Error in updating Product:", err);

      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong.");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">
          <Edit2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update this product&apos;s details.
          </DialogDescription>
        </DialogHeader>

        <ProductForm
          defaultValues={{
            ...{ id, name, category, unit, sellingPrice, costPrice, stockQty },
          }}
          onSubmit={handleUpdate}
          submitLabel="Update"
        />
      </DialogContent>
    </Dialog>
  );
}
