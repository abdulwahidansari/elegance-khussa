// Placeholder until real photos exist. Swap for next/image, keep the 4:5 ratio.
export function ProductImage({ name, mock }: { name: string; mock: boolean }) {
  return (
    <div role="img" aria-label={`${name} (sample image placeholder)`}
      className="relative flex aspect-[4/5] items-end bg-gradient-to-br from-champagne to-sand p-3">
      {mock && <span className="rounded-sm bg-brown px-2 py-1 text-xs text-ivory">Sample, not a real photo</span>}
    </div>
  );
}
