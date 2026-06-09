/**
 * components/StructuredData.tsx
 * ─────────────────────────────────────────────────────────────
 * Injects JSON-LD structured data into the page <head>.
 * Use as a regular React component anywhere in the route tree.
 *
 * Three schemas are bundled together in one <script> block:
 *   • WebSite   — site-level entity (enables Search Box in SERPs)
 *   • Organization — brand entity
 *   • WebApplication — app metadata (category, pricing, features)
 * ─────────────────────────────────────────────────────────────
 */

import { websiteSchema, organizationSchema, webApplicationSchema } from "@/lib/seo";

interface StructuredDataProps {
  /** Extra arbitrary schemas to merge alongside the three defaults */
  extra?: object[];
}

export function StructuredData({ extra = [] }: StructuredDataProps) {
  const schemas = [websiteSchema(), organizationSchema(), webApplicationSchema(), ...extra];

  // Wrap all schemas in a @graph for cleaner Structured-Data output
  const graph = {
    "@context": "https://schema.org",
    "@graph": schemas,
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: safe — static JSON with no user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph, null, 0) }}
    />
  );
}
