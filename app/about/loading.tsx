import { Skeleton } from "@/components/ui/skeleton"

export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-20 sm:h-24 lg:h-28">
            <div className="flex items-center space-x-4 lg:space-x-8">
              <Skeleton className="h-16 sm:h-20 lg:h-24 w-32 sm:w-40 lg:w-48" />
              <div className="hidden lg:flex space-x-4 xl:space-x-6">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-14" />
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Skeleton className="h-10 w-48 lg:w-56 xl:w-64 hidden md:block" />
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-10 w-10 rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Skeleton className="h-12 sm:h-16 lg:h-20 w-3/4 mx-auto mb-6" />
            <Skeleton className="h-6 sm:h-8 w-2/3 mx-auto mb-8" />
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-48" />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section Skeleton */}
      <div className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section Skeleton */}
      <div className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Skeleton className="h-10 w-48 mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Values Section Skeleton */}
      <div className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-8 text-center">
                <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6" />
                <Skeleton className="h-6 w-32 mx-auto mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="bg-gray-900 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 lg:mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-32 bg-gray-700" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-gray-700" />
                  <Skeleton className="h-4 w-28 bg-gray-700" />
                  <Skeleton className="h-4 w-20 bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
