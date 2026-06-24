"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCartStore } from "@/store/CartStore";
import Navbar from "../components/navbar";

export default function SuccessPage() {
  const params = useSearchParams();

  const reference =
    params.get("reference") || params.get("trxref");

  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // Clear cart once page loads
    clearCart();
  }, [clearCart]);

  return (
    <div>
        <Navbar/>
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      
      <h1 className="text-3xl font-semibold mb-4 text-green-600">
        Order Placed Successfully 🎉
      </h1>

      <p className="text-gray-600 mb-2">
        Thank you for your purchase!
      </p>

      {reference && (
        <p className="text-sm text-gray-500 mb-6">
          Reference: <span className="font-medium">{reference}</span>
        </p>
      )}

      <p className="text-gray-500 mb-6">
        We’ll start processing your order right away.
      </p>

      <a
        href="/shop"
        className="bg-black text-white px-6 py-2 rounded-full hover:scale-105 transition"
      >
        Continue Shopping
      </a>

    </div>
    </div>
  );
}