"use client";

import { navItems } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomBar = () => {
  const pathname = usePathname();
  return (
    <footer className="max-container fixed bottom-0 bg-background border-t shadow-sm h-16 lg:hidden">
      <div className="flex justify-between">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === item.href
              : pathname.includes(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center text-xs md:text-sm text-muted-foreground hover:text-primary ${
                isActive && "text-primary"
              }`}
            >
              <item.icon className=" w-4 h-4 md:w-5 md:h-5 mb-1" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default BottomBar;
