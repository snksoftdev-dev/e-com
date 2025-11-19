'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-12">
            {/* 404 Animation */}
            <div className="relative mb-8">
              <div className="text-9xl font-bold text-blue-100 select-none">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <AlertTriangle className="h-16 w-16 text-blue-600 animate-pulse" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              Oops! The page you&apos;re looking for seems to have wandered off into the digital void.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/">
                <Button size="lg" className="w-full sm:w-auto">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => window.history.back()}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>

              <Link href="/products">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Products
                </Button>
              </Link>
            </div>

            {/* Helpful Links */}
            <div className="border-t pt-6">
              <p className="text-sm text-gray-500 mb-4">Looking for something specific?</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link href="/products" className="text-blue-600 hover:text-blue-800 hover:underline">
                  All Products
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/cart" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Shopping Cart
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/login" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Login
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/register" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Fun Message */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Pro Tip:</strong> Double-check the URL or use our search to find what you need!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
