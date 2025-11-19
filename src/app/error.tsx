'use client';

import { useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, RefreshCw, Home, Bug } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-12">
            {/* Error Icon */}
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-12 w-12 text-red-600" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Bug className="h-6 w-6 text-red-400 animate-bounce" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Something went wrong!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              We&apos;re sorry, but something unexpected happened. Our team has been notified.
            </p>

            {/* Error Details (in development) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-8 p-4 bg-gray-100 rounded-lg text-left">
                <h3 className="font-semibold text-gray-800 mb-2">Error Details:</h3>
                <pre className="text-sm text-red-600 overflow-auto max-h-32">
                  {error.message}
                </pre>
                {error.digest && (
                  <p className="text-xs text-gray-500 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                size="lg" 
                onClick={reset}
                className="w-full sm:w-auto"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Try Again
              </Button>
              
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Button>
              </Link>
            </div>

            {/* Help Text */}
            <div className="border-t pt-6">
              <p className="text-sm text-gray-500 mb-4">
                If this problem persists, please contact our support team.
              </p>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <button 
                  onClick={() => window.location.reload()}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Refresh Page
                </button>
                <span className="text-gray-300">•</span>
                <Link href="/products" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Browse Products
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/cart" className="text-blue-600 hover:text-blue-800 hover:underline">
                  View Cart
                </Link>
              </div>
            </div>

            {/* Status Message */}
            <div className="mt-8 p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800">
                🛠️ <strong>We&apos;re on it!</strong> Our technical team has been automatically notified of this issue.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
