"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { href: "/uslugi", label: "Usługi" },
  { href: "/realizacje", label: "Realizacje" },
  { href: "/#process", label: "Jak pracujemy" },
  { href: "/wiedza", label: "Wiedza" },
  { href: "/o-nas", label: "O nas" },
] as const;

function isCurrent(pathname: string, href: string) {
  if (href === "/#process") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function V14SiteNavigation() {
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      detailsRef.current?.removeAttribute("open");
      setOpen(false);
      summaryRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => {
    detailsRef.current?.removeAttribute("open");
    setOpen(false);
  };

  return (
    <>
      <nav className="v14-nav" aria-label="Główna nawigacja">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="v14-header-actions">
        <details ref={detailsRef} className="v14-mobile-nav" onToggle={(event) => setOpen(event.currentTarget.open)}>
          <summary
            ref={summaryRef}
            aria-label={open ? "Zamknij nawigację mobilną" : "Otwórz nawigację mobilną"}
          >
            <span>MENU</span><i aria-hidden="true" />
          </summary>
          <nav className="v14-mobile-nav-panel" aria-label="Nawigacja mobilna">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                onClick={close}
              >
                <span>{item.label}</span><span aria-hidden="true">0{index + 1}</span>
              </a>
            ))}
            <a href="/kontakt" onClick={close}><span>Wyceń projekt</span><span aria-hidden="true">↗</span></a>
          </nav>
        </details>
        <a className="v14-header-cta" href="/kontakt">Wyceń projekt <span aria-hidden="true">↗</span></a>
      </div>
    </>
  );
}
