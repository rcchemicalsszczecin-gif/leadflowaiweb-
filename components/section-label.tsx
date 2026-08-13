type SectionLabelProps = {
  index: string;
  label: string;
  inverted?: boolean;
};

export function SectionLabel({ index, label, inverted = false }: SectionLabelProps) {
  return (
    <p className={`section-label${inverted ? " section-label-inverted" : ""}`}>
      <span>{index}</span>
      <span>LEADFLOWAI / {label}</span>
    </p>
  );
}
