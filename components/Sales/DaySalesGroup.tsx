"use client";

import { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import SalesTableRow from "./SalesTableRow";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronUp } from "lucide-react";
import { SalesProps } from "@/types";
import { deleteSale } from "@/lib/actions/saleActions";
import { toast } from "sonner";

export default function DaySalesGroup({
  date,
  sales,
  totalItems,
  totalRevenue,
  totalProfit,
  initiallyOpen = false,
}: SalesProps) {
  const [open, setOpen] = useState(initiallyOpen);

  return (
    <>
      {open &&
        sales.map((sale, i) => (
          <SalesTableRow
            key={`${date}-${i}`}
            sale={sale}
            index={i}
            date={date}
            onDelete={async (productName) => {
              const confirmDelete = confirm(
                "Are you sure you want to delete this sale?"
              );
              if (!confirmDelete) return;

              try {
                await deleteSale(productName);
                toast.success("Sale deleted successfully");
              } catch (err) {
                console.error("Deletion failed:", err);
                toast.error("Failed to delete sale");
              }
            }}
          />
        ))}
      <TableRow
        className="font-medium bg-muted/50 hover:bg-muted cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <TableCell className="w-[40px]">
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            {open ? <ChevronUp size={16} /> : <ChevronRight size={16} />}
          </Button>
        </TableCell>
        <TableCell colSpan={1}>Total for {date}</TableCell>
        <TableCell>{totalItems}</TableCell>
        <TableCell>₹{totalRevenue.toFixed(2)}</TableCell>
        <TableCell></TableCell>
        <TableCell>₹{totalProfit.toFixed(2)}</TableCell>
      </TableRow>
    </>
  );
}
