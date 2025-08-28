"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import PaymentForm from "./PaymentForm";

interface AddPaymentProps {
  dealerId: string;
}

const AddPayment = ({ dealerId }: AddPaymentProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs md:text-sm">
          + Add Payment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Payment</DialogTitle>
        </DialogHeader>
        <PaymentForm dealerId={dealerId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddPayment;
