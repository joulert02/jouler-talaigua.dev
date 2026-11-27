# HU-13 · Quality audits

Run on 2026-11-27 against production (`jouler-talaigua.dev`, 12 indexable pages, EN and ES) and a local build of the fixes. Tools: Lighthouse 12 (mobile and desktop presets), axe-core 4 (WCAG 2.0/2.1/2.2 A and AA plus best practices, light and dark themes, 1440 and 390 px), and Chrome driven over the DevTools protocol for the keyboard and zoom passes. None of them is a project dependency.

## SEO: passed

- Lighthouse SEO 100 on every indexable page. The "coming soon" cases and the 404 are `noindex` on purpose.
- `scripts/check-seo.mjs` passes on the build: title, description, Open Graph and Twitter tags, a share image that exists, canonical, hreflang en/es/x-default, and a sitemap that lists exactly the published pages (HU-11).
- No structured data. Not needed for launch; optional later.

## Performance: passed

Lighthouse performance 100 on all 12 pages, mobile and desktop. LCP 1.1 s or less, CLS 0, TBT 50 ms or less. Target in the ADR: 95+. The desk pan on phones was fixed separately (#50, #52).

## Best practices: 81, accepted

The only failing audit is "Uses deprecated APIs", and it comes from scripts Cloudflare injects, not from the site:

- `email-decode.min.js` (Email Address Obfuscation). **Kept on by the owner:** it hides the email from address harvesters, which is worth more than the score.
- `/cdn-cgi/challenge-platform/…` (Bot Fight Mode JavaScript detections). The owner may turn it off in the Cloudflare dashboard; the site has no forms or login for it to protect.

## Accessibility

**Automated.** Lighthouse accessibility 97–100. axe findings and what happened to each:

| Finding                                              | Where                                                                | Outcome                                                                                                                                 |
| ---------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Visible text not in the accessible name (WCAG 2.5.3) | Language switch ("ES" named "Leer en español")                       | Fixed: "ES, leer en español"                                                                                                            |
|                                                      | JOTA mark, envelope, flip cards, talks stack                         | Fixed: each name starts with the words on its face                                                                                      |
|                                                      | Mercado Libre navigation rows ("Open Item 01 · …")                   | Fixed: named by their content                                                                                                           |
|                                                      | TENA zoom buttons, video Play button                                 | Fixed: "A− smaller text", "Play 0:44: …"                                                                                                |
| Contrast below 4.5:1 in recreated brand UIs          | Mercado Libre blue `#3483fa` and green `#00a650`, search placeholder | Fixed: `#2d72d9`, `#008641`, 55% black                                                                                                  |
|                                                      | TENA blue `#3a78d4`, help button white on green                      | Fixed: `#3874ce`; dark ink on the green                                                                                                 |
|                                                      | Nosotras play buttons and sign-in pinks                              | Fixed: dark ink on teal; purple `#9559c9`, pinks `#d4307c`, `#d1327e`, `#d3327c`                                                        |
|                                                      | Bancolombia steps not yet reached (25% opacity)                      | Accepted, pending owner confirmation: they are the parts of the diagram still to be built and reach full contrast when their step plays |

Every brand color was darkened only as far as 4.5:1 needs, and keeps its hue.

**What axe still reports, and why it is not a defect.** axe compares a control's name with all the text it can see, including text a person cannot:

- the back faces of the flip cards (hidden by the 3D flip);
- the prints under the top one in the talks stack;
- the JOTA glyph and the video clock, which are `aria-hidden`;
- the Mercado Libre button label while it fades during its collapse animation.

The names start with the words a person sees, which is what WCAG 2.5.3 asks.

**Keyboard.** Every control is reachable with Tab, focus is always visible, focused elements scroll into view (smoothly, by design), and no trap was found.

**Zoom.** At 200% (1280 px window, 640 CSS px) and at 320 px no page scrolls sideways. The Mercado Libre phone mock keeps its off-canvas screen clipped inside the frame.

**Still for a person** (tools cannot do it):

- [ ] VoiceOver on macOS Safari, Home: the card, the Dock, three objects on the desk (flip one card), and the envelope.
- [ ] VoiceOver on a case: the chapter nav, one playground step by step, and the video Play button.
- [ ] VoiceOver on iPhone: open the desk, swipe through objects, and close it.
- [ ] Switch the language with VoiceOver on; the new page is announced in its language.

## Copy

- The strict placeholder check passes and no `TODO(verify)` or sample text remains.
- The UI strings have the same 80 keys in EN and ES.
- Each case has the same chapters, playgrounds and paragraphs in both languages. The English Mercado Libre file wraps three paragraphs in `<CaseParagraph>` where Spanish uses plain Markdown; both render the same.
- [ ] Owner: read EN and ES side by side for tone.
