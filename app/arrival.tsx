"use client";

// "use client";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function NewArrivals() {
//   // const addToCart = () => {
//   const products = [
//     {
//       id: 1,
//       name: "Modern Stripe Weave",
//       price: "₦45,000",
//       btn: 'Add to cart',
//       image: "/chocolate.jpg",
//     },
//     {
//       id: 2,
//       name: "Luxury Burgundy Set",
//       price: "₦18,000",
//       btn: 'Add to cart',
//       image: "/plain.png",
//     },
//     {
//       id: 3,
//       name: "Royal Blue Aso Oke",
//       price: "₦18,000",
//       btn: 'Add to cart',
//       image: "/stripe.png",
//     },
//     {
//       id: 4,
//       name: "Classic Gold Pattern",
//       price: "₦18,000",
//       btn: 'Add to cart',
//       image: "/gold.jpg",
//     },
//   ]
// // }

//       const addToCart = (product) => {
//     const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

//     const index = existingCart.findIndex(
//       (item) => item.id === product.id
//     );

//     if (index > -1) {
//       existingCart[index].qty += 1;
//     } else {
//       existingCart.push({ ...product, qty: 1 });
//     }

//     localStorage.setItem("cart", JSON.stringify(existingCart));

//     router.push("/cart");
//   };

//   return (
//     <section className="w-full bg-white py-20">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* SECTION HEADER */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-[serif] text-[#1a1a1a]">
//             New Arrivals
//           </h2>
//           <div className="w-16 h-[2px] bg-[#d4af37] mx-auto mt-3"></div>
//         </div>

//         {/* PRODUCT GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

//           {products.map((product) => (
//             <div key={product.id} className="group border border-[#d4af37]">

//               {/* IMAGE CARD */}
//               <div className="relative overflow-hidden">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-[300px] object-cover transform group-hover:scale-105 transition duration-500"
//                 />

//                 {/* NEW BADGE */}
//                 <span className="absolute top-3 left-3 bg-[#d4af37] text-black text-xs px-2 py-1">
//                   NEW
//                 </span>
//               </div>

//               {/* PRODUCT INFO */}
//               <div className="flex gap-7">
//               <div className="mt-4 space-y-1">
//                 <h3 className="text-sm text-gray-800">
//                   {product.name}
//                 </h3>
//                 <p className="text-sm text-[#d4af37] font-semibold">
//                   {product.price}
//                 </p>
//               </div>
//                 <Link href={"/cart"}>
//               <button className="text-xs border text-white h-8 bg-black px-3 py-1 mt-5 ml-5 cursor-pointer rounded-full w-fit animate-bounce">
//                 {product.btn}
//               </button>
//               </Link>
//               </div>
//             </div>
//           ))}

//         </div>

//       </div>
//       <div className="flex place-content-center">
//         <Link href={"/All-arrival"}>
//         <button className="h-10 w-40 border border-gray-500 text-black text-lg mt-10 cursor-pointer hover:scale-105 transition duration-500">
//           All New Arrivals
//         </button>
//         </Link>
//       </div>
//     </section>
//   );
// }

// import { useCartStore } from "@/store/CartStore";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function NewArrivals() {
//   const router = useRouter();
//   const { cart } = useCartStore();
//   const totalItems = cart.reduce(
//   (acc, item) => acc + item.quantity,
//   0
// );

//   const products = [
//     { id: 1, name: "Modern Stripe Weave", price: 45000, image: "/chocolate.jpg" },
//     { id: 2, name: "Luxury Burgundy Set", price: 18000, image: "/plain.png" },
//     { id: 3, name: "Royal Blue Aso Oke", price: 18000, image: "/stripe.png" },
//     { id: 4, name: "Classic Gold Pattern", price: 18000, image: "/gold.jpg" },
//   ];

//   const addToCart = (product) => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];

//     const index = cart.findIndex((item) => item.id === product.id);

//     if (index > -1) {
//       cart[index].qty += 1;
//     } else {
//       cart.push({ ...product, qty: 1 });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));

//     router.push("/Cart");
//   };

//   return (
//       <div>
//     <div className="text-center mb-12">
//            <h2 className="text-3xl md:text-4xl font-[serif] text-[#1a1a1a]">
//               New Arrivals
//               </h2>
//            <div className="w-16 h-[2px] bg-[#d4af37] mx-auto mt-3"></div>
//          </div>

//     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 ">
//             {products.map((product) => (
//         <div key={product.id} className="border border-[#d4af37] p-4">
//           <img src={product.image} className="h-[300px] w-full object-cover hover:scale-105 transition duration-500" />
//           <div className="flex">
//             <div>
//           <h3 className="text-black py-3">{product.name}</h3>
//           <p className="text-black">₦{product.price.toLocaleString()}</p>
//            </div>

//           <button
//             onClick={() => addToCart(product)}
//             className="bg-black text-white rounded-3xl h-8 text-sm ml-10 px-3 py-1 mt-6 hover:scale-105 transition duration-500 animate-bounce"
//           >
//             Add to Cart
//           </button>
//           </div>
//             <span className="absolute top-3 left-3 bg-[#d4af37] text-black text-xs px-2 py-1">
//                   NEW
//                 </span>
//         </div>

//       ))}
//       </div>
//       <div className="flex place-content-center">
//          <Link href={"/All-arrival"}>
//         <button className="h-10 w-40 border border-gray-500 text-black text-lg mt-10 cursor-pointer hover:scale-105 transition duration-500">
//           All New Arrivals
//         </button>
//         </Link>
//       </div>
//            <div className="h-40"></div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useCartStore } from "@/store/CartStore";
import Link from "next/link";

export default function NewArrivals() {
  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [qty, setQty] = useState(1);

  const products = [
    {
      id: 1,
      name: "Modern Stripe Weave",
      price: 18000,
      image: "/chocolate.jpg",
    },
    { id: 2, name: "Luxury Burgundy Set", price: 18000, image: "/plain.png" },
    { id: 3, name: "Royal Blue Aso Oke", price: 18000, image: "/stripe.png" },
    { id: 4, name: "Classic Gold Pattern", price: 18000, image: "/gold.jpg" },
  ];

  return (
    <div>
       <div className="text-center mb-10">
        <h2 className="text-xxl md:text-2xl mt-10 text-gray-800">
          New Arrivals
        </h2>
        <div className="w-16 h-0.5 bg-[#d4af37] mx-auto mt-3"></div>
      </div>
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
       
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-[#d4af37] p-4 relative"
          >
            <img
              src={product.image}
              className="h-55 w-full object-cover hover:scale-105 transition duration-500"
            />

            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-black py-3">{product.name}</h3>
                <p className="text-black">₦{product.price.toLocaleString()}</p>
              </div>

              <button
                onClick={() => addToCart(product, 1)}
                className="bg-black text-white rounded-3xl h-8 text-sm px-3 animate-bounce hover:scale-105 transition"
              >
                Add to Cart
              </button>
            </div>

            <span className="absolute top-3 left-3 bg-[#d4af37] text-black text-xs px-2 py-1">
              NEW
            </span>
          </div>
        ))}
      </div>
      <div className="flex place-content-center">
        <Link href={"/All-arrival"}>
          <button className="h-10 w-40 border border-gray-500 text-black text-lg mt-10 cursor-pointer hover:scale-105 transition duration-500">
            All New Arrivals
          </button>
        </Link>
      </div>
      <div className="h-10"></div>
    </div>
  );
}
