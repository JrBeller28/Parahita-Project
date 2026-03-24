import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Menu, X, ShoppingBag, User } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const links = [
    { name: "Home", path: "/" },
    { name: "Catalog", path: "/catalog" },
    { name: "Custom Order", path: "/custom-order" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-primary">Parahita</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <Button asChild variant="ghost" size="icon" className="text-slate-600 hover:text-primary">
              <Link to="/dashboard" aria-label="Dashboard">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="accent">
              <Link to="/contact">Request Quote</Link>
            </Button>
          </div>

          <div className="-mr-2 flex md:hidden items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="text-slate-600">
              <Link to="/dashboard" aria-label="Dashboard">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <Button asChild className="w-full" variant="accent">
                <Link to="/contact" onClick={() => setIsOpen(false)}>Request Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
