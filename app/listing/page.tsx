// "use client";

import Footer from "../components/footer";
import Navbar from "../components/navbar";

// import { useState } from "react";
// import Navbar from "../components/navbar";
// import Footer from "../components/footer";
// import { useCartStore } from "@/store/CartStore";

// export default function ProductPage() {
//   const addToCart = useCartStore((state) => state.addToCart);

//   const [qty, setQty] = useState(1);
//   const [selectedProduct, setSelectedProduct] = useState<any>(null);

//   // ✅ PRODUCT LIST
//   const products = [
//     {
//       id: 1,
//       name: "Chocolate Aso-Oke",
//       price: 18000,
//       image: "/chocolate.jpg",
//     },
//     {
//       id: 2,
//       name: "Blue Royal Aso-Oke",
//       price: 19000,
//       image: "/blue.png",
//     },
//     {
//       id: 3,
//       name: "Green Heritage Aso-Oke",
//       price: 22000,
//       image: "/green.png",
//     },
//     {
//       id: 4,
//       name: "Regal Stripe Aso-Oke",
//       price: 25000,
//       image: "/pattern.png",
//     },
//     {
//       id: 5,
//       name: "Emerald Luxury Aso-Oke",
//       price: 27000,
//       image: "/stripe.png",
//     },
//   ];

//   return (
//     <div>
//       <Navbar />

//       <div className="min-h-screen bg-[#f8f5f0] px-6 py-32">

//         {/* ================= PRODUCT LIST ================= */}
//         {!selectedProduct && (
//           <>
//             <h1 className="text-2xl font-bold mb-6">Shop Products</h1>

//             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//               {products.map((product) => (
//                 <div
//                   key={product.id}
//                   className="bg-white p-4 rounded-lg shadow"
//                 >
//                   <img
//                     src={product.image}
//                     className="h-40 w-full object-cover rounded"
//                   />

//                   <h2 className="mt-2 text-sm font-medium">
//                     {product.name}
//                   </h2>

//                   <p className="text-gray-600 text-sm">
//                     ₦{product.price.toLocaleString()}
//                   </p>

//                   {/* VIEW BUTTON */}
//                   <button
//                     onClick={() => {
//                       setSelectedProduct(product);
//                       setQty(1);
//                     }}
//                     className="mt-3 w-full bg-gray-800 text-white py-2 rounded"
//                   >
//                     View
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* ================= PRODUCT DETAILS ================= */}
//         {selectedProduct && (
//           <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

//             {/* IMAGE */}
//             <div>
//               <img
//                 src={selectedProduct.image}
//                 className="w-full h-[400px] object-cover rounded"
//               />
//             </div>

//             {/* DETAILS */}
//             <div>
//               <h1 className="text-3xl font-semibold">
//                 {selectedProduct.name}
//               </h1>

//               <p className="text-xl mt-2">
//                 ₦{selectedProduct.price.toLocaleString()}
//               </p>

//               <p className="mt-4 text-gray-600 text-sm">
//                 Premium handwoven Aso-Oke fabric with elegant finishing.
//               </p>

//               {/* QTY */}
//               <div className="flex items-center gap-4 mt-6">
//                 <button
//                   onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
//                   className="px-3 py-1 border"
//                 >
//                   -
//                 </button>

//                 <span>{qty}</span>

//                 <button
//                   onClick={() => setQty(qty + 1)}
//                   className="px-3 py-1 border"
//                 >
//                   +
//                 </button>
//               </div>

//               {/* ADD TO CART */}
//               <button
//                 onClick={() => addToCart(selectedProduct, qty)}
//                 className="mt-6 w-full bg-black text-white py-3 rounded"
//               >
//                 Add to Cart
//               </button>

//               {/* BACK BUTTON */}
//               <button
//                 onClick={() => setSelectedProduct(null)}
//                 className="mt-4 text-sm underline"
//               >
//                 ← Back to products
//               </button>
//             </div>
//           </div>
//         )}

//       </div>

//       <Footer />
//     </div>
//   );
// }
// // import { useState } from "react";
// // import Navbar from "../components/navbar";
// // import Footer from "../components/footer";
// // import { useCartStore } from "@/store/CartStore";

// // export default function ProductPage() {
// //   const [qty, setQty] = useState(1);

// //   // ✅ Zustand
// //   const addToCart = useCartStore((state) => state.addToCart);

// //   // ✅ Define product properly
// //   const product = [
// //     {
// //     id: 1,
// //     name: "Chocolate and cream Striped aso-oke",
// //     price: 18000,
// //     image: "/chocolate.jpg",
// //     },
// //      {
// //     id: 2,
// //     name: "Chocolate and cream Striped aso-oke",
// //     price: 19000,
// //     image: "/chocolate.jpg",
// //      }
// //   ];

// //   const related = [
// //     {
// //       name: "royal blue striped aso-oke",
// //       price: "₦18,000/pack",
// //       img: "/blue.png",
// //     },
// //     {
// //       name: "green",
// //       price: "₦110,000",
// //       img: "/green.png",
// //     },
// //     {
// //       name: "Regal Stripe",
// //       price: "₦86,000",
// //       img: "/pattern.png",
// //     },
// //     {
// //       name: "Emerald Pattern",
// //       price: "₦92,000",
// //       img: "/stripe.png",
// //     },
// //   ];

// //   return (
// //     <div>
// //       <Navbar />

// //       <div className="bg-[#f8f5f0] min-h-screen px-6 py-40">
// //         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

// //           {/* LEFT - IMAGE */}
// //           <div>
// //             <div className="rounded-xl overflow-hidden">
// //               <img
// //                 src={product.image}
// //                 alt="image"
// //                 className="w-full h-[400px] object-cover"
// //               />
// //             </div>

