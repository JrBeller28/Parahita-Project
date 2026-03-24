import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, Star, ShieldCheck, Clock, Palette, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const FAQS = [
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer: "Our standard minimum order quantity is 50 pieces per design/color. However, for certain premium items or complex customizations, the MOQ might vary. Please contact us for specific product details."
  },
  {
    question: "How long does production usually take?",
    answer: "Standard production time is 14-21 working days after design approval and down payment. Rush orders (7-10 days) are available for selected items with an additional fee."
  },
  {
    question: "Can I request a physical sample before bulk production?",
    answer: "Yes, we highly recommend a physical sample (dummy) for orders above 100 pcs. Sample production takes 3-5 days and is fully refundable upon bulk order confirmation."
  },
  {
    question: "Do you provide design services?",
    answer: "Absolutely! Our in-house design team can help translate your ideas into production-ready mockups. Basic layout and logo placement are complimentary with your order."
  }
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/fabric/1920/1080?blur=2')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-20 md:py-32 lg:py-40 flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 text-center md:text-left"
            >
              <Badge variant="secondary" className="mb-6 text-primary bg-primary/10 hover:bg-primary/20">
                Premium Quality Custom Production
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
                Elevate Your Brand with <span className="text-primary">Premium Custom Uniforms</span> & Merchandise
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto md:mx-0">
                Parahita Prima Sentosa delivers high-quality, custom-branded apparel and corporate souvenirs tailored to your company's unique identity.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                  <Link to="/catalog">Explore Catalog</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                  <Link to="/custom-order">Start Custom Order</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 w-full max-w-lg mx-auto"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://picsum.photos/seed/uniforms/800/600" 
                  alt="Custom Uniforms" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white font-medium text-lg">Trusted by 500+ Companies</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Highlight */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Core Services</h2>
            <p className="text-lg text-slate-600">We provide end-to-end solutions for your corporate branding needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Corporate Uniforms",
                desc: "Professional attire for office, factory, and field workers.",
                img: "https://picsum.photos/seed/office-wear/600/400",
                link: "/catalog?category=uniforms"
              },
              {
                title: "Event Merchandise",
                desc: "Custom t-shirts, jackets, and apparel for your special events.",
                img: "https://picsum.photos/seed/event-merch/600/400",
                link: "/catalog?category=apparel"
              },
              {
                title: "Corporate Souvenirs",
                desc: "Premium gift sets, tumblers, bags, and promotional items.",
                img: "https://picsum.photos/seed/souvenirs/600/400",
                link: "/catalog?category=souvenirs"
              }
            ].map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <Link to={cat.link}>
                  <Card className="overflow-hidden border-0 shadow-lg h-full transition-shadow hover:shadow-xl">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={cat.img} 
                        alt={cat.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors"></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
                        {cat.title}
                        <ArrowRight className="h-5 w-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </h3>
                      <p className="text-slate-600">{cat.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why Partner With Parahita Prima Sentosa?</h2>
              <p className="text-lg text-slate-600 mb-8">
                With years of experience in the textile and merchandise industry, we guarantee satisfaction through meticulous quality control and dedicated service.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: ShieldCheck, title: "Premium Quality Assurance", desc: "Rigorous quality checks at every production stage." },
                  { icon: Palette, title: "Custom Design & Branding", desc: "Tailored solutions to perfectly match your brand identity." },
                  { icon: Clock, title: "On-Time Delivery", desc: "Reliable production schedules to meet your deadlines." },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="bg-primary/10 p-3 rounded-lg text-primary">
                        <feature.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-slate-900 mb-1">{feature.title}</h4>
                      <p className="text-slate-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/seed/factory1/400/500" alt="Production" className="rounded-2xl w-full h-full object-cover shadow-md" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/factory2/400/500" alt="Quality Control" className="rounded-2xl w-full h-full object-cover shadow-md mt-8" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">Everything you need to know about our products and services.</p>
          </div>
          
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className={`border rounded-xl overflow-hidden transition-colors ${
                  openFaq === index ? "border-primary/50 bg-primary/5" : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`font-semibold text-lg ${openFaq === index ? "text-primary" : "text-slate-900"}`}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180 text-primary" : ""
                    }`} 
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pattern/1920/1080')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Upgrade Your Corporate Identity?</h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Get a free consultation and quotation for your custom uniform or merchandise project today.
          </p>
          <Button asChild size="lg" variant="accent" className="h-14 px-10 text-lg">
            <Link to="/contact">Request a Free Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
