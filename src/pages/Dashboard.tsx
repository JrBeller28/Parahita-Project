import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Clock, CheckCircle2, FileText, Settings, LogOut, User } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  <User className="h-10 w-10" />
                </div>
                <h2 className="font-bold text-lg text-slate-900">PT. Maju Bersama</h2>
                <p className="text-sm text-slate-500 mb-4">john@majubersama.com</p>
                <Badge variant="secondary" className="w-full justify-center">Corporate Client</Badge>
              </CardContent>
            </Card>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <nav className="flex flex-col">
                <a href="#" className="flex items-center gap-3 px-6 py-4 bg-primary/5 text-primary font-medium border-l-4 border-primary">
                  <Package className="h-5 w-5" /> My Orders
                </a>
                <a href="#" className="flex items-center gap-3 px-6 py-4 text-slate-600 hover:bg-slate-50 transition-colors">
                  <FileText className="h-5 w-5" /> Quotations
                </a>
                <a href="#" className="flex items-center gap-3 px-6 py-4 text-slate-600 hover:bg-slate-50 transition-colors">
                  <Settings className="h-5 w-5" /> Settings
                </a>
                <a href="#" className="flex items-center gap-3 px-6 py-4 text-red-600 hover:bg-red-50 transition-colors border-t mt-4">
                  <LogOut className="h-5 w-5" /> Sign Out
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <h1 className="text-3xl font-bold text-slate-900">My Orders</h1>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Total Orders</p>
                    <h3 className="text-2xl font-bold text-slate-900">12</h3>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">In Production</p>
                    <h3 className="text-2xl font-bold text-slate-900">2</h3>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Completed</p>
                    <h3 className="text-2xl font-bold text-slate-900">10</h3>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order List */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b bg-white">
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    { id: "ORD-2023-089", item: "Corporate Polo Shirts", qty: 250, date: "Oct 15, 2023", status: "In Production", color: "text-amber-600 bg-amber-100" },
                    { id: "ORD-2023-088", item: "Custom Lanyards", qty: 500, date: "Oct 10, 2023", status: "Designing", color: "text-blue-600 bg-blue-100" },
                    { id: "ORD-2023-045", item: "Executive Jackets", qty: 50, date: "Aug 22, 2023", status: "Delivered", color: "text-green-600 bg-green-100" },
                    { id: "ORD-2023-012", item: "Annual Event Tumblers", qty: 300, date: "Mar 05, 2023", status: "Delivered", color: "text-green-600 bg-green-100" },
                  ].map((order, i) => (
                    <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-slate-900">{order.item}</h4>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${order.color}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">
                          Order ID: {order.id} • {order.qty} pcs • Ordered on {order.date}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}
