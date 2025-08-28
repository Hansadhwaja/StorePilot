import AddProduct from "@/components/Products/AddProduct";
import ProductTable from "@/components/Products/ProductTable";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default async function ProductPage() {
  return (
    <div className="space-y-6 min-h-screen">
      <div className="flex max-md:flex-col justify-between items-center sticky top-12 z-50 bg-background py-2 border-b gap-2">
        <div className="flex justify-between w-full">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold">Products</h1>
          <div className="flex items-center gap-2 w-full max-md:hidden max-w-sm">
            <Search className="w-4 h-4" />
            <Input placeholder="Search" />
          </div>
          <AddProduct />
        </div>
        <div className="flex items-center gap-2 w-full md:hidden">
          <Search className="w-4 h-4" />
          <Input placeholder="Search" />
        </div>
      </div>
      <ProductTable />
    </div>
  );
}
