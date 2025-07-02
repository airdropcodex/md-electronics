"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Heart, ShoppingCart, Menu, Plus, Minus, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AccountDropdown } from "@/components/account/account-dropdown"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  slug: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
    setLoading(false)
  }, [])

  const updateCart = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    updateCart(updatedCart)
  }

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    updateCart(updatedCart)
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    })
  }

  const clearCart = () => {
    updateCart([])
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    })
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50000 ? 0 : 500 // Free shipping over ৳50,000
  const total = subtotal + shipping

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-20 sm:h-24 lg:h-28">
            <div className="flex items-center space-x-4 lg:space-x-8 min-w-0">
              <Link href="/" className="flex items-center group flex-shrink-0">
                <img
                  src="https://i.ibb.co/NdT015WL/Chat-GPT-Image-Jun-30-2025-09-40-05-PM-removebg-preview.png"
                  alt="MD Electronics"
                  className="h-16 sm:h-20 lg:h-24 w-auto group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              <nav className="hidden lg:flex space-x-4 xl:space-x-6">
                <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Home
                </Link>
                <Link href="/products" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Products
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  About
                </Link>
                <Link
                  href="#footer"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector("footer")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Contact
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-9 pr-3 py-2 w-48 lg:w-56 xl:w-64 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div className="flex items-center space-x-1 sm:space-x-2">
                <Button variant="ghost" size="sm" className="p-2 sm:p-3 hover:bg-gray-100 rounded-xl">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-red-500 transition-colors" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 sm:p-3 hover:bg-gray-100 rounded-xl relative bg-blue-50"
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-medium">
                    {cartItems.length}
                  </span>
                </Button>

                <AccountDropdown />

                <Button variant="ghost" size="sm" className="lg:hidden p-2 sm:p-3 hover:bg-gray-100 rounded-xl">
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">Shopping Cart</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <Link href="/products" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link href="/products">
              <Button className="bg-blue-600 hover:bg-blue-700">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 bg-transparent"
                >
                  Clear Cart
                </Button>
              </div>

              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg?height=100&width=100"}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="w-20 h-20 object-contain bg-gray-50 rounded-lg"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.slug}`} className="hover:text-blue-600">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                        </Link>
                        <p className="text-2xl font-bold text-gray-900">৳{item.price.toLocaleString()}</p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="px-3"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="px-3"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="text-right min-w-[100px]">
                          <p className="text-lg font-bold text-gray-900">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-32">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>৳{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? "Free" : `৳${shipping.toLocaleString()}`}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <p className="text-sm text-gray-600">
                      Add ৳{(50000 - subtotal).toLocaleString()} more for free shipping
                    </p>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>৳{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link href="/checkout" className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3">Proceed to Checkout</Button>
                  </Link>

                  <div className="text-center">
                    <Link href="/products" className="text-blue-600 hover:text-blue-700 text-sm">
                      Continue Shopping
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer id="footer" className="bg-gray-900 text-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 lg:mb-12">
            <div className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center">
                <img
                  src="https://i.ibb.co/NdT015WL/Chat-GPT-Image-Jun-30-2025-09-40-05-PM-removebg-preview.png"
                  alt="MD Electronics"
                  className="h-16 sm:h-18 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                Your trusted partner for premium home appliances. Quality products, exceptional service, and competitive
                prices since 2020.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Quick Links</h4>
              <div className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <Link href="/" className="hover:text-white transition-colors block">
                  Home
                </Link>
                <Link href="/products" className="hover:text-white transition-colors block">
                  Products
                </Link>
                <Link href="/about" className="hover:text-white transition-colors block">
                  About Us
                </Link>
                <Link href="#" className="hover:text-white transition-colors block">
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Categories</h4>
              <div className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <Link href="/products?category=refrigerators" className="hover:text-white transition-colors block">
                  Refrigerators
                </Link>
                <Link href="/products?category=ovens" className="hover:text-white transition-colors block">
                  Ovens
                </Link>
                <Link href="/products?category=televisions" className="hover:text-white transition-colors block">
                  Televisions
                </Link>
                <Link href="/products?category=air-conditioners" className="hover:text-white transition-colors block">
                  Air Conditioners
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Contact Info</h4>
              <div className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <p className="flex items-start space-x-2">
                  <span className="flex-shrink-0">📍</span>
                  <span>123 Electronics Street, Dhaka, Bangladesh</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>+880 1234-567890</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span>✉️</span>
                  <span>info@mdelectronics.com</span>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-sm sm:text-base">© 2024 MD Electronics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
