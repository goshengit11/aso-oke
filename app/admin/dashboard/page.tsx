"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/app/components/sidebar";
import { Bell, Settings, TrendingUp, TrendingDown } from "lucide-react";
import { getProducts, getOrders } from "@/app/api/api";

const defaultStats = [
  {
    label: "Revenue",
    value: "₦0",
    delta: "+0% this month",
    up: true,
    icon: "💰",
  },
  {
    label: "Orders",
    value: "0",
    delta: "+0% this month",
    up: true,
    icon: "🧾",
  },
  {
    label: "Products",
    value: "0",
    delta: "-0 this month",
    up: false,
    icon: "📦",
  },
];

const statusStyles: Record<string, string> = {
  Delivered: "bg-green-50 text-green-800",
  Pending: "bg-amber-50 text-amber-800",
  Cancelled: "bg-red-50 text-red-800",
};

export default function Dashboard() {
  const [stats, setStats] = useState(defaultStats);
  const [recent, setRecent] = useState<any[]>([]);
  const [topProductsState, setTopProductsState] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token") || undefined;

    Promise.all([
      getProducts(token).catch(() => []),
      getOrders(token).catch(() => []),
    ])
      .then(([prodRes, orderRes]) => {
        const products =
          prodRes?.data?.items ||
          prodRes?.data?.products ||
          prodRes?.items ||
          prodRes?.products ||
          prodRes?.data ||
          prodRes ||
          [];
        const orders =
          orderRes?.data?.items ||
          orderRes?.data?.orders ||
          orderRes?.items ||
          orderRes?.orders ||
          orderRes?.data ||
          orderRes ||
          [];

        const prodCount = Array.isArray(products) ? products.length : 0;
        const orderCount = Array.isArray(orders) ? orders.length : 0;
        const revenue = Array.isArray(orders)
          ? orders.reduce(
              (s: number, o: any) =>
                s + (Number(o.total_amount ?? o.total ?? o.amount ?? 0) || 0),
              0,
            )
          : 0;

        setStats((s) =>
          s.map((st) => {
            if (st.label === "Products")
              return { ...st, value: String(prodCount) };
            if (st.label === "Orders")
              return { ...st, value: String(orderCount) };
            if (st.label === "Revenue")
              return { ...st, value: `₦${revenue.toFixed(2)}` };
            return st;
          }),
        );

        if (Array.isArray(orders)) {
          const mapped = orders.slice(0, 5).map((o: any) => ({
            id:
              o.id || o._id || String(o.order_number) || Date.now().toString(),
            customer: o.customer_name || o.customer || o.name || "",
            Category: "",
            items: Array.isArray(o.items)
              ? o.items.length
              : o.items?.length || 0,
            total: o.total_amount ?? o.total ?? 0,
            status: o.status || "Pending",
          }));
          setRecent(mapped);
        }

        if (Array.isArray(products)) {
          const mappedProducts = products.map((p: any) => ({
            name: p.name || p.title || "Untitled",
            sold: p.sold || 0,
            revenue: p.price ? `₦${p.price.toFixed(2)}` : "₦0.00",
            emoji: "",
          }));
          setTopProductsState(mappedProducts.slice(0, 4));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen flex bg-[#f5efe6]">
      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-[17px] font-medium text-gray-900">Dashboard</h1>
            <p className="text-[12px] text-gray-400 mt-0.5">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg border border-gray-100 bg-white flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
              <Bell size={15} />
            </button>
            <button className="w-8 h-8 rounded-lg border border-gray-100 bg-white flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
              <Settings size={15} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gray-100 rounded-xl p-4"
            >
              <p className="text-[11px] text-gray-400 mb-1.5">{s.label}</p>
              <p className="text-[20px] font-medium text-gray-900">{s.value}</p>
              <p
                className={`text-[10px] mt-1 flex items-center gap-1 ${s.up ? "text-green-700" : "text-red-700"}`}
              >
                {s.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {s.delta}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-[1fr_240px] gap-3">
          {/* Recent orders */}
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[13px] font-medium text-gray-900">
                Recent orders
              </p>
              <a
                href="/admin/orders"
                className="text-[11px] text-orange-600 hover:underline"
              >
                View all →
              </a>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  {[
                    "Order",
                    "Customer",
                    "Category",
                    "Items",
                    "Total",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-[10px] uppercase tracking-wide text-gray-400 font-medium text-left pb-2 border-b border-gray-100"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr
                    key={o.id}
                    className="hover:bg-orange-50/30 transition-colors"
                  >
                    <td className="text-[12px] text-gray-500 py-2.5 border-b border-gray-50">
                      {o.id}
                    </td>
                    <td className="text-[12px] text-gray-500 py-2.5 border-b border-gray-50">
                      {o.customer}
                    </td>
                    <td className="text-[12px] text-gray-500 py-2.5 border-b border-gray-50">
                      {o.Category}
                    </td>
                    <td className="text-[12px] text-gray-500 py-2.5 border-b border-gray-50">
                      {o.items}
                    </td>
                    <td className="text-[12px] text-gray-500 py-2.5 border-b border-gray-50">
                      {o.total}
                    </td>
                    <td className="py-2.5 border-b border-gray-50">
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusStyles[o.status]}`}
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top products */}
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-[13px] font-medium text-gray-900 mb-4">
              Top products
            </p>
            <div className="flex flex-col">
              {topProductsState.map((p, i) => (
                <div
                  key={p.name}
                  className={`flex items-center gap-2.5 py-2.5 ${i < topProductsState.length - 1 ? "border-b border-gray-50" : ""}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-[18px] flex-shrink-0">
                    {p.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-gray-800 truncate">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-gray-400">{p.sold} sold</p>
                  </div>
                  <p className="text-[12px] font-medium text-gray-800 flex-shrink-0">
                    {p.revenue}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
