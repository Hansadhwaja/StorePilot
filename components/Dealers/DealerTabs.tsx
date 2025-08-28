"use client";

import { tabs } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface DealerTabsProps {
  dealerId: string;
}

export default function DealerTabs({ dealerId }: DealerTabsProps) {
  const pathname = usePathname();

  return (
    <nav className="sticky top-12 z-50 bg-background border-b mb-2">
      <div className="flex justify-between px-2 sm:px-4 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const href = `/dealers/${dealerId}${tab.href}`;
          const isActive =
            tab.href === "" ? pathname === href : pathname.startsWith(href);

          return (
            <Link
              key={tab.href}
              href={href}
              className={cn(
                "py-2 lg:py-3 text-xs md:text-sm font-medium transition-colors whitespace-nowrap",
                isActive
                  ? " border-b-2 border-blue-600 text-blue-600"
                  : "text-muted-foreground hover:text-blue-500"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
