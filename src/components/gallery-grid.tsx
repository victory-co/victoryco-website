"use client";

import { useState, useEffect } from "react";
import { Lightbox } from "./lightbox";

interface GalleryImage {
  id: number;
  imageUrl: string;
  caption: string | null;
  postedAt: string;
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-lg border border-[#d4a843]/5 bg-[#111010] aspect-video"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1a1918]/60 to-transparent animate-[shimmer_2s_infinite]" />
          {/* Faint placeholder lines */}
          <div className="absolute bottom-4 left-4 right-12 space-y-2">
            <div className="h-2.5 rounded bg-[#1a1918] w-3/5" />
            <div className="h-2 rounded bg-[#1a1918] w-2/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      {/* Shield icon with crossed swords — "no trophies yet" */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-lg border border-[#d4a843]/15 bg-[#111010] flex items-center justify-center shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            className="w-9 h-9 text-[#d4a843]/30"
          >
            <path d="M4 4h16v2l-2 10H6L4 6V4z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="20" r="1" />
            <circle cx="15" cy="20" r="1" />
            <path d="M9 20h6" />
            <path d="M12 8v4M10 10h4" strokeLinecap="round" />
          </svg>
        </div>
        {/* Decorative corner accents */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-[#d4a843]/15" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[#d4a843]/15" />
      </div>

      <p
        className="text-[#8a8478] text-sm tracking-[0.15em] uppercase mb-2"
        style={{ fontFamily: "var(--font-cinzel), serif" }}
      >
        The gallery awaits
      </p>
      <p
        className="text-[#6b6560] text-xs tracking-wide"
        style={{ fontFamily: "var(--font-raleway), sans-serif" }}
      >
        Screenshots will appear here once posted
      </p>
    </div>
  );
}

export function GalleryGrid() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setImages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <SkeletonGrid />;
  if (images.length === 0) return <EmptyState />;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setSelectedImage(img)}
            className="group relative overflow-hidden rounded-lg border border-[#d4a843]/8 bg-[#111010] aspect-video text-left transition-all duration-300 hover:border-[#d4a843]/25 hover:shadow-[0_4px_30px_rgba(0,0,0,0.5),0_0_15px_rgba(212,168,67,0.04)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d4a843]/50"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Image */}
            <img
              src={img.imageUrl}
              alt={img.caption || "Clan screenshot"}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />

            {/* Permanent subtle bottom gradient for depth */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent pointer-events-none" />

            {/* Hover caption overlay */}
            {img.caption && (
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#0a0a0a]/85 via-[#0a0a0a]/50 to-transparent translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <p
                  className="text-xs text-[#e8dcc8]/90 tracking-wide line-clamp-2"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  {img.caption}
                </p>
              </div>
            )}

            {/* Subtle inner shadow for framed feel */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] pointer-events-none rounded-lg" />
          </button>
        ))}
      </div>

      {selectedImage && (
        <Lightbox
          imageUrl={selectedImage.imageUrl}
          caption={selectedImage.caption}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
