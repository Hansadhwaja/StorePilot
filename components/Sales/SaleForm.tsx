"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ProductData, SaleFormProps } from "@/types";



export default function SaleForm({
  initialData,
  onSubmit,
  submitLabel = "Submit",
}: SaleFormProps) {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null
  );
  const [sellingPrice, setSellingPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [saleDate, setSaleDate] = useState(
    initialData?.saleDate ?? new Date().toISOString().split("T")[0]
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  useEffect(() => {
    if (initialData && products.length > 0) {
      const prod = products.find((p) => p._id === initialData.productId);
      if (prod) setSelectedProduct(prod);
    }
  }, [initialData, products]);

  useEffect(() => {
    if (selectedProduct) {
      setSellingPrice(
        initialData?.sellingPrice?.toString() ??
          selectedProduct.sellingPrice.toString()
      );
      setCostPrice(
        initialData?.costPrice?.toString() ??
          selectedProduct.costPrice?.toString() ??
          ""
      );
    } else {
      setSellingPrice("");
      setCostPrice("");
    }
  }, [selectedProduct]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const formData = new FormData(e.currentTarget);
    const saleData = {
      productId: selectedProduct._id,
      quantity: Number(formData.get("quantity")),
      sellingPrice: Number(formData.get("sellingPrice")),
      costPrice: formData.get("costPrice")
        ? Number(formData.get("costPrice"))
        : undefined,
      saleDate: formData.get("saleDate")?.toString() ?? "",
    };

    startTransition(() => {
      onSubmit(saleData).catch((err) =>
        console.error("Failed to submit sale:", err)
      );
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <Label>Product</Label>
        <Select
          value={selectedProduct?._id}
          onValueChange={(val) => {
            const product = products.find((p) => p._id === val);
            setSelectedProduct(product || null);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(
              products.reduce((acc, product) => {
                const category = product.category || "Others";
                if (!acc[category]) acc[category] = [];
                acc[category].push(product);
                return acc;
              }, {} as Record<string, ProductData[]>)
            )
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([category, products]) => {
                const sortedProducts = [...products].sort((a, b) =>
                  a.name.localeCompare(b.name)
                );

                return (
                  <React.Fragment key={category}>
                    <div className="px-2 py-1 text-muted-foreground text-xs uppercase tracking-wide">
                      {category}
                    </div>
                    {sortedProducts.map((product) => (
                      <SelectItem key={product._id} value={product._id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </React.Fragment>
                );
              })}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          min={1}
          required
          defaultValue={initialData?.quantity}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="sellingPrice">Selling Price</Label>
        <Input
          id="sellingPrice"
          name="sellingPrice"
          type="number"
          step="0.01"
          required
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="costPrice">Cost Price (optional)</Label>
        <Input
          id="costPrice"
          name="costPrice"
          type="number"
          step="0.01"
          value={costPrice}
          onChange={(e) => setCostPrice(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="saleDate">Sale Date</Label>
        <Input
          id="saleDate"
          name="saleDate"
          type="date"
          value={saleDate}
          onChange={(e) => setSaleDate(e.target.value)}
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isPending || !selectedProduct}
      >
        {isPending ? "Submitting..." : submitLabel}
      </Button>
    </form>
  );
}
