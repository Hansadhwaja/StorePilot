"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { navItems } from "@/constants";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b shadow-sm mb-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          🛒 StorePilot
        </Link>

        <ul className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-sm px-3 py-1 rounded hover:bg-gray-100 transition",
                  item.href === "/"
                    ? pathname === "/" && "bg-gray-200 font-medium"
                    : pathname.startsWith(item.href) &&
                        "bg-gray-200 font-medium"
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
