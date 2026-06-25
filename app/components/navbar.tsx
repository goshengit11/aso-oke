"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/CartStore";
import { Menu, X, Search, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const cart = useCartStore((state) => state.cart);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0b1a33] shadow-md">
        <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between text-white">
          {/* Logo */}
          <Link href="/">
          <h1 className="text-[#b8963f] text-2xl font-semibold">ASỌ-ÒKÈ</h1>
            {/* <img
              src="/loogo.png"
              alt="logo"
              className="h-20 w-15 rounded-full object-cover"
            /> */}
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/about-us">About</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact</Link>
            </li>
          </ul>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            {/* <Search className="w-5 h-5 cursor-pointer" /> */}

            <Link href="/cart" className="relative">
              <ShoppingCart />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full min-w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/cart" className="relative bg-black">
              <ShoppingCart className="w-6 h-6" />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full min-w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button onClick={() => setIsOpen(true)} className="p-2">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-100 md:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70"
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="font-semibold text-lg text-black">Menu</h2>

            <button onClick={() => setIsOpen(false)}>
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col py-4">
            <Link
              href="/"
              className="px-6 py-4 text-lg text-black border-b"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/shop"
              className="px-6 py-4 text-lg text-black border-b"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>

            <Link
              href="/about-us"
              className="px-6 py-4 text-lg text-black border-b"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            <Link
              href="/contact-us"
              className="px-6 py-4 text-lg text-black border-b"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <button className="px-6 py-4 flex text-black items-center gap-3 text-lg">
              <Search size={20} />
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
