import Site from "./site";
import { business } from "../lib/site-config";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: "Marcenaria de móveis planejados sob medida.",
    sameAs: [business.instagram]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Site />
    </>
  );
}
