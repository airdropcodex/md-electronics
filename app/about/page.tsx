"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Heart, ShoppingCart, Menu, Award, Users, Clock, Shield, Truck, HeadphonesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { AccountDropdown } from "@/components/account/account-dropdown"

export default function AboutPage() {
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)

  useEffect(() => {
    updateCounts()

    // Listen for cart and wishlist updates
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
                <Link href="/about" className="text-blue-600 hover:text-blue-700 font-semibold relative">
                  About
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></div>
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
                <Button variant="ghost" size="sm" className="p-2 sm:p-3 hover:bg-gray-100 rounded-xl relative">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-red-500 transition-colors" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-medium">
                      {wishlistCount}
                    </span>
                  )}
                </Button>

                <Link href="/cart">
                  <Button variant="ghost" size="sm" className="p-2 sm:p-3 hover:bg-gray-100 rounded-xl relative">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-blue-600 transition-colors" />
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-medium">
                      {cartCount}
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
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">About Us</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                About <span className="text-blue-600">MD Electronics</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Your trusted partner for premium home appliances since 2020. We bring you the latest technology and
                highest quality products at competitive prices.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">4+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">10K+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-600">Products</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="About MD Electronics"
                width={500}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded in 2020 in the heart of Dhaka, MD Electronics began as a small family business with a simple
              mission: to make premium home appliances accessible to every household in Bangladesh. What started as a
              single store has now grown into one of the most trusted electronics retailers in the country.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe that everyone deserves access to quality appliances that make life easier and more comfortable.
              Our commitment to excellence, customer service, and competitive pricing has earned us the trust of
              thousands of families across Bangladesh.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape our commitment to our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Quality First</h3>
                <p className="text-gray-600">
                  We only stock products from trusted brands that meet our high standards for quality and reliability.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Customer Focused</h3>
                <p className="text-gray-600">
                  Our customers are at the heart of everything we do. We strive to exceed expectations in every
                  interaction.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Trust & Integrity</h3>
                <p className="text-gray-600">
                  We build lasting relationships through honest business practices and transparent communication.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Fast Service</h3>
                <p className="text-gray-600">
                  Quick delivery, efficient installation, and prompt customer support when you need it most.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Reliable Delivery</h3>
                <p className="text-gray-600">
                  Safe and timely delivery across Bangladesh with professional installation services.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                  <HeadphonesIcon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">24/7 Support</h3>
                <p className="text-gray-600">
                  Round-the-clock customer support to help you with any questions or concerns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our dedicated team of professionals is committed to providing you with the best shopping experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="MD Rahman"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">MD Rahman</h3>
                  <p className="text-blue-600 font-medium">Founder & CEO</p>
                  <p className="text-gray-600 mt-2">Visionary leader with 15+ years in the electronics industry.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Sarah Ahmed"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Sarah Ahmed</h3>
                  <p className="text-blue-600 font-medium">Head of Customer Service</p>
                  <p className="text-gray-600 mt-2">Ensures every customer receives exceptional service and support.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Karim Hassan"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Karim Hassan</h3>
                  <p className="text-blue-600 font-medium">Technical Director</p>
                  <p className="text-gray-600 mt-2">Expert in product selection and technical specifications.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Ready to Upgrade Your Home?</h2>
            <p className="text-xl text-blue-100">
              Discover our extensive collection of premium home appliances and transform your living space today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/products">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                  Shop Now
                </Button>
              </Link>
              <Link
                href="#footer"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("footer")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold bg-transparent"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
