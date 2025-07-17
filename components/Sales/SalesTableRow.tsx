// components/sales/SalesTableRow.tsx

import { TableRow, TableCell } from "@/components/ui/table";

interface Props {
  sale: {
    productName: string;
    quantity: number;
    sellingPrice: number;
    costPrice?: number;
    profit?: number;
  };
  date?: string;
  index: number;
}

export default function SalesTableRow({ sale, date = "", index }: Props) {
  return (
    <TableRow>
      <TableCell>{index === 0 ? date : ""}</TableCell>
      <TableCell>{sale.productName}</TableCell>
      <TableCell>{sale.quantity}</TableCell>
      <TableCell>₹{sale.sellingPrice.toFixed(2)}</TableCell>
      <TableCell>₹{(sale.costPrice ?? 0).toFixed(2)}</TableCell>
      <TableCell>₹{(sale.profit ?? 0).toFixed(2)}</TableCell>
    </TableRow>
  );
}
