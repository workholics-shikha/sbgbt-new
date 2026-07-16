import LegacyHome from "@/components/LegacyHome";
import { getLegacyMarkup } from "@/lib/legacy-page";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function HomePage() {
  const html =
    getLegacyMarkup("index.html") ||
    "<main class=\"container py-5\"><p>Unable to load the legacy homepage.</p></main>";

  return <LegacyHome html={html} />;
}
