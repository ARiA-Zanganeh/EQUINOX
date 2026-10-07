import { useEffect, useRef } from "react";
import "./Missions.css";
import Button from "../components/Button";

/* ---------------------------------------------------------
   Reveal on scroll (same behaviour as Rockets)
   --------------------------------------------------------- */
function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => node.classList.add("is-visible");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ---------------------------------------------------------
   Content
   `to` = the page each category opens. Add these 5 routes in App.jsx.
   --------------------------------------------------------- */
const SECTIONS = [
  {
    id: "human-exploration",
    to: "/missions/human-exploration",
    index: "01 — People in space",
    title: "Human Exploration",
    lead: "Sending people, and bringing them home.",
    missions: [
      {
        name: "Apollo",
        meta: "1961–1972 · NASA",
        text: "Apollo put twelve people on the Moon across six landings. Apollo 11 touched down in July 1969, carried there by the Saturn V, the most powerful rocket ever flown by a crew at that time.",
      },
      {
        name: "Artemis",
        meta: "2022 – present · NASA and partners",
        text: "Artemis is the return to the Moon, this time to stay. Artemis I flew an uncrewed Orion capsule around the Moon in 2022. Later flights aim for the lunar south pole.",
      },
      {
        name: "International Space Station",
        meta: "1998 – present · five space agencies",
        text: "The ISS circles Earth every 90 minutes at about 400 km. It has been continuously crewed since November 2000, and it is the longest-running research lab in orbit.",
      },
    ],
  },
  {
    id: "planetary-exploration",
    to: "/missions/planetary-exploration",
    index: "02 — Other worlds",
    title: "Planetary Exploration",
    lead: "Landers, rovers, and orbiters on worlds we can't walk on yet.",
    missions: [
      {
        name: "Mars Missions",
        meta: "1976 – present",
        text: "From the Viking landers to Curiosity and Perseverance, Mars is the most visited planet beyond Earth. In 2021 the Ingenuity helicopter made the first powered flight on another world.",
      },
      {
        name: "Lunar Missions",
        meta: "1959 – present",
        text: "Luna 9 made the first soft landing on the Moon in 1966. Since then, Chang'e 4 reached the far side and Chandrayaan-3 landed near the south pole in 2023.",
      },
      {
        name: "Jupiter & Saturn Missions",
        meta: "1973 – present",
        text: "Galileo and Juno studied Jupiter. Cassini spent 13 years at Saturn and dropped the Huygens probe onto Titan. Europa Clipper, launched in 2024, is headed for Jupiter's icy moon.",
      },
    ],
  },
  {
    id: "deep-space",
    to: "/missions/deep-space",
    index: "03 — Beyond the planets",
    title: "Deep Space",
    lead: "Spacecraft built to keep going.",
    missions: [
      {
        name: "Voyager",
        meta: "Launched 1977 · NASA",
        text: "Voyager 1 and 2 toured the outer planets, then left the Sun's influence: Voyager 1 in 2012, Voyager 2 in 2018. Each carries a Golden Record, a message to anyone who finds it.",
      },
      {
        name: "New Horizons",
        meta: "Launched 2006 · NASA",
        text: "New Horizons gave us the first close look at Pluto on 14 July 2015. It then flew past Arrokoth, a small icy body in the Kuiper Belt, on 1 January 2019.",
      },
    ],
  },
  {
    id: "space-science",
    to: "/missions/space-science",
    index: "04 — Observatories",
    title: "Space Science",
    lead: "Telescopes that see what the atmosphere hides.",
    missions: [
      {
        name: "James Webb Space Telescope",
        meta: "Launched 2021 · NASA, ESA, CSA",
        text: "Webb's 6.5 m gold-coated mirror observes in infrared from about 1.5 million km away. It studies the first galaxies and the atmospheres of distant planets.",
      },
      {
        name: "Hubble Space Telescope",
        meta: "Launched 1990 · NASA and ESA",
        text: "Hubble orbits at about 540 km with a 2.4 m mirror. Five astronaut servicing missions kept it sharp, and its images changed how we measure the age and growth of the universe.",
      },
      {
        name: "Chandra X-ray Observatory",
        meta: "Launched 1999 · NASA",
        text: "X-rays don't pass through our atmosphere, so Chandra watches from a high elliptical orbit. It looks at black holes, exploded stars, and the hot gas between galaxies.",
      },
    ],
  },
  {
    id: "earth-and-sun",
    to: "/missions/earth-and-sun",
    index: "05 — Home and its star",
    title: "Earth & Sun",
    lead: "Watching the planet we live on and the star that powers it.",
    missions: [
      {
        name: "Earth Observation",
        meta: "1972 – present",
        text: "Landsat has imaged Earth's surface since 1972. Satellites like Terra and the Sentinel fleet track forests, ice, oceans, and weather, and they give us decades of comparable data.",
      },
      {
        name: "Solar Missions",
        meta: "1995 – present",
        text: "SOHO has watched the Sun since 1995. Parker Solar Probe, launched in 2018, now passes about 6.1 million km from the solar surface, closer than any spacecraft before it.",
      },
    ],
  },
];

/* ---------------------------------------------------------
   One category section
   --------------------------------------------------------- */
function MissionSection({ section }) {
  const ref = useReveal();

  return (
    <section ref={ref} className="mission-section" aria-label={section.title}>
      <div className="mission-section-inner">
        <header className="mission-head">
          <p className="mission-index">{section.index}</p>
          <h2 className="mission-title">{section.title}</h2>
          <p className="mission-lead">{section.lead}</p>
        </header>

        <ul className="mission-list">
          {section.missions.map((mission) => (
            <li key={mission.name} className="mission-item">
              <h3 className="mission-name">{mission.name}</h3>
              <p className="mission-meta">{mission.meta}</p>
              <p className="mission-text">{mission.text}</p>
            </li>
          ))}
          <li className="mission-end">
            <Button to={section.to}>{section.title}</Button>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Page
   --------------------------------------------------------- */
function Missions() {
  return (
    <main className="missions">
      <section className="missions-intro" aria-label="Missions">
        <div className="missions-hero">
          <div className="missions-hero-glow" />

          {/* Put your PNG in /public as missions-hero.png (or change the src) */}
          <div className="missions-hero-media">
            <img
              className="missions-hero-image"
              src="/missions-hero.png"
              alt=""
              aria-hidden="true"
            />
          </div>

          <div className="missions-hero-content">
            <h1>MISSIONS</h1>

            <p className="missions-lead">Every rocket was built for a reason.</p>

            <p className="missions-lines">
              People on the Moon. Rovers on Mars.
              <br />
              Telescopes that look back to the first galaxies.
              <br />
              Probes that left the Sun's reach behind.
              <br />
              These are the journeys the machines were made for:
            </p>

            <p className="missions-close">Where we went, and why.</p>
          </div>
        </div>
      </section>

      {SECTIONS.map((section) => (
        <MissionSection key={section.id} section={section} />
      ))}
    </main>
  );
}

export default Missions;