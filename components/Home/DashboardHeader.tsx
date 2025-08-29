"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DashboardHeaderProps {
  month: string;
  setMonth: (m: string) => void;
  monthNames: string[];
}

const DashboardHeader = ({
  month,
  setMonth,
  monthNames,
}: DashboardHeaderProps) => {
  const year = month.split("-")[0];

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <Select value={month} onValueChange={setMonth}>
        <SelectTrigger>
          <SelectValue placeholder="Select Month" />
        </SelectTrigger>
        <SelectContent>
          {monthNames.map((name, idx) => {
            const value = `${year}-${String(idx + 1).padStart(2, "0")}`;
            return (
              <SelectItem key={value} value={value}>
                {name} {year}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DashboardHeader;
