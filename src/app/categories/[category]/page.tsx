import { getAllProducts, getCategories } from "@/lib/api";
import Header from "@/components/Header";
import ProductsClient from "@/components/ProductsClient";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: encodedCategory } = await params;
  const category = decodeURIComponent(encodedCategory);
  
  // Fetch data on the server
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories()
  ]);

  // Check if category exists
  if (!categories.includes(category)) {
    notFound();
  }

  // Filter products for this category
  const categoryProducts = products.filter(product => product.category === category);

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-primary">Categories</Link>
            <span>/</span>
            <span className="text-foreground capitalize">{category}</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Tag className="h-5 w-5 text-primary" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold capitalize">{category}</h1>
              </div>
              <p className="text-muted-foreground">
                Discover our collection of {category.toLowerCase()} products
              </p>
            </div>
            
            <Link href="/categories">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Categories
              </Button>
            </Link>
          </div>
        </div>

        {/* Category Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{categoryProducts.length}</div>
            <div className="text-sm text-muted-foreground">Products</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              ${Math.min(...categoryProducts.map(p => p.price)).toFixed(0)}
            </div>
            <div className="text-sm text-muted-foreground">Starting Price</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {(categoryProducts.reduce((sum, p) => sum + p.rating.rate, 0) / categoryProducts.length).toFixed(1)}★
            </div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {categoryProducts.reduce((sum, p) => sum + p.rating.count, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Reviews</div>
          </div>
        </div>

        {/* Products with filtering */}
        {categoryProducts.length > 0 ? (
          <ProductsClient 
            initialProducts={categoryProducts} 
            categories={[category]} // Only show this category in filters
          />
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No products found</h2>
            <p className="text-muted-foreground mb-6">
              There are currently no products in the {category} category.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/categories">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Browse Other Categories
                </Button>
              </Link>
              <Link href="/products">
                <Button>View All Products</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Generate static paths for all categories at build time
export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    
    return categories.map((category) => ({
      category: encodeURIComponent(category),
    }));
  } catch (error) {
    console.error('Error generating static params for categories:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: encodedCategory } = await params;
  const category = decodeURIComponent(encodedCategory);
  
  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} - E-Store`,
    description: `Shop the best ${category} products at E-Store. Quality products with fast shipping.`,
    keywords: `${category}, shopping, e-commerce, online store`,
  };
}
