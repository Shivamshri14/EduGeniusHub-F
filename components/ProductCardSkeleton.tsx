export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="skeleton aspect-[16/9] w-full" />
      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-2">
          <div className="skeleton h-3 w-16 rounded-full" />
          <div className="skeleton h-3 w-12 rounded-full" />
        </div>
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="space-y-1.5">
          <div className="skeleton h-3 w-full rounded" />
          <div className="skeleton h-3 w-2/3 rounded" />
        </div>
        <div className="flex items-end justify-between pt-2">
          <div className="space-y-1.5">
            <div className="skeleton h-5 w-20 rounded" />
            <div className="skeleton h-3 w-14 rounded" />
          </div>
          <div className="skeleton h-3 w-12 rounded-full" />
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="skeleton h-9 rounded-xl" />
          <div className="skeleton h-9 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
