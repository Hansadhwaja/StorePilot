"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import InputLabel from "../InputLabel";
import { Textarea } from "../ui/textarea";
import { addPayment, updatePayment } from "@/lib/actions/paymentActions"; // ✅ Import update action

const paymentSchema = z.object({
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
  paidAt: z.coerce.date(),
  note: z.string().optional(),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  dealerId: string;
  paymentId?: string;
  defaultValues?: Partial<PaymentFormValues>;
  onSuccess?: () => void;
}

const PaymentForm = ({
  dealerId,
  paymentId,
  defaultValues,
  onSuccess,
}: PaymentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: defaultValues?.amount ?? 0,
      paidAt: defaultValues?.paidAt
        ? new Date(defaultValues.paidAt)
        : new Date(),
      note: defaultValues?.note ?? "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: PaymentFormValues) => {
    startTransition(async () => {
      const payload = {
        dealerId,
        amount: values.amount,
        paidAt: values.paidAt,
        note: values.note,
      };
      const result = paymentId
        ? await updatePayment(paymentId, {
            amount: values.amount,
            note: values.note,
          })
        : await addPayment(payload);

      if (result?.success) {
        toast.success(
          `Payment ${paymentId ? "updated" : "added"} successfully`
        );
        onSuccess?.();
      } else {
        toast.error(result?.message || "Something went wrong");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <InputLabel
          label="Amount"
          type="number"
          step="0.01"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && (
          <p className="text-sm text-red-500">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <InputLabel label="Date" type="date" {...register("paidAt")} />
        {errors.paidAt && (
          <p className="text-sm text-red-500">{errors.paidAt.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="note">Note (optional)</Label>
        <Textarea id="note" {...register("note")} />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending
          ? paymentId
            ? "Updating..."
            : "Saving..."
          : paymentId
          ? "Update Payment"
          : "Save Payment"}
      </Button>
    </form>
  );
};

export default PaymentForm;
