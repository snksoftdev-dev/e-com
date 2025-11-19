import { getCategories } from "@/lib/api";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function CategoriesPage() {
  // Fetch categories on the server
  const categories = await getCategories();

  // Category images and descriptions (you can customize these)
  const categoryData = {
    "men's clothing": {
      image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400&h=300&fit=crop",
      description: "Stylish and comfortable clothing for men",
      color: "bg-blue-500"
    },
    "women's clothing": {
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
      description: "Trendy fashion and apparel for women",
      color: "bg-pink-500"
    },
    "jewelery": {
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
      description: "Elegant jewelry and accessories",
      color: "bg-yellow-500"
    },
    "electronics": {
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop",
      description: "Latest gadgets and electronic devices",
      color: "bg-purple-500"
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Tag className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated collections across different categories. 
            Find exactly what you&apos;re looking for with ease.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 items-stretch">
          {categories.map((category) => {
            const data = categoryData[category as keyof typeof categoryData] || {
              image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
              description: "Explore our collection",
              color: "bg-gray-500"
            };

            return (
              <Link 
                key={category} 
                href={`/categories/${encodeURIComponent(category)}`}
                className="group h-full"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 h-full flex flex-col">
                  {/* Category Image */}
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <Image
                      src={data.image}
                      alt={category}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className={`absolute top-4 left-4 ${data.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                      <Tag className="h-3 w-3 mr-1 inline" />
                      New
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold capitalize group-hover:text-primary transition-colors line-clamp-2 flex-1">
                        {category}
                      </h3>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 flex-1 min-h-[2.5rem]">
                      {data.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <Badge variant="outline" className="capitalize">
                        {category.split(' ').length} words
                      </Badge>
                      <span className="text-sm font-medium text-primary">
                        Browse Collection →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="bg-muted/30 rounded-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Why Shop by Category?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our categorized shopping experience makes it easier to find what you need quickly and efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Organized Shopping</h3>
              <p className="text-sm text-muted-foreground">
                Find products faster with our well-organized category system
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Quick Navigation</h3>
              <p className="text-sm text-muted-foreground">
                Navigate directly to the type of products you&apos;re looking for
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Badge className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Curated Selection</h3>
              <p className="text-sm text-muted-foreground">
                Each category features carefully selected, high-quality products
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Can&apos;t find what you&apos;re looking for?</h2>
          <p className="text-muted-foreground mb-6">
            Browse our complete product catalog or use the search function
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors">
                View All Products
              </button>
            </Link>
            <Link href="/">
              <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-8 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
