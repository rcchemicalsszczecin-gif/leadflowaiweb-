from pathlib import Path

path = Path("app/precision-water.css")
text = path.read_text()

old = """  .quality-head p,
  .quality-item p,
  .section-dark .stage-detail > p,
  .knowledge-truth > .page-shell > p:last-child,
  .knowledge-hero-copy > p:last-child,
  .portfolio-hero-copy > p:last-child,
  .knowledge-article-head > p:last-child,
  .contact-hero-copy,
  .service-lead,
  .service-answer > .page-shell > p:last-child {"""
new = """  .quality-head p,
  .quality-item p,
  .section-dark .stage-detail > p,
  .knowledge-hero-copy > p:last-child,
  .portfolio-hero-copy > p:last-child,
  .knowledge-article-head > p:last-child,
  .contact-hero-copy,
  .service-lead,
  .service-answer > .page-shell > p:last-child,
  .knowledge-truth > .page-shell > p:last-child {"""
if text.count(old) != 1:
    raise SystemExit("typography selector block mismatch")
text = text.replace(old, new, 1)

replacements = [
    ("  .form-section-head > span,", "  .contact-form-section .form-section-head > span,"),
    ("  .contact-direct > span,", "  .contact-section .contact-direct > span,"),
]
for old, new in replacements:
    if text.count(old) != 1:
        raise SystemExit(f"selector mismatch: {old}")
    text = text.replace(old, new, 1)

path.write_text(text)
print("PRECISION_V14_PATCH_PASS")
