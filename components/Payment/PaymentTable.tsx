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
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PaymentTable({
  payments,
  dealerId,
}: {
  payments: Payment[];
  dealerId: string;
}) {
  return (
    <div className="rounded-xl border p-2">
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
          {payments.length > 0 ? (
            payments.map((payment) => (
              <TableRow key={payment._id}>
                <TableCell>
                  {format(new Date(payment.paidAt), "dd MMM yyyy")}
                </TableCell>

                <TableCell className="font-semibold text-green-600">
                  ₹{payment.amount.toFixed(2)}
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
                  <Link
                    href={`/dealers/${dealerId}/payments/${payment._id}`}
                    className="text-sm font-medium text-blue-600 hover:underline flex items-center justify-end gap-1"
                  >
                    View <ArrowRight className="w-4 h-4" />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="p-4 text-center text-muted-foreground"
              >
                No payments found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
