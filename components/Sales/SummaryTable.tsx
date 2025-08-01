import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import DaySalesGroup from "./DaySalesGroup";
import { SalesProps } from "@/types";

export default function SummaryTable({ sales }: { sales: SalesProps[] }) {
  if (sales.length === 0)
    return (
      <h1 className="flex justify-center mt-10 text-gray-500">
        No sales for this month.
      </h1>
    );
  return (
    <div className="w-full overflow-x-auto border rounded-md h-[75%]">
      <Table>
        <TableHeader className="bg-muted-foreground/30">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Selling Price</TableHead>
            <TableHead>Cost Price</TableHead>
            <TableHead>Profit</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((day, i) => (
            <DaySalesGroup
              key={day.date}
              date={day.date}
              sales={day.sales}
              totalItems={day.totalItems}
              totalRevenue={day.totalRevenue}
              totalProfit={day.totalProfit}
              initiallyOpen={i === 0}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
