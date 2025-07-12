import { getSalesSummaryByDate } from "@/lib/actions/saleActions";
import AddSaleForm from "@/components/AddSaleForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

interface DaySale {
  productName: string;
  quantity: number;
  sellingPrice: number;
  costPrice?: number;
  profit?: number;
}

interface DaySummary {
  date: string;
  sales: DaySale[];
  totalItems: number;
  totalRevenue: number;
  totalProfit: number;
  saleCount: number;
}

export default async function SalesPage() {
  const salesSummary: DaySummary[] = await getSalesSummaryByDate();

  const grandTotals = salesSummary.reduce(
    (acc, day) => {
      acc.totalItems += day.totalItems;
      acc.totalRevenue += day.totalRevenue;
      acc.totalProfit += day.totalProfit ?? 0;
      return acc;
    },
    { totalItems: 0, totalRevenue: 0, totalProfit: 0 }
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Sales by Day</h1>
        <AddSaleForm />
      </div>

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
          {salesSummary.map((day: DaySummary) => (
            <React.Fragment key={day.date}>
              {day.sales.map((sale: DaySale, i: number) => (
                <TableRow key={`${day.date}-${i}`}>
                  <TableCell>{i === 0 ? day.date : ""}</TableCell>
                  <TableCell>{sale.productName}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell>₹{sale.sellingPrice.toFixed(2)}</TableCell>
                  <TableCell>₹{(sale.costPrice ?? 0).toFixed(2)}</TableCell>
                  <TableCell>₹{(sale.profit ?? 0).toFixed(2)}</TableCell>
                </TableRow>
              ))}

              <TableRow className="font-semibold bg-gray-50">
                <TableCell colSpan={2}>Total for {day.date}</TableCell>
                <TableCell>{day.totalItems}</TableCell>
                <TableCell>₹{day.totalRevenue.toFixed(2)}</TableCell>
                <TableCell></TableCell>
                <TableCell>₹{(day.totalProfit ?? 0).toFixed(2)}</TableCell>
              </TableRow>
            </React.Fragment>
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
    </div>
  );
}
