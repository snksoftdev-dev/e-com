import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { formatPrice } from '@/lib/api';
import AddToCartButton from '@/components/AddToCartButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="h-full">
      <Card className="group overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col">
        <div className="aspect-square overflow-hidden">
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </Link>
        </div>
        <CardContent className="p-4 flex flex-col h-48">
          <div className="mb-2">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
          </div>
          
          <Link href={`/products/${product.id}`} className="flex-1 mb-3">
            <h3 className="font-semibold text-sm hover:text-primary transition-colors line-clamp-2 h-10 overflow-hidden">
              {product.title}
            </h3>
          </Link>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-muted-foreground ml-1">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            <AddToCartButton product={product} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
