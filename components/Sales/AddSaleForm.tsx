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
import { addSale } from "@/lib/actions/saleActions";

export default function AddSaleForm() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Add Sale</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Sale</DialogTitle>
        </DialogHeader>
        <SaleForm
          onSubmit={async (data) => {
            await addSale(data);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
