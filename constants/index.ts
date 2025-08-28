import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

export const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: Package },
  { name: "Sales", href: "/sales", icon: ShoppingCart },
  { name: "Dealers", href: "/dealers", icon: Users },
];

export const tabs = [
  { label: "Dashboard", href: "" },
  { label: "Profile", href: "/profile" },
  { label: "Payments", href: "/payments" },
  { label: "Purchases", href: "/purchases" },
];

export const monthNames = [
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