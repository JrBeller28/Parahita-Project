import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const PORTFOLIO_ITEMS = [
  { id: 1, title: "TechCorp Annual Gathering", category: "Event", image: "https://picsum.photos/seed/event1/600/400", desc: "Custom polo shirts and tote bags for 500 employees." },
  { id: 2, title: "MegaFactory Safety Gear", category: "Factory", image: "https://picsum.photos/seed/factorywear/600/400", desc: "High-visibility coveralls and safety boots for production line." },
  { id: 3, title: "Bank Nusantara Frontliners", category: "Corporate", image: "https://picsum.photos/seed/bankuniform/600/400", desc: "Elegant blazers and skirts for customer service representatives." },
  { id: 4, title: "Startup Hackathon Merch", category: "Event", image: "https://picsum.photos/seed/hackathon/600/400", desc: "Hoodies, stickers, and lanyards for participants." },
  { id: 5, title: "Hospitality Staff Uniforms", category: "Corporate", image: "https://picsum.photos/seed/hotelstaff/600/400", desc: "Breathable and stylish uniforms for hotel staff." },
  { id: 6, title: "VIP Client Gift Sets", category: "Souvenir", image: "https://picsum.photos/seed/vipgift/600/400", desc: "Premium leather notebooks and engraved pens." },
]

const CATEGORIES = ["All", "Corporate", "Factory", "Event", "Souvenir"]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredItems = activeCategory === "All" 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Past Projects</h1>
          <p className="text-lg text-slate-600">
            A glimpse into the high-quality uniforms and merchandise we've produced for our esteemed clients across various industries.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-primary text-white shadow-md shadow-primary/30" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl overflow-hidden shadow-lg bg-slate-50 cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <Badge className="w-fit mb-3 bg-primary/80 hover:bg-primary">{item.category}</Badge>
                  <h3 className="text-xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                  <p className="text-slate-300 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  )
}
