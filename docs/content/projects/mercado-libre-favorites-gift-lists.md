# Mercado Libre — Lists & Gift Registry

**Content status:** approved by Jouler on 2026-10-25, pending clean image derivatives · 2026-10-25. **Page format:** tier 1 product and engineering case. **Proposed route:** /work/mercado-libre-lists/ (not implemented here). Earlier drafts are in Git history (see [README](README.md#history)).

## Evidence and boundaries

- Role, team, period and scope come from the owner interview on 2026-10-25 [S14](sources.md#s14) and match LinkedIn (Senior Software Engineer, October 2023–May 2025; Favorites and Gift Lists with Express SSR, BFF, React, WebDriverIO) [S02](sources.md#s02), [S03](sources.md#s03).
- Coverage: around 60% when Jouler joined (his estimate, not an exact figure), above 80% afterwards. The 80% target was a deliberate team standard.
- The internal web-view bridge, its CLI and internal tool names are confidential details. The copy describes them generically.
- Excluded by the owner: the prize roulette and its Mercado Pago integration. The experience is no longer live, and interactivity is shown through the Personajes NOL game instead.

## Copy

### Work listing

**Title:** Lists & Gift Registry  
**Company:** Mercado Libre  
**Summary:** Rebuilding how shoppers save products and plan gifts, plus the test strategy and app navigation behind it.  
**Focus:** Product engineering · Test strategy · Web views in native apps

### Opening screen

**Headline:** Lists people come back to, on the web and in the app.

For a year and eight months I was one of two senior engineers on Mercado Libre's Home & Search team, which owns search, the home page, product pages and lists.

My main project was replacing the old favorites with a new lists experience: personal lists for things you want to buy later, and gift lists people can name however they like, from a wedding to a birthday. Along the way I took on two problems the team had lived with for a while: tests nobody trusted and navigation that lost people inside the app.

**Role:** Senior Software Engineer · Full-stack · Home & Search  
**Period:** October 2023 – May 2025  
**Technology:** React · Express SSR · Backend for Frontend · WebDriverIO · BDD with Gherkin

### From a heart icon to lists people organize

Favorites used to be a single heart: everything you liked, in one place, with an interface that had aged badly. The new experience lets people create two kinds of lists. Favorites lists are for themselves. Gift lists are for someone else: people pick one of the default occasions or give it any name they want.

The design was ready and the team had already started. I joined to build the experience and bring a senior perspective to the frontend architecture: how screens were structured, which components we needed and how they would behave on desktop, mobile web and inside the native app, which all render the same screens.

### Tests that protect the business

When I arrived, unit test coverage was around 60% and slipping. I changed how the team approached tests, wrote guidelines and paired with teammates until writing them became routine. We reached more than 80% and stopped there on purpose. Chasing 100% makes every change a fight with a number, and people start writing tests that protect nothing.

We had no end-to-end tests at all. While unit coverage grew, I proposed covering what mattered most to the business: the critical flows and their rules. I built a proof of concept with Playwright and with WebDriverIO, both writing scenarios in plain language with Gherkin (BDD) and mocking user sessions. Both worked. We chose WebDriverIO because it was the company's standard, and Playwright's newer features weren't worth breaking that.

I defined the stack and the guidelines, reviewed the proposal with another senior engineer, and trained the team to write and maintain the tests.

### Navigation that remembers where you were

Mercado Libre's app shows many of the same web screens inside native views, connected through an in-house bridge that wasn't well documented. Navigation was inconsistent. Lists didn't refresh when their data changed. Infinite scroll stopped loading after the first batch of items, or broke after you opened a product and came back. Pressing back sent you to the top of the page, and people got lost.

I read the bridge's implementation until I understood how it managed screens, then restructured the navigation around how native apps actually work: a stack. Previous screens keep their state and scroll position, and their scripts pick up where they left off when you return. Intermediate screens are removed from the stack, so back takes you where the flow says it should.

### What I learned

> Working on a product used by millions opens your mind: traceability and observability stop being optional. Maintaining web, mobile web and a native app from the same codebase forces you to understand how everything really works.

That meant learning when a Backend for Frontend earns its place. Product APIs own the business; the BFF translates it into exactly what each screen needs; server rendering asks only for the data that matters, so every device renders fast. And it meant learning the lifecycle of a screen inside an app, which behaves nothing like a page on the web.

Mercado Libre took me from marketing and banking sites to products with millions of users, a mature stack and teams across Argentina, Uruguay, Brazil and Colombia.

## Screen content plan

1. **Opening:** headline, two paragraphs, role, period and stack beside a clean capture of the lists screen.
2. **Lists:** before and after. Before: the heart on the product page (producto-favorito-corazon.png) and the legacy Favorites page (favoritos-legacy.png). After: favorites lists and gift lists. Pair desktop and mobile where they show the same action.
3. **Tests:** a simple visual of the strategy: unit tests with an 80% bar, end-to-end tests on critical flows, and a short Gherkin scenario as an example (invented for illustration, not copied from Mercado Libre's code).
4. **Navigation:** the strongest visual opportunity. A small interactive demo of the stack: scroll down a list, open a product, go back, and land in the same place. Contrast it with the old behavior.
5. **Architecture aside:** product APIs → BFF → SSR → web, mobile web and native web view. One diagram, used in "What I learned".
6. **Close:** the quote, then the next project.

## Assets

See [the Mercado Libre asset group](assets.md#mercado-libre). Candidates: lsitas-listas.png, producto-lista.png, producto-lista-mobile.png. The desktop captures contain personal or delivery context, so they need clean derivatives. Before state: favoritos-legacy.png (legacy Favorites page, sample data) and producto-favorito-corazon.png (heart on the product page). The heart capture shows Jouler's real name and delivery address and needs a cropped, clean derivative before use.

## Owner review

- Read the copy and correct anything that doesn't sound like you or isn't accurate.
- Confirmed on 2026-10-25: the copy is accurate; "one of two senior engineers" and "millions of users" can be published; gift lists are free-named, with default occasions.
- Legacy captures supplied on 2026-10-25.

## Sources

[Owner interview](sources.md#s14) · [LinkedIn experience](sources.md#s02) · [LinkedIn projects](sources.md#s03) · [Supplied screens](sources.md#s07).
