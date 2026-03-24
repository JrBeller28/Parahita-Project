import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { MessageCircle, X, Send } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

export function Layout() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* Simple Chatbot UI */}
      <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl border w-80 mb-4 overflow-hidden flex flex-col"
            >
              <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold">Parahita Assistant</h3>
                  <p className="text-xs text-primary-foreground/80">Online - Replies instantly</p>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-primary-foreground/80 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-4 h-64 overflow-y-auto bg-slate-50 flex flex-col gap-3">
                <div className="bg-white border p-3 rounded-2xl rounded-tl-none text-sm text-slate-700 shadow-sm self-start max-w-[85%]">
                  Hello! Welcome to Parahita Prima Sentosa. How can I help you with your custom uniform or merchandise needs today?
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="bg-white cursor-pointer hover:bg-slate-100">Get a Quote</Badge>
                  <Badge variant="outline" className="bg-white cursor-pointer hover:bg-slate-100">Track Order</Badge>
                  <Badge variant="outline" className="bg-white cursor-pointer hover:bg-slate-100">Product Catalog</Badge>
                </div>
              </div>
              
              <div className="p-3 border-t bg-white flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button size="icon" variant="primary" className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-transform hover:scale-110 flex items-center justify-center"
            aria-label="Open Chat"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  )
}
