"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Home, Package, Info, Phone, User, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface MobileMenuProps {
  cartCount: number
  wishlistCount: number
  user?: any
}

export function MobileMenu({ cartCount, wishlistCount, user }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/about", label: "About", icon: Info },
    { href: "#footer", label: "Contact", icon: Phone },
  ]

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden p-2 hover:bg-gray-100 rounded-xl">
          <Menu className="w-5 h-5 text-gray-600" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Navigation Links */}
          <nav className="flex-1 p-6">
            <div className="space-y-4">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">{item.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/cart"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <ShoppingCart className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Shopping Cart</span>
                  </div>
                  {cartCount > 0 && (
                    <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/account/wishlist"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Wishlist</span>
                  </div>
                  {wishlistCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {user ? (
                  <Link
                    href="/account"
                    onClick={handleLinkClick}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">My Account</span>
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <Link href="/auth/signin" onClick={handleLinkClick}>
                      <Button variant="outline" className="w-full bg-transparent">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup" onClick={handleLinkClick}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50">
            <div className="text-center">
              <img
                src="https://i.ibb.co/NdT015WL/Chat-GPT-Image-Jun-30-2025-09-40-05-PM-removebg-preview.png"
                alt="MD Electronics"
                className="h-8 w-auto mx-auto mb-2"
              />
              <p className="text-xs text-gray-600">© 2024 MD Electronics</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
