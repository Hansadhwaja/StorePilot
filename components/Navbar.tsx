import { ModeToggle } from "@/components/ModeToggle";
import { User } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="h-12 sticky top-0 z-50 bg-background border-b py-1 flex items-center lg:justify-end justify-between">
      <Link
        href="/"
        className="text-2xl font-bold tracking-wide lg:hidden block"
      >
        StorePilot
      </Link>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <User className="w-6 h-6 rounded-full border" />
      </div>
    </div>
  );
};
