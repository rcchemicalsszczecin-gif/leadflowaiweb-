import { getServiceKnowledgeLinks } from "@/lib/service-knowledge-links";

type Props = { slug: string };

export function ServiceKnowledgeLinks({ slug }: Props) {
  const links = getServiceKnowledgeLinks(slug);
  if (links.length === 0) return null;

  return (
    <section className="section-light related-services" aria-labelledby="service-knowledge-title">
      <div className="page-shell section-pad">
        <div className="service-section-head">
          <p className="service-index">06 / WIEDZA POWIĄZANA</p>
          <h2 id="service-knowledge-title">Materiały, które wyjaśniają ten temat szerzej.</h2>
        </div>
        <nav className="related-grid" aria-label="Wiedza powiązana z usługą">
          {links.map((item) => (
            <a key={item.href} href={item.href}>
              <span>WIEDZA</span>
              <strong>{item.label}</strong>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
