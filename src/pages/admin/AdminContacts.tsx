import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Mail, MailOpen } from "lucide-react"

const INITIAL_MESSAGES = [
  { id: 1, name: "John Doe", company: "PT. Maju Bersama", email: "john@company.com", product: "Corporate Uniforms", date: "2023-10-16", status: "New" },
  { id: 2, name: "Jane Smith", company: "TechCorp", email: "jane@techcorp.com", product: "Event Apparel", date: "2023-10-15", status: "Read" },
]

export default function AdminContacts() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)

  const handleMarkRead = (id: number) => {
    setMessages(messages.map(m => m.id === id ? { ...m, status: "Read" } : m))
  }

  const handleDelete = (id: number) => {
    if (confirm("Delete this message?")) {
      setMessages(messages.filter(m => m.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Contact Messages</h2>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="p-4 font-medium text-slate-500">Date</th>
                  <th className="p-4 font-medium text-slate-500">Name</th>
                  <th className="p-4 font-medium text-slate-500">Company</th>
                  <th className="p-4 font-medium text-slate-500">Interest</th>
                  <th className="p-4 font-medium text-slate-500">Status</th>
                  <th className="p-4 font-medium text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {messages.map(msg => (
                  <tr key={msg.id} className={`hover:bg-slate-50 transition-colors ${msg.status === 'New' ? 'bg-blue-50/50' : ''}`}>
                    <td className="p-4 text-slate-600">{msg.date}</td>
                    <td className="p-4 font-medium text-slate-900">
                      {msg.name}
                      <div className="text-xs text-slate-500 font-normal">{msg.email}</div>
                    </td>
                    <td className="p-4 text-slate-600">{msg.company}</td>
                    <td className="p-4 text-slate-600">{msg.product}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full ${msg.status === 'New' ? 'bg-blue-100 text-blue-700 font-bold' : 'bg-slate-100 text-slate-600 font-medium'}`}>
                        {msg.status}
                      </span>
                    </td>
                    <td className="p-4 flex justify-end gap-2">
                      {msg.status === 'New' ? (
                        <Button variant="outline" size="icon" onClick={() => handleMarkRead(msg.id)} title="Mark as Read">
                          <Mail className="h-4 w-4 text-blue-600" />
                        </Button>
                      ) : (
                        <Button variant="outline" size="icon" disabled title="Already Read">
                          <MailOpen className="h-4 w-4 text-slate-400" />
                        </Button>
                      )}
                      <Button variant="outline" size="icon" onClick={() => handleDelete(msg.id)}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {messages.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">No messages found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
