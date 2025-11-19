import { Product } from '@/types';

const FAKE_STORE_API = 'https://fakestoreapi.com';

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
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetchWithRetry(`${FAKE_STORE_API}/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getProduct(id: number): Promise<Product> {
  try {
    const response = await fetchWithRetry(`${FAKE_STORE_API}/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
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
    return [];
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetchWithRetry(`${FAKE_STORE_API}/products/categories`);
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.error('Invalid categories API response: expected array');
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}
