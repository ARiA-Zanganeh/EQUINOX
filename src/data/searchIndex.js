/* =========================================================
   EQUINOX — SEARCH INDEX
   Builds one flat list from every page's data, then exposes
   search(query). No dependencies.

   Each entry:
     title    big line in the result
     page     page name (shown above the title)
     section  optional sub-label (shown after the page name)
     text     everything searchable in that block
     to       route to open
     target   CSS selector to scroll to after navigating (optional)

   REQUIRED: add `export` to `const SECTIONS` in
   Missions.jsx, Starlink.jsx and Technology.jsx.
   ========================================================= */

import { SECTIONS as MISSION_SECTIONS } from "../pages/Missions";
import { SECTIONS as STARLINK_SECTIONS } from "../pages/Starlink";
import { SECTIONS as TECH_SECTIONS } from "../pages/Technology";
import { PLANETS } from "./planets";

/* ---------- helpers ---------- */

/* Starlink / Technology sections share one shape. */
const flattenSection = (s) =>
  [
    s.lead,
    ...(s.paragraphs || []),
    ...(s.stats || []).flat(),
    ...(s.groups || []).flatMap((g) => [g.title, ...g.rows.flat()]),
    s.note,
  ]
    .filter(Boolean)
    .join(" · ");

/* ---------- build entries ---------- */

const entries = [];

/* Missions: one entry per mission, plus one per category page */
MISSION_SECTIONS.forEach((section) => {
  section.missions.forEach((m) => {
    entries.push({
      title: m.name,
      page: "Missions",
      section: section.title,
      text: `${m.text} ${m.meta}`,
      to: "/Missions",
      target: `[aria-label="${section.title}"]`,
    });
  });

  entries.push({
    title: section.title,
    page: "Missions",
    section: "Category page",
    text: `${section.lead} ${section.missions.map((m) => m.name).join(" ")}`,
    to: section.to,
  });
});

/* Space: one entry per planet */
PLANETS.forEach((p) => {
  entries.push({
    title: p.name,
    page: "Space",
    section: p.kind,
    text: `${p.lead} ${p.body} ${p.note}`,
    to: "/Space",
    target: `section[aria-label="${p.name}"]`,
  });
});

/* Starlink */
STARLINK_SECTIONS.forEach((s) => {
  entries.push({
    title: s.title,
    page: "Starlink",
    section: s.kicker,
    text: flattenSection(s),
    to: "/Starlink",
    target: `#sl-${s.id}`,
  });
});

/* Technology */
TECH_SECTIONS.forEach((s) => {
  entries.push({
    title: s.title,
    page: "Technology",
    section: s.kicker,
    text: flattenSection(s),
    to: "/Technology",
    target: `#tech-${s.id}`,
  });
});

/* TODO: Rockets — send Rockets.jsx and add its entries here. */

/* Plain pages, so "rockets" or "about" jumps straight there */
[
  { title: "Home", to: "/" },
  { title: "Space", to: "/Space" },
  { title: "Rockets", to: "/Rockets" },
  { title: "Missions", to: "/Missions" },
  { title: "Starlink", to: "/Starlink" },
  { title: "Technology", to: "/Technology" },
  { title: "About DeV", to: "/AboutDeV" },
].forEach((p) => {
  entries.push({ ...p, page: "Page", section: "", text: "" });
});

/* ---------- matching ---------- */

/* lowercase, no accents (same length, so snippet offsets stay valid) */
const norm = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const INDEX = entries.map((e, order) => ({
  ...e,
  order,
  _title: norm(e.title),
  _section: norm(e.section || ""),
  _text: norm(e.text),
}));

export function tokenize(query) {
  return norm(query)
    .split(/\s+/)
    .filter((t) => t.length >= 2);
}

/* Every token must match somewhere (title, section or text).
   Matches at the start of a word count more, so typing
   "sat" finds "satellite" as you go. */
function scoreEntry(entry, tokens, whole) {
  let total = 0;

  for (const token of tokens) {
    const wordStart = new RegExp(`(^|[^a-z0-9])${escapeRe(token)}`);
    let s = 0;

    if (wordStart.test(entry._title)) s = 12;
    else if (entry._title.includes(token)) s = 8;
    else if (entry._section.includes(token)) s = 5;
    else if (wordStart.test(entry._text)) s = 3;
    else if (token.length >= 3 && entry._text.includes(token)) s = 1.5;

    if (s === 0) return 0;
    total += s;
  }

  if (entry._title === whole) total += 20;
  else if (entry._title.startsWith(whole)) total += 10;

  /* Plain "Page" entries rank just under real content matches */
  if (entry.page === "Page") total -= 2;

  return total;
}

function makeSnippet(entry, tokens) {
  const text = entry.text;
  if (!text) return "";

  let idx = -1;
  for (const token of tokens) {
    const i = entry._text.indexOf(token);
    if (i !== -1 && (idx === -1 || i < idx)) idx = i;
  }

  const size = 150;
  const start = idx > 40 ? idx - 40 : 0;
  const end = Math.min(text.length, start + size);

  return (
    (start > 0 ? "…" : "") +
    text.slice(start, end).trim() +
    (end < text.length ? "…" : "")
  );
}

export function search(query, limit = 12) {
  const tokens = tokenize(query);
  if (!tokens.length) return { results: [], tokens };

  const whole = norm(query).trim();

  const results = INDEX.map((entry) => ({
    entry,
    score: scoreEntry(entry, tokens, whole),
  }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.order - b.entry.order)
    .slice(0, limit)
    .map(({ entry }) => {
      const { _title, _section, _text, order, ...rest } = entry;
      return { ...rest, id: order, snippet: makeSnippet(entry, tokens) };
    });

  return { results, tokens };
}