"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ItemsProps } from "@/types";
import { Plus } from "lucide-react";

export default function NewProductForm({
  append,
}: {
  append: (item: ItemsProps) => void;
}) {
  const [form, setForm] = useState({
    productName: "",
    category: "",
    unit: "",
    sellingPrice: "",
    subtotal: "",
    qty: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!form.productName || !form.subtotal || !form.qty) return;

    const subtotal = Number(form.subtotal);
    const qty = Number(form.qty);
    const costPrice = (subtotal / qty).toFixed(2);

    append({
      productName: form.productName,
      category: form.category || undefined,
      unit: form.unit || undefined,
      sellingPrice: form.sellingPrice ? Number(form.sellingPrice) : undefined,
      costPrice: Number(costPrice),
      qty,
      subtotal,
    });

    setForm({
      productName: "",
      category: "",
      unit: "",
      sellingPrice: "",
      subtotal: "",
      qty: "",
    });
  };

  return (
    <div className="space-y-4 border rounded-md p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Product Name</Label>
          <Input
            name="productName"
            value={form.productName}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>

        <div className="space-y-1">
          <Label>Category</Label>
          <Input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
          />
        </div>

        <div className="space-y-1">
          <Label>Unit</Label>
          <Input
            name="unit"
            value={form.unit}
            onChange={handleChange}
            placeholder="eg. Litre, Kg"
          />
        </div>

        <div className="space-y-1">
          <Label>Selling Price</Label>
          <Input
            type="number"
            name="sellingPrice"
            value={form.sellingPrice}
            onChange={handleChange}
            placeholder="0"
          />
        </div>

        <div className="space-y-1">
          <Label>Quantity *</Label>
          <Input
            type="number"
            name="qty"
            value={form.qty}
            onChange={handleChange}
            placeholder="0"
          />
        </div>

        <div className="space-y-1">
          <Label>Sub Total *</Label>
          <Input
            type="number"
            name="subtotal"
            value={form.subtotal}
            onChange={handleChange}
            placeholder="0"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button type="button" onClick={handleAdd}>
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>
    </div>
  );
}
