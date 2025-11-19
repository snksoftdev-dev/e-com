'use client';

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

interface InfiniteProductGridProps {
  initialProducts: Product[];
}

export default function InfiniteProductGrid({ initialProducts }: InfiniteProductGridProps) {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  
  const PRODUCTS_PER_LOAD = 8;

  // Initialize with first batch
  useEffect(() => {
    // Ensure we have unique products by ID
    const uniqueProducts = initialProducts.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    );
    
    const firstBatch = uniqueProducts.slice(0, PRODUCTS_PER_LOAD);
    setDisplayedProducts(firstBatch);
    setPage(1);
    setHasMore(firstBatch.length < uniqueProducts.length);
  }, [initialProducts]);

  const loadMoreProducts = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    
    // Ensure we have unique products by ID
    const uniqueProducts = initialProducts.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    );
    
    // Simulate network delay for better UX
    setTimeout(() => {
      const startIndex = page * PRODUCTS_PER_LOAD;
      const endIndex = startIndex + PRODUCTS_PER_LOAD;
      const newProducts = uniqueProducts.slice(startIndex, endIndex);
      
      if (newProducts.length > 0) {
        setDisplayedProducts(prev => {
          // Filter out any products that might already exist to prevent duplicates
          const existingIds = new Set(prev.map(p => p.id));
          const uniqueNewProducts = newProducts.filter(product => !existingIds.has(product.id));
          
          return [...prev, ...uniqueNewProducts];
        });
        setPage(prev => prev + 1);
        setHasMore(endIndex < uniqueProducts.length);
      } else {
        setHasMore(false);
      }
      
      setLoadingMore(false);
    }, 500);
  }, [initialProducts, page, loadingMore, hasMore]);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop 
          >= document.documentElement.offsetHeight - 1000) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreProducts]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
        {displayedProducts.map((product, index) => (
          <ProductCard key={`product-${product.id}-${index}`} product={product} />
        ))}
      </div>

      {/* Loading More Indicator */}
      {loadingMore && (
        <div className="text-center mt-8">
          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
          <p className="text-muted-foreground">Loading more products...</p>
        </div>
      )}

      {/* Load More Button (fallback for users who prefer manual loading) */}
      {hasMore && !loadingMore && (
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            onClick={loadMoreProducts}
            className="min-w-32"
          >
            Load More Products
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Or scroll down for automatic loading
          </p>
        </div>
      )}

      {!hasMore && displayedProducts.length > 0 && (
        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            You&apos;ve seen all {displayedProducts.length} products!
          </p>
          <Link href="/products">
            <Button variant="link" className="mt-2">
              Explore our full catalog →
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
