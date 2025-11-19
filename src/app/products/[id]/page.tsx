import { notFound } from "next/navigation";
import Image from "next/image";
import { getProduct } from "@/lib/api";
import AddToCartButton from "@/components/AddToCartButton";
import Header from "@/components/Header";
import { Star, ArrowLeft, Shield, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const productId = parseInt(id);
  
  if (isNaN(productId)) {
    notFound();
  }

  try {
    const product = await getProduct(productId);
    
    return (
      <div className="min-h-screen">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link href="/products">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square relative bg-white rounded-lg border overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2 capitalize">
                  {product.category}
                </Badge>
                <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating.rate)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="text-3xl font-bold text-primary mb-6">
                  ${product.price.toFixed(2)}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <AddToCartButton product={product} className="w-full" size="lg" />
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RotateCcw className="h-4 w-4 text-purple-600" />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Product Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Specifications</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Category:</span>
                    <span className="capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Product ID:</span>
                    <span>{product.id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Rating:</span>
                    <span>{product.rating.rate}/5 ({product.rating.count} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Shipping & Returns</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Free shipping on orders over $50</p>
                  <p>• Standard delivery: 5-7 business days</p>
                  <p>• Express delivery: 2-3 business days</p>
                  <p>• 30-day return policy</p>
                  <p>• Free returns for defective items</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    // Fetch actual products to get real IDs
    const response = await fetch('https://api.escuelajs.co/api/v1/products', {
      next: { revalidate: 300 }
    });
    
    if (!response.ok) {
      // Fallback to a few product IDs if API fails
      return [
        { id: '1' },
        { id: '2' },
        { id: '3' }
      ];
    }
    
    const data = await response.json();
    
    // Get first 5 actual product IDs
    const actualIds = data.slice(0, 5).map((product: { id: number }) => ({
      id: product.id.toString(),
    }));
    
    return actualIds;
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    // Fallback to safe IDs
    return [
      { id: '1' },
      { id: '2' },
      { id: '3' }
    ];
  }
}
