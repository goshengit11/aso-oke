// // import Navbar from "../components/navbar";
// // import Footer from "../components/footer";
// // export default function NewArrivals() {
// //   const products = [
// //     {
// //       id: 1,
// //       name: "Modern Stripe Weave",
// //       price: "₦45,000",
// //       btn: 'Add to cart',
// //       image: "/chocolate.jpg",
// //     },
// //     {
// //       id: 2,
// //       name: "Luxury Burgundy Set",
// //       price: "₦18,000",
// //       btn: 'Add to cart',
// //       image: "/plain.png",
// //     },
// //     {
// //       id: 3,
// //       name: "Royal Blue Aso Oke",
// //       price: "₦18,000",
// //       btn: 'Add to cart',
// //       image: "/stripe.png",
// //     },
// //     {
// //       id: 4,
// //       name: "Classic Gold Pattern",
// //       price: "₦18,000",
// //       btn: 'Add to cart',
// //       image: "/gold.jpg",
// //     },
// //     {
// //       id: 1,
// //       name: "Modern Stripe Weave",
// //       price: "₦45,000",
// //       btn: 'Add to cart',
// //       image: "/chocolate.jpg",
// //     },
// //     {
// //       id: 2,
// //       name: "Luxury Burgundy Set",
// //       price: "₦18,000",
// //       btn: 'Add to cart',
// //       image: "/plain.png",
// //     },
// //     {
// //       id: 3,
// //       name: "Royal Blue Aso Oke",
// //       price: "₦18,000",
// //       btn: 'Add to cart',
// //       image: "/stripe.png",
// //     },
// //     {
// //       id: 4,
// //       name: "Classic Gold Pattern",
// //       price: "₦18,000",
// //       btn: 'Add to cart',
// //       image: "/gold.jpg",
// //     },
// //   ];

// //   return (
// //     <div>
// //           <Navbar/>
// //     <section className="w-full bg-[#f5efe6] py-20">
      
// //       <div className="max-w-7xl mx-auto px-6">

// //         {/* SECTION HEADER */}
// //         <div className="text-center mb-12">
// //           <h2 className="text-3xl md:text-4xl font-[serif] text-[#1a1a1a]">
// //             New Arrivals
// //           </h2>
// //           <div className="w-16 h-[2px] bg-[#d4af37] mx-auto mt-3"></div>
// //         </div>

// //         {/* PRODUCT GRID */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

// //           {products.map((product) => (
// //             <div key={product.id} className="group border border-[#d4af37]">

// //               {/* IMAGE CARD */}
// //               <div className="relative overflow-hidden">
// //                 <img
// //                   src={product.image}
// //                   alt={product.name}
// //                   className="w-full h-[300px] object-cover transform group-hover:scale-105 transition duration-500"
// //                 />

// //                 {/* NEW BADGE */}
// //                 <span className="absolute top-3 left-3 bg-[#d4af37] text-black text-xs px-2 py-1">
// //                   NEW
// //                 </span>
// //               </div>

// //               {/* PRODUCT INFO */}
// //               <div className="flex gap-7">
// //               <div className="mt-4 space-y-1">
// //                 <h3 className="text-sm text-gray-800">
// //                   {product.name}
// //                 </h3>
// //                 <p className="text-sm text-[#d4af37] font-semibold">
// //                   {product.price}
// //                 </p>
// //               </div>
                
// //               <button className="text-xs border text-white h-8 bg-black px-3 py-1 mt-5 ml-5 rounded-full w-fit animate-bounce">
// //                 {product.btn}
// //               </button>
// //               </div>
// //             </div>
// //           ))}

// //         </div>

// //       </div>
// //     </section>
// //      <Footer/>
// //     </div>
// //   );
// // }



// "use client";
// import { useRouter } from "next/navigation";
// import Navbar from "../components/navbar";
// import Footer from "../components/footer";
// import Link from "next/link";

// export default function NewArrivals() {
//   const router = useRouter();

//   const products = [
//     { id: 1, name: "Modern Stripe Weave", price: 45000, image: "/chocolate.jpg" },
//     { id: 2, name: "Luxury Burgundy Set", price: 18000, image: "/plain.png" },
//     { id: 3, name: "Royal Blue Aso Oke", price: 18000, image: "/stripe.png" },
//     { id: 4, name: "Classic Gold Pattern", price: 18000, image: "/gold.jpg" },
//      { id: 1, name: "Modern Stripe Weave", price: 45000, image: "/chocolate.jpg" },
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

//     router.push("/cart");
//   };

//   return (
//       <div className="bg-[#f5efe6]">
//         <Navbar/>
//     <div className="text-center mb-12">
//            <h2 className="text-3xl mt-25 md:text-4xl font-[serif] text-[#1a1a1a]">
//               New Arrivals
//               </h2>
//            <div className="w-16 h-[2px] bg-[#d4af37] mx-auto mt-3"></div>
//          </div>
   
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 ">
//             {products.map((product) => (
//         <div key={product.id} className="border border-[#d4af37] p-4">
//           <img src={product.image} className="h-75 w-full object-cover hover:scale-105 transition duration-500" />
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
//          <Link href={"/"}> 
//         <button className="h-10 w-35 border border-gray-500 text-black text-lg mt-10 cursor-pointer hover:bg-black hover:text-white hover:scale-105 transition duration-500">
//           Back
//         </button>
//         </Link>
//         </div>
//         <div className="h-40"></div>
//       <Footer/>
//     </div>
//   );
// }




"use client";
import { useState } from "react";
import { useCartStore } from "@/store/CartStore";
import Link from "next/link";
 import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function NewArrivals() {
  const addToCart = useCartStore((state) => state.addToCart);
  
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [qty, setQty] = useState(1);

  const products = [
    { id: 1, name: "Modern Stripe Weave", price: 45000, image: "/chocolate.jpg" },
    { id: 2, name: "Luxury Burgundy Set", price: 18000, image: "/plain.png" },
    { id: 3, name: "Royal Blue Aso Oke", price: 18000, image: "/stripe.png" },
    { id: 4, name: "Classic Gold Pattern", price: 18000, image: "/gold.jpg" },
      { id: 1, name: "Modern Stripe Weave", price: 45000, image: "/chocolate.jpg" },
    { id: 2, name: "Luxury Burgundy Set", price: 18000, image: "/plain.png" },
    { id: 3, name: "Royal Blue Aso Oke", price: 18000, image: "/stripe.png" },
    { id: 4, name: "Classic Gold Pattern", price: 18000, image: "/gold.jpg" },
  ];

  return (
    <div>
      <Navbar/>
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 py-35">
        {products.map((product) => (
          <div key={product.id} className="border border-[#d4af37] p-4 relative">
            
            <img
              src={product.image}
              className="h-[300px] w-full object-cover hover:scale-105 transition duration-500"
            />

            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-black py-3">{product.name}</h3>
                <p className="text-black">
                  ₦{product.price.toLocaleString()}
                </p>
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
          <Link href={"/"}> 
        <button className="h-10 w-35 border border-gray-500 text-black text-lg mt-10 cursor-pointer hover:bg-black hover:text-white hover:scale-105 transition duration-500">
           Back
        </button>
         </Link>
         </div>
         <div className="h-40"></div>
      <Footer/>
    </div>
  );
}