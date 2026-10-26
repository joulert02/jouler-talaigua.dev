# GoodRx — Datadog to groundcover

**Content status:** complete from the owner interview, pending one confirmation and Jouler's final read · 2026-10-25. **Page format:** tier 1 engineering case, led by the observability migration, with a short cards note. **Proposed route:** /work/goodrx-observability/ (not implemented here). Earlier drafts are in Git history (see [README](README.md#history)).

## Evidence and boundaries

- Scope, team, plan, implementation and privacy work come from the owner interview on 2026-10-25 [S16](sources.md#s16), consistent with the EPAM entry on LinkedIn (initial phase of the Datadog-to-groundcover migration) [S02](sources.md#s02). Jouler may name GoodRx publicly [S01](sources.md#s01).
- The migration covered the frontend application's observability. It was a three-person effort; the copy says "we" for shared work and "I" for Jouler's part.
- No savings figure is claimed. The motivation (storage-based cost with Datadog) is stated as the reason, not as a measured result.
- Privacy: session recording was on by default and had to be disabled because GoodRx's policies don't allow recording that user data. Errors and events are captured without tying them to specific users.

## Copy

### Work listing

**Title:** Datadog to groundcover  
**Company:** GoodRx · via EPAM  
**Summary:** Moving the frontend's observability to groundcover, running on GoodRx's own cloud, to cut costs without losing sight of real users.  
**Focus:** Observability · Real User Monitoring · CI/CD

### Opening screen

**Headline:** Keeping sight of real users, at a fraction of the cost.

GoodRx handles so many logs and transactions that Datadog's storage-based pricing had become expensive. The company decided to move to groundcover, and I was one of three engineers who migrated the frontend application's observability.

We treated it as a proof of concept with a clear finish line: decide what to measure, prove both tools captured it the same way, and ship it to production.

**Role:** Senior Software Engineer · EPAM  
**Focus:** Observability migration · Frontend · CI/CD

### Defining the migration

We started by reviewing what Datadog was measuring for the frontend. From there, working closely with product, we defined the scope ourselves: which metrics to migrate first, how the migration would run, how we would prove it worked, and a definition of done.

That plan was our first deliverable. We presented it to our leads and to product before writing any code.

### Running on our own cloud

We used groundcover's Bring Your Own Cloud model: their interface and SDK, running on GoodRx's own infrastructure. That way the company used servers it already had instead of paying for another vendor's storage.

### Two SDKs, side by side

I installed the groundcover SDK in specific modules of the frontend and ran it next to Datadog's, first locally, so we could compare what each one captured. Then I deployed it through every environment up to production, certified that the data arrived correctly and checked each point of the definition of done.

It was practically my first deliverable at GoodRx, so the real challenge was learning the system fast: how the architecture was organized, how environments were separated and how keys were registered. I provisioned what groundcover's Real User Monitoring and dashboards needed on our servers, and changed the CI pipelines to deploy the new artifact.

### Real users, without recording them

We delivered Real User Monitoring working in production: user events, plus console errors captured and grouped so the team could act on them.

One default had to go. groundcover records user sessions out of the box, and GoodRx's policies don't allow recording that kind of user data. We configured the SDK to capture errors and events without tying them to specific people.

The backend teams handled their own metrics. Our scope was the frontend, and it stayed there until I left EPAM.

### A smaller piece: one card instead of three

The home page showed health content through three different card components that had drifted apart. I built a single card component that covered what all three needed, so every card on the page now comes from one place. A small change, but the kind that keeps a design system consistent.

**Image caption:** "Learn more about your health": featured, horizontal and article cards, all from one component.

### What I learned

> I expected a simple product and found one of the most mature teams I have worked with. AI was a partner, not the one doing everything: agents reviewed pull requests as part of the flow. Visual regression tests with Chromatic stopped a pull request until someone confirmed a change to a component was intentional, and every component and guideline lived in Storybook.
>
> It also changed what ownership means to me. We defined our own product and technical roadmap, owned features from definition to delivery, proposed our own improvements and helped other teams. I still work that way today.

## Screen content plan

1. **Opening:** headline, two paragraphs and a simple visual of the move: Datadog → groundcover on GoodRx's own cloud.
2. **Plan:** the four questions of the definition of done as a short checklist.
3. **Side by side:** the strongest visual. Two event streams (Datadog and groundcover) compared for the same user action, illustrated, not real data.
4. **Privacy:** one line and a small toggle visual: session recording off, error grouping on.
5. **Cards:** Cards-redesign.png with the caption, below the main story. Optional: a small before/after of three components becoming one.
6. **Close:** learning and next project.

## Assets

New supplied images in `Porfolio resources/GoodRx/`: Cards-redesign.png (the cards), goodRx-home.png and GoodRx-home-mobile.png (public product context). TODO(verify) add them to the asset ledger with dimensions and review notes. Observability dashboards are internal: illustrate them instead of using captures.

## Owner review

- 2026-10-25: interview complete. Privacy wording confirmed: company policy, not a legal claim.
- Confirmed: the team described in the learning is GoodRx's engineering team; the visual testing tool was Chromatic.
- Final read of the copy pending.

## Sources

[Owner interview](sources.md#s16) · [Owner scope clarification](sources.md#s01) · [EPAM experience](sources.md#s02) · [GoodRx context](sources.md#s12) · [groundcover context](sources.md#s13).
