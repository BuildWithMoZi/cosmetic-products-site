import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="pt-20 sm:pt-24 lg:pt-28 pb-16 min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">
        Product Not Found
      </h1>
      <p className="text-muted mb-8 max-w-md">
        This product may have been removed or the link is incorrect.
      </p>
      <Link
        href="/shop"
        className="px-8 py-3.5 bg-lime text-foreground rounded-full font-semibold hover:bg-lime-dark transition-colors"
      >
        Back to Shop
      </Link>
    </div>
  );
}
