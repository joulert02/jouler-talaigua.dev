// Sample Work items for the stories: the approved English listing copy, one entry per state a row can be in, plus a personal project. On the
// site, the Work page builds them from the `projects` collection (src/views/WorkHub.astro).
import type { WorkItem } from "../types";
import meliLists from "../../../../assets/projects/mercadolibre/lists.png";
import goodrxCards from "../../../../assets/projects/goodrx/cards.webp";

/** A built case: the row links to it. Stories never leave Storybook, so its link is "#". */
export const liveItem: WorkItem = {
  slug: "mercado-libre-lists",
  company: "Mercado Libre",
  title: "Lists & Gift Registry",
  summary:
    "Rebuilding how shoppers save products and plan gifts, plus the test strategy and app navigation behind it.",
  focus: ["Product engineering", "Test strategy", "Web views in native apps"],
  cover: meliLists,
  href: "#",
  tags: [],
};

/** A case not built yet: no link, a "Coming soon" tag. */
export const comingItem: WorkItem = {
  slug: "goodrx-observability",
  company: "GoodRx · via EPAM",
  title: "Datadog to groundcover",
  summary:
    "Moving the frontend's observability to groundcover, running on GoodRx's own cloud, to cut costs without losing sight of real users.",
  focus: ["Observability", "Real User Monitoring", "CI/CD"],
  cover: goodrxCards,
  tags: [{ label: "Coming soon", tone: "muted" }],
};

/** A status page without a cover: its own tag, and a status tile instead of a picture. */
export const statusItem: WorkItem = {
  slug: "caps-plus",
  company: "Cast & Crew · via Remoti",
  title: "CAPS+",
  summary: "Rebuilding a production-accounting platform, one piece at a time.",
  focus: [],
  tags: [{ label: "Under construction", tone: "muted" }],
};

/** Jouler's own product: the violet "Personal" tag before its state. */
export const personalItem: WorkItem = {
  slug: "personal-nexus",
  company: "EKOU",
  title: "Personal Nexus",
  summary: "Exploring a transaction-driven personal-finance product with an AI-assisted capture layer.",
  focus: [],
  tags: [
    { label: "Personal", tone: "accent" },
    { label: "Coming soon", tone: "muted" },
  ],
};

export const workItems: WorkItem[] = [liveItem, comingItem, statusItem, personalItem];
