import { getProducts } from "@/lib/actions/productActions";
import ProductRow from "./ProductRow";

export default async function ProductTable() {
  const products = await getProducts();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Unit</th>
            <th className="p-2 text-left">Sell</th>
            <th className="p-2 text-left">Cost</th>
            <th className="p-2 text-left">Stock</th>
            <th className="p-2 text-left">Stock Value</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
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
        </tbody>
      </table>
    </div>
  );
}
