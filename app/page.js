import LegacyHome from "@/components/LegacyHome";
import { getLegacyMarkup } from "@/lib/legacy-page";

export default function HomePage() {
  const html =
    getLegacyMarkup("index.html") ||
    "<main class=\"container py-5\"><p>Unable to load the legacy homepage.</p></main>";

  return <LegacyHome html={html} />;
}
