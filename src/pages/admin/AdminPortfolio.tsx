import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, X } from "lucide-react"
import { Label } from "@/components/ui/label"

const INITIAL_PORTFOLIO = [
  { id: 1, title: "TechCorp Annual Gathering", category: "Event", desc: "Custom polo shirts and tote bags." },
  { id: 2, title: "MegaFactory Safety Gear", category: "Factory", desc: "High-visibility coveralls." },
  { id: 3, title: "Bank Nusantara Frontliners", category: "Corporate", desc: "Elegant blazers and skirts." },
]

export default function AdminPortfolio() {
  const [items, setItems] = useState(INITIAL_PORTFOLIO)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ title: "", category: "", desc: "" })

  const handleOpenModal = (item?: typeof INITIAL_PORTFOLIO[0]) => {
    if (item) {
      setEditingId(item.id)
      setFormData(item)
    } else {
      setEditingId(null)
      setFormData({ title: "", category: "", desc: "" })
    }
    setIsModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setItems(items.map(p => p.id === editingId ? { ...formData, id: editingId } : p))
    } else {
      setItems([...items, { ...formData, id: Date.now() }])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: number) => {
    if (confirm("Delete this portfolio item?")) {
      setItems(items.filter(p => p.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Portfolio Management</h2>
        <Button onClick={() => handleOpenModal()} className="gap-2"><Plus className="h-4 w-4" /> Add Project</Button>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="p-4 font-medium text-slate-500">Title</th>
                  <th className="p-4 font-medium text-slate-500">Category</th>
                  <th className="p-4 font-medium text-slate-500">Description</th>
                  <th className="p-4 font-medium text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{item.title}</td>
                    <td className="p-4 text-slate-600">{item.category}</td>
                    <td className="p-4 text-slate-600">{item.desc}</td>
                    <td className="p-4 flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleOpenModal(item)}>
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">No portfolio items found.</td>
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
              <CardTitle>{editingId ? "Edit Project" : "Add New Project"}</CardTitle>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-800">
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <Label>Project Title</Label>
                  <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input required value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Project</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
