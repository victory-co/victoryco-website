import { GalleryGrid } from "@/components/gallery-grid";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Page header */}
        <header className="mb-10 text-center">
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-[0.15em] text-[#e8dcc8] uppercase"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            Gallery
          </h1>
          <p
            className="mt-3 text-sm tracking-wide text-[#8a8478]"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            Screenshots from the Victory Co community
          </p>

          {/* Gold divider */}
          <div className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-[#d4a843]/50 to-transparent" />
        </header>

        <GalleryGrid />
      </div>
    </main>
  );
}
