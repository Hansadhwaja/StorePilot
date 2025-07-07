"use client";

import { Loader2 } from "lucide-react";

const Loader = ({ size = 24, className = "" }: { size?: number; className?: string }) => {
  return (
    <Loader2
      className={`animate-spin text-muted-foreground ${className}`}
      size={size}
      strokeWidth={2}
    />
  );
};

export default Loader;
