import { recentSales } from "@/constants";


export function RecentSalesTable() {
    const data=recentSales;
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-left">
            <th className="p-3">Customer</th>
            <th className="p-3">Date</th>
            <th className="p-3">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sale) => (
            <tr
              key={sale.id}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <td className="p-3">{sale.customer}</td>
              <td className="p-3">{sale.date}</td>
              <td className="p-3 font-semibold">{sale.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
