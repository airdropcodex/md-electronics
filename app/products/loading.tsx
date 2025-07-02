export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 sm:h-24">
            <div className="flex items-center space-x-8">
              <div className="h-16 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="hidden md:flex space-x-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-10 w-64 bg-gray-200 rounded animate-pulse hidden md:block"></div>
              <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb Skeleton */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-1 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1 space-y-8">
            {[1, 2, 3].map((section) => (
              <div key={section}>
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Products Grid Skeleton */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((product) => (
                <div key={product} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 bg-gray-50">
                    <div className="w-full h-48 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                      ))}
                    </div>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex items-center justify-between">
                      <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