// //             <div className="flex gap-3 mt-4">
// //               {[1, 2, 3].map((i) => (
// //                 <img
// //                   key={i}
// //                   src={product.image}
// //                   className="w-20 h-20 object-cover rounded-lg cursor-pointer"
// //                 />
// //               ))}
// //             </div>
// //           </div>

// //           {/* RIGHT - DETAILS */}
// //           <div>
// //             <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
// //               {product.name}
// //             </h1>

// //             <p className="text-xl mt-2 text-gray-700">
// //               ₦{product.price.toLocaleString()}
// //             </p>

// //             <p className="mt-4 text-sm text-gray-600 leading-relaxed">
// //               A masterpiece of traditional Aso Oke weaving, this fabric embodies
// //               the heritage of Yoruba craftsmanship. Hand-woven to perfection,
// //               featuring a rich chocolate tone with elegant cream stripes.
// //             </p>

// //             {/* QUANTITY + BUTTON */}
// //             <div className="flex items-center gap-4 mt-6">
// //               <div className="flex items-center border rounded-lg overflow-hidden text-black">
// //                 <button
// //                   onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
// //                   className="px-3 py-2"
// //                 >
// //                   -
// //                 </button>

// //                 <span className="px-4">{qty}</span>

// //                 <button
// //                   onClick={() => setQty(qty + 1)}
// //                   className="px-3 py-2"
// //                 >
// //                   +
// //                 </button>
// //               </div>

// //               <button
// //   onClick={() => addToCart(product, qty)}
// //   className="bg-gradient-to-r from-[#0c1f3f] to-[#132d5c] text-white px-6 py-3 rounded-lg w-full md:w-auto
// //   transition-all duration-300 hover:scale-105 hover:shadow-xl"
// // >
// //   ADD TO CART
// // </button>
// //             </div>

// //             {/* PRODUCT CARE */}
// //             <div className="mt-8">
// //               <h3 className="font-semibold text-gray-800 mb-3">
// //                 PRODUCT CARE
// //               </h3>

// //               <div className="flex flex-wrap gap-6 text-sm text-gray-600">
// //                 <span>🧼 Hand wash cold</span>
// //                 <span>🚫 Do not bleach</span>
// //                 <span>🧴 Dry clean recommended</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* RELATED PRODUCTS */}
// //         <div className="mt-20 max-w-7xl mx-auto">
// //           <h2 className="text-2xl font-semibold mb-6">
// //             Related Products
// //           </h2>

// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// //             {related.map((item, index) => (
// //               <div key={index} className="bg-white p-3 rounded-lg shadow">
// //                 <img
// //                   src={item.img}
// //                   className="h-40 w-full object-cover rounded"
// //                 />
// //                 <h3 className="mt-2 text-sm">{item.name}</h3>
// //                 <p className="text-gray-600 text-sm">{item.price}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // }

// // import Navbar from "../components/navbar";
// // import Footer from "../components/footer";
// // import { useCartStore } from "@/store/CartStore";

// // export default function ProductPage() {
// //   const addToCart = useCartStore((state) => state.addToCart);

// //   // ✅ MULTIPLE PRODUCTS
// //   const products = [
// //     {
// //       id: 1,
// //       name: "Chocolate Aso-Oke",
// //       price: 18000,
// //       image: "/chocolate.jpg",
// //     },
// //     {
// //       id: 2,
// //       name: "Blue Royal Aso-Oke",
// //       price: 19000,
// //       image: "/blue.png",
// //     },
// //     {
// //       id: 3,
// //       name: "Green Heritage Aso-Oke",
// //       price: 22000,
// //       image: "/green.png",
// //     },
// //     {
// //       id: 4,
// //       name: "Regal Stripe Aso-Oke",
// //       price: 25000,
// //       image: "/pattern.png",
// //     },
// //     {
// //       id: 5,
// //       name: "Emerald Luxury Aso-Oke",
// //       price: 27000,
// //       image: "/stripe.png",
// //     },
// //   ];

// //   return (
// //     <div>
// //       <Navbar />

// //       <div className="min-h-screen bg-[#f8f5f0] px-6 py-32">
// //         <h1 className="text-2xl font-bold mb-8">Our Products</h1>

// //         {/* GRID LISTING */}
// //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
// //           {products.map((product) => (
// //             <div
// //               key={product.id}
// //               className="bg-white rounded-lg shadow p-3 hover:shadow-lg transition"
// //             >
// //               {/* IMAGE */}
// //               <img
// //                 src={product.image}
// //                 className="h-40 w-full object-cover rounded"
// //               />

// //               {/* NAME */}
// //               <h2 className="mt-2 text-sm font-medium">
// //                 {product.name}
// //               </h2>

// //               {/* PRICE */}
// //               <p className="text-gray-600 text-sm">
// //                 ₦{product.price.toLocaleString()}
// //               </p>

// //               {/* ADD TO CART */}
// //               <button
// //                 onClick={() => addToCart(product, 1)}
// //                 className="mt-3 w-full bg-[#0c1f3f] text-white py-2 rounded
// //                 hover:bg-[#132d5c] transition"
// //               >
// //                 Add to Cart
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // }

export default function ProductPage() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#f8f5f0] px-6 py-32">
        <h1 className="text-2xl font-bold mb-8">Our Products</h1>
        <p className="text-gray-600 text-sm">
          Explore our premium collection of handwoven Aso-Oke fabrics, crafted
          with care and tradition.
        </p>
      </div>
      <Footer />
    </div>
  );
}
