"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ExistingProductForm from "./ExistingProductForm";
import { ItemsProps } from "@/types";
import NewProductForm from "./NewProductForm";

export function AddProductForm({
  append,
}: {
  append: (item: ItemsProps) => void;
}) {
  return (
    <div className="space-y-3 p-4 border rounded-md">
      <h2 className="font-semibold">Add Product</h2>

      <Tabs defaultValue="existing">
        <TabsList>
          <TabsTrigger value="existing">Existing</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>

        <TabsContent value="existing">
          <ExistingProductForm append={append} />
        </TabsContent>

        <TabsContent value="new">
          <NewProductForm append={append} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
