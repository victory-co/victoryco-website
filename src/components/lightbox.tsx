"use client";

import { useState, useEffect, useCallback } from "react";

interface LightboxProps {
  imageUrl: string;
  caption: string | null;
  onClose: () => void;
}

export function Lightbox({ imageUrl, caption, onClose }: LightboxProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation on next frame
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 250);
  }, [onClose]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKey);
    // Lock body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [handleClose]);

  return (
    <div
      className={[
        "fixed inset-0 z-50 flex items-center justify-center",
        "transition-all duration-300 ease-out",
        visible
          ? "bg-black/92 backdrop-blur-md opacity-100"
          : "bg-black/0 backdrop-blur-none opacity-0",
      ].join(" ")}
      onClick={handleClose}
    >
      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_60px_rgba(0,0,0,0.7)] pointer-events-none" />

      {/* Corner ornaments */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-[#d4a843]/20 pointer-events-none" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-[#d4a843]/20 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-[#d4a843]/20 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-[#d4a843]/20 pointer-events-none" />

      <div
        className={[
          "relative max-w-5xl max-h-[90vh] mx-4",
          "transition-all duration-300 ease-out",
          visible
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image frame — thin gold border like a guild hall portrait */}
        <div className="relative rounded border border-[#d4a843]/20 overflow-hidden shadow-[0_8px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(212,168,67,0.06)]">
          <img
            src={imageUrl}
            alt={caption || "Gallery image"}
            className="max-w-full max-h-[80vh] object-contain block"
          />
        </div>

        {/* Caption */}
        {caption && (
          <p
            className={[
              "text-center mt-5 text-sm tracking-wide text-[#8a8478]",
              "transition-all duration-500 delay-150",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            ].join(" ")}
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            {caption}
          </p>
        )}

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 w-9 h-9 flex items-center justify-center rounded-full border border-[#d4a843]/40 bg-[#0a0a0a]/90 text-[#d4a843] text-lg leading-none transition-all duration-200 hover:border-[#d4a843]/80 hover:bg-[#d4a843]/15 hover:shadow-[0_0_12px_rgba(212,168,67,0.2)] hover:scale-110"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
