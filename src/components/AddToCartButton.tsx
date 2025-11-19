'use client';

import { ShoppingCart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';

interface AddToCartButtonProps {
  product: Product;
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'secondary' | 'outline';
  className?: string;
}

export default function AddToCartButton({ 
  product, 
  size = 'sm', 
  variant = 'default',
  className 
}: AddToCartButtonProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if inside a Link
    dispatch(addToCart(product));
  };

  return (
    <Button 
      size={size} 
      variant={variant}
      onClick={handleAddToCart}
      className={`shrink-0 ${className || ''}`}
    >
      {size === 'sm' ? (
        <Plus className="h-4 w-4" />
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
