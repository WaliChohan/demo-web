'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  draggable?: boolean;
}

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  style,
  draggable = false,
}: ImageWithFallbackProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-brand-card">
      {/* Luxury shimmer skeleton placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1738] via-[#162250] to-[#0E1738] animate-pulse z-10 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-brand-gold/30 border-t-brand-gold animate-spin opacity-40" />
        </div>
      )}

      {/* Actual image */}
      <Image
        src={hasError ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop' : src}
        alt={alt}
        fill
        sizes="100vw"
        draggable={draggable}
        style={style}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-700 ease-in-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
