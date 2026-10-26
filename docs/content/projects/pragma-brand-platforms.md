# Brand platforms at PRAGMA — Nosotras, TENA, Petys

**Content status:** copy approved; Personajes XD exports pending · 2026-10-26. **Page format:** tier 2 showcase with live previews, and the start of Jouler's QA-to-engineer story. **Proposed route:** /work/brand-platforms/ (not implemented here). Earlier drafts are in Git history (see [README](README.md#history)).

## Evidence and boundaries

- Career path, scope per site, architecture, stack and the games come from the owner interview on 2026-10-25 [S17](sources.md#s17), consistent with LinkedIn's PRAGMA roles and the "Marketing Applications" project group [S02](sources.md#s02), [S03](sources.md#s03).
- The Adobe XD links are the designer's prototypes of the game flow. They can be shown as the design reference with credit to the designer, not as Jouler's design work.
- The brands ran the contests and gave the prizes; Jouler built the experiences.
- The live sites show today's versions. The copy describes what Jouler built, not everything visible now.

## Copy

### Work listing

**Title:** Brand platforms  
**Company:** Grupo Familia brands · via PRAGMA  
**Summary:** Where I went from testing sites to building them: a pet-care platform from scratch, a redesign for older adults and a game a month for a teen brand.  
**Focus:** Frontend architecture · Gatsby + Contentful · Gamification

### Opening screen

**Headline:** Where I went from testing sites to building them.

I joined PRAGMA as a QA engineer on two brand sites, Nosotras and TENA, and tested them through their first release. Eight months later I moved to frontend development. Over the next years these brands became the place where I learned to build, then to own, entire platforms.

**Role:** QA → Junior → Frontend Developer · PRAGMA  
**Stack:** Gatsby · React · GraphQL · Contentful · AWS S3 and CloudFront · Jenkins

### Petys: a platform from scratch

Petys was a new pet-care brand site, and my first project as a developer. The team was four people: one frontend (me), one backend, one QA and a designer.

I rebuilt for Petys the architecture we had used for Nosotras and TENA: static sites built with Gatsby, served from S3 behind CloudFront, with content from Contentful consumed through GraphQL. Today that is a familiar setup; back then very few teams were doing it.

I asked for ownership of the whole frontend side and got it. I modeled the content in Contentful, set up the repository and the archetype for each micro frontend, shared components across projects through a Git submodule, configured the environments and built the Jenkins pipelines. An architect guided me and reviewed the important parts: the CI/CD and the cache and invalidation policies on AWS. The backend only handled product reviews, which I integrated.

### TENA: an academy and a registration for older adults

Back on TENA, I rebuilt the Academy section: the guides and articles for older adults and their caregivers. Articles come in several formats, and each type has its own structure and layout, so I built the section to render each format the right way from the CMS.

I also redesigned the registration flow. Many TENA users are older adults, and the old form confused them. The new one is much easier to get through.

### Nosotras: a new audience and a game a month

Nosotras launched with a brand designed for girls: soft and very pink. When the business wanted to reach young women too, I implemented the rebrand, bringing in a deep blue alongside the pink to open the site to an older audience.

I also built the brand's campaign games, usually one a month. Each lived on its own path of the site: a didactic, interactive microsite where girls learned through play. Some were contests: you played, earned points and climbed a leaderboard, and the brand gave prizes to the top players. For each one, I chose the technique the game needed, plain HTML and CSS or SVG, and built the whole experience.

### What I learned

> I learned to steer my own path. PRAGMA sparked a curiosity that became the engine of my career. It's where I started giving talks, at universities and inside the company, and discovered my love for teaching and continuous learning. And I learned that surrounding yourself with the right people takes you far, because together we go further.

## Screen content plan

1. **Opening:** the headline and the QA → frontend line. A small timeline: QA on Nosotras and TENA → Petys from scratch → TENA and Nosotras as a developer.
2. **Three project blocks**, each with a live preview tile (cached capture → View Transition → live site when embeddable, plus "Open site ↗"):
   - Petys: an architecture diagram (Contentful → GraphQL → Gatsby → S3 + CloudFront, Jenkins).
   - TENA: Academy and registration captures.
   - Nosotras: the current site and the games. No pre-rebrand captures exist, so the rebrand is told in text only.
3. **The games: an interactive replica, not screenshots.** Rebuild the Personajes home interaction as a live demo: clicking a character rotates the cast while the background and colors change. Built from the designer's Adobe XD files (motion and layout reference) and, if available and permitted, the original exported character art. If the original art cannot be used, the same motion with neutral placeholder shapes still shows the work. Below the demo, all credit goes to the brand, with a link to Nosotras Online (see Owner review).
4. **Close:** learning and next project.

## Assets

See the [Nosotras](assets.md#nosotras), [TENA](assets.md#tena) and [Petys](assets.md#petys) asset groups. Adobe XD prototypes of the Personajes game (designer's work):

- https://xd.adobe.com/view/72a53d98-cc03-44e1-8478-28797f23f6f4-27f6/
- https://xd.adobe.com/view/d9025fb7-e17a-4840-b627-9a23ffb3cabe-8c51/

TENA Academy and registration captures supplied 2026-10-26 (see the [TENA asset group](assets.md#tena)). No captures of Nosotras before the rebrand exist.

## Owner review

- 2026-10-26 final read: copy approved. Nosotras is shown with the current site and the game only; TENA captures supplied.
- Petys URL confirmed: petys.com.
- Personajes replica, decided 2026-10-25: Jouler exports the original assets from Adobe XD; we rebuild the home interaction as a demo. Below it, all credit goes to the brand: "Characters and artwork belong to Nosotras. I took part in building this experience." with a link to nosotrasonline.com.co. No ownership claim. TODO(verify) the exported assets.

## Sources

[Owner interview](sources.md#s17) · [PRAGMA experience](sources.md#s02) · [Marketing-project description](sources.md#s03) · [Supplied images](sources.md#s07) · [Nosotras](sources.md#s09) · [TENA](sources.md#s10) · [Petys](sources.md#s11).
