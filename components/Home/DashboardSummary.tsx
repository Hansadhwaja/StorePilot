"use client";

type Props = {
  month: string;
  monthNames: string[];
};

const DashboardSummary = ({ month, monthNames }: Props) => {
  const monthIndex = parseInt(month.split("-")[1], 10) - 1;
  const label = monthNames[monthIndex];

  // 🔥 later you can fetch summary from server with `month`
  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-lg font-semibold">
        Summary for {label} ({month})
      </h2>
      <p className="text-sm text-gray-500">
        [Data will be displayed here after fetching from server]
      </p>
    </div>
  );
};

export default DashboardSummary;
