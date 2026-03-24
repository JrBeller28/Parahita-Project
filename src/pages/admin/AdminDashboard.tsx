import { Card, CardContent } from "@/components/ui/card"
import { Package, ShoppingCart, Image as ImageIcon, MessageSquare } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    { title: "Total Products", value: "24", icon: Package, color: "text-blue-600 bg-blue-100" },
    { title: "Active Orders", value: "12", icon: ShoppingCart, color: "text-amber-600 bg-amber-100" },
    { title: "Portfolio Items", value: "18", icon: ImageIcon, color: "text-green-600 bg-green-100" },
    { title: "New Messages", value: "5", icon: MessageSquare, color: "text-purple-600 bg-purple-100" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-0 shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-4 rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Welcome to Admin Panel</h3>
          <p className="text-slate-600">
            Use the sidebar navigation to manage your catalog products, view incoming custom orders, update your portfolio showcase, and respond to contact messages.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
