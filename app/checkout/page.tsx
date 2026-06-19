"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { initializeAsoOkeCheckout, CheckoutPayload } from "@/app/api/api";
import { useCartStore } from "@/store/CartStore";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  qty?: number;
  quantity?: number;
}
interface CheckoutForm {
  name: string;
  email: string;
  address: string;
  city: string;
  phone: string;
}

export default function CheckoutPage() {
  const router = useRouter();

  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  // read cart directly from persisted store
  const cart = useCartStore((s) => s.cart) as CartItem[];

  // TOTAL (support both `qty` and `quantity` fields)
  const total = cart.reduce((acc, item) => {
    const q = Number(item.quantity ?? item.qty ?? 0) || 0;
    return acc + item.price * q;
  }, 0);

  // HANDLE INPUT
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // PLACE ORDER
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.address.trim() ||
      !form.phone.trim()
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token") || "";

      const payload: CheckoutPayload = {
        email: form.email,
        amount: total,
        callback_url: window.location.origin,
        metadata: {
          name: form.name,
          phone: form.phone,
          address: form.address,
          cart: cart,
          store: "aso_oke",
        },
      };

      const res = await initializeAsoOkeCheckout(token, payload);

      // API wrapper returns backend res.data — follow the provided sample
      const authUrl =
        res?.data?.authorization_url ||
        res?.authorization_url ||
        res?.data?.authorization_url;

      if (authUrl) {
        // Redirect user to Paystack checkout
        window.location.assign(authUrl as string);
      } else {
        console.error("Unexpected checkout response:", res);
        alert("Failed to initialize payment. Please try again.");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      alert(err?.message || "Failed to initialize checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f5f0] min-h-screen px-6 py-30">
      <Navbar />

      <h1 className="text-3xl text-center font-[serif] mb-10 text-black">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {/* LEFT - FORM */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-black">
            Billing Details
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              name="name"
              value={form.name}
              placeholder="Full Name"
              onChange={handleChange}
              className="border p-3 rounded-lg w-full text-black"
            />

            <input
              name="email"
              value={form.email}
              placeholder="Email Address"
              onChange={handleChange}
              className="border p-3 rounded-lg w-full text-black"
            />

            <input
              name="phone"
              value={form.phone}
              placeholder="Phone Number"
              onChange={handleChange}
              className="border p-3 rounded-lg w-full text-black"
            />

            <input
              name="city"
              value={form.city}
              placeholder="City"
              onChange={handleChange}
              className="border p-3 rounded-lg w-full text-black"
            />
          </div>

          <textarea
            name="address"
            value={form.address}
            placeholder="Full Address"
            onChange={handleChange}
            className="border p-3 rounded-lg w-full mt-5 text-black"
            rows={4}
          />
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-10">
          <h2 className="text-xl font-semibold mb-4 text-black">
            Order Summary
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto text-black">
            {cart.length > 0 ? (
              cart.map((item) => {
                const q = Number(item.quantity ?? item.qty ?? 0) || 0;
                return (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} x {q}
                    </span>

                    <span>₦{(item.price * q).toLocaleString()}</span>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500">Your cart is empty</p>
            )}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold text-lg text-gray-500">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>

          <button
            onClick={handleOrder}
            disabled={cart.length === 0}
            className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Place Order
          </button>
        </div>
      </div>

      <div className="h-20" />

      <Footer />
    </div>
  );
}
