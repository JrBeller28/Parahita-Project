import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, X, Eye } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Mock Data
const PRODUCTS = [
  { id: 1, name: "Executive Office Shirt", category: "Uniforms", price: "Rp 150.000 - 250.000", image: "https://picsum.photos/seed/shirt1/400/400", material: "Cotton Drill" },
  { id: 2, name: "Safety Coverall", category: "Uniforms", price: "Rp 200.000 - 350.000", image: "https://picsum.photos/seed/coverall/400/400", material: "American Drill" },
  { id: 3, name: "Corporate Polo Shirt", category: "Apparel", price: "Rp 85.000 - 120.000", image: "https://picsum.photos/seed/polo/400/400", material: "Lacoste CVC" },
  { id: 4, name: "Premium Vacuum Tumbler", category: "Souvenirs", price: "Rp 45.000 - 80.000", image: "https://picsum.photos/seed/tumbler/400/400", material: "Stainless Steel" },
  { id: 5, name: "Canvas Tote Bag", category: "Souvenirs", price: "Rp 25.000 - 50.000", image: "https://picsum.photos/seed/totebag/400/400", material: "Canvas" },
  { id: 6, name: "Custom Lanyard & ID Card", category: "Accessories", price: "Rp 15.000 - 30.000", image: "https://picsum.photos/seed/lanyard/400/400", material: "Polyester" },
  { id: 7, name: "Windbreaker Jacket", category: "Apparel", price: "Rp 180.000 - 300.000", image: "https://picsum.photos/seed/jacket/400/400", material: "Taslan" },
  { id: 8, name: "Executive Gift Set", category: "Souvenirs", price: "Rp 150.000 - 500.000", image: "https://picsum.photos/seed/giftset/400/400", material: "Mixed" },
]

const CATEGORIES = ["All", "Uniforms", "Apparel", "Souvenirs", "Accessories"]

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null)

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Product Catalog</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Explore our wide range of customizable products. Everything can be tailored with your corporate logo and brand colors.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar / Filters */}
          <div className="w-full md:w-64 shrink-0 space-y-6">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Categories
              </h3>
              <div className="space-y-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeCategory === cat 
                        ? "bg-primary text-primary-foreground font-medium" 
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProducts.map(product => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={product.id}
                  >
                    <Card className="overflow-hidden group h-full flex flex-col">
                      <div className="relative aspect-square overflow-hidden bg-slate-100">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button 
                            variant="secondary" 
                            className="gap-2"
                            onClick={() => setSelectedProduct(product)}
                          >
                            <Eye className="h-4 w-4" /> Quick View
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="text-xs">{product.category}</Badge>
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 mb-1">{product.name}</h3>
                        <p className="text-sm text-slate-500 mb-4">Material: {product.material}</p>
                        <div className="mt-auto pt-4 border-t">
                          <p className="text-sm font-medium text-slate-500">Est. Price</p>
                          <p className="text-primary font-bold">{product.price}</p>
                          <p className="text-xs text-slate-400 mt-1">*Depends on quantity & customization</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-lg text-slate-500">No products found matching your criteria.</p>
                <Button variant="link" onClick={() => {setSearchQuery(""); setActiveCategory("All")}}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedProduct(null)}
            />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden z-10 flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-slate-100 transition-colors z-20"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="w-full md:w-1/2 bg-slate-100">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover aspect-square md:aspect-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="w-full md:w-1/2 p-8 flex flex-col">
                <Badge className="w-fit mb-4">{selectedProduct.category}</Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{selectedProduct.name}</h2>
                <p className="text-slate-600 mb-6">
                  High-quality {selectedProduct.name.toLowerCase()} perfect for your corporate needs. Fully customizable with your brand logo, colors, and specific material requirements.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-slate-500">Material Options</span>
                    <span className="font-medium text-slate-900">{selectedProduct.material}, Custom</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-slate-500">Min. Order (MOQ)</span>
                    <span className="font-medium text-slate-900">50 pcs</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-slate-500">Est. Price Range</span>
                    <span className="font-bold text-primary">{selectedProduct.price}</span>
                  </div>
                </div>
                
                <div className="mt-auto flex gap-4">
                  <Button className="flex-1" variant="accent">Request Quote</Button>
                  <Button variant="outline" onClick={() => setSelectedProduct(null)}>Close</Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
