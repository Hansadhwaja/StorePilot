import { getProducts } from "@/lib/actions/productActions";
import ProductRow from "./ProductRow";
import React from "react";
import {
  Table,
  TableBody,
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
    <div className="overflow-x-auto">
      <Table className="w-full text-sm border h-96">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="p-2 text-left">Name</TableHead>
            <TableHead className="p-2 text-left">Unit</TableHead>
            <TableHead className="p-2 text-left">Sell</TableHead>
            <TableHead className="p-2 text-left">Cost</TableHead>
            <TableHead className="p-2 text-left">Margin</TableHead>
            <TableHead className="p-2 text-left">Stock</TableHead>
            <TableHead className="p-2 text-left">Stock Value</TableHead>
            <TableHead className="p-2 text-left">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedGroupEntries.map(([groupName, productList]) => (
            <React.Fragment key={groupName}>
              <tr className="bg-gray-200">
                <td className="p-2 font-semibold" colSpan={8}>
                  {groupName.charAt(0).toUpperCase() + groupName.slice(1)}
                </td>
              </tr>
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
