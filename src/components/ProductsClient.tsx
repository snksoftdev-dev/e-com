'use client';

import { useState, useEffect, useCallback } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, Grid3X3, List, Star } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

// List view component
function ProductListItem({ product }: { product: Product }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="flex-shrink-0">
            <Link href={`/products/${product.id}`}>
              <div className="relative w-full md:w-32 h-48 md:h-32 overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
            </Link>
          </div>
          
          {/* Content */}
          <div className="flex-1 space-y-3">
            <div>
              <Badge variant="secondary" className="text-xs mb-2">
                {product.category}
              </Badge>
              <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2">
                  {product.title}
                </h3>
              </Link>
            </div>
            
            <p className="text-muted-foreground text-sm line-clamp-3">
              {product.description}
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-muted-foreground ml-1">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            </div>
          </div>
          
          {/* Price and Actions */}
          <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold">{formatPrice(product.price)}</div>
            </div>
            <AddToCartButton product={product} size="default" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ProductsClientProps {
  initialProducts: Product[];
  categories: string[];
}

export default function ProductsClient({ initialProducts, categories }: ProductsClientProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Filter and sort products
  const handleFilterChange = useCallback(() => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'newest':
        // For demo purposes, we'll sort by id (newest = highest id)
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy]);

  // Apply filters whenever any filter state changes
  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  return (
    <div>
      {/* Filters */}
      <div className="bg-background border rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Search Products</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-48">
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="capitalize">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort Filter */}
          <div className="w-full md:w-48">
            <label className="block text-sm font-medium mb-2">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Featured" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Button */}
          <Button variant="outline" className="w-full md:w-auto" onClick={handleFilterChange}>
            <Filter className="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
        </p>
        <div className="flex gap-2">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4 mr-2" />
            Grid View
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4 mr-2" />
            List View
          </Button>
        </div>
      </div>

      {/* Products Display */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12 items-stretch"
          : "space-y-4 mb-12"
      }>
        {currentProducts.map((product, index) => (
          viewMode === 'grid' ? (
            <ProductCard key={`product-${product.id}-${index}`} product={product} />
          ) : (
            <ProductListItem key={`product-list-${product.id}-${index}`} product={product} />
          )
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">No products found</p>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSortBy('featured');
              setCurrentPage(1);
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Dynamic Pagination */}
      {filteredProducts.length > 0 && totalPages > 1 && (
        <div className="flex flex-col items-center gap-4">
          {/* Page Info */}
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          
          <div className="flex justify-center items-center gap-2">
            {/* Previous Button */}
            <Button 
              variant="outline" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              Previous
            </Button>
            
            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                let pageNumber;
                
                if (totalPages <= 7) {
                  // Show all pages if 7 or fewer
                  pageNumber = i + 1;
                } else {
                  // Show smart pagination for more than 7 pages
                  if (currentPage <= 4) {
                    // Show first 5 pages, then ...
                    pageNumber = i < 5 ? i + 1 : totalPages - (6 - i);
                  } else if (currentPage >= totalPages - 3) {
                    // Show last 5 pages
                    pageNumber = totalPages - (6 - i);
                  } else {
                    // Show current page ± 2
                    pageNumber = currentPage - 3 + i;
                  }
                }
                
                const isEllipsis = (i === 5 && totalPages > 7 && currentPage <= 4) || 
                                  (i === 1 && totalPages > 7 && currentPage >= totalPages - 3);
                
                if (isEllipsis) {
                  return <span key={`ellipsis-${i}`} className="px-2">...</span>;
                }
                
                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>
            
            {/* Next Button */}
            <Button 
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              Next
            </Button>
          </div>
          
          {/* Quick page jump */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Go to page:</span>
            <Input
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = Math.max(1, Math.min(totalPages, parseInt(e.target.value) || 1));
                setCurrentPage(page);
              }}
              className="w-16 h-8 text-center"
            />
          </div>
        </div>
      )}
    </div>
  );
}
