"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import PaymentForm from "./PaymentForm";
import { Payment } from "@/types";
import { Button } from "../ui/button";

const EditPayment = (payment: Payment) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full flex justify-start">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Payment</DialogTitle>
        </DialogHeader>
        <PaymentForm
          dealerId={payment.dealerId}
          paymentId={payment._id}
          defaultValues={{
            amount: payment.amount,
            paidAt: new Date(payment.paidAt),
            note: payment.note,
          }}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditPayment;
