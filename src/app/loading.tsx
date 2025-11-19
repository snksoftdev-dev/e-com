export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Header Skeleton */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="flex items-center gap-4">
              <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-r from-gray-200 to-gray-300">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="h-12 bg-white/30 rounded w-2/3 mx-auto mb-6 animate-pulse"></div>
          <div className="h-8 bg-white/20 rounded w-1/2 mx-auto mb-8 animate-pulse"></div>
          <div className="h-12 bg-white/40 rounded w-32 mx-auto animate-pulse"></div>
        </div>
      </div>

      {/* Features Section Skeleton */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-12 w-12 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mt-1 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section Skeleton */}
      <div className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8 animate-pulse"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-background rounded-lg p-6 text-center">
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products Section Skeleton */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border overflow-hidden shadow-sm"
              >
                {/* Product Image Skeleton */}
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                
                {/* Product Content Skeleton */}
                <div className="p-4">
                  {/* Category Badge */}
                  <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                  
                  {/* Product Title */}
                  <div className="h-5 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                      ))}
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                  </div>
                  
                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between">
                    <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="bg-muted py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t mt-8 pt-8 text-center">
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
