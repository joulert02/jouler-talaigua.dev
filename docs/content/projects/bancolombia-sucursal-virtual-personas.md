# Bancolombia — Sucursal Virtual Personas

**Content status:** complete from the owner interview, pending Jouler's final read · 2026-10-25. **Page format:** tier 1 architecture and team case. **Proposed route:** /work/bancolombia-svp/ (not implemented here). Earlier drafts are in Git history (see [README](README.md#history)).

## Evidence and boundaries

- Role, scope, architecture, the shell decision and team growth come from the owner interview on 2026-10-25 [S15](sources.md#s15). They are consistent with the PRAGMA Master Frontend Developer entry on LinkedIn (Bancolombia, Angular 15+, Module Federation, Clean Architecture, Bancolombia Design System, Spring Boot integration, Azure/AWS, onboarding and guidelines) [S02](sources.md#s02) and with his launch post, which places his work in the initial stages [S04](sources.md#s04).
- Jouler's official PRAGMA title was Master Frontend Developer; the launch post presents him as Senior Front-End Engineer. The case uses the official title.
- The public launch was the work of the wider team, after Jouler's phase. The case says so plainly.
- Internal details of Bancolombia's infrastructure (account names, file names, URLs) are not described.

## Copy

### Work listing

**Title:** Sucursal Virtual Personas  
**Company:** Bancolombia · via PRAGMA  
**Summary:** Laying the micro-frontend foundations of Bancolombia's online banking for individuals, and growing the team that built on them.  
**Focus:** Frontend architecture · Micro frontends · Team building

### Opening screen

**Headline:** Foundations a 20-person team could build on.

I was the first engineer on the project. Through PRAGMA, I joined Bancolombia's renewal of Sucursal Virtual Personas, the online bank that millions of people use every day, before there was a team, a repository or a pipeline.

The designs for registration and login were ready. My job was to turn Bancolombia's vision of micro frontends into an architecture, and then into a team that could work with it.

**Role:** Master Frontend Developer · PRAGMA · first engineer on the project
**Technology:** Angular · Module Federation · Clean Architecture · Bancolombia Design System · Azure DevOps · AWS S3 and CloudFront

### Starting from zero

The first weeks were about understanding what we were building and how Bancolombia builds. I worked with the bank's cross-cutting teams, learned its design system, and met with a Google Developer Expert to understand the standards already used across other projects: Clean Architecture, Angular, and why.

Bancolombia wanted micro frontends but had little in place. That was why I was brought in: I had built them before. I ran proofs of concept and wrote the guidelines the project would follow.

### The architecture

I set up every micro-frontend repository and a set of archetype repositories, templates that gave each new micro frontend the right structure from day one. The stack was Angular with Module Federation.

I configured the delivery pipeline in Azure DevOps: builds, secrets management and deployment to AWS S3 behind the CloudFront CDN. I integrated the Bancolombia Design System and built the first login page as the proof that everything worked end to end.

### One decision: never redeploy the shell

In a typical Module Federation setup, the shell knows where every micro frontend lives. Registering a new one, or updating one, means rebuilding and redeploying the shell. For a bank used by millions of people at the same time, that is slow, costs money on every rebuild, and turns the shell into a single point of failure for every team.

I proposed two changes. First, load micro frontends asynchronously, so the shell opens the login immediately instead of loading everything up front. Second, move the registry out of the shell: a configuration file acts as the contract with every micro frontend, and the app fetches it in the browser to find out where each one lives.

With that, teams could deploy a micro frontend on its own and update its routes by changing the configuration, without touching or redeploying the shell.

### From one engineer to twenty

When the team started to grow, I helped choose it. I interviewed PRAGMA's candidates and helped balance the mix of seniority, from juniors to masters, for a team planned to reach 20 people. We reached 20, organized in five squads, each with a lead.

I was the cross-cutting lead between them. I met with the squad leads to agree on how we would work, how the new standards would be adopted and what each person needed to learn. Not everyone knew Clean Architecture, so I gave talks and ran sessions until the whole team was on the same page. Decisions about architecture and security went through that group.

### The product today

Sucursal Virtual Personas later launched with the wider team, many of whom continued after my phase. Seeing it live, built on the foundations we started, was one of the most rewarding moments of my career.

**Image caption:** The renewed Sucursal Virtual Personas, launched by the wider team.

### What I learned

> Before Bancolombia, I worked mostly with React, Gatsby and static marketing sites. This project made me learn Angular from scratch, Azure and Azure DevOps, and new tools and ways of working. But the biggest challenge, and what I value most, was helping build the team: it sharpened my leadership, ownership and mentoring. I worked with excellent people who helped me grow as a person and as a professional.

## Screen content plan

1. **Opening:** headline, two paragraphs, role and stack beside the public login screen.
2. **Starting from zero → architecture:** a short timeline from "one engineer, no repository" to "20 people, five squads".
3. **The decision:** the strongest visual. A two-state diagram: the usual shell that knows every micro frontend vs. the shell that reads a runtime configuration and loads micro frontends on demand. Possibly interactive: "deploy" a micro frontend and watch the shell stay untouched.
4. **Team:** five squads around a cross-cutting lead, as a simple diagram. Optional team photo with permission.
5. **Close:** the product today (approved capture and link to the launch post), the learning, next project.

## Assets

See [the Bancolombia asset group](assets.md#bancolombia). login-svp.jpeg is the opening candidate. svp-loged.png is an authenticated capture with account context and needs a clean derivative. Team photos are optional and need the consent of the people shown. The live site is a bank login and almost certainly cannot be embedded; use captures and a link.

## Owner review

- 2026-10-25: Jouler answered all interview questions. No dates are shown on the page by his decision; the role is Master Frontend Developer (May–October 2023 on LinkedIn, when he left PRAGMA).
- Final read of the copy pending.

## Sources

[Owner interview](sources.md#s15) · [PRAGMA experience](sources.md#s02) · [Public launch post](sources.md#s04) · [Supplied images](sources.md#s07) · [Official product context](sources.md#s08).
