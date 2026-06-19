"use client";
import Link from "next/link";
import { LayoutGrid, ShoppingBag, FileText, LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { getOrders } from "@/app/api/api";

function buildNavItems(orderCount: number) {
  return [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutGrid },
    { href: "/admin/products", label: "Products", icon: ShoppingBag },
    {
      href: "/admin/orders",
      label: "Orders",
      icon: FileText,
      badge: orderCount,
    },
  ];
}

export default function Sidebar() {
  const [orderCount, setOrderCount] = useState<number>(0);
  const navItems = buildNavItems(orderCount);

  useEffect(() => {
    const token = localStorage.getItem("token") || undefined;
    getOrders(token)
      .then((res) => {
        const items =
          res?.data?.items ||
          res?.data?.orders ||
          res?.items ||
          res?.orders ||
          res?.data ||
          res ||
          [];
        setOrderCount(Array.isArray(items) ? items.length : 0);
      })
      .catch(() => setOrderCount(0));
  }, []);

  function handleLogout() {
    redirect("/auth/login");
  }
  return (
    <div className="h-screen w-60 bg-[#0b1a33] border-r border-gray-100 flex flex-col">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[10px] bg-orange-600 flex items-center justify-center">
            <svg
              className="text-white"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 11l19-9-9 19-2-8-8-2z" />
            </svg>
          </div>
          <div>
            <p className="text-[15px] font-medium text-white tracking-tight">
              Aso-Oke
            </p>
            <p className="text-[11px] text-gray-400 mt-px">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 flex flex-col gap-0.5">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium px-2 py-1.5">
          Main
        </p>
        {navItems.map(({ href, label, icon: Icon, badge }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-white
              hover:bg-gray-50 hover:text-gray-900 transition-colors text-[13.5px]
              [&.active]:bg-orange-50 [&.active]:text-orange-600 [&.active]:font-medium"
          >
            <Icon size={17} strokeWidth={1.8} />
            {label}
            {badge && (
              <span
                className="ml-auto bg-orange-600 text-white text-[10px] font-medium
                px-2 py-px rounded-full leading-[18px]"
              >
                {badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg bg-gray-50">
          <div
            className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center
            text-[12px] font-medium text-orange-800 shrink-0"
          >
            AU
          </div>
          <div>
            <p className="text-[12.5px] font-medium text-gray-800">
              Admin User
            </p>
            <p className="text-[11px] text-gray-400">admin@asookedash.com</p>
          </div>
        </div>
        <Link href={"/admin/login"}>
          <button
            onClick={handleLogout}
            className="w-full mt-2 py-2 flex items-center justify-center gap-1.5
            text-[12.5px] text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={14} />
            Log out
          </button>
        </Link>
      </div>
    </div>
  );
}
