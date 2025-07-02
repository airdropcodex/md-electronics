"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Search, Heart, ShoppingCart, ArrowLeft, Plus, Minus, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountDropdown } from "@/components/account/account-dropdown"
import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

async function getProduct(slug: string) {
  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (name, slug),
      brands (name, slug)
    `)
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (error || !product) {
    return null
  }

  return product
}

async function getRelatedProducts(categoryId: string, currentProductId: string) {
  const { data: products, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (name, slug),
      brands (name, slug)
    `)
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .neq("id", currentProductId)
    .limit(4)

  if (error) {
    return []
  }

  return products || []
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category_id, product.id)

  return (
    <div className="min-h-screen bg-white">
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </div>
  )
}

function ProductDetailClient({ product, relatedProducts }: { product: any; relatedProducts: any[] }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")

    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id)

    if (existingItemIndex > -1) {
      // Update quantity if product exists
      existingCart[existingItemIndex].quantity += quantity
    } else {
      // Add new product to cart
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity,
        slug: product.slug,
      })
    }

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart))

    // Dispatch custom event to update cart count
    window.dispatchEvent(new Event("cartUpdated"))

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWishlist = () => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")

    if (isWishlisted) {
      // Remove from wishlist
      const updatedWishlist = existingWishlist.filter((item: any) => item.id !== product.id)
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
      setIsWishlisted(false)
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      // Add to wishlist
      existingWishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        slug: product.slug,
      })
      localStorage.setItem("wishlist", JSON.stringify(existingWishlist))
      setIsWishlisted(true)
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }

    // Dispatch custom event to update wishlist count
    window.dispatchEvent(new Event("wishlistUpdated"))
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-20 sm:h-24 lg:h-28">
            {/* Logo and Navigation */}
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

            {/* Search and Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Compact Search Bar */}
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
                      0
                    </span>
                  </Button>
                </Link>

                {/* Account Dropdown */}
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
            <Link href="/products" className="text-gray-600 hover:text-blue-600">
              Shop
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/products?category=${product.categories?.slug}`} className="text-gray-600 hover:text-blue-600">
              {product.categories?.name}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Link href="/products" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg?height=500&width=500"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image: string, index: number) => (
                  <div
                    key={index}
                    className={`aspect-square bg-gray-50 rounded-lg overflow-hidden cursor-pointer border-2 ${
                      selectedImage === index ? "border-blue-500" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-contain hover:opacity-75"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">{product.brands?.name}</Badge>
                <Badge variant="outline">{product.categories?.name}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">(4.5) 24 reviews</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">৳{product.price.toLocaleString()}</span>
                {product.original_price && product.original_price > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ৳{product.original_price.toLocaleString()}
                    </span>
                    <Badge className="bg-red-100 text-red-800">
                      Save ৳{(product.original_price - product.price).toLocaleString()}
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <div>
              <p className="text-gray-600 leading-relaxed">{product.short_description}</p>
            </div>

            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  product.stock_quantity > 10
                    ? "bg-green-100 text-green-800"
                    : product.stock_quantity > 0
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {product.stock_quantity > 10
                  ? "In Stock"
                  : product.stock_quantity > 0
                    ? `Only ${product.stock_quantity} left`
                    : "Out of Stock"}
              </span>
              <span className="text-sm text-gray-600">SKU: {product.sku}</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-3"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <Button variant="ghost" size="sm" className="px-3" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={product.stock_quantity === 0}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleWishlist}
                className={isWishlisted ? "bg-red-50 border-red-200" : ""}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {product.warranty_info && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Warranty Information</h4>
                <p className="text-sm text-gray-600">{product.warranty_info}</p>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {product.specifications &&
                Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-900 capitalize">{key.replace("_", " ")}</span>
                    <span className="text-gray-600">{Array.isArray(value) ? value.join(", ") : String(value)}</span>
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                <Button variant="outline">Write a Review</Button>
              </div>
              <div className="space-y-4">
                {/* Sample reviews */}
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b border-gray-200 pb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="font-medium">John D.</span>
                      <span className="text-sm text-gray-500">2 weeks ago</span>
                    </div>
                    <p className="text-gray-600">
                      Great product! Exactly what I was looking for. Fast delivery and excellent quality.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.slug}`}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="relative p-4 bg-gray-50">
                    {relatedProduct.original_price && relatedProduct.original_price > relatedProduct.price && (
                      <Badge className="absolute top-2 left-2 bg-blue-600 text-white">
                        {Math.round(
                          ((relatedProduct.original_price - relatedProduct.price) / relatedProduct.original_price) *
                            100,
                        )}
                        % Off
                      </Badge>
                    )}
                    <Image
                      src={relatedProduct.images[0] || "/placeholder.svg?height=200&width=200"}
                      alt={relatedProduct.name}
                      width={200}
                      height={200}
                      className="w-full h-40 object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center space-x-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-gray-500">(4.5)</span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2 text-sm line-clamp-2">{relatedProduct.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-900">৳{relatedProduct.price.toLocaleString()}</span>
                      {relatedProduct.original_price && relatedProduct.original_price > relatedProduct.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ৳{relatedProduct.original_price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{relatedProduct.brands?.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Professional Footer */}
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
    </>
  )
}
