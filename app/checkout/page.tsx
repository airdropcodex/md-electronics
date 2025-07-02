"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Heart, ShoppingCart, Menu, ArrowLeft, CreditCard, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    notes: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
    setLoading(false)
  }, [])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50000 ? 0 : 500
  const total = subtotal + shipping

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Simulate order processing
    toast({
      title: "Order Placed Successfully!",
      description: "You will receive a confirmation email shortly.",
    })

    // Clear cart
    localStorage.removeItem("cart")
    window.dispatchEvent(new Event("cartUpdated"))

    // Redirect to success page (you can create this)
    setTimeout(() => {
      window.location.href = "/"
    }, 2000)
  }

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Link href="/products">
            <Button className="bg-blue-600 hover:bg-blue-700">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

                <Link href="/cart">
                  <Button variant="ghost" size="sm" className="p-2 sm:p-3 hover:bg-gray-100 rounded-xl relative">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-blue-600 transition-colors" />
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-medium">
                      {cartItems.length}
                    </span>
                  </Button>
                </Link>

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
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/cart" className="text-gray-600 hover:text-blue-600">
              Cart
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">Checkout</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <Link href="/cart" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="w-5 h-5" />
                    <span>Shipping Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="district">District</Label>
                      <Select onValueChange={(value) => handleInputChange("district", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dhaka">Dhaka</SelectItem>
                          <SelectItem value="chittagong">Chittagong</SelectItem>
                          <SelectItem value="sylhet">Sylhet</SelectItem>
                          <SelectItem value="rajshahi">Rajshahi</SelectItem>
                          <SelectItem value="khulna">Khulna</SelectItem>
                          <SelectItem value="barisal">Barisal</SelectItem>
                          <SelectItem value="rangpur">Rangpur</SelectItem>
                          <SelectItem value="mymensingh">Mymensingh</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special instructions for delivery..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Payment Method</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span>Credit/Debit Card</span>
                          <div className="flex space-x-2">
                            <div className="w-8 h-5 bg-blue-600 rounded text-xs flex items-center justify-center text-white font-semibold">
                              VISA
                            </div>
                            <div className="w-8 h-5 bg-red-600 rounded text-xs flex items-center justify-center text-white font-semibold">
                              MC
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="bkash" id="bkash" />
                      <Label htmlFor="bkash" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span>bKash</span>
                          <div className="w-12 h-6 bg-pink-600 rounded text-xs flex items-center justify-center text-white font-semibold">
                            bKash
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="rocket" id="rocket" />
                      <Label htmlFor="rocket" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span>Rocket</span>
                          <div className="w-12 h-6 bg-purple-600 rounded text-xs flex items-center justify-center text-white font-semibold">
                            Rocket
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        Cash on Delivery
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-32">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <Image
                          src={item.image || "/placeholder.svg?height=50&width=50"}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="w-12 h-12 object-contain bg-gray-50 rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium">৳{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>৳{subtotal.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "text-green-600" : ""}>
                        {shipping === 0 ? "Free" : `৳${shipping.toLocaleString()}`}
                      </span>
                    </div>

                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total</span>
                      <span>৳{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3">
                    Place Order
                  </Button>

                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>Secure checkout</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
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
