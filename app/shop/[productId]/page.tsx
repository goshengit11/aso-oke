"use client";

import { useState } from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { useCartStore } from "@/store/CartStore";

type ProductType = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ShopPage() {
  const product: ProductType = {
    id: 1,
    name: "Azure Royalty",
    price: 85000,
    image: "/chocolate.jpg",
  };

  const addToCart = useCartStore((state) => state.addToCart);

  const [qty, setQty] = useState<number>(1);

  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  return (
    <div className="min-h-screen bg-[#f5efe6] pt-32 pb-20">
      <Navbar />

      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6">
        <div className="bg-white min-w-4xl mt-30 grid md:grid-cols-2 gap-8 p-6 rounded-lg">
          {/* IMAGE */}
          <img
            src={product.image}
            className="w-full h-100 object-cover rounded"
            alt={product.name}
          />

          {/* DETAILS */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {product.name}
            </h1>

            <p className="text-xl mt-2 text-gray-700">
              ₦{product.price.toLocaleString()}
            </p>

            <p className="mt-4 text-sm text-gray-600">
              Premium handcrafted Aso-Oke fabric.
            </p>

            {/* QTY */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1 border text-black"
              >
                -
              </button>

              <span>{qty}</span>

              <button
                onClick={() => setQty((prev) => prev + 1)}
                className="px-3 py-1 border text-black"
              >
                +
              </button>
            </div>

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              className="mt-6 w-full bg-black text-white py-3 rounded cursor-pointer"
            >
              Add to Cart
            </button>

            <p className="mt-4 text-sm underline text-black cursor-pointer">
              Close
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
