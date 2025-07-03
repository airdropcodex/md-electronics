export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="p-4 bg-gray-100">
        <div className="aspect-square bg-gray-200 rounded"></div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-3 h-3 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-16"></div>
          <div className="h-8 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  )
}

export function HeaderSkeleton() {
  return (
    <div className="h-20 sm:h-24 lg:h-28 bg-gray-100 animate-pulse border-b">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-12 sm:h-16 lg:h-20 w-32 bg-gray-200 rounded"></div>
          <div className="hidden lg:flex space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 w-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="hidden md:block h-10 w-48 bg-gray-200 rounded"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex space-x-2">
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
          <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3"></div>
          <div className="flex space-x-4">
            <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 flex-1 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
