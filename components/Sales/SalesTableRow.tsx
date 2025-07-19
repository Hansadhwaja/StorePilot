"use client";

import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import EditSaleForm from "./EditSaleForm";

interface Props {
  sale: {
    _id: string;
    productId: string;
    productName: string;
    quantity: number;
    sellingPrice: number;
    costPrice?: number;
    profit?: number;
    saleDate: string;
  };
  date?: string;
  index: number;
  onDelete?: (id: string) => void;
}

export default function SalesTableRow({
  sale,
  date = "",
  index,
  onDelete,
}: Props) {
  return (
    <TableRow>
      <TableCell>{index === 0 ? date : ""}</TableCell>
      <TableCell>{sale.productName}</TableCell>
      <TableCell>{sale.quantity}</TableCell>
      <TableCell>₹{sale.sellingPrice.toFixed(2)}</TableCell>
      <TableCell>₹{(sale.costPrice ?? 0).toFixed(2)}</TableCell>
      <TableCell>₹{(sale.profit ?? 0).toFixed(2)}</TableCell>
      <TableCell className="flex gap-2">
        <EditSaleForm sale={sale} />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => {
            if (confirm("Are you sure you want to delete this sale?")) {
              onDelete?.(sale._id);
            }
          }}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
