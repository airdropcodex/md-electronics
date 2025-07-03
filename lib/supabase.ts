import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client-side data fetching functions with proper error handling
export async function getFeaturedProducts() {
  try {
    const { data, error } = await supabase.from("products").select("*").eq("featured", true).limit(8)

    if (error) {
      console.error("Error fetching featured products:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

export async function getCategories() {
  try {
    const { data, error } = await supabase.from("categories").select("*").order("name")

    if (error) {
      console.error("Error fetching categories:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getProducts(filters?: {
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}) {
  try {
    let query = supabase.from("products").select("*")

    if (filters?.category) {
      query = query.eq("category_id", filters.category)
    }

    if (filters?.brand) {
      query = query.eq("brand_id", filters.brand)
    }

    if (filters?.minPrice) {
      query = query.gte("price", filters.minPrice)
    }

    if (filters?.maxPrice) {
      query = query.lte("price", filters.maxPrice)
    }

    if (filters?.search) {
      query = query.ilike("name", `%${filters.search}%`)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching products:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single()

    if (error) {
      console.error("Error fetching product:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function getBrands() {
  try {
    const { data, error } = await supabase.from("brands").select("*").order("name")

    if (error) {
      console.error("Error fetching brands:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching brands:", error)
    return []
  }
}
