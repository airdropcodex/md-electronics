"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PrivacyPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to terms page since we combined both policies
    router.replace("/terms")
  }, [router])

  return null
}
