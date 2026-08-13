const nodes = [
  { x: 64, y: 118, label: "SEARCH", className: "node-search" },
  { x: 194, y: 62, label: "WWW", className: "node-web" },
  { x: 338, y: 130, label: "SEO · AEO · GEO", className: "node-discover" },
  { x: 244, y: 236, label: "CHATBOT", className: "node-ai" },
  { x: 410, y: 256, label: "LEAD", className: "node-lead" },
  { x: 502, y: 150, label: "CRM", className: "node-crm" },
] as const;

const verticalGridLines = [0, 52, 104, 156, 208, 260, 312, 364, 416, 468, 520] as const;
const horizontalGridLines = [0, 46, 92, 138, 184, 230, 276] as const;

export function SystemFlow() {
  return (
    <div className="system-flow">
      <div className="flow-toolbar" aria-hidden="true">
        <span>SYSTEM / LIVE</span>
        <span className="flow-status">ONLINE</span>
      </div>

      <svg viewBox="0 0 566 320" role="img" aria-labelledby="flow-title flow-desc">
        <title id="flow-title">LeadFlowAI system flow</title>
        <desc id="flow-desc">
          Wizualizacja pokazująca przepływ użytkownika od wyszukiwania przez stronę i warstwy
          widoczności do kontaktu oraz CRM.
        </desc>
        <defs>
          <linearGradient id="flowGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
            <stop offset="55%" stopColor="currentColor" stopOpacity="0.82" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.22" />
          </linearGradient>
        </defs>

        <g className="flow-grid">
          {verticalGridLines.map((x) => (
            <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="320" />
          ))}
          {horizontalGridLines.map((y) => (
            <line key={`h-${y}`} x1="0" y1={y} x2="566" y2={y} />
          ))}
        </g>

        <g className="flow-links" fill="none" stroke="url(#flowGradient)">
          <path d="M64 118 C105 86 145 65 194 62" />
          <path d="M194 62 C248 72 290 92 338 130" />
          <path d="M338 130 C305 170 276 198 244 236" />
          <path d="M244 236 C302 250 353 258 410 256" />
          <path d="M410 256 C448 230 475 192 502 150" />
          <path d="M338 130 C400 116 456 124 502 150" />
        </g>

        {nodes.map((node) => (
          <g
            key={node.label}
            className={`flow-node ${node.className}`}
            transform={`translate(${node.x} ${node.y})`}
          >
            <circle r="8" />
            <circle className="flow-node-halo" r="18" />
            <text x="14" y="4">
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="flow-metrics" aria-hidden="true">
        <span>SEMANTIC / 01</span>
        <span>VISIBLE / 02</span>
        <span>CONVERT / 03</span>
      </div>
    </div>
  );
}
