"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateMonthYearOptions } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SalesHeader({ selectedMonth }: { selectedMonth: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [month, setMonth] = useState(selectedMonth);

  const startDate = new Date(2025, 6, 1);
  const endDate = new Date();
  const monthYearOptions = generateMonthYearOptions(startDate, endDate);

  useEffect(() => {
    setMonth(selectedMonth);
  }, [selectedMonth]);

  function handleChange(val: string) {
    setMonth(val);

    const params = new URLSearchParams(searchParams);
    params.set("month", val);

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg md:text-xl lg:text-2xl font-semibold">
        Sales in
      </span>
      <Select value={month} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          {monthYearOptions.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
