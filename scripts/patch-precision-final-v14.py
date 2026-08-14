from pathlib import Path

path = Path("app/precision-water.css")
text = path.read_text()

replacements = [
    ("  .knowledge-hero-copy > p:last-child,", "  .knowledge-hero .knowledge-hero-copy > p:last-child,"),
    ("  .portfolio-hero-copy > p:last-child,", "  .portfolio-hero .portfolio-hero-copy > p:last-child,"),
    ("  .knowledge-article-head > p:last-child,", "  .knowledge-article-hero .knowledge-article-head > p:last-child,"),
]
for old, new in replacements:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"selector mismatch {old!r}: {count}")
    text = text.replace(old, new, 1)

path.write_text(text)
print("PRECISION_V14_FINAL_PATCH_PASS")
