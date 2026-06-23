import Navbar from "../components/navbar"
import Footer from "../components/footer"
export default function ContactPage() {
  return (
    <div>
        <Navbar/>
    <section className="w-full bg-[#f5efe6] pt-32 pb-20">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl md:text-5xl font-[serif] text-[#1a1a1a] mb-10">
            CONTACT US
          </h1>

          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            GET IN TOUCH
          </h2>

          <div className="space-y-6 text-sm text-gray-700">

            <div>
              <p className="font-semibold">EMAIL</p>
              <p>Aso-oke.com</p>
            </div>

            <div>
              <p className="font-semibold">PHONE</p>
              <p>+234 812 757 8710 </p>
            </div>

            <div>
              <p className="font-semibold">LOCATION</p>
              <p> <br />
                 ogbomoso, oyo state, Nigeria.</p>
            </div>

          </div>

        
          <div className="flex space-x-4 mt-8 ">
            <div >
              <img src="/watsapp.jpg" alt="icon"
              className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition duration-500" />
            </div>

            <div >
              <img src="/facebook.jpg" alt="icon" 
              className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition duration-500" />
            </div>
            
            <div >
              <img src="/instagram.webp" alt="icon" 
              className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition duration-500" />
            </div>
          </div>

          {/* MAP */}
          <div className="mt-10">
            <img
              src="/map.png"
              alt="map"
              className="w-full h-[200px] object-cover"
            />
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-[#efe6d8] p-8 md:p-10 border border-[#d4af37]/30">

          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            GET IN TOUCH
          </h2>

          <form className="space-y-4 text-black">

            <input
              type="text"
              placeholder="Name"
              className="w-full border border-[#cbbba0] bg-transparent px-4 py-3 text-sm outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border  border-[#cbbba0] bg-transparent px-4 py-3 text-sm outline-none"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-[#cbbba0] bg-transparent px-4 py-3 text-sm outline-none"
            />

            <textarea
              placeholder="Message"
            //   rows="5"
              className="w-full border border-[#cbbba0] bg-transparent px-4 py-3 text-sm outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-[#0b1a33] text-white py-3 text-sm tracking-wide hover:opacity-90 transition cursor-pointer"
            >
              SEND MESSAGE
            </button>

          </form>
        </div>

      </div>

    </section>
    <Footer/>
    </div>
  );
}