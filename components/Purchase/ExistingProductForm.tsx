"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { GroupedProduct, ItemsProps } from "@/types";

export default function ExistingProductForm({
  append,
}: {
  append: (item: ItemsProps) => void;
}) {
  const [products, setProducts] = useState<GroupedProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    qty: string;
    subtotal: string;
  }>({
    name: "",
    qty: "",
    subtotal: "",
  });

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const result = await res.json();
        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Add selected product into field array
  const handleAdd = () => {
    const { name, qty, subtotal } = selectedProduct;
    if (!name || !qty || !subtotal) return;

    const parsedQty = Number(qty);
    const parsedSubtotal = Number(subtotal);

    append({
      productName: name,
      qty: parsedQty,
      subtotal: parsedSubtotal,
      costPrice: parsedQty
        ? Number((parsedSubtotal / parsedQty).toFixed(2))
        : 0,
    });

    // Reset selection
    setSelectedProduct({ name: "", qty: "", subtotal: "" });
  };

  return (
    <div className="space-y-2 p-3 border rounded-md">
      <div className="flex flex-col gap-2">
        {/* Product Dropdown */}
        <Select
          value={selectedProduct.name}
          onValueChange={(value) =>
            setSelectedProduct((prev) => ({ ...prev, name: value }))
          }
        >
          <SelectTrigger className="h-9 text-sm">
            <SelectValue placeholder="Select Product" />
          </SelectTrigger>
          <SelectContent>
            {products.map((group) => (
              <SelectGroup key={group.category}>
                <SelectLabel>{group.category}</SelectLabel>
                {group.products.map((p) => (
                  <SelectItem key={p._id} value={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>

        {/* Qty, Subtotal, Add button */}
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Qty"
            value={selectedProduct.qty}
            onChange={(e) =>
              setSelectedProduct((prev) => ({ ...prev, qty: e.target.value }))
            }
            className="h-9 text-sm flex-1"
          />

          <Input
            type="number"
            placeholder="Subtotal"
            value={selectedProduct.subtotal}
            onChange={(e) =>
              setSelectedProduct((prev) => ({
                ...prev,
                subtotal: e.target.value,
              }))
            }
            className="h-9 text-sm flex-1"
          />

          <Button
            type="button"
            onClick={handleAdd}
            className="h-9 text-sm flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
}
