import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Truck, Clock, Award, Users, MapPin, Phone, Mail, Star, CheckCircle } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { label: "Happy Customers", value: "10,000+", icon: Users },
    { label: "Products Sold", value: "25,000+", icon: Award },
    { label: "Years of Service", value: "5+", icon: Clock },
    { label: "Service Centers", value: "15+", icon: MapPin },
  ]

  const features = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "All our products come with manufacturer warranty and quality guarantee",
    },
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Free home delivery across Bangladesh for orders above ৳5,000",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your queries and concerns",
    },
    {
      icon: Award,
      title: "Authorized Dealer",
      description: "Official authorized dealer for all major home appliance brands",
    },
  ]

  const team = [
    {
      name: "Mohammad Rahman",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      description: "15+ years experience in electronics retail",
    },
    {
      name: "Fatima Khan",
      role: "Operations Manager",
      image: "/placeholder.svg?height=300&width=300",
      description: "Expert in supply chain and customer service",
    },
    {
      name: "Ahmed Hassan",
      role: "Technical Director",
      image: "/placeholder.svg?height=300&width=300",
      description: "Specialist in home appliance technology",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 sm:h-24 lg:h-28 max-w-full">
            <div className="flex items-center space-x-4 lg:space-x-8 min-w-0">
              <Link href="/" className="flex items-center group flex-shrink-0">
                <Image
                  src="https://sjc.microlink.io/wF7U_5sWGJcxTWuj1a7z41-UHrQuxeWo174RRJGTufFAzFKHnrzRAs0bT29MJ2Pvso-VlamrTvUV40KpcvMcfQ.jpeg"
                  alt="MD Electronics"
                  width={450}
                  height={110}
                  className="h-16 sm:h-20 lg:h-24 w-auto max-w-[200px] sm:max-w-[250px] lg:max-w-[300px] group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </Link>

              <nav className="hidden lg:flex space-x-6 xl:space-x-8">
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
                <Link href="/#footer" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Contact
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <Badge className="bg-blue-600 text-white">About Us</Badge>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Trusted Partner for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}
                  Premium Appliances
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Since 2019, MD Electronics has been Bangladesh's leading retailer of premium home appliances, serving
                thousands of satisfied customers with quality products and exceptional service.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-lg text-gray-600 font-medium">(4.9) • 2,500+ Reviews</span>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="MD Electronics Store"
                width={500}
                height={500}
                className="mx-auto drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Our Story</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                MD Electronics was founded in 2019 with a simple mission: to make premium home appliances accessible to
                every Bangladeshi family. What started as a small electronics shop in Dhaka has grown into one of the
                country's most trusted appliance retailers.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that every home deserves quality appliances that make life easier and more comfortable.
                That's why we partner with the world's leading brands to bring you the latest technology at competitive
                prices, backed by exceptional customer service.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">Authorized dealer for 50+ premium brands</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">15+ service centers across Bangladesh</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">24/7 customer support and warranty service</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="MD Electronics Journey"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose MD Electronics?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience with unmatched service quality
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind MD Electronics who make it all possible
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow"
              >
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-32 h-32 mx-auto rounded-full mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Upgrade Your Home?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore our extensive collection of premium home appliances and find the perfect fit for your home
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-gray-900 text-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 lg:mb-12">
            <div className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center">
                <Image
                  src="https://sjc.microlink.io/wF7U_5sWGJcxTWuj1a7z41-UHrQuxeWo174RRJGTufFAzFKHnrzRAs0bT29MJ2Pvso-VlamrTvUV40KpcvMcfQ.jpeg"
                  alt="MD Electronics"
                  width={250}
                  height={63}
                  className="h-16 sm:h-18 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                Your trusted partner for premium home appliances. Quality products, exceptional service, and competitive
                prices since 2019.
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
                <Link href="#footer" className="hover:text-white transition-colors block">
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
                <Link href="/products?category=televisions" className="hover:text-white transition-colors block">
                  Televisions
                </Link>
                <Link href="/products?category=air-conditioners" className="hover:text-white transition-colors block">
                  Air Conditioners
                </Link>
                <Link href="/products?category=washing-machines" className="hover:text-white transition-colors block">
                  Washing Machines
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Contact Info</h4>
              <div className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <p className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>123 Electronics Street, Dhaka, Bangladesh</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+880 1234-567890</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>info@mdelectronics.com</span>
                </p>
                <p className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Sat-Thu: 9AM-8PM, Fri: 2PM-8PM</span>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm sm:text-base">© 2024 MD Electronics. All rights reserved.</p>
            <div className="flex items-center space-x-4 sm:space-x-6">
              <span className="text-gray-400 text-sm sm:text-base">We Accept:</span>
              <div className="flex space-x-2 sm:space-x-3">
                <div className="w-8 h-5 sm:w-10 sm:h-6 bg-blue-600 rounded text-xs flex items-center justify-center font-semibold">
                  bKash
                </div>
                <div className="w-8 h-5 sm:w-10 sm:h-6 bg-green-600 rounded text-xs flex items-center justify-center font-semibold">
                  Nagad
                </div>
                <div className="w-8 h-5 sm:w-10 sm:h-6 bg-purple-600 rounded text-xs flex items-center justify-center font-semibold">
                  Rocket
                </div>
                <div className="w-8 h-5 sm:w-10 sm:h-6 bg-gray-600 rounded text-xs flex items-center justify-center font-semibold">
                  Cash
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
