import { notFound } from "next/navigation";
import LegacyHome from "@/components/LegacyHome";
import { getLegacyMarkup, getLegacySlugs } from "@/lib/legacy-page";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function generateStaticParams() {
  return getLegacySlugs().map((slug) => ({ slug }));
}

export default function LegacyPage({ params }) {
  const { slug } = params;
  const html = getLegacyMarkup(`${slug}.html`);

  if (!html) {
    notFound();
  }

  return <LegacyHome html={html} />;
}
