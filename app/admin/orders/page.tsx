"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/app/components/sidebar";
import { X } from "lucide-react";
import { getOrders } from "@/app/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type OrderItem = { product_id: string; quantity: number };

type Order = {
  id: string;
  items: OrderItem[];
  total_amount: number;
  created_at?: string;
  updated_at?: string;
  // legacy/ui fields
  customer?: string;
  phone?: string;
  address?: string;
  status: "Pending" | "Delivered" | "Cancelled";
};

const initialOrders: Order[] = [];

const statusStyles: Record<string, string> = {
  Delivered: "bg-green-50 text-green-800",
  Pending: "bg-amber-50 text-amber-800",
  Cancelled: "bg-red-50 text-red-800",
};

const filters = ["All", "Pending", "Delivered", "Cancelled"] as const;

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selected, setSelected] = useState<Order | null>(null);
  const [editStatus, setEditStatus] = useState<Order["status"]>("Pending");

  const filtered =
    activeFilter === "All"
      ? orders
      : orders.filter((o) => o.status === activeFilter);

  const isSameDay = (dateStr?: string) => {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return false;
    const now = new Date();
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  };

  const todayOrders = orders.filter((o) => isSameDay(o.created_at)).length;
  const revenueToday = orders.reduce((acc, o) => {
    if (!isSameDay(o.created_at)) return acc;
    return acc + (Number(o.total_amount) || 0);
  }, 0);
  const totalRevenue = orders.reduce(
    (acc, o) => acc + (Number(o.total_amount) || 0),
    0,
  );

  function openModal(order: Order) {
    setSelected(order);
    setEditStatus(order.status);
  }

  useEffect(() => {
    let mounted = true;
    const token = localStorage.getItem("token") || undefined;

    getOrders(token)
      .then((res) => {
        const items =
          res?.data?.items ||
          res?.data?.orders ||
          res?.items ||
          res?.orders ||
          res?.data ||
          res;
        if (!mounted) return;
        if (Array.isArray(items)) {
          const mapped = items.map((o: any) => ({
            id:
              o.id || o._id || String(o.order_number) || Date.now().toString(),
            items: Array.isArray(o.items)
              ? o.items.map((it: any) => ({
                  product_id: it.product_id || it.product || it.id,
                  quantity: it.quantity || it.qty || 1,
                }))
              : [],
            total_amount: o.total_amount ?? o.total ?? o.amount ?? 0,
            created_at: o.created_at || o.createdAt || undefined,
            updated_at: o.updated_at || o.updatedAt || undefined,
            customer: o.customer_name || o.customer || o.name || undefined,
            phone: o.phone || o.contact || undefined,
            address: o.address || o.delivery_address || undefined,
            status: (o.status as Order["status"]) || "Pending",
          }));
          setOrders(mapped);
        }
      })
      .catch((err) => {
        console.error("Failed to load orders", err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  function saveOrder() {
    if (!selected) return;
    setOrders((prev) =>
      prev.map((o) =>
        o.id === selected.id ? { ...o, status: editStatus } : o,
      ),
    );
    setSelected(null);
    toast.success("Order updated");
  }

  return (
    <div className="min-h-screen flex bg-[#f5efe6]">
      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <h1 className="text-[17px] font-medium text-gray-900">Orders</h1>
            <p className="text-[12px] text-gray-400 mt-0.5">
              {orders.length} total orders
            </p>
          </div>
        </div>

        {/* Meta cards */}
        <div className="grid grid-cols-3 gap-3 mb-5 ">
          <div className="bg-[#0b1a33] border border-gray-100 rounded-xl p-3.5">
            <p className="text-[10px] text-white mb-1">Today</p>
            <p className="text-[15px] font-medium text-white">
              {todayOrders} orders
            </p>
          </div>
          <div className="bg-[#0b1a33] border border-gray-100 rounded-xl p-3.5">
            <p className="text-[10px] text-white mb-1">Pending</p>
            <p className="text-[15px] font-medium text-amber-700">
              {orders.filter((o) => o.status === "Pending").length} orders
            </p>
          </div>
          <div className="bg-[#0b1a33] border border-gray-100 rounded-xl p-3.5">
            <p className="text-[10px] text-white mb-1">Revenue today</p>
            <p className="text-[15px] font-medium text-gray-300">
              ₦{revenueToday.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-[11px] px-3 py-1.5 rounded-full border transition-colors ${
                activeFilter === f
                  ? "bg-orange-600 text-white border-orange-600"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Order", "Items", "Total", "Created", "Status"].map((h) => (
                  <th
                    key={h}
                    className="text-[10px] uppercase tracking-wide text-gray-400 font-medium text-left px-4 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => (
                <tr
                  key={o.id}
                  className={`hover:bg-orange-50/30 transition-colors ${i < filtered.length - 1 ? "border-b border-gray-50" : ""}`}
                >
                  <td className="text-[12px] text-gray-500 px-4 py-3">
                    {o.id}
                  </td>
                  <td className="text-[12px] text-gray-500 px-4 py-3">
                    {o.items.length} items
                  </td>
                  <td className="text-[12px] text-gray-700 px-4 py-3">
                    ₦{o.total_amount}
                  </td>
                  <td className="text-[12px] text-gray-500 px-4 py-3">
                    {o.created_at
                      ? new Date(o.created_at).toLocaleString()
                      : "-"}
                  </td>
                  <td className="px-4 py-3">
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
      </main>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-gray-100 w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <p className="text-[14px] font-medium text-gray-900">
                Order {selected.id} — details
              </p>
              <button
                onClick={() => setSelected(null)}
                className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            <div className="px-5 py-4 flex flex-col gap-3.5">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-gray-500">
                  Items
                </label>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-[12px]">
                  {selected.items.map((it) => (
                    <div
                      key={it.product_id}
                      className="flex items-center justify-between py-1"
                    >
                      <div className="text-gray-800">{it.product_id}</div>
                      <div className="text-gray-600">qty: {it.quantity}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-gray-500">
                    Customer
                  </label>
                  <input
                    readOnly
                    value={selected.customer || "-"}
                    className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[12.5px] text-gray-700"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-gray-500">
                    Phone
                  </label>
                  <input
                    readOnly
                    value={selected.phone || "-"}
                    className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[12.5px] text-gray-700"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-gray-500">
                    Total
                  </label>
                  <input
                    readOnly
                    value={`₦${selected.total_amount}`}
                    className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[12.5px] text-gray-700"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-gray-500">
                    Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) =>
                      setEditStatus(e.target.value as Order["status"])
                    }
                    className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[12.5px] text-gray-700"
                  >
                    <option>Pending</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-gray-500">
                  Delivery address
                </label>
                <input
                  readOnly
                  value={selected.address}
                  className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[12.5px] text-gray-700"
                />
              </div>
            </div>
            <div className="px-5 py-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 text-[12.5px] text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveOrder}
                className="px-4 py-2 text-[12.5px] font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
