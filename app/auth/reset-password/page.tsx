"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [validSession, setValidSession] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    // Check if we have a valid session for password reset
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        setValidSession(true)
      } else {
        toast({
          title: "Invalid Reset Link",
          description: "This password reset link is invalid or has expired.",
          variant: "destructive",
        })
        router.push("/auth/forgot-password")
      }
    }

    checkSession()
  }, [router, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      })
      return
    }

    if (password.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        toast({
          title: "Reset Failed",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Password Updated",
          description: "Your password has been successfully updated.",
        })
        router.push("/auth/signin")
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

  const passwordRequirements = [
    { text: "At least 8 characters", met: password.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { text: "Contains number", met: /\d/.test(password) },
  ]

  if (!validSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Validating reset link...</h2>
          <p className="text-gray-600">Please wait while we verify your request.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-indigo-200/30 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4">
        <div className="w-full max-w-md">
          {/* Back to Sign In Link */}
          <Link
            href="/auth/signin"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors mb-8 group"
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
              <CardTitle className="text-2xl font-bold text-gray-900">Reset Your Password</CardTitle>
              <CardDescription className="text-gray-600">
                Enter your new password below to complete the reset process.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 border-gray-300 focus:border-green-500 focus:ring-green-500 pr-10 transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-2 space-y-1">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs">
                          <Check
                            className={`w-3 h-3 transition-colors ${req.met ? "text-green-500" : "text-gray-300"}`}
                          />
                          <span className={`transition-colors ${req.met ? "text-green-600" : "text-gray-500"}`}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-11 border-gray-300 focus:border-green-500 focus:ring-green-500 pr-10 transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-red-500 transition-opacity">Passwords do not match</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                  disabled={loading || password !== confirmPassword || password.length < 8}
                >
                  {loading ? "Updating Password..." : "Update Password"}
                </Button>
              </form>

              <div className="text-center text-sm text-gray-600">
                Remember your password?{" "}
                <Link href="/auth/signin" className="text-green-600 hover:text-green-700 font-medium transition-colors">
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
