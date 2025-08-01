"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { updateDealer } from "@/lib/actions/dealerActions";
import DealerForm, { DealerFormValues } from "./DealerForm";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

export default function EditDealer({
  id,
  name,
  phone,
  email,
  address,
  openingBalance,
}: DealerFormValues & { id: string }) {
  const [open, setOpen] = useState(false);
  const dealer = { id, name, phone, email, address, openingBalance };

  async function handleUpdate(data: DealerFormValues) {
    const newData={...data,totalPurchased:data.openingBalance};
    try {
      await updateDealer(dealer.id, newData);
      toast.success("Dealer updated successfully");
      setOpen(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update dealer");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Dealer</DialogTitle>
        </DialogHeader>
        <DealerForm
          onSubmit={handleUpdate}
          defaultValues={dealer}
          submitLabel="Update Dealer"
        />
      </DialogContent>
    </Dialog>
  );
}
