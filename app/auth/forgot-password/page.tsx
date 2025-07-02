"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } else {
        setSent(true)
        toast({
          title: "Reset Link Sent",
          description: "Check your email for a password reset link.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-indigo-200/30 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4">
        <div className="w-full max-w-md">
          {/* Back to Sign In Link */}
          <Link
            href="/auth/signin"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Sign In</span>
          </Link>

          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95">
            <CardHeader className="text-center space-y-2 pb-6">
              <div className="flex justify-center mb-4">
                <Image
                  src="/md-electronics-logo.png"
                  alt="MD Electronics"
                  width={180}
                  height={45}
                  className="h-10 w-auto"
                  priority
                />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {sent ? "Check Your Email" : "Forgot Password?"}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {sent
                  ? "We've sent a password reset link to your email address."
                  : "Enter your email address and we'll send you a link to reset your password."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {sent ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">
                    If an account with that email exists, you'll receive a password reset link shortly.
                  </p>
                  <div className="space-y-2">
                    <Button
                      onClick={() => {
                        setSent(false)
                        setEmail("")
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Send Another Link
                    </Button>
                    <Link href="/auth/signin" className="block">
                      <Button variant="ghost" className="w-full">
                        Back to Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
              )}

              <div className="text-center text-sm text-gray-600">
                Remember your password?{" "}
                <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Sign in here
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
