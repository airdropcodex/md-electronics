import { createClient } from "@supabase/supabase-js"

// Prefer SUPABASE_SERVICE_ROLE_KEY, fallback to NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY for local/dev
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!

// Server-side admin client
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Server-side functions for admin operations
export async function createOrder(orderData: any) {
  try {
    const { data, error } = await supabaseAdmin.from("orders").insert(orderData).select().single()

    if (error) {
      console.error("Error creating order:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

export async function getUserOrders(userId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching user orders:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching user orders:", error)
    return []
  }
}
