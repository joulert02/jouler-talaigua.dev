# Mercado Libre — Favorites & Gift List

**Content status:** tentative, for owner review · 2026-10-25. **Page format:** product and engineering case. **Proposed route:** /work/favorites-gift-lists/ (reuse of the prototype's slug is proposed, not implemented).

## Evidence and boundaries

- LinkedIn specifically describes development and maintenance of Favorites and Gift Lists, personalized product lists, Express SSR, a BFF, React, REST integration and WebDriverIO functional automation. [S02](../sources.md#s02), [S03](../sources.md#s03)
- Supplied desktop/mobile screens show saved products, collections and an add-to-list interaction. They do not establish Jouler's ownership of every current control or prove a historical before/after. [S07](../sources.md#s07)
- The prize roulette (Brazil) is **not** part of the portfolio: the owner dropped it on 2026-10-25 because the experience is no longer live.
- No measured retention, conversion, user count or test-coverage percentage is accepted from the old prototype. The exact role dates and responsibilities should be reviewed against the period of this feature work.

## Tentative copy

### Work listing

**Title:** Favorites & Gift List  
**Company:** Mercado Libre  
**Summary:** Helping shoppers save and organize products through full-stack feature work and functional test automation.  
**Focus:** Product engineering · React · Express SSR · BFF

### Opening screen

**Headline:** A place for the products you want to come back to.

I developed and maintained Favorites and Gift Lists at Mercado Libre: features that let people collect products in personalized lists instead of starting their search again.

The work connected the interface, server-rendered delivery and client-specific business logic, with automated functional tests to protect the experience.

**Role:** Senior Software Engineer · Full-stack development  
**Period:** Within October 2023–May 2025; TODO(verify) exact feature dates.  
**Technology:** React · Express.js · SSR · BFF · WebDriverIO

### The product experience

Favorites gives shoppers somewhere to keep products they want to revisit. Lists add organization around those saved items. The supplied screens show the relationship between the saved-product view, named collections and selecting a destination list from a product page.

**Proposed gallery captions:**

- Saved products, ready to revisit.
- Lists that organize products around different interests.
- Adding a product to a list on desktop and mobile.

TODO(verify) Explain the Gift List/registry behavior that distinguishes it from a normal list. No shared-list, gifting or collaboration flow is inferred from the current images.

### My contribution

I worked across React interfaces, server-side rendering with Express and a Backend for Frontend that handled client-specific business logic. I also contributed to functional test automation with WebDriverIO.

TODO(verify) Name the feature or flow I owned, the changes I made and what belonged to teammates. Add one concrete example of a product requirement that affected implementation.

### From a user action to product behavior

The add-to-list interaction is a useful entry point into this case: it connects a small interface action with list state and the surrounding product experience.

TODO(verify) Tell the real engineering story behind that flow: the requirement, a constraint, the decision and its trade-off. The screenshots alone do not establish optimistic updates, caching, data ownership or a specific error strategy.

### Protecting the experience

Functional automation was part of the work. Rather than presenting an unsupported coverage percentage, this section should show one real user journey the tests protected and why that journey mattered.

TODO(verify) Add the scenario, the kind of regression it caught or prevented, and how the team used the tests. Include a sanitized example only if it helps explain the decision.

### Outcome and learning

TODO(verify) Replace this review note with a concrete delivered change and a first-hand lesson. Use a metric only if its baseline, period, attribution and permission are clear.

## Screen content plan

1. **Opening:** title, summary and compact role/technology context beside one clean product image.
2. **Product sequence:** saved products → collections → add to a list. Pair desktop and mobile where they explain the same action; avoid a gallery of repeated full-home captures.
3. **Contribution:** the owned flow, one implementation decision and the testing story. A small SSR/BFF/React diagram is useful only if Jouler can map it to this work.
4. **Close:** delivered change, learning and next project. An optional team image can sit here if Jouler wants a human closing note.

## Assets

See [the Mercado Libre asset group](../assets.md#mercado-libre). Primary candidates: lsitas-listas.png, producto-lista.png and producto-lista-mobile.png. The supplied desktop captures contain personal/delivery context; use clean derivatives later. The images are references, not a historical redesign comparison.

## Owner review

- TODO(verify) What was your precise responsibility, and which visible flow best represents it?
- TODO(verify) How do Favorites, standard lists and Gift Lists relate in the version you worked on?
- TODO(verify) Which decision and functional test would make the story specific to you?
- TODO(verify) What actually changed for users or the team, and which results can you share?

## Sources

[LinkedIn experience](../sources.md#s02) · [LinkedIn projects](../sources.md#s03) · [Existing brief](../sources.md#s05) · [Supplied screens](../sources.md#s07).
