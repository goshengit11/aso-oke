import Navbar from "../components/navbar";
import Footer from "../components/footer";
// import footer from './footer'
export default function AboutPage() {
  return (
     <div className="bg-[#f5efe6]">
        <Navbar/>
        <main className="bg-[#f5efe6] mt-10 h-auto text-[#0B0B0B]">
      
      <section className="px-4 sm:px-6 md:px-10 py-12 sm:py-16 text-center max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold underline cursor-pointer hover:text-gray-500">
          About us
        </h1>
        <p className="mt-4 sm:mt-6 text-black text-base sm:text-lg leading-relaxed">
          We are driven by a deep passion for preserving tradition while embracing
          modern innovation. As a proudly Nigerian brand, we specialize in the production and promotion of 
          high-quality Aso-Oke fabrics, blending cultural heritage with contemporary fashion.
         
        </p>
      </section>
         
         <div className="px-4 sm:px-6 md:px-10">
            <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold underline text-center cursor-pointer hover:text-gray-500">
              Our Mission
            </h1>
            <p className="mt-4 sm:mt-6 text-black text-base sm:text-lg leading-relaxed text-center">
              Our mission is to deliver premium Aso-Oke fabrics that celebrate African <br className="hidden sm:block" />
              heritage while meeting global fashion standards. We aim to empower individuals <br className="hidden sm:block" />
              and brands with authentic, durable, 
              and beautifully crafted textiles that make a statement.
            </p>
         </div>

         <div className="mt-10 sm:mt-14 px-4 sm:px-6 md:px-10">
            <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold underline text-center cursor-pointer hover:text-gray-500">
              Our Vision
            </h1>
            <p className="mt-4 sm:mt-6 text-black text-base sm:text-lg leading-relaxed text-center">
              To become a leading name in the textile and fashion industry, <br className="hidden sm:block" />
              recognized for innovation, quality, and the promotion of <br className="hidden sm:block" />
              African culture across the world..
            </p>
         </div> 
    </main>
    <div className="h-20"></div>
    <Footer/>
     </div>
    
  );
}