"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import DealerForm, { DealerFormValues } from "./DealerForm";
import { addDealer } from "@/lib/actions/dealerActions";
import { Plus } from "lucide-react";

const AddDealer = () => {
  const [open, setOpen] = useState(false);

  const handleAddDealer = async (data: DealerFormValues) => {
    try {
      await addDealer(data);
      toast.success("Dealer added successfully.");
      setOpen(false);
    } catch (err: unknown) {
      console.error("Error in addDealer:", err);

      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer">
          <Plus />
          <span className="text-xs">Add Dealer</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Dealer</DialogTitle>
          <DialogDescription>
            Enter dealer details and opening balance if any.
          </DialogDescription>
        </DialogHeader>

        <DealerForm onSubmit={handleAddDealer} submitLabel="Add Dealer" />
      </DialogContent>
    </Dialog>
  );
};

export default AddDealer;
