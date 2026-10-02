# Homepage Owner-Media Slot Contract

STATUS: C12R2 CANDIDATE / AMBIENT FIRST-PARTY DEVICE PROOF REFRESHED / OPTIONAL OWNER MEDIA REMAINS

The homepage is complete and understandable without decorative replacement
media. Future files may enter these slots only when they are Owner-supplied or
separately Owner-approved, provenance-recorded, optimized, and tied to the
exact public consumer below.

| Slot | Media role | Preferred ratio / minimum render | Mobile behavior | Alt policy | Crop policy | Current fallback |
|---|---|---|---|---|---|---|
| `HOME_HERO_SUPPORT` | supporting brand atmosphere behind the buyer proposition | approved hero master ratio 1536:585; at least 960px wide on desktop | use a separately tested responsive crop or omit | empty alt when purely atmospheric | no destructive crop without Owner approval | local WebGL surface and spatial product stage |
| `HOME_DEVICE_DESKTOP` | real first-party product proof in the desktop frame | 16:10; at least 720x450 | tablet capture bridges to the mobile proof below | figure caption identifies the exact first-party product and state; nested repeated screenshots use empty alt | preserve essential UI; focal crop only after review | active C12R2 `/strony-internetowe/` desktop and tablet ambient render captures |
| `HOME_DEVICE_MOBILE` | real first-party mobile product proof | about 9:19.5; at least 280px wide | primary proof inside mobile frames | figure caption identifies the exact first-party product and state; nested repeated screenshots use empty alt | no crop that removes navigation or evidence context | active C12R2 `/strony-internetowe/` mobile ambient render capture |
| `HOME_PORTFOLIO_PROOF` | one public-safe preview per evidenced ecosystem project | 16:10; at least 640px wide | stack above the project receipt | project, relationship and exact public state must be explicit | no invented UI and no private-source detail | evidence-led text, facts and public-domain link |
| `HOME_KNOWLEDGE_EDITORIAL` | optional editorial illustration for curated knowledge | 3:2; at least 560px wide | omit if it competes with article titles | empty alt if decorative; factual alt if explanatory | no stock filler | typography-led article selection |

```text
FUTURE_OWNER_MEDIA_SLOT_COUNT=3
FIRST_PARTY_DEVICE_PROOF_SLOT_COUNT=2
FINAL_MARKETING_MEDIA=OWNER_SUPPLIED_OR_OWNER_APPROVED
CURRENT_HOMEPAGE_DEPENDS_ON_FUTURE_MEDIA=NO
PLACEHOLDER_LABELS_PUBLIC=NO
```
