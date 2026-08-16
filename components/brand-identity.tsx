import Image from "next/image";

type BrandIdentityProps = {
  className?: string;
};

export function HeaderBrandIdentity({ className = "v14-brand" }: BrandIdentityProps) {
  return (
    <a className={className} href="/" aria-label="LeadFlowAI — strona główna">
      <span className="v14-brand-compact" aria-hidden="true">
        <Image src="/brand/leadflowai-compact-header.png" width={128} height={128} alt="" />
      </span>
      <span className="v14-brand-word">LeadFlowAI</span>
    </a>
  );
}

export function FooterBrandIdentity() {
  return (
    <a className="v14-footer-brand" href="/" aria-label="LeadFlowAI — strona główna">
      <Image
        src="/brand/leadflowai-primary-footer.webp"
        width={480}
        height={320}
        alt="LeadFlowAI — Web Products, Search, AI"
      />
    </a>
  );
}
