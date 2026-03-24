import { Link } from "react-router-dom"
import { ShoppingBag, Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-white">
              <div className="bg-primary p-1.5 rounded-md">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">Parahita</span>
            </Link>
            <p className="text-sm text-slate-400">
              Your trusted partner for custom uniforms, corporate merchandise, and high-quality bulk production.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/catalog" className="hover:text-primary transition-colors">Product Catalog</Link></li>
              <li><Link to="/custom-order" className="hover:text-primary transition-colors">Custom Uniforms</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors">Our Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Request Quotation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Corporate Uniforms</li>
              <li>Factory & Safety Wear</li>
              <li>Event Merchandise</li>
              <li>Custom Tumblers & Bags</li>
              <li>Bulk Production</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Jl. Industri Raya No. 45, Jakarta Pusat, Indonesia 10720</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>hello@parahitaprima.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Parahita Prima Sentosa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
