const SERVICE_KNOWLEDGE: Readonly<Record<string, readonly { href: string; label: string }[]>> = {};

export function getServiceKnowledgeLinks(slug: string) {
  return SERVICE_KNOWLEDGE[slug] ?? [];
}
