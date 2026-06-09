export function LoadingCard() {
  return (
    <div className="glass-card relative w-full max-w-4xl overflow-hidden rounded-[30px] p-10">
      <div className="flex flex-col gap-8 md:flex-row md:justify-between">
        <div className="flex-1 space-y-5">
          <div className="shimmer h-6 w-40 rounded-full" />
          <div className="shimmer h-24 w-56 rounded-2xl" />
          <div className="shimmer h-4 w-32 rounded-full" />
          <div className="shimmer mt-10 h-32 w-32 rounded-full" />
        </div>
        <div className="flex-1 space-y-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="shimmer h-5 w-full rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}