import Link from "next/link";
export default function NotFound() {
  return (<><h1 className="text-4xl">Page not found</h1><p className="mt-4">The page may have moved. <Link href="/shop" className="underline underline-offset-4">Browse all khussa</Link>.</p></>);
}
