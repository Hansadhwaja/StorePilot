"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PurchaseTableProps {
  purchases: {
    _id: string;
    purchaseDate: string;
    totalAmount: number;
    fairCharge: number;
    items: {
      productId: { name: string; unit: string };
      quantity: number;
      pricePerUnit: number;
    }[];
  }[];
}

export default function PurchaseTable({ purchases }: PurchaseTableProps) {
  return (
    <div className="w-full overflow-x-auto border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Fair Charge</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {purchases.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="p-4 text-center text-muted-foreground"
              >
                No purchases found
              </TableCell>
            </TableRow>
          ) : (
            purchases.map((purchase) => (
              <TableRow key={purchase._id}>
                <TableCell>
                  {format(new Date(purchase.purchaseDate), "dd MMM yyyy")}
                </TableCell>

                <TableCell>
                  <ul className="space-y-1">
                    {purchase.items.map((item, i) => (
                      <li key={i} className="flex justify-between">
                        <span>
                          {item.productId?.name} ({item.productId?.unit})
                        </span>
                        <span>
                          {item.quantity} × ₹{item.pricePerUnit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </TableCell>

                <TableCell>₹{purchase.fairCharge.toFixed(2)}</TableCell>

                <TableCell className="font-semibold">
                  ₹{purchase.totalAmount.toFixed(2)}
                </TableCell>

                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
