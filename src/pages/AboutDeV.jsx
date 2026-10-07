import { useEffect, useRef } from "react";
import "./about-dev.css";

/* ---------------------------------------------------------
   DATA
   --------------------------------------------------------- */

// span: 1 (default) | 2 | 4 — only controls column width, never styling
const specs = [
  { label: "Project", value: "EQUINOX" },
  { label: "Type", value: "Space & Technology" },
  { label: "Creator", value: "EmpireX" },
  { label: "Design System", value: "NoX OS" },
  { label: "Status", value: "Alpha 1.0" },
  { label: "Release", value: "2026" },
  { label: "Framework", value: "React + Vite" },
  { label: "Components", value: "React Components" },
  { label: "Built With", value: "React · JavaScript · CSS", span: 2 },
  { label: "Development", value: "Independent Project", span: 2 },
  {
    label: "Inspiration",
    value: "SpaceX · Space Exploration · Future Technology",
    span: 4,
  },
];

const developer = [
  { label: "Role", value: "Software Developer" },
  { label: "From", value: "Iran · Bandar Abbas" },
  {
    label: "Focus",
    value: "Web Development · Interactive Experiences · AI-Assisted Development",
  },
  { label: "Project", value: "EQUINOX · EmpireX" },
  {
    label: "Skills",
    value: "HTML · CSS · JavaScript · React · Git · Claude Code · Cursor · UI Design",
  },
];

/* Links provided by the project owner.
   Anything still unknown should stay "#" and be replaced later. */
const links = [
  {
    name: "YouTube",
    handle: "@ToEmpireX",
    href: "https://www.youtube.com/channel/UCvX_6fJHBT3zF1SHFbnFjtw",
    icon: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="M10 9.5 15 12l-5 2.5z" />
      </>
    ),
  },
  {
    name: "Instagram",
    handle: "@toempirex",
    href: "https://www.instagram.com/toempirex",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
      </>
    ),
  },
  {
    name: "Telegram",
    handle: "@toempirex",
    href: "https://t.me/toempirex",
    icon: (
      <>
        <path d="M21 4 3 10.8l6 2.4L21 4Z" />
        <path d="m9 13.2.8 5.8 2.8-3.6L18 19 21 4" />
      </>
    ),
  },
  {
    name: "LinkedIn",
    handle: "aria-zanganeh",
    href: "https://www.linkedin.com/in/aria-zanganeh-821151422",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M8 10.5V16M8 7.8v.01M11.5 16v-5.5M11.5 13c0-1.6 1-2.5 2.3-2.5S16 11.2 16 13v3" />
      </>
    ),
  },
];

/* ---------------------------------------------------------
   REVEAL — same pattern as Rockets (IntersectionObserver,
   reduced-motion aware). Children use .rv with --d delay.
   --------------------------------------------------------- */

function useReveal(threshold = 0.22) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reveal = () => node.classList.add("is-visible");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

const d = (s) => ({ "--d": `${s}s` });

/* ---------------------------------------------------------
   PAGE
   --------------------------------------------------------- */

