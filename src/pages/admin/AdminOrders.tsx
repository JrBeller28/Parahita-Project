import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"

const INITIAL_ORDERS = [
  { id: "ORD-001", client: "PT. Maju Bersama", product: "Corporate Polo", qty: 250, status: "Pending", date: "2023-10-15" },
  { id: "ORD-002", client: "TechCorp", product: "Lanyards", qty: 500, status: "In Production", date: "2023-10-10" },
  { id: "ORD-003", client: "Bank Nusantara", product: "Executive Jackets", qty: 50, status: "Completed", date: "2023-08-22" },
]

export default function AdminOrders() {
  const [orders, setOrders] = useState(INITIAL_ORDERS)

  const handleStatusChange = (id: string) => {
    const statuses = ["Pending", "In Production", "Completed"]
    setOrders(orders.map(o => {
      if (o.id === id) {
        const nextStatus = statuses[(statuses.indexOf(o.status) + 1) % statuses.length]
        return { ...o, status: nextStatus }
      }
      return o
    }))
  }

  const handleDelete = (id: string) => {
    if (confirm("Delete this order?")) {
      setOrders(orders.filter(o => o.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Custom Orders</h2>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="p-4 font-medium text-slate-500">Order ID</th>
                  <th className="p-4 font-medium text-slate-500">Client</th>
                  <th className="p-4 font-medium text-slate-500">Product</th>
                  <th className="p-4 font-medium text-slate-500">Qty</th>
                  <th className="p-4 font-medium text-slate-500">Status</th>
                  <th className="p-4 font-medium text-slate-500">Date</th>
                  <th className="p-4 font-medium text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{order.id}</td>
                    <td className="p-4 text-slate-600">{order.client}</td>
                    <td className="p-4 text-slate-600">{order.product}</td>
                    <td className="p-4 text-slate-600">{order.qty}</td>
                    <td className="p-4">
                      <Badge 
                        variant="outline" 
                        className={`cursor-pointer transition-colors ${
                          order.status === 'Pending' ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' :
                          order.status === 'In Production' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' :
                          'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                        onClick={() => handleStatusChange(order.id)}
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-600">{order.date}</td>
                    <td className="p-4 flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleDelete(order.id)}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
