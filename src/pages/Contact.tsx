import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Request a Quotation</h1>
          <p className="text-lg text-slate-600">
            Have a project in mind? Fill out the form below and our team will get back to you with a detailed proposal and pricing within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="border-0 shadow-lg bg-primary text-primary-foreground overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
              
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Contact Information</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Reach out to us directly for urgent inquiries.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Head Office</h4>
                    <p className="text-sm text-primary-foreground/80 leading-relaxed">
                      Jl. Industri Raya No. 45<br/>
                      Kawasan Industri Pulogadung<br/>
                      Jakarta Timur, Indonesia 13920
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-accent shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Phone / WhatsApp</h4>
                    <p className="text-sm text-primary-foreground/80">+62 812-3456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-accent shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-sm text-primary-foreground/80">hello@parahitaprima.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Business Hours</h4>
                    <p className="text-sm text-primary-foreground/80">
                      Mon - Fri: 08:00 - 17:00<br/>
                      Sat: 08:00 - 13:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8 md:p-10">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-16 space-y-6"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Request Sent Successfully!</h2>
                    <p className="text-slate-600 max-w-md">
                      Thank you for reaching out. Our sales team has received your request and will contact you shortly with a detailed quotation.
                    </p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-4">
                      Send Another Request
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" required placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name *</Label>
                        <Input id="company" required placeholder="PT. Maju Bersama" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" required placeholder="john@company.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone / WhatsApp *</Label>
                        <Input id="phone" type="tel" required placeholder="+62 812..." />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interest">Product of Interest *</Label>
                      <select 
                        id="interest" 
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select a product category</option>
                        <option value="uniforms">Corporate Uniforms</option>
                        <option value="factory">Factory / Safety Wear</option>
                        <option value="event">Event Apparel (T-shirts, Polo)</option>
                        <option value="souvenir">Corporate Souvenirs & Gift Sets</option>
                        <option value="other">Other Custom Request</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="qty">Estimated Quantity</Label>
                        <Input id="qty" type="number" placeholder="e.g., 100" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deadline">Target Deadline</Label>
                        <Input id="deadline" type="date" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Project Details & Notes</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Please describe your requirements, preferred materials, specific colors, or any other details..." 
                        className="min-h-[120px]"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg gap-2" 
                      variant="accent"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Request...
                        </span>
                      ) : (
                        <>
                          <Send className="h-5 w-5" /> Send Quotation Request
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}
