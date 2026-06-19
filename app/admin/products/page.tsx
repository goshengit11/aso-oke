"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/app/components/sidebar";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import {
  getProducts,
  updateAsoOkeProduct,
  deleteAsoOkeProduct,
  createAsoOkeProduct,
} from "@/app/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  inStock: boolean;
  product_url?: string;
  emoji?: string;
  stock_quantity?: number;
  is_active?: boolean;
};

const categories = ["All", "Plain", "Pattern", "Stripe", "Jawu", ""];

const initialProducts: Product[] = [];

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  product_url: "",
  stock_quantity: "1",
  is_active: true,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  function openAdd() {
    setEditProduct(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  useEffect(() => {
    let mounted = true;
    const token = localStorage.getItem("token") || undefined;

    getProducts(token)
      .then((res) => {
        const items =
          res?.data?.items ||
          res?.data?.products ||
          res?.items ||
          res?.products ||
          res?.data ||
          res;
        if (!mounted) return;
        if (Array.isArray(items)) {
          const mapped = items.map((p: any) => ({
            id: p.id || p._id || Date.now(),
            name: p.name || p.title || "Untitled",
            category: p.category || p.type || "",
            price: p.price ? `$${p.price}` : p.price || "$0.00",
            inStock: p.stock_quantity ? p.stock_quantity > 0 : true,
            product_url: p.product_url || p.url || p.image || "",
            emoji: p.emoji || "",
          }));
          setProducts(mapped);
        }
      })
      .catch((err) => {
        console.error("Failed to load products", err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  function openEdit(p: Product) {
    setEditProduct(p);
    setForm({
      name: p.name,
      description: "Hand wooven aso-oke",
      price: p.price,
      category: p.category,
      product_url: p.product_url || "",
      stock_quantity: String(p.stock_quantity || 1),
      is_active: typeof p.is_active === "boolean" ? p.is_active : true,
    });
    setShowModal(true);
  }

  function deleteProduct(id: number) {
    const token = localStorage.getItem("token") || "";
    deleteAsoOkeProduct(token, String(id))
      .then(() => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast.success("Product deleted");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete product");
      });
  }

  function saveProduct() {
    if (!form.name.trim() || !form.price.trim()) return;
    const token = localStorage.getItem("token") || "";
    if (editProduct) {
      updateAsoOkeProduct(token, String(editProduct.id), {
        name: form.name,
        price:
          parseFloat(String(form.price).replace(/[^0-9.]/g, "")) || undefined,
        description: form.description,
        product_url: form.product_url?.trim() || undefined,
        stock_quantity: parseInt(String(form.stock_quantity)) || undefined,
        is_active: !!form.is_active,
        // is_active: true,
      })
        .then(() => {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === editProduct.id
                ? {
                    ...p,
                    name: form.name,
                    category: form.category,
                    price: form.price.startsWith("₦")
                      ? form.price
                      : `$${form.price}`,
                    product_url: form.product_url || p.product_url,
                    stock_quantity:
                      parseInt(String(form.stock_quantity)) || p.stock_quantity,
                    is_active:
                      typeof form.is_active === "boolean"
                        ? form.is_active
                        : p.is_active,
                  }
                : p,
            ),
          );
          toast.success("Product updated");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to update product");
        })
        .finally(() => setShowModal(false));
    } else {
      const payload = {
        name: form.name,
        price: parseFloat(String(form.price).replace(/[^0-9.]/g, "")) || 0,
        stock_quantity: parseInt(String(form.stock_quantity)) || 1,
        description: form.description,
        product_url: form.product_url?.trim() || undefined,
        category: form.category,
        is_active: true,
      };
      createAsoOkeProduct(token, payload)
        .then((res) => {
          const created =
            res?.data?.item ||
            res?.item ||
            res?.data?.created ||
            res?.data?.product ||
            (Array.isArray(res?.data?.items) && res.data.items[0]) ||
            res?.data ||
            res;
          const p = created || payload;
          const newProduct: Product = {
            id: p.id || p._id || Date.now(),
            name: p.name || payload.name,
            category: p.category || payload.category || "",
            price: p.price
              ? `₦${p.price.toFixed(2)}`
              : `₦${payload.price.toFixed(2)}`,
            inStock: p.stock_quantity ? p.stock_quantity > 0 : true,
            product_url: p.product_url || payload.product_url || "",
            emoji: "",
          };
          setProducts((prev) => [newProduct, ...prev]);
          toast.success("Product created");
        })
        .catch((err) => {
          console.error("Create product failed", err);
          toast.error("Failed to create product");
        })
        .finally(() => setShowModal(false));
    }
  }

  return (
    <div className="min-h-screen flex bg-[#f5efe6]">
      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <h1 className="text-[17px] font-medium text-gray-900">Products</h1>
            <p className="text-[12px] text-gray-400 mt-0.5">
              {products.length} products across 5 categories
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-orange-600 text-white text-[12.5px] font-medium px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus size={14} />
            Add product
          </button>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-3 gap-3">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden"
            >
              <div className="h-[72px] bg-[#f5efe6] flex items-center justify-center text-4xl border-b border-gray-50">
                {p.product_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.product_url}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  p.emoji || ""
                )}
              </div>
              <div className="p-3.5">
                <p className="text-[12.5px] font-medium text-gray-900">
                  {p.name}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5 mb-3">
                  {p.category}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-orange-600">
                    {p.price}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${p.inStock ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
                    >
                      {p.inStock ? "In stock" : "Out of stock"}
                    </span>
                    <button
                      onClick={() => openEdit(p)}
                      className="w-6 h-6 rounded-md border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Pencil size={11} />
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="w-6 h-6 rounded-md border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-colors"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-gray-100 w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <p className="text-[14px] font-medium text-gray-900">
                {editProduct ? "Edit product" : "Add new product"}
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            <div className="px-5 py-4 flex flex-col gap-3.5">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-gray-500">
                  Product name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Spicy Chicken Wrap"
                  className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[12.5px] text-gray-700 placeholder:text-gray-300"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-gray-500">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Short description…"
                  rows={3}
                  className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[12.5px] text-gray-700 placeholder:text-gray-300 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-gray-500">
                    Price (₦)
                  </label>
                  <input
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    placeholder="0.00"
                    className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[12.5px] text-gray-700 placeholder:text-gray-300"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-gray-500">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[12.5px] text-gray-700"
                  >
                    {categories
                      .filter((c) => c !== "All")
                      .map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-gray-500">
                    Stock quantity
                  </label>
                  <input
                    type="number"
                    value={form.stock_quantity}
                    onChange={(e) =>
                      setForm({ ...form, stock_quantity: e.target.value })
                    }
                    placeholder="1"
                    className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[12.5px] text-gray-700 placeholder:text-gray-300"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-gray-500">
                    Active
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="is_active"
                      type="checkbox"
                      checked={!!form.is_active}
                      onChange={(e) =>
                        setForm({ ...form, is_active: e.target.checked })
                      }
                      className="w-4 h-4"
                    />
                    <label
                      htmlFor="is_active"
                      className="text-[12px] text-gray-600"
                    >
                      Is active
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-gray-500">
                  Product image URL
                </label>
                <input
                  value={form.product_url}
                  onChange={(e) =>
                    setForm({ ...form, product_url: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[12.5px] text-gray-700 placeholder:text-gray-300"
                />
                <span className="text-[11px] text-gray-400">
                  Optional — paste an image URL to display on the product card
                </span>
              </div>
            </div>
            <div className="px-5 py-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-[12.5px] text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveProduct}
                className="px-4 py-2 text-[12.5px] font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
              >
                {editProduct ? "Save changes" : "Add product"}
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
