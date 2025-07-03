"use client"

import Link from "next/link"
import { ArrowLeft, Shield, FileText, Users, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <img
                src="https://i.ibb.co/NdT015WL/Chat-GPT-Image-Jun-30-2025-09-40-05-PM-removebg-preview.png"
                alt="MD Electronics"
                className="h-8 w-auto"
              />
              <span className="font-bold text-gray-900">MD Electronics</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Terms of Service & Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: January 3, 2025</p>
        </div>

        {/* Quick Navigation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Quick Navigation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="#terms" className="text-blue-600 hover:text-blue-700 font-medium">
                1. Terms of Service
              </a>
              <a href="#privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                2. Privacy Policy
              </a>
              <a href="#cookies" className="text-blue-600 hover:text-blue-700 font-medium">
                3. Cookie Policy
              </a>
              <a href="#contact" className="text-blue-600 hover:text-blue-700 font-medium">
                4. Contact Information
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Terms of Service */}
        <Card id="terms" className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Shield className="w-6 h-6" />
              <span>Terms of Service</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h3>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using MD Electronics website and services, you accept and agree to be bound by the
                terms and provision of this agreement. If you do not agree to abide by the above, please do not use this
                service.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2. Use License</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Permission is granted to temporarily download one copy of the materials on MD Electronics website for
                personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of
                title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">3. Product Information</h3>
              <p className="text-gray-700 leading-relaxed">
                We strive to provide accurate product information, including descriptions, prices, and availability.
                However, we do not warrant that product descriptions or other content is accurate, complete, reliable,
                current, or error-free. Prices and availability are subject to change without notice.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">4. Orders and Payment</h3>
              <p className="text-gray-700 leading-relaxed">
                All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any
                order for any reason. Payment must be received before products are shipped. We accept various payment
                methods as displayed during checkout.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">5. Shipping and Delivery</h3>
              <p className="text-gray-700 leading-relaxed">
                Delivery times are estimates and may vary. We are not responsible for delays caused by shipping carriers
                or circumstances beyond our control. Risk of loss and title for products pass to you upon delivery to
                the shipping carrier.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">6. Warranty and Returns</h3>
              <p className="text-gray-700 leading-relaxed">
                Products come with manufacturer warranties as specified. Returns are accepted within 30 days of purchase
                for unused items in original packaging. Customer is responsible for return shipping costs unless the
                item is defective.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">7. Limitation of Liability</h3>
              <p className="text-gray-700 leading-relaxed">
                MD Electronics shall not be liable for any indirect, incidental, special, consequential, or punitive
                damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                resulting from your use of the service.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Policy */}
        <Card id="privacy" className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Users className="w-6 h-6" />
              <span>Privacy Policy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">1. Information We Collect</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Create an account or make a purchase</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us for customer support</li>
                <li>Participate in surveys or promotions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2. How We Use Your Information</h3>
              <p className="text-gray-700 leading-relaxed mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Process transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Monitor and analyze trends and usage</li>
                <li>Personalize and improve our services</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">3. Information Sharing</h3>
              <p className="text-gray-700 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except as described in this policy. We may share information with trusted partners who assist
                us in operating our website and conducting business, provided they agree to keep information
                confidential.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">4. Data Security</h3>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. However, no method of transmission over the internet is
                100% secure.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">5. Your Rights</h3>
              <p className="text-gray-700 leading-relaxed mb-3">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Access and update your personal information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">6. Children's Privacy</h3>
              <p className="text-gray-700 leading-relaxed">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal
                information from children under 13. If we become aware that we have collected personal information from
                a child under 13, we will take steps to delete such information.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cookie Policy */}
        <Card id="cookies" className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Cookie Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our service and hold certain
              information. Cookies are files with small amount of data which may include an anonymous unique identifier.
            </p>
            <div>
              <h4 className="font-semibold mb-2">Types of Cookies We Use:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>
                  <strong>Essential Cookies:</strong> Required for the website to function properly
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Used to track visitors across websites for advertising purposes
                </li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
              if you do not accept cookies, you may not be able to use some portions of our service.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card id="contact" className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl">
              <Mail className="w-5 h-5" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Service or Privacy Policy, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong> legal@mdelectronics.com
              </p>
              <p>
                <strong>Phone:</strong> +880 1234-567890
              </p>
              <p>
                <strong>Address:</strong> 123 Electronics Street, Dhaka, Bangladesh
              </p>
              <p>
                <strong>Business Hours:</strong> Monday - Saturday, 9:00 AM - 8:00 PM
              </p>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Footer */}
        <div className="text-center text-gray-600">
          <p className="mb-4">
            By using MD Electronics services, you acknowledge that you have read and understood these terms and agree to
            be bound by them.
          </p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
