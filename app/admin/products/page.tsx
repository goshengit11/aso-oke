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
  price: string;
  inStock: boolean;
  product_url?: string;
  emoji?: string;
  stock_quantity?: number;
  is_active?: boolean;
};

const initialProducts: Product[] = [];

const emptyForm = {
  name: "",
  description: "",
  price: "",
  product_url: "",
  stock_quantity: "1",
  is_active: true,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);

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
            price: p.price ? `₦${p.price}` : "₦0.00",
            inStock: p.stock_quantity ? p.stock_quantity > 0 : true,
            product_url: p.product_url || p.url || p.image || "",
            emoji: p.emoji || "",
            stock_quantity: p.stock_quantity,
            is_active: p.is_active,
          }));

          setProducts(mapped);
        }
      })
      .catch((err) => console.error("Failed to load products", err));

    return () => {
      mounted = false;
    };
  }, []);

  function openEdit(p: Product) {
    setEditProduct(p);
    setForm({
      name: p.name,
      description: "Hand woven aso-oke",
      price: p.price,
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
      })
        .then(() => {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === editProduct.id
                ? {
                    ...p,
                    name: form.name,
                    price: form.price.startsWith("₦")
                      ? form.price
                      : `₦${form.price}`,
                    product_url: form.product_url || p.product_url,
                    stock_quantity:
                      parseInt(String(form.stock_quantity)) || p.stock_quantity,
                    is_active: form.is_active,
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
        is_active: true,
      };

      createAsoOkeProduct(token, payload)
        .then((res) => {
          const created =
            res?.data?.item ||
            res?.item ||
            res?.data?.product ||
            res?.data ||
            res;

          const newProduct: Product = {
            id: created?.id || created?._id || Date.now(),
            name: created?.name || payload.name,
            price: created?.price ? `₦${created.price}` : `₦${payload.price}`,
            inStock: created?.stock_quantity
              ? created.stock_quantity > 0
              : true,
            product_url: created?.product_url || payload.product_url || "",
            emoji: "",
            stock_quantity: created?.stock_quantity || payload.stock_quantity,
            is_active: true,
          };

          setProducts((prev) => [newProduct, ...prev]);
          toast.success("Product created");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to create product");
        })
        .finally(() => setShowModal(false));
    }
  }

  return (
    <div className="min-h-screen flex bg-[#f5efe6]">
      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h1 className="text-[17px] font-medium text-gray-900">Products</h1>
            <p className="text-[12px] text-gray-400 mt-0.5">
              {products.length} products
            </p>
          </div>

          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-orange-600 text-white text-[12.5px] font-medium px-4 py-2 rounded-lg hover:bg-orange-700"
          >
            <Plus size={14} />
            Add product
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden"
            >
              <div className="h-[72px] bg-[#f5efe6] flex items-center justify-center text-4xl border-b">
                {p.product_url ? (
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

                <div className="flex items-center justify-between mt-2">
                  <span className="text-[13px] font-medium text-orange-600">
                    {p.price}
                  </span>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${
                        p.inStock
                          ? "bg-green-50 text-green-800"
                          : "bg-red-50 text-red-800"
                      }`}
                    >
                      {p.inStock ? "In stock" : "Out of stock"}
                    </span>

                    <button onClick={() => openEdit(p)}>
                      <Pencil size={11} />
                    </button>

                    <button onClick={() => deleteProduct(p.id)}>
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* DARK MODAL FIX */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 text-white rounded-2xl w-full max-w-md overflow-hidden border border-gray-700">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
              <p className="text-[14px] font-medium">
                {editProduct ? "Edit product" : "Add product"}
              </p>
              <button onClick={() => setShowModal(false)}>
                <X size={14} />
              </button>
            </div>

            <div className="px-5 py-4 flex flex-col gap-3.5">
              <input
                placeholder="Product name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm outline-none"
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm outline-none"
              />

              <input
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm outline-none"
              />

              <input
                placeholder="Stock quantity"
                type="number"
                value={form.stock_quantity}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stock_quantity: e.target.value,
                  })
                }
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm outline-none"
              />

              <input
                placeholder="Image URL"
                value={form.product_url}
                onChange={(e) =>
                  setForm({
                    ...form,
                    product_url: e.target.value,
                  })
                }
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm outline-none"
              />

              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      is_active: e.target.checked,
                    })
                  }
                />
                Active
              </label>
            </div>

            <div className="px-5 py-3 border-t border-gray-700 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm border border-gray-600 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={saveProduct}
                className="px-4 py-2 text-sm bg-orange-600 text-white rounded-lg"
              >
                {editProduct ? "Save" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
