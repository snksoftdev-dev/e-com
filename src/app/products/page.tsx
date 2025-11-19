import { getAllProducts, getCategories } from "@/lib/api";
import Header from "@/components/Header";
import ProductsClient from "@/components/ProductsClient";

export default async function Products() {
  // Fetch data on the server
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories()
  ]);

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">
            Discover our complete collection of amazing products
          </p>
        </div>

        {/* Client-side filtered products */}
        <ProductsClient initialProducts={products} categories={categories} />
      </div>
    </div>
  );
}
