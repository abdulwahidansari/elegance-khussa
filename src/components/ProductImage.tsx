// Shared sample until each product has its own photograph. Keep the 4:5 ratio.
export function ProductImage({ name, mock }: { name: string; mock: boolean }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-sand">
      <img src="/images/khussa-sample.svg" alt={`${name} sample`} className="h-full w-full object-cover" />
      {mock && <span className="absolute bottom-2 left-2 rounded-sm bg-brown px-2 py-1 text-[10px] text-ivory sm:bottom-3 sm:left-3 sm:text-xs">Sample, not a real photo</span>}
    </div>
  );
}
