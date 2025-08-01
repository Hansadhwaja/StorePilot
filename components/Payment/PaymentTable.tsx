"use client";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Payment } from "@/types";
import { deletePayment } from "@/lib/actions/paymentActions";
import { toast } from "sonner";
import EditPayment from "./EditPayment";
import ActionButton from "../ActionButton";

export default function PaymentTable({ payments }: { payments: Payment[] }) {
  const handleDelete = async (id: string) => {
    try {
      await deletePayment(id);
      toast.success("Payment deleted successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete Payment.");
      throw new Error("Error Deleting Payment.");
    }
  };

  if (!payments.length) {
    return <p className="text-muted-foreground">No payments found.</p>;
  }

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Note</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment._id}>
              <TableCell>
                {format(new Date(payment.paidAt), "dd MMM yyyy")}
              </TableCell>
              <TableCell className="font-medium text-green-600">
                ₹{payment.amount}
              </TableCell>
              <TableCell
                className={cn(
                  "text-muted-foreground",
                  !payment.note && "italic"
                )}
              >
                {payment.note || "—"}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <ActionButton
                  editComponent={<EditPayment {...payment} />}
                  onDelete={() => handleDelete(payment._id)}
                  deleteLabel="Remove Payment"
                  deleteConfirmTitle="Delete Payment?"
                  deleteConfirmDescription="This payment will be permanently deleted."
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
