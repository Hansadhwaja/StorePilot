import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import DaySalesGroup, { SalesProps } from "./DaySalesGroup";

interface Props {
  salesSummary: SalesProps[];
  grandTotals: {
    totalItems: number;
    totalRevenue: number;
    totalProfit: number;
  };
}

export default function SummaryTable({ salesSummary, grandTotals }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Qty</TableHead>
          <TableHead>Selling Price</TableHead>
          <TableHead>Cost Price</TableHead>
          <TableHead>Profit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {salesSummary.map((day, i) => (
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
        <TableRow className="font-bold bg-muted">
          <TableCell colSpan={2}>Grand Total</TableCell>
          <TableCell>{grandTotals.totalItems}</TableCell>
          <TableCell>₹{grandTotals.totalRevenue.toFixed(2)}</TableCell>
          <TableCell></TableCell>
          <TableCell>₹{grandTotals.totalProfit.toFixed(2)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
