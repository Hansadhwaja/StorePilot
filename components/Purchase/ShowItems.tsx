"use client";

import { ItemsProps } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "../ui/table";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { FieldArrayWithId, UseFieldArrayRemove } from "react-hook-form";

type ShowItemsProps = {
  fields: FieldArrayWithId<{ items: ItemsProps[] }, "items", "id">[];
  remove: UseFieldArrayRemove;
};

export function ShowItems({ fields, remove }: ShowItemsProps) {
  // Calculate total subtotal
  const total = fields.reduce(
    (acc, item) => acc + (item.subtotal ?? 0),
    0
  );

  return (
    <div className="mt-4 border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Subtotal</TableHead>
            <TableHead className="text-right">Cost Price</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {fields.length > 0 ? (
            fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>{field.productName || "-"}</TableCell>
                <TableCell className="text-right">{field.qty ?? "-"}</TableCell>
                <TableCell className="text-right">
                  {field.subtotal?.toFixed(2) ?? "-"}
                </TableCell>
                <TableCell className="text-right">
                  {field.costPrice?.toFixed(2) ?? "-"}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground py-4"
              >
                No items added yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        {fields.length > 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="text-right font-semibold">
                Total
              </TableCell>
              <TableCell className="text-right font-semibold">
                {total.toFixed(2)}
              </TableCell>
              
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
