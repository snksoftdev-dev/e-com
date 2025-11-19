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
async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // Add timeout and cache settings for Vercel
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      
      if (response.ok) {
        return response;
      }
      
      if (i === retries - 1) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      if (i === retries - 1) {
        throw error;
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('All retry attempts failed');
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetchWithRetry(`${FAKE_STORE_API}/products`);
    const data = await response.json();
    
    // Validate the data structure
    if (!Array.isArray(data)) {
      console.error('Invalid API response: expected array');
      return getMinimalFallbackData().products;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
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
    const response = await fetchWithRetry(`${FAKE_STORE_API}/products/categories`);
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.error('Invalid categories API response: expected array');
      return getMinimalFallbackData().categories;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return getMinimalFallbackData().categories;
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}
