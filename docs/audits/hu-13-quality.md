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

**Owner's VoiceOver pass (Dia, macOS).** Two findings, both fixed:

- Skip to content landed on an unnamed `<main>`, so VoiceOver said only "main" or "region" and its cursor jumped to the first item without announcing it. `<main>` is now named after the page's heading: "main, Selected projects", "main, More about me" and, on the Home, "main, Jouler Talaigua", which is the card.
- The desk's name carried its instructions and was read in full on every entry. It is now "Personal desk", with the instructions as its description.

Tab only stops on links and buttons. Text such as the card's description is read with VO + → or the rotor (VO + U), which is how screen reader users read a page.

**Keyboard.** Every control is reachable with Tab, focus is always visible, focused elements scroll into view (smoothly, by design), and no trap was found.

**Zoom.** At 200% (1280 px window, 640 CSS px) and at 320 px no page scrolls sideways. The Mercado Libre phone mock keeps its off-canvas screen clipped inside the frame.

**Real VoiceOver (macOS, Chrome), 2026-11-27.** `npm run audit:voiceover` drives VoiceOver over AppleScript and writes what it says. The run covered production, then the preview of these fixes, on Home, Work, More about me, a case and the Spanish Home. With the fixes:

- Skip to content says "Jouler Talaigua main", "Selected projects main", "More about me main", "Sucursal Virtual Personas main".
- The desk says "Personal desk", then its instructions.
- VO + → reads the card (heading, role, description), the work list ("list 6 items", each company, link and focus) and a case header.

**Running the real VoiceOver with Guidepup** (`npm run test:voiceover`, `tests/voiceover/`, macOS only, by hand):

1. Once per Mac, run `npm run voiceover:setup`. It ticks "Allow VoiceOver to be controlled with AppleScript" in VoiceOver Utility (you confirm it there) and downloads Guidepup's VoiceOver preferences. Do not use `sudo`. The note "Unable to configure automation permissions" is expected: macOS protects that database, and the dialogs it would grant come up on the first run instead.
2. On this Mac (macOS 27), Guidepup also loads its preferences into VoiceOver's folder, which macOS only lets a terminal reach with Full Disk Access. Give it to Terminal.app only, and turn it off afterwards. Guidepup's docs do not mention it; it came from the error `EPERM … group.com.apple.VoiceOver`.
3. Run `npm run test:voiceover` from that terminal, and accept the automation dialogs. Point it at a preview with `VOICEOVER_URL=https://<preview> npm run test:voiceover`. It prints what VoiceOver said on each page. Don't touch the Mac while it runs.

`npm run audit:voiceover` gives the same transcript without Full Disk Access: it drives VoiceOver over AppleScript directly, without Guidepup's preferences.

**Guard in CI.** `npm run test:a11y` (`tests/a11y/`, Playwright) reads Chrome's accessibility tree on the build: what Skip to content announces on six pages, the Tab order and names on Home and Work, the card, the desk's name and description, the work list and the language switch. A change that breaks any of them fails the pull request. After an intended copy change, update the snapshots with `npm run test:a11y -- --update-snapshots` and review the diff.

**Still for a person:** VoiceOver on iPhone. Open the desk, swipe through a few objects, and close it. No tool drives VoiceOver on iOS.

## Copy

- The strict placeholder check passes and no `TODO(verify)` or sample text remains.
- The UI strings have the same 80 keys in EN and ES.
- Each case has the same chapters, playgrounds and paragraphs in both languages. The English Mercado Libre file wraps three paragraphs in `<CaseParagraph>` where Spanish uses plain Markdown; both render the same.
- [ ] Owner: read EN and ES side by side for tone.
