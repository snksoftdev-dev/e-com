import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';
import { getAllProducts, getProductById, getCategories } from '@/lib/api';

interface ProductsState {
  products: Product[];
  categories: string[];
  selectedProduct: Product | null;
  filteredProducts: Product[];
  searchTerm: string;
  selectedCategory: string;
  loading: boolean;
  error: string | null;
  sortBy: 'price' | 'rating' | 'name' | '';
  sortOrder: 'asc' | 'desc';
}

const initialState: ProductsState = {
  products: [],
  categories: [],
  selectedProduct: null,
  filteredProducts: [],
  searchTerm: '',
  selectedCategory: '',
  loading: false,
  error: null,
  sortBy: '',
  sortOrder: 'asc',
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await getAllProducts();
    return products;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string) => {
    const product = await getProductById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const categories = await getCategories();
    return categories;
  }
);

// Helper function to filter and sort products
const filterAndSortProducts = (
  products: Product[],
  searchTerm: string,
  selectedCategory: string,
  sortBy: string,
  sortOrder: 'asc' | 'desc'
) => {
  let filtered = [...products];

  // Filter by search term
  if (searchTerm) {
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter by category
  if (selectedCategory) {
    filtered = filtered.filter(product => product.category === selectedCategory);
  }

  // Sort products
  if (sortBy) {
    filtered.sort((a, b) => {
      let aValue: string | number, bValue: string | number;

      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating.rate;
          bValue = b.rating.rate;
          break;
        case 'name':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });
  }

  return filtered;
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredProducts = filterAndSortProducts(
        state.products,
        action.payload,
        state.selectedCategory,
        state.sortBy,
        state.sortOrder
      );
    },

    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.filteredProducts = filterAndSortProducts(
        state.products,
        state.searchTerm,
        action.payload,
        state.sortBy,
        state.sortOrder
      );
    },

    setSortBy: (state, action: PayloadAction<'price' | 'rating' | 'name' | ''>) => {
      state.sortBy = action.payload;
      state.filteredProducts = filterAndSortProducts(
        state.products,
        state.searchTerm,
        state.selectedCategory,
        action.payload,
        state.sortOrder
      );
    },

    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
      state.filteredProducts = filterAndSortProducts(
        state.products,
        state.searchTerm,
        state.selectedCategory,
        state.sortBy,
        action.payload
      );
    },

    clearFilters: (state) => {
      state.searchTerm = '';
      state.selectedCategory = '';
      state.sortBy = '';
      state.sortOrder = 'asc';
      state.filteredProducts = state.products;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch products';
    });

    // Fetch product by ID
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch product';
    });

    // Fetch categories
    builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    });
  },
});

export const {
  setSearchTerm,
  setSelectedCategory,
  setSortBy,
  setSortOrder,
  clearFilters,
  clearError,
} = productsSlice.actions;

export default productsSlice.reducer;
