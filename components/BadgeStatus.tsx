import React from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const BadgeStatus = ({ status }: { status: string }) => {
  return (
    <Badge
      className={cn(
        "mt-3 w-fit px-3 py-1 text-xs font-medium",
        status === "Due" && "bg-red-100 text-red-700",
        status === "Advance" && "bg-green-100 text-green-700",
        status === "Settled" && "bg-gray-100 text-gray-700"
      )}
    >
      {status}
    </Badge>
  );
};

export default BadgeStatus;
