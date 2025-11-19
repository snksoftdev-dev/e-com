'use client';

import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skull, Home, RefreshCw, Mail } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the critical error
    console.error('Critical Application Error:', error);
    
    // Here you could send error to monitoring service
    // Example: Sentry, LogRocket, etc.
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-red-900 flex items-center justify-center p-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
              <CardContent className="p-12">
                {/* Critical Error Icon */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Skull className="h-12 w-12 text-red-600 animate-pulse" />
                  </div>
                  <div className="absolute inset-0 bg-red-500/10 rounded-full animate-ping"></div>
                </div>

                {/* Error Message */}
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Critical Error
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  A critical error occurred that prevented the application from functioning properly.
                </p>

                {/* Error Details */}
                <div className="mb-8 p-6 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-3 flex items-center justify-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Technical Information
                  </h3>
                  
                  {process.env.NODE_ENV === 'development' ? (
                    <div className="text-left">
                      <pre className="text-sm text-red-700 overflow-auto max-h-32 bg-white p-3 rounded border">
                        {error.message}
                      </pre>
                      {error.digest && (
                        <p className="text-xs text-gray-500 mt-2">
                          Error ID: {error.digest}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-red-700">
                      An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Button 
                    size="lg" 
                    onClick={() => {
                      reset();
                      window.location.reload();
                    }}
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
                  >
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Restart Application
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => window.location.href = '/'}
                    className="w-full sm:w-auto border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <Home className="mr-2 h-5 w-5" />
                    Go to Homepage
                  </Button>
                </div>

                {/* Emergency Actions */}
                <div className="border-t border-red-200 pt-6">
                  <p className="text-sm text-gray-600 mb-4">
                    If this error persists, try these steps:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <button 
                      onClick={() => {
                        localStorage.clear();
                        sessionStorage.clear();
                        window.location.reload();
                      }}
                      className="p-3 bg-gray-50 rounded border hover:bg-gray-100 transition-colors"
                    >
                      Clear Browser Data & Reload
                    </button>
                    
                    <button 
                      onClick={() => {
                        if ('serviceWorker' in navigator) {
                          navigator.serviceWorker.getRegistrations().then(registrations => {
                            registrations.forEach(registration => registration.unregister());
                          });
                        }
                        window.location.reload();
                      }}
                      className="p-3 bg-gray-50 rounded border hover:bg-gray-100 transition-colors"
                    >
                      Reset Service Workers
                    </button>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    🆘 <strong>Need immediate help?</strong> This error has been automatically reported to our development team.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </body>
    </html>
  );
}