function AboutDeV() {
  const pageRef = useRef(null);
  const panelRef = useRef(null);

  const projectRef = useReveal(0.18);
  const devRef = useReveal(0.3);
  const connectRef = useReveal(0.4);
  const finalRef = useReveal(0.4);

  /* Soft pointer light — unchanged behavior, desktop pointers only */
  useEffect(() => {
    const page = pageRef.current;
    const panel = panelRef.current;
    if (!page || !panel) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduced.matches || !fine.matches) return undefined;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let pageX = 0;
    let pageY = 0;
    let targetPageX = 0;
    let targetPageY = 0;
    let active = false;

    const tick = () => {
      currentX += (targetX - currentX) * 0.042;
      currentY += (targetY - currentY) * 0.042;
      pageX += (targetPageX - pageX) * 0.035;
      pageY += (targetPageY - pageY) * 0.035;

      panel.style.setProperty("--lx", `${currentX}px`);
      panel.style.setProperty("--ly", `${currentY}px`);
      page.style.setProperty("--fx", `${pageX}px`);
      page.style.setProperty("--fy", `${pageY}px`);

      const bounds = panel.getBoundingClientRect();
      const px = bounds.width ? currentX / bounds.width : 0.5;
      panel.style.setProperty("--px", px.toFixed(3));

      frame = window.requestAnimationFrame(tick);
    };

    const onMove = (event) => {
      const bounds = panel.getBoundingClientRect();
      targetX = event.clientX - bounds.left;
      targetY = event.clientY - bounds.top;
      const pageBounds = page.getBoundingClientRect();
      targetPageX = event.clientX - pageBounds.left;
      targetPageY = event.clientY - pageBounds.top;

      if (!active) {
        active = true;
        currentX = targetX;
        currentY = targetY;
        pageX = targetPageX;
        pageY = targetPageY;
        page.classList.add("is-lit");
        frame = window.requestAnimationFrame(tick);
      }
    };

    const onLeave = () => {
      active = false;
      page.classList.remove("is-lit");
      window.cancelAnimationFrame(frame);
    };

    page.addEventListener("pointermove", onMove);
    page.addEventListener("pointerleave", onLeave);

    return () => {
      page.removeEventListener("pointermove", onMove);
      page.removeEventListener("pointerleave", onLeave);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className="about-page" ref={pageRef}>
      {/* One atmosphere for the whole page: stars + haze never stop */}
      <div className="about-atmosphere" aria-hidden="true">
        <span className="about-stars about-stars-far" />
        <span className="about-stars about-stars-mid" />
        <span className="about-stars about-stars-deep" />
        <span className="about-field" />
      </div>

      {/* ============ 01 — PROJECT ============ */}
      <section
        ref={projectRef}
        className="about-section about-project"
        aria-labelledby="equinox-title"
      >
        <div className="about-glass" ref={panelRef}>
          <div className="about-glass-sheen" aria-hidden="true" />
          <div className="about-glass-edge" aria-hidden="true" />
          <div className="about-glass-light" aria-hidden="true" />

          <div className="about-inner">
            <div className="empirex-lockup rv" style={d(0.05)}>
              <div className="empirex-avatar">
                <img src="/EmpireX.jpg" alt="EmpireX" />
              </div>
              <span className="empirex-word">EmpireX</span>
            </div>

            <h1 id="equinox-title" className="about-title rv" style={d(0.16)}>
              EQUINOX
            </h1>

            <div className="about-copy rv" style={d(0.28)}>
              <p>
                An independent space & technology project inspired by SpaceX,
                built around the future of human exploration beyond Earth.
              </p>
              <p>
                EQUINOX combines powerful technology, minimal design, and a
                cinematic digital experience to explore space, innovation, and
                the technologies shaping what comes next.
              </p>
            </div>

            <p className="about-signature rv" style={d(0.38)}>
              Built by EmpireX.
            </p>

            <dl className="about-meta rv" style={d(0.5)}>
              {specs.map((item) => (
                <div
                  className={`about-spec${item.span ? ` span-${item.span}` : ""}`}
                  key={item.label}
                >
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="about-project-note rv" style={d(0.62)}>
              <p className="about-kicker">About EQUINOX</p>
              <p>
                EQUINOX is an independent project, built as a real React
                application rather than a mockup. It is an experimental but
                serious look at space and technology, shaped around a cinematic
                experience and the future of exploration.
              </p>
            </div>

            <p className="about-nox rv" style={d(0.72)}>
              NoX OS is the visual and interface system developed specifically
              for the EQUINOX experience.
            </p>
          </div>
        </div>
      </section>

      {/* Atmosphere carries on; this only adds breathing room */}
      <div className="about-bridge" aria-hidden="true" />

      {/* ============ 02 — DEVELOPER ============ */}
      <section
        ref={devRef}
        className="about-dev"
        aria-labelledby="developer-title"
      >
        <div className="about-dev-inner">
          <div className="about-dev-media rv" style={d(0.05)}>
            <div className="dev-avatar">
              {/* Replace /developer-profile.jpg with your own photo */}
              <img src="/developer-profile.jpg" alt="Aria Zanganeh" />
            </div>
          </div>

          <div className="about-dev-copy">
            <p className="about-index rv" style={d(0.1)}>
              02 — The developer
            </p>
            <h2 id="developer-title" className="about-dev-name rv" style={d(0.18)}>
              ARiA ZANGANEH
            </h2>
            <p className="about-dev-aka rv" style={d(0.26)}>
              Also known as ARi SOUL
            </p>
            <p className="about-dev-intro rv" style={d(0.36)}>
              I build things for the web and like understanding how they work.
              EQUINOX started as a way to bring technology and design together,
              and to learn modern tools by making something real. I use AI as
              part of how I work. Still learning, still building.
            </p>

            <ul className="about-facts rv" style={d(0.48)}>
              {developer.map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ 03 — CONTENT ============ */}
      <section
        ref={connectRef}
        className="about-connect"
        aria-labelledby="connect-title"
      >
        <p className="about-index rv" style={d(0.05)}>
          03 — Content
        </p>
        <h2 id="connect-title" className="about-connect-title rv" style={d(0.12)}>
          Follow the project
        </h2>

        <ul className="about-links rv" style={d(0.24)}>
          {links.map((link) => (
            <li key={link.name}>
              <a
                className="about-link"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.name} — ${link.handle}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {link.icon}
                </svg>
                <span className="about-link-text">
                  <span className="about-link-name">{link.name}</span>
                  <span className="about-link-handle">{link.handle}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ============ FINAL ============ */}
      <section ref={finalRef} className="about-final" aria-label="Closing">
        <h2 className="about-final-title rv" style={d(0.05)}>
          Built to explore what comes next.
        </h2>
        <p className="about-final-text rv" style={d(0.18)}>
          EQUINOX is only the beginning. The project will keep evolving through
          new ideas, technologies, and experiences.
        </p>
        <div className="about-final-sign rv" style={d(0.32)}>
          <span className="about-final-mark">EQUINOX</span>
          <span className="about-final-sub">EmpireX · 2026</span>
        </div>
      </section>
    </main>
  );
}

export default AboutDeV;