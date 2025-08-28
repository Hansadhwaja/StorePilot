"use client";

import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPurchase } from "@/lib/actions/purchaseActions";
import { AddProductForm } from "./AddProductForm";
import { ShowItems } from "./ShowItems";
import { purchaseFormSchema, PurchaseFormValues } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export default function PurchaseForm({ dealerId }: { dealerId: string }) {
  const form = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      fairCharges: 0,
      items: [],
    },
  });

  const { handleSubmit, reset, control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (values: PurchaseFormValues) => {
    console.log("Final Purchase:", values);
    await createPurchase(dealerId, values);
    reset();
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mb-16">
          <div className="flex justify-between gap-4">
            <div className="flex-1">
              <FormField
                control={control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-xs md:text-sm">
                      Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="text-xs sm:text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={control}
                name="fairCharges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-xs md:text-sm">
                      Fair Charges
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="text-xs sm:text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <ShowItems fields={fields} remove={remove} />
          <Button type="submit">Save Purchase</Button>

          <AddProductForm append={append} />
        </form>
      </Form>
    </FormProvider>
  );
}
