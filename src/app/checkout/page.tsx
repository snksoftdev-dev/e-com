/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

import { useAppSelector } from '@/store/hooks';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const { items }: any = useAppSelector((state) => state.cart);

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some items to your cart before checking out.</p>
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase securely</p>
          </div>
          <Link href="/cart">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Checkout Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The checkout functionality will be implemented here.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold">Features to be added:</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Shipping address form</li>
                <li>Payment information</li>
                <li>Order review</li>
                <li>Order completion</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
