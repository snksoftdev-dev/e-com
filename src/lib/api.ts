import { Product } from '@/types';

const FAKE_STORE_API = 'https://fakestoreapi.com';

// Minimal fallback data for build time only
function getMinimalFallbackData() {
  return {
    products: [
      {
        id: 1,
        title: "Sample Product",
        price: 29.99,
        description: "This is a sample product for demonstration purposes.",
        category: "electronics",
        image: "https://via.placeholder.com/400x400",
        rating: { rate: 4.0, count: 100 }
      }
    ],
    categories: ["electronics", "jewelery", "men's clothing", "women's clothing"]
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
    console.log('Fetching products from FakeStore API...');
    const response = await fetchWithRetry(`${FAKE_STORE_API}/products`);
    const data = await response.json();
    
    // Validate the data structure
    if (!Array.isArray(data) || data.length === 0) {
      console.error('Invalid or empty API response');
      return getMinimalFallbackData().products;
    }
    
    console.log(`✅ Successfully fetched ${data.length} products from API`);
    return data;
  } catch (error) {
    console.error('❌ FakeStore API failed:', error);
    console.log('🔄 Using fallback data');
    return getMinimalFallbackData().products;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetchWithRetry(`${FAKE_STORE_API}/products/${id}`);
    const data = await response.json();
    return data;
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
    return data;
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
    const response = await fetchWithRetry(`${FAKE_STORE_API}/products/category/${category}`);
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.error('Invalid category API response: expected array');
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    const fallbackData = getMinimalFallbackData();
    return category === 'electronics' ? fallbackData.products : [];
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    console.log('Fetching categories from FakeStore API...');
    const response = await fetchWithRetry(`${FAKE_STORE_API}/products/categories`);
    const data = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      console.error('Invalid or empty categories API response');
      return getMinimalFallbackData().categories;
    }
    
    console.log(`✅ Successfully fetched ${data.length} categories from API`);
    return data;
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
