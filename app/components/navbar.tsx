"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/CartStore";
import { Menu, X, Search, ShoppingCart } from "lucide-react";

type CartItem = {
  id: number | string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const cart = useCartStore((state) => state.cart);

  const totalItems = cart.reduce(
    (total: number, item: CartItem) => total + item.quantity,
    0,
  );

  return (
    <nav className="w-full bg-[#0b1a33] fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">
        <img
          src="/logobac.jpeg"
          alt="logo"
          className="h-10 w-10 rounded-full"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/shop">
            <li>Shop</li>
          </Link>
          <Link href="/about-us">
            <li>About</li>
          </Link>
          <Link href="/contact-us">
            <li>Contact</li>
          </Link>
        </ul>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-4">
          <Search className="w-5 h-5 cursor-pointer" />

          {/* CART */}
          <Link href="/cart" className="relative cursor-pointer">
            <ShoppingCart className="w-5 h-5" />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
}
