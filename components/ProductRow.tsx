"use client";

import { deleteProduct } from "@/lib/actions/productActions";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import EditProductDialog from "./EditProductDialog";

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
    <tr className="border-t hover:bg-gray-50">
      <td className="p-2">{product.name}</td>
      <td className="p-2">{product.unit}</td>
      <td className="p-2">₹{product.sellingPrice.toFixed(2)}/-</td>
      <td className="p-2">₹{product.costPrice.toFixed(2)}/-</td>
      <td className="p-2">{product.stockQty ?? 0}</td>
      <td className="p-2">
        ₹{(product.costPrice * (product.stockQty ?? 0)).toFixed(2)}
      </td>
      <td className="p-2 flex gap-2">
        <EditProductDialog {...product} />
        <Button
          onClick={handleDelete}
          variant="destructive"
          size="sm"
          className="cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </td>
    </tr>
  );
}
