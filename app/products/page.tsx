import AddProduct from "@/components/Products/AddProduct";
import ProductTable from "@/components/Products/ProductTable";


export default async function ProductPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Products</h1>
        <AddProduct />
      </div>

      <ProductTable />
    </div>
  );
}
