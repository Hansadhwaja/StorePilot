"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function SalesHeader({ selectedMonth }: { selectedMonth: number }) {
  const [month, setMonth] = useState(selectedMonth.toString());
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMonth(selectedMonth.toString());
  }, [selectedMonth]);

  function handleChange(val: string) {
    setMonth(val);

    const params = new URLSearchParams(searchParams);
    params.set("month", val);

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-lg md:text-xl lg:text-2xl font-semibold">Sales in Month of</span>
        <Select value={month} onValueChange={handleChange}>
          <SelectTrigger className="max-w-[150px] sm:text-xl font-semibold border-none">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {monthNames.map((name, index) => (
              <SelectItem key={index} value={index.toString()}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
