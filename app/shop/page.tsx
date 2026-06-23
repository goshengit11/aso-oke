"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { useCartStore } from "@/store/CartStore";
import { getProductsTok } from "../api/api";

/* ================= TYPES ================= */
type Product = {
  id: string | number;
  name: string;
  price: number;
  product_url: string;
  description: string;
  stock_quantity: number;
  is_active: boolean;
};

type ProductsResponse = {
  data?: {
    items?: Product[];
  };
};

const CATEGORY_FILTERS = [
  "Plain & Classic",
  "Patterned",
  "Striped",
  "Special Occasion",
  "Accessories",
] as const;

export default function ShopPage() {
  const addToCart = useCartStore((state) => state.addToCart);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState<number>(1);

  /* ================= FETCH PRODUCTS ================= */
  const handleFetchProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const res: ProductsResponse = await getProductsTok();
      const items = res?.data?.items ?? [];

      setProducts(items);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("We couldn't load the shop right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchProducts();
  }, []);

  const openProduct = (product: Product): void => {
    setSelectedProduct(product);
    setQty(1);
  };

  const closeProduct = (): void => {
    setSelectedProduct(null);
    setQty(1);
  };

  const isOutOfStock = (product: Product): boolean =>
    !product.is_active || product.stock_quantity <= 0;

  const handleAddToCart = (product: Product, quantity: number): void => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.product_url,
      },
      quantity,
    );
  };

  /* ================= UI ================= */
  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-[#f5efe6] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-10">
            Product Listing
          </h1>

          <div className="grid md:grid-cols-4 gap-10">
            {/* ================= FILTER ================= */}
            <aside className="md:col-span-1 space-y-8">
              {/* <h2 className="text-sm font-semibold text-gray-700">FILTER BY</h2> */}

              <div>
                <p className="text-sm font-medium mb-3">Category</p>
                <div className="space-y-2 text-sm text-gray-600">
                  {CATEGORY_FILTERS.map((item) => (
                    <label key={item} className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* <div>
                <p className="text-sm font-medium mb-3">Price</p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="₦ Min"
                    className="w-full border px-2 py-1 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="₦ Max"
                    className="w-full border px-2 py-1 text-sm"
                  />
                </div>
              </div>

              <button className="border px-4 py-2 text-sm hover:bg-gray-100">
                Clear Filters
              </button> */}
            </aside>

            {/* ================= PRODUCTS ================= */}
            <div className="md:col-span-3">
              {loading ? (
                <p className="text-gray-600">Loading products...</p>
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : products.length === 0 ? (
                <p className="text-gray-600">No products found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg overflow-hidden border group"
                    >
                      {/* IMAGE */}
                      <div className="relative">
                        <img
                          src={product.product_url}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                        />

                        <span className="absolute top-3 right-3 text-gray-600">
                          ♡
                        </span>
                      </div>

                      {/* INFO */}
                      <div className="p-4">
                        <h3 className="text-sm text-gray-800">
                          {product.name}
                        </h3>

                        <p className="text-sm font-semibold text-[#1a1a1a] mt-1">
                          ₦{product.price.toLocaleString()}
                        </p>

                        {/* BUTTONS */}
                        <div className="flex justify-between mt-4">
                          {/* VIEW */}
                          <button
                            onClick={() => openProduct(product)}
                            className="text-xs bg-black text-white px-4 py-2 rounded-full hover:scale-105 transition"
                          >
                            View
                          </button>

                          {/* ADD TO CART */}
                          <button
                            onClick={() => handleAddToCart(product, 1)}
                            disabled={isOutOfStock(product)}
                            className="text-xs border border-black text-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= PRODUCT MODAL ================= */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-5 flex items-center justify-center bg-[#1a1208]/60 backdrop-blur-sm p-4"
          onClick={closeProduct}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-[#fbf6ee] shadow-2xl ring-1 ring-[#3a2a1a]/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              onClick={closeProduct}
              aria-label="Close product details"
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#fbf6ee]/90 text-[#5c4530] shadow-md transition hover:bg-[#3a2a1a] hover:text-[#fbf6ee]"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2">
              {/* IMAGE */}
              <div className="relative h-72 md:h-full bg-[#e7dcc8]">
                <img
                  src={selectedProduct.product_url}
                  alt={selectedProduct.name}
                  className="h-full w-full object-cover"
                />
                {isOutOfStock(selectedProduct) && (
                  <span className="absolute top-4 left-4 rounded-full bg-[#3a2a1a] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#fbf6ee]">
                    Out of stock
                  </span>
                )}
              </div>

              {/* DETAILS */}
              <div className="flex flex-col p-7 md:p-8">
                <h2 className="font-serif text-2xl text-[#2e2014]">
                  {selectedProduct.name}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-[#7a6450]">
                  {selectedProduct.description}
                </p>

                <p className="mt-5 text-2xl font-semibold text-[#3a2a1a]">
                  ₦{selectedProduct.price.toLocaleString()}
                </p>

                <p className="mt-1 text-sm text-[#9c8468]">
                  {selectedProduct.stock_quantity > 0
                    ? `${selectedProduct.stock_quantity} in stock`
                    : "Currently unavailable"}
                </p>

                {/* QTY */}
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-sm font-medium text-[#5c4530]">
                    Quantity
                  </span>
                  <div className="flex items-center rounded-full border border-[#d8c7ad]">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      disabled={isOutOfStock(selectedProduct)}
                      aria-label="Decrease quantity"
                      className="h-9 w-9 rounded-full text-[#5c4530] transition hover:bg-[#3a2a1a] hover:text-[#fbf6ee] disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#5c4530]"
                    >
                      −
                    </button>

                    <span className="w-10 text-center text-sm font-medium text-[#2e2014]">
                      {qty}
                    </span>

                    <button
                      onClick={() =>
                        setQty((q) =>
                          Math.min(selectedProduct.stock_quantity || q, q + 1),
                        )
                      }
                      disabled={isOutOfStock(selectedProduct)}
                      aria-label="Increase quantity"
                      className="h-9 w-9 rounded-full text-[#5c4530] transition hover:bg-[#3a2a1a] hover:text-[#fbf6ee] disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#5c4530]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ADD TO CART */}
                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct, qty);
                    closeProduct();
                  }}
                  disabled={isOutOfStock(selectedProduct)}
                  className="mt-8 w-full rounded-full bg-[#3a2a1a] py-3 text-sm font-medium uppercase tracking-wide text-[#fbf6ee] transition hover:bg-[#2e2014] disabled:cursor-not-allowed disabled:bg-[#d8c7ad] disabled:text-[#9c8468]"
                >
                  {isOutOfStock(selectedProduct)
                    ? "Out of Stock"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
