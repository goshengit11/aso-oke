export default function OurHeritageSection() {
  return (
    <section className="w-full flex justify-center items-center py-20 px-4 bg-[#f5efe6]">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* TEXT SIDE */}
        <div className="space-y-6">
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-black leading-tight">
            Our Heritage
            <br />
            Woven in Every Thread
          </h2>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Aso-oke is more than fabric—it is a story of identity, tradition, and pride.
            At the heart of our craft is a deep respect for heritage, where every weave
            reflects generations of artistry passed down with care.
          </p>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed animate">
            We preserve the essence of handwoven excellence while reimagining it for
            modern elegance. Each piece is created to honor culture and elevate
            your most meaningful moments.
          </p>
{/* 
          <div className="flex gap-4 pt-2">
            <button className="bg-black text-white px-6 py-3 rounded-full text-sm md:text-base hover:scale-105 transition">
              Explore Heritage
            </button>

            <button className="border border-black text-black px-6 py-3 rounded-full text-sm md:text-base hover:bg-black hover:text-white transition">
              Our Craft
            </button>
          </div> */}
        </div>

        {/* IMAGE SIDE */}
        <div className="relative w-full h-80 md:h-112.5 rounded-2xl overflow-hidden shadow-lg">

          <img
            src="/weaving.jpeg"
            alt="Traditional aso-oke weaving heritage"
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />

          {/* Heritage badge */}
          <div className="absolute bottom-5 left-5 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
            Rooted in Culture
          </div>

          {/* subtle overlay for richness */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}