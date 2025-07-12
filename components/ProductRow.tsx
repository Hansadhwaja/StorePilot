"use client";

import { deleteProduct } from "@/lib/actions/productActions";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import EditProductDialog from "./EditProductDialog";
import { TableCell, TableRow } from "./ui/table";

export default function ProductRow({
  product,
}: {
  product: {
    id: string;
    name: string;
    unit: string;
    sellingPrice: number;
    costPrice: number;
    stockQty?: number;
    category?: string;
  };
}) {
  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      toast.success("Product deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <TableRow className="border-t hover:bg-gray-50">
      <TableCell className="p-2">{product.name}</TableCell>
      <TableCell className="p-2">{product.unit}</TableCell>
      <TableCell className="p-2">₹{product.sellingPrice.toFixed(2)}/-</TableCell>
      <TableCell className="p-2">₹{product.costPrice.toFixed(2)}/-</TableCell>
      <TableCell className="p-2">₹{product.sellingPrice-product.costPrice}/-</TableCell>
      <TableCell className="p-2">{product.stockQty ?? 0}</TableCell>
      <TableCell className="p-2">
        ₹{(product.costPrice * (product.stockQty ?? 0)).toFixed(2)}
      </TableCell>
      <TableCell className="p-2 flex gap-2">
        <EditProductDialog {...product} />
        <Button
          onClick={handleDelete}
          variant="destructive"
          size="sm"
          className="cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </TableCell>
    </TableRow>

  );
}
