"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { AccountDropdown } from "@/components/account/account-dropdown"
import { useToast } from "@/hooks/use-toast"
import { MobileMenu } from "@/components/mobile-menu"

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  slug: string
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist))
    }
    updateCounts()
    setLoading(false)

    // Listen for updates
    const handleCartUpdate = () => updateCounts()
    const handleWishlistUpdate = () => updateCounts()

    window.addEventListener("cartUpdated", handleCartUpdate)
    window.addEventListener("wishlistUpdated", handleWishlistUpdate)

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate)
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate)
    }
  }, [])

  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setCartCount(cart.length)
    setWishlistCount(wishlist.length)
    setWishlistItems(wishlist)
  }

  const removeFromWishlist = (id: string) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id)
    setWishlistItems(updatedWishlist)
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
    window.dispatchEvent(new Event("wishlistUpdated"))

    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    })
  }

  const addToCart = (item: WishlistItem) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItemIndex = existingCart.findIndex((cartItem: any) => cartItem.id === item.id)

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1
    } else {
      existingCart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        slug: item.slug,
      })
    }

    localStorage.setItem("cart", JSON.stringify(existingCart))
    window.dispatchEvent(new Event("cartUpdated"))

    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            <div className="flex items-center space-x-2 lg:space-x-8 min-w-0">
              <Link href="/" className="flex items-center group flex-shrink-0">
                <img
                  src="https://i.ibb.co/NdT015WL/Chat-GPT-Image-Jun-30-2025-09-40-05-PM-removebg-preview.png"
                  alt="MD Electronics"
                  className="h-12 sm:h-16 lg:h-20 w-auto group-hover:scale-105 transition-transform duration-300"
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

            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Desktop Search */}
              <form onSubmit={handleSearch} className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 w-48 lg:w-56 xl:w-64 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </form>

              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2 hover:bg-gray-100 rounded-xl"
                onClick={() => setShowMobileSearch(!showMobileSearch)}
              >
                <Search className="w-4 h-4 text-gray-600" />
              </Button>

              <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 rounded-xl relative bg-red-50">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-medium">
                  {wishlistCount}
                </span>
              </Button>

              <Link href="/cart">
                <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 rounded-xl relative">
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-blue-600 transition-colors" />
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                </Button>
              </Link>

              <AccountDropdown />

              <MobileMenu cartCount={cartCount} wishlistCount={wishlistCount} user={null} />
            </div>
          </div>

          {/* Mobile Search Bar */}
          {showMobileSearch && (
            <div className="md:hidden pb-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 w-full border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </form>
            </div>
          )}
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
            <Link href="/account" className="text-gray-600 hover:text-blue-600">
              Account
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">Wishlist</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">{wishlistItems.length} items saved for later</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Save items you love to buy them later!</p>
            <Link href="/products">
              <Button className="bg-blue-600 hover:bg-blue-700">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Link href={`/products/${item.slug}`}>
                    <div className="aspect-square bg-gray-50 p-4">
                      <Image
                        src={item.image || "/placeholder.svg?height=200&width=200"}
                        alt={item.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-contain hover:scale-105 transition-transform"
                      />
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <Link href={`/products/${item.slug}`}>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-xl font-bold text-gray-900 mb-4">৳{item.price.toLocaleString()}</p>

                  <div className="flex space-x-2">
                    <Link href={`/products/${item.slug}`} className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent">
                        View Details
                      </Button>
                    </Link>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => addToCart(item)}>
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
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
