import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-[#0b1a33]">
    <footer className="w-full bg-[#0b1a33] text-white mt-">

      {/* TOP GRID */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h1 className="text-lg tracking-widest text-[#d4af37] mb-4 hover:text-white">
            ASỌ-ÒKÈ
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed">
            Crafting premium Aso Oke heritage through timeless weaving traditions,
            modern elegance, and cultural excellence.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h2 className="text-sm font-semibold text-[#d4af37] mb-4 hover:text-white">
            QUICK LINKS
          </h2>
          <ul className="space-y-2 text-sm text-gray-300 cursor-pointer">
            <Link href={"/shop"}>
            <li className="hover:text-white transition">Shop</li>
            </Link>
            <Link href={"/about-us"}>
            <li className="hover:text-white transition">About Us</li>
            </Link>
            {/* <li className="hover:text-white transition">The Heritage</li>
            <li className="hover:text-white transition">Collections</li> */}
          </ul>
        </div>

        {/* CUSTOMER CARE */}
        <div>
          <h2 className="text-sm font-semibold text-[#d4af37] hover:text-white mb-4 ">
            CUSTOMER CARE
          </h2>
          <ul className="space-y-2 text-sm text-gray-300 cursor-pointer">
            <Link href={"/contact-us"}>
            <li className="hover:text-white transition">Contact</li>
            </Link>
            {/* <li className="hover:text-white transition">Shipping Info</li>
            <li className="hover:text-white transition">Returns</li> */}
            <li className="hover:text-white transition">Terms & Conditions</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h2 className="text-sm font-semibold text-[#d4af37] mb-4 hover:text-white">
            NEWSLETTER
          </h2>

          <p className="text-sm text-gray-300 mb-4">
            Subscribe to receive updates on new arrivals.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 bg-white py-2 text-sm text-black outline-none"
            />
            <button className="bg-[#d4af37] text-black px-4 text-sm font-semibold hover:text-white">
              SUBSCRIBE
            </button>
          </div>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-700"></div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">

        <p>© 2025 ASO OKÈ. All Rights Reserved.</p>

        <div className="flex space-x-6 mt-4 md:mt-0">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms</span>
          <span className="hover:text-white cursor-pointer">Support</span>
        </div>

      </div>

    </footer>
    </div>
  );
}