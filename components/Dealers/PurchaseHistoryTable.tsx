import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PurchaseHistoryTable({ data }: { data: { date: string, amount: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase History</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left border-b">
            <tr>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((purchase, idx) => (
              <tr key={idx} className="border-b">
                <td className="py-2">{purchase.date}</td>
                <td className="py-2">₹ {purchase.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
