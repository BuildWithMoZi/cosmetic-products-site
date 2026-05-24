import { Suspense } from "react";
import ShopClient from "./ShopClient";

interface ShopPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="pt-28 pb-16 min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ShopClient
        initialSearch={params.search ?? ""}
        initialCategory={params.category ?? ""}
        initialSort={params.sort ?? "featured"}
      />
    </Suspense>
  );
}
