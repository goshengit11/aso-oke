"use client";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/CartStore";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCartStore();

  const router = useRouter();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-[#f9f9f9] py-10 px-4 md:px-10 text-black">
        <h1 className="text-3xl font-[serif] text-center mb-10 mt-25">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            Your cart is empty 🛒
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            
            {/* LEFT - CART ITEMS */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  {/* IMAGE */}
                  <img
                    src={item.image}
                    className="w-full h-40 object-cover rounded-lg"
                    alt={item.name}
                  />

                  {/* DETAILS */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-black">
                        {item.name}
                      </h2>
                      <p className="text-[#d4af37] font-medium mt-1">
                        ₦{item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        -
                      </button>

                      <span className="font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* PRICE + REMOVE */}
                  <div className="flex flex-col justify-between items-end">
                    <p className="font-semibold text-lg">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT - SUMMARY */}
            <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-10">
              <h2 className="text-xl font-semibold mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between mb-3">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>

              <hr className="my-4" />

              <h3 className="flex justify-between text-lg font-bold">
                <span>Grand Total</span>
                <span>₦{total.toLocaleString()}</span>
              </h3>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}