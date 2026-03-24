import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, X } from "lucide-react"
import { Label } from "@/components/ui/label"

const INITIAL_PRODUCTS = [
  { id: 1, name: "Executive Office Shirt", category: "Uniforms", price: "Rp 150.000", material: "Cotton Drill" },
  { id: 2, name: "Safety Coverall", category: "Uniforms", price: "Rp 200.000", material: "American Drill" },
  { id: 3, name: "Corporate Polo Shirt", category: "Apparel", price: "Rp 85.000", material: "Lacoste CVC" },
  { id: 4, name: "Premium Vacuum Tumbler", category: "Souvenirs", price: "Rp 45.000", material: "Stainless Steel" },
]

export default function AdminCatalog() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: "", category: "", price: "", material: "" })

  const handleOpenModal = (product?: typeof INITIAL_PRODUCTS[0]) => {
    if (product) {
      setEditingId(product.id)
      setFormData(product)
    } else {
      setEditingId(null)
      setFormData({ name: "", category: "", price: "", material: "" })
    }
    setIsModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? { ...formData, id: editingId } : p))
    } else {
      setProducts([...products, { ...formData, id: Date.now() }])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Catalog Management</h2>
        <Button onClick={() => handleOpenModal()} className="gap-2"><Plus className="h-4 w-4" /> Add Product</Button>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="p-4 font-medium text-slate-500">Name</th>
                  <th className="p-4 font-medium text-slate-500">Category</th>
                  <th className="p-4 font-medium text-slate-500">Material</th>
                  <th className="p-4 font-medium text-slate-500">Price</th>
                  <th className="p-4 font-medium text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{product.name}</td>
                    <td className="p-4 text-slate-600">{product.category}</td>
                    <td className="p-4 text-slate-600">{product.material}</td>
                    <td className="p-4 text-slate-600">{product.price}</td>
                    <td className="p-4 flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleOpenModal(product)}>
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl border-0">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
              <CardTitle>{editingId ? "Edit Product" : "Add New Product"}</CardTitle>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-800">
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <Label>Product Name</Label>
                  <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Material</Label>
                  <Input required value={formData.material} onChange={e => setFormData({...formData, material: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Product</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
