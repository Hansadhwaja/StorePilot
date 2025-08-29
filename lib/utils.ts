import { monthNames } from "@/constants";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-IN");
}

export function formatCurrency(amount: number) {
  return amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function generateMonthYearOptions(start: Date, end: Date) {
  const options: { label: string; value: string }[] = [];
  const current = new Date(start);

  while (current <= end) {
    const year = current.getFullYear();
    const month = current.getMonth();

    options.push({
      label: `${monthNames[month]} ${year}`,
      value: `${year}-${String(month + 1).padStart(2, "0")}`,
    });

    current.setMonth(current.getMonth() + 1);
  }

  return options;
}
