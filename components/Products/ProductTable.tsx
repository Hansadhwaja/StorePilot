import { getProducts } from "@/lib/actions/productActions";
import ProductRow from "./ProductRow";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function ProductTable() {
  const products = await getProducts();

  const grouped = products.reduce((acc, product) => {
    const category = product?.category || "Others";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  const sortedGroupEntries = Object.entries(grouped).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  sortedGroupEntries.forEach((ele) =>
    ele[1].sort((a, b) => a.name.localeCompare(b.name))
  );

  return (
    <div className="w-full h-[85%] overflow-x-auto rounded-xl border shadow-sm mb-18">
      <Table className="min-w-[1000px] text-sm">
        <TableHeader>
          <TableRow className="bg-muted/60">
            <TableHead className="px-4 py-2 text-left font-medium">
              Name
            </TableHead>
            <TableHead className="px-4 py-2 text-left font-medium">
              Unit
            </TableHead>
            <TableHead className="px-4 py-2 text-left font-medium">
              Sell
            </TableHead>
            <TableHead className="px-4 py-2 text-left font-medium">
              Cost
            </TableHead>
            <TableHead className="px-4 py-2 text-left font-medium">
              Margin
            </TableHead>
            <TableHead className="px-4 py-2 text-left">Stock</TableHead>
            <TableHead className="px-4 py-2 text-left">Stock Value</TableHead>
            <TableHead className="px-4 py-2 text-left">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedGroupEntries.map(([groupName, productList]) => (
            <React.Fragment key={groupName}>
              {/* Group Header Row */}
              <TableRow className="bg-muted/40 hover:bg-muted/50 dark:bg-slate-900/60">
                <TableCell
                  className="px-4 py-2 font-semibold text-foreground"
                  colSpan={8}
                >
                  {groupName.charAt(0).toUpperCase() + groupName.slice(1)}
                </TableCell>
              </TableRow>

              {/* Product Rows */}
              {productList.map((p) => (
                <ProductRow
                  key={p._id.toString()}
                  product={{
                    id: p._id.toString(),
                    name: p.name,
                    unit: p.unit,
                    sellingPrice: p.sellingPrice,
                    costPrice: p.costPrice,
                    stockQty: p.stockQty,
                    category: p.category,
                  }}
                />
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
