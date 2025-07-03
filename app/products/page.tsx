"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Search, Heart, ShoppingCart, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AccountDropdown } from "@/components/account/account-dropdown"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { MobileMenu } from "@/components/mobile-menu"

async function getProducts(filters: any = {}) {
  let query = supabase
    .from("products")
    .select(`
      *,
      categories (name, slug),
      brands (name, slug)
    `)
    .eq("is_active", true)

  if (filters.category) {
    query = query.eq("categories.slug", filters.category)
  }

  if (filters.brand) {
    query = query.eq("brands.slug", filters.brand)
  }

  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  if (filters.minPrice) {
    query = query.gte("price", filters.minPrice)
  }

  if (filters.maxPrice) {
    query = query.lte("price", filters.maxPrice)
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price_asc":
        query = query.order("price", { ascending: true })
        break
      case "price_desc":
        query = query.order("price", { ascending: false })
        break
      case "name_asc":
        query = query.order("name", { ascending: true })
        break
      case "newest":
        query = query.order("created_at", { ascending: false })
        break
      default:
        query = query.order("created_at", { ascending: false })
    }
  } else {
    query = query.order("created_at", { ascending: false })
  }

  const { data: products, error } = await query

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return products || []
}

async function getCategories() {
  const { data: categories, error } = await supabase.from("categories").select("*").eq("is_active", true).order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return categories || []
}

async function getBrands() {
  const { data: brands, error } = await supabase.from("brands").select("*").eq("is_active", true).order("name")

  if (error) {
    console.error("Error fetching brands:", error)
    return []
  }

  return brands || []
}

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState("grid")
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    search: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "newest",
  })
  const { toast } = useToast()
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  useEffect(() => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const category = urlParams.get("category") || ""
    const search = urlParams.get("search") || ""

    setFilters((prev) => ({
      ...prev,
      category,
      search,
    }))
    setSearchQuery(search)

    loadData({ category, search })
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

  const loadData = async (initialFilters = {}) => {
    setLoading(true)
    const [productsData, categoriesData, brandsData] = await Promise.all([
      getProducts({ ...filters, ...initialFilters }),
      getCategories(),
      getBrands(),
    ])
    setProducts(productsData)
    setCategories(categoriesData)
    setBrands(brandsData)
    setLoading(false)
  }

  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setCartCount(cart.length)
    setWishlistCount(wishlist.length)
  }

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    loadData(newFilters)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    handleFilterChange("search", searchQuery)
  }

  const handleAddToCart = (product: any) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id)

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1
    } else {
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1,
        slug: product.slug,
      })
    }

    localStorage.setItem("cart", JSON.stringify(existingCart))
    window.dispatchEvent(new Event("cartUpdated"))

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleAddToWishlist = (product: any) => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    const isAlreadyInWishlist = existingWishlist.some((item: any) => item.id === product.id)

    if (isAlreadyInWishlist) {
      toast({
        title: "Already in Wishlist",
        description: `${product.name} is already in your wishlist.`,
        variant: "destructive",
      })
      return
    }

    existingWishlist.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
    })

    localStorage.setItem("wishlist", JSON.stringify(existingWishlist))
    window.dispatchEvent(new Event("wishlistUpdated"))

    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    })
  }

  const ProductCard = ({ product }: { product: any }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      <Link href={`/products/${product.slug}`}>
        <div className="relative p-4 bg-gray-50">
          {product.original_price && product.original_price > product.price && (
            <Badge className="absolute top-2 left-2 bg-blue-600 text-white">
              {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% Off
            </Badge>
          )}
          <Image
            src={product.images[0] || "/placeholder.svg?height=200&width=200"}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-40 object-contain group-hover:scale-105 transition-transform"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center space-x-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-gray-500">(4.5)</span>
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium text-gray-900 mb-2 text-sm line-clamp-2 group-hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center space-x-2 mb-3">
          <span className="font-bold text-gray-900">৳{product.price.toLocaleString()}</span>
          {product.original_price && product.original_price > product.price && (
            <span className="text-sm text-gray-500 line-through">৳{product.original_price.toLocaleString()}</span>
          )}
        </div>
        <p className="text-xs text-gray-600 mb-3">{product.brands?.name}</p>
        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant="ghost"
            className="p-2 hover:bg-red-50"
            onClick={(e) => {
              e.preventDefault()
              handleAddToWishlist(product)
            }}
          >
            <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white flex-1 ml-2"
            onClick={(e) => {
              e.preventDefault()
              handleAddToCart(product)
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Same as Homepage */}
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
                <Link href="/products" className="text-blue-600 hover:text-blue-700 font-semibold relative">
                  Products
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></div>
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
              <form onSubmit={handleSearch} className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 w-48 lg:w-56 xl:w-64 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </form>

              <div className="flex items-center space-x-1 sm:space-x-2">
                {/* Mobile Search Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                >
                  <Search className="w-4 h-4 text-gray-600" />
                </Button>

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

                <MobileMenu cartCount={cartCount} wishlistCount={wishlistCount} user={null} />
              </div>
            </div>
          </div>
        </div>
      </header>

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

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">Products</span>
            {filters.category && (
              <>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 capitalize">{filters.category.replace("-", " ")}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category: any) => (
                      <SelectItem key={category.id} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
                <Select value={filters.brand} onValueChange={(value) => handleFilterChange("brand", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {brands.map((brand: any) => (
                      <SelectItem key={brand.id} value={brand.slug}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range (৳)</h4>
                <div className="space-y-2">
                  <Input
                    placeholder="Min Price"
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                  />
                  <Input
                    placeholder="Max Price"
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{loading ? "Loading..." : `${products.length} products found`}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                    <SelectItem value="name_asc">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <Button
                  onClick={() => {
                    setFilters({
                      category: "",
                      brand: "",
                      search: "",
                      minPrice: "",
                      maxPrice: "",
                      sortBy: "newest",
                    })
                    setSearchQuery("")
                    loadData({})
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                }`}
              >
                {products.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
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
