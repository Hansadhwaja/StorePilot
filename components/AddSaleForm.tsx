"use client";

import React, { useTransition, useState, useEffect } from "react";
import { addSale } from "@/lib/actions/saleActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ProductData } from "@/app/api/products/route";

export default function AddSaleForm() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null
  );
  const [sellingPrice, setSellingPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [saleDate, setSaleDate] = useState(
    () => new Date().toISOString().split("T")[0]
  ); // today

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setSellingPrice(selectedProduct.sellingPrice.toString());
      setCostPrice(selectedProduct.costPrice?.toString() || "");
    } else {
      setSellingPrice("");
      setCostPrice("");
    }
  }, [selectedProduct]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!selectedProduct) return;

    startTransition(() => {
      const saleData = {
        productId: selectedProduct._id,
        quantity: Number(formData.get("quantity")),
        sellingPrice: Number(formData.get("sellingPrice")),
        costPrice: formData.get("costPrice")
          ? Number(formData.get("costPrice"))
          : undefined,
        saleDate: formData.get("saleDate")?.toString(),
      };

      addSale(saleData)
        .then(() => setOpen(false))
        .catch((err) => console.error("Failed to add sale:", err));
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Add Sale</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Sale</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Label>Product</Label>
            <Select
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
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
