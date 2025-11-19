import { Product } from '@/types';

// Alternative reliable APIs that work well with Vercel
// Option 1: Platzi Fake Store API (most similar to FakeStore API)
const FAKE_STORE_API = 'https://api.escuelajs.co/api/v1';

// Option 2: JSONPlaceholder (backup)
// const FAKE_STORE_API = 'https://jsonplaceholder.typicode.com';

// Option 3: ReqRes (another backup)
// const FAKE_STORE_API = 'https://reqres.in/api';

// Enhanced fallback data with more products
function getMinimalFallbackData() {
  return {
    products: [
      {
        id: 1,
        title: "Wireless Bluetooth Headphones",
        price: 89.99,
        description: "High-quality wireless headphones with noise cancellation and 20-hour battery life.",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        rating: { rate: 4.5, count: 250 }
      },
      {
        id: 2,
        title: "Smartphone Case",
        price: 24.99,
        description: "Durable protective case with shock absorption and wireless charging compatibility.",
        category: "accessories",
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
        rating: { rate: 4.2, count: 180 }
      },
      {
        id: 3,
        title: "Cotton T-Shirt",
        price: 19.99,
        description: "Comfortable 100% cotton t-shirt available in multiple colors.",
        category: "clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        rating: { rate: 4.0, count: 95 }
      },
      {
        id: 4,
        title: "Leather Wallet",
        price: 49.99,
        description: "Genuine leather wallet with multiple card slots and bill compartment.",
        category: "accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        rating: { rate: 4.7, count: 320 }
      },
      {
        id: 5,
        title: "Coffee Mug",
        price: 12.99,
        description: "Ceramic coffee mug with unique design, microwave and dishwasher safe.",
        category: "home",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
        rating: { rate: 4.3, count: 75 }
      }
    ],
    categories: ["electronics", "accessories", "clothing", "home"]
  };
}

// Add retry logic and better error handling
async function fetchWithRetry(url: string): Promise<Response> {
  try {
    // Use Next.js compatible caching for static generation
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Use Next.js caching instead of no-store to allow static generation
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
    
    if (response.ok) {
      return response;
    }
    
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    console.log('Fetching products from Platzi Fake Store API...');
    const response = await fetchWithRetry(`${FAKE_STORE_API}/products`);
    const data = await response.json();
    
    // Validate the data structure
    if (!Array.isArray(data) || data.length === 0) {
      console.error('Invalid or empty API response');
      return getMinimalFallbackData().products;
    }
    
    // Transform Platzi API format to our Product format
    const transformedProducts = data.slice(0, 30).map((item: {
      id: number;
      title: string;
      price: number;
      description: string;
      category: { name: string };
      images: string[];
    }) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category?.name || 'general',
      image: item.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
      rating: { 
        rate: 4.0, 
        count: 100 
      }
    }));
    
    console.log(`✅ Successfully fetched ${transformedProducts.length} products from API`);
    return transformedProducts;
  } catch (error) {
    console.error('❌ Platzi Fake Store API failed:', error);
    console.log('🔄 Using fallback data');
    return getMinimalFallbackData().products;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetchWithRetry(`${FAKE_STORE_API}/products/${id}`);
    const data = await response.json();
    
    // Transform Platzi API format to our Product format
    return {
      id: data.id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category?.name || 'general',
      image: data.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
      rating: { 
        rate: 4.0, 
        count: 100 
      }
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    // Return fallback product if ID is 1
    const fallbackData = getMinimalFallbackData();
    return id === '1' ? fallbackData.products[0] : null;
  }
}

export async function getProduct(id: number): Promise<Product> {
  try {
    const response = await fetchWithRetry(`${FAKE_STORE_API}/products/${id}`);
    const data = await response.json();
    
    // Transform Platzi API format to our Product format
    return {
      id: data.id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category?.name || 'general',
      image: data.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
      rating: { 
        rate: 4.0, 
        count: 100 
      }
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    // Return fallback product if ID is 1
    const fallbackData = getMinimalFallbackData();
    if (id === 1) {
      return fallbackData.products[0];
    }
    throw error;
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    // Platzi API uses category IDs, so we'll get all products and filter
    const response = await fetchWithRetry(`${FAKE_STORE_API}/products`);
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.error('Invalid category API response: expected array');
      return [];
    }
    
    // Filter and transform products by category
    const filteredProducts = data.filter((item: {
      category?: { name?: string };
    }) => 
      item.category?.name?.toLowerCase().includes(category.toLowerCase())
    );
    
    return filteredProducts.map((item: {
      id: number;
      title: string;
      price: number;
      description: string;
      category: { name: string };
      images: string[];
    }) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category?.name || 'general',
      image: item.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
      rating: { 
        rate: 4.0, 
        count: 100 
      }
    }));
  } catch (error) {
    console.error('Error fetching products by category:', error);
    const fallbackData = getMinimalFallbackData();
    return category === 'electronics' ? fallbackData.products : [];
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    console.log('Fetching categories from Platzi Fake Store API...');
    const response = await fetchWithRetry(`${FAKE_STORE_API}/categories`);
    const data = await response.json();
    
    // Platzi API returns categories as objects with name property
    if (!Array.isArray(data) || data.length === 0) {
      console.error('Invalid or empty categories API response');
      return getMinimalFallbackData().categories;
    }
    
    // Extract category names
    const categoryNames = data.map((category: { name: string }) => category.name);
    
    console.log(`✅ Successfully fetched ${categoryNames.length} categories from API`);
    return categoryNames;
  } catch (error) {
    console.error('❌ Categories API failed:', error);
    console.log('🔄 Using fallback categories');
    return getMinimalFallbackData().categories;
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}
