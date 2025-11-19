/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromCart, clearCart, incrementQuantity, decrementQuantity } from '@/store/slices/cartSlice';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingBag, Calculator, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items, totalItems, totalPrice }: any = useAppSelector((state) => state.cart);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-muted/30 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-3">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Looks like you haven&apos;t made your choice yet. Browse our amazing products and add them to your cart.
            </p>
            <div className="space-y-4">
              <Link href="/products">
                <Button size="lg" className="w-full">
                  Start Shopping
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Back to Home
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Why shop with us?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✓ Free shipping on orders over $25</li>
                <li>✓ 30-day return policy</li>
                <li>✓ Secure checkout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground mt-2">
            Review your items before checkout
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {/* Cart Items */}
          <div className="lg:col-span-2 xl:col-span-3">
            <div className="space-y-4">
              {items.map((item:any) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    {/* Mobile Layout */}
                    <div className="flex flex-col space-y-4 md:hidden">
                      <div className="flex items-start space-x-4">
                        <div className="relative h-20 w-20 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-lg font-bold text-primary">
                              ${item.price.toFixed(2)}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {item.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDecrement(item.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleIncrement(item.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="font-bold text-lg">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-destructive hover:text-destructive-foreground hover:bg-destructive h-8 px-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center space-x-4">
                      <div className="relative h-20 w-20 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold line-clamp-1 text-lg">{item.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-primary">
                            ${item.price.toFixed(2)}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex flex-col items-center space-y-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDecrement(item.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleIncrement(item.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-destructive hover:text-destructive-foreground hover:bg-destructive h-8 px-2"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>

                      <div className="text-right space-y-1">
                        <p className="text-sm text-muted-foreground">Subtotal</p>
                        <p className="text-xl font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calculator className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Items Preview */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Items in cart</span>
                    <Badge variant="secondary" className="text-xs">
                      {totalItems}
                    </Badge>
                  </div>
                  
                  {/* Mini item list */}
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {items.slice(0, 3).map((item: any) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="relative h-8 w-8 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="rounded object-cover"
                            />
                          </div>
                          <span className="truncate">{item.title}</span>
                        </div>
                        <span className="text-muted-foreground ml-2">×{item.quantity}</span>
                      </div>
                    ))}
                    {items.length > 3 && (
                      <div className="text-xs text-muted-foreground text-center py-1">
                        +{items.length - 3} more items
                      </div>
                    )}
                  </div>
                </div>

                <Separator />
                
                {/* Pricing Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Subtotal ({totalItems} items)</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Shipping</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-green-600">Free</span>
                      <div className="text-xs text-muted-foreground">Orders over $25</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tax (8%)</span>
                    <span className="font-medium">${(totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-4" />
                
                {/* Total */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ${(totalPrice * 1.08).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Including all taxes and fees
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2">
                  <div className="space-y-0">
                    <Link href="/checkout">
                      <Button className="w-full" size="lg">
                        Proceed to Checkout
                      </Button>
                    </Link>
                    
                    <Link href="/products">
                      <Button variant="outline" className="w-full mt-2">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleClearCart}
                    className="w-full mt-4 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
                
                {/* Security Note */}
                <div className="text-center pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    🔒 Secure checkout with SSL encryption
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
