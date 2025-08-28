"use client";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftBar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64 border-r p-4 lg:flex flex-col items-start gap-6 hidden sticky left-0 top-0 h-screen">
      <Link href="/" className="text-2xl font-bold tracking-wide">
        StorePilot
      </Link>
      <nav className="space-y-6">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === item.href
              : pathname.includes(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex gap-2 items-center text-sm text-muted-foreground hover:text-primary",
                { "text-primary": isActive }
              )}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default LeftBar;
