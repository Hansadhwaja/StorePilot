"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SaleForm from "./SaleForm";
import { updateSale } from "@/lib/actions/saleActions";
import { Sale } from "@/types";
import { Edit2 } from "lucide-react";

type EditSaleFormProps = {
  sale: Sale;
};

export default function EditSaleForm({ sale }: EditSaleFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Sale</DialogTitle>
        </DialogHeader>
        <SaleForm
          initialData={{
            productId: sale.productId,
            quantity: sale.quantity,
            sellingPrice: sale.sellingPrice,
            costPrice: sale.costPrice,
            saleDate: sale.saleDate,
          }}
          onSubmit={async (data) => {
            await updateSale(sale._id, data);
            setOpen(false);
          }}
          submitLabel="Update Sale"
        />
      </DialogContent>
    </Dialog>
  );
}
