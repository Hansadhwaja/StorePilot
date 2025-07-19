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
import { addProduct } from "@/lib/actions/productActions";
import { toast } from "sonner";
import { useState } from "react";

const AddProduct = () => {
  const [open, setOpen] = useState(false);

  async function handleAddProduct(data: ProductFormValues) {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category || "");
      formData.append("unit", data.unit);
      formData.append("sellingPrice", data.sellingPrice.toString());
      formData.append("costPrice", data.costPrice.toString());
      formData.append("stockQty", (data.stockQty ?? 0).toString());

      await addProduct(formData);
      toast.success("Product created successfully.");
      setOpen(false);
    } catch (err: unknown) {
      console.error("Error in addProduct:", err);

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
        <Button variant="default" className="cursor-pointer">
          + Add Product
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the product details to add it to your inventory.
          </DialogDescription>
        </DialogHeader>

        <ProductForm onSubmit={handleAddProduct} submitLabel="Add Product" />
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
