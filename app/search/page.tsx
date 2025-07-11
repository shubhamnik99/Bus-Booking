import { Suspense } from "react"
import { SearchResults } from "@/components/search-results"
import { SearchForm } from "@/components/search-form"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { from?: string; to?: string; date?: string; passengers?: string }
}) {
  const { from, to, date, passengers } = searchParams

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Filter Results</h2>
              <SearchForm />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Suspense fallback={<SearchResultsSkeleton />}>
            <SearchResults
              from={from || ""}
              to={to || ""}
              date={date || ""}
              passengers={Number.parseInt(passengers || "1")}
            />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-10 w-28" />
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}
