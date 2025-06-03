import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-7 p-4 md:p-0">
      <Skeleton className="h-[250px] w-[250px] rounded-xl" />
    </div>
  )
}
