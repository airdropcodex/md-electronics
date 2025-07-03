"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export function AccountDropdown() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setUser(session?.user || null)
      } catch (error) {
        console.error("Error getting session:", error)
      } finally {
        setLoading(false)
      }
    }
    getSession()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null)
      setLoading(false)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <Button variant="ghost" size="sm" className="p-2 sm:p-3 hover:bg-gray-100 rounded-xl">
        <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
      </Button>
    )
  }

  if (!user) {
    return (
      <Link href="/auth/signin">
        <Button variant="ghost" size="sm" className="p-2 sm:p-3 hover:bg-gray-100 rounded-xl">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-blue-600 transition-colors" />
        </Button>
      </Link>
    )
  }

  // Directly redirect to /account on click
  return (
    <Button
      variant="ghost"
      size="sm"
      className="p-2 sm:p-3 hover:bg-gray-100 rounded-xl"
      onClick={() => router.push("/account")}
    >
      <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
        <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
        <AvatarFallback>{user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
      </Avatar>
    </Button>
  )
}
