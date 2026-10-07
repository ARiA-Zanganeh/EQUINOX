import { useEffect, useRef } from "react";
import "./MissionsDetail.css";

/* ---------------------------------------------------------
   Reveal on scroll
   Same behaviour as Human Exploration
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
      { threshold: 0.16 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ---------------------------------------------------------
   Planetary Exploration data
   --------------------------------------------------------- */

const PLANETARY_MISSIONS = [
  {
    id: "mars",
    index: "01 — The Red Planet",
    title: "Mars Missions",
    meta: "1976 – present",

    intro:
      "Mars is the most extensively explored planet beyond Earth, with decades of orbiters, landers, rovers, and now aerial exploration revealing a world that was once warmer, wetter, and potentially habitable.",

    paragraphs: [
      "Modern surface exploration began with NASA's Viking program. Viking 1 landed on Mars on 20 July 1976, followed by Viking 2 on 3 September. Each spacecraft combined an orbiter with a lander, allowing scientists to study Mars from above and directly analyze its surface.",

      "The missions that followed gradually transformed Mars from a distant point of light into a world that could be explored in detail. Pathfinder demonstrated a new way to move across the surface with the Sojourner rover in 1997, while Spirit and Opportunity later traveled much farther and survived far beyond their original planned lifetimes.",

      "Curiosity arrived in Gale Crater in August 2012 and continues investigating the planet's geological history. Its discoveries have helped establish that ancient Mars once had environments capable of supporting microbial life. Perseverance landed in Jezero Crater in February 2021, where it studies rocks and collects samples that are intended to preserve a record of ancient Martian environments.",

      "Mars exploration also moved beyond wheels. In April 2021, NASA's Ingenuity became the first aircraft to achieve powered, controlled flight on another planet. Across 72 flights, the small helicopter demonstrated that aerial exploration could work in the extremely thin Martian atmosphere."
    ],

    facts: [
      ["1976", "Viking began surface exploration"],
      ["2", "NASA rovers currently operating"],
      ["2021", "first powered flight on another world"],
      ["Jezero", "Perseverance exploration site"]
    ],

    image: "/missions/planetary-exploration/mars.jpg",
    imageAlt: "Mars surface and robotic exploration"
  },

  {
    id: "lunar",
    index: "02 — Earth's Moon",
    title: "Lunar Missions",
    meta: "1959 – present",

    intro:
      "The Moon was the first world beyond Earth reached by spacecraft, becoming a testing ground for landing technology, planetary science, human exploration, and the international space programs that followed.",

    paragraphs: [
      "Lunar exploration began with the Soviet Luna program. Luna 2 reached the Moon in 1959 and became the first human-made object to reach another celestial body. A few years later, Luna 9 achieved the first soft landing on the Moon in February 1966 and returned photographs from the surface.",

      "The Apollo program then carried humans to the lunar surface, but robotic exploration never stopped. Later missions mapped the Moon in greater detail, studied its interior and gravitational field, and searched for resources that could support future exploration.",

      "China's Chang'e program added a new chapter to lunar exploration. Chang'e 4 achieved the first soft landing on the far side of the Moon in January 2019, operating with the Queqiao relay satellite because the far side cannot communicate directly with Earth.",

      "India's Chandrayaan-3 successfully landed in the Moon's southern high-latitude region in August 2023. Its Vikram lander and Pragyan rover conducted surface measurements and demonstrated India's ability to perform a controlled lunar landing.",

      "The Moon is now becoming a destination for a new generation of missions. Its proximity to Earth makes it an important place to test technologies, study planetary history, and develop the capabilities needed for longer journeys into the solar system."
    ],

    facts: [
      ["1959", "first spacecraft reached the Moon"],
      ["1966", "first soft lunar landing"],
      ["2019", "first landing on the far side"],
      ["2023", "Chandrayaan-3 lunar landing"]
    ],

    image: "/missions/planetary-exploration/lunar.jpg",
    imageAlt: "The Moon viewed from space"
  },

  {
    id: "jupiter-saturn",
    index: "03 — The outer giants",
    title: "Jupiter & Saturn Missions",
    meta: "1973 – present",

    intro:
      "The giant planets Jupiter and Saturn revealed an outer solar system filled with powerful atmospheres, complex rings, magnetic fields, and moons that may contain environments unlike anything found near Earth.",

    paragraphs: [
      "Pioneer 10 became the first spacecraft to travel through the asteroid belt and make a close encounter with Jupiter in 1973. Voyager 1 and Voyager 2 later transformed our view of the giant planets, returning detailed observations of their atmospheres, rings, magnetic environments, and moons.",

      "Galileo became the first spacecraft to orbit Jupiter, arriving in 1995. During its mission it studied Jupiter's atmosphere and magnetosphere while making repeated observations of the planet's major moons, including Europa, Ganymede, and Callisto.",

      "At Saturn, the Cassini mission spent more than 13 years studying the planet and its system of rings and moons. In 2005, the Huygens probe separated from Cassini and descended through Titan's atmosphere, becoming the first spacecraft to land on a moon in the outer solar system.",

      "Juno entered orbit around Jupiter in July 2016 and continues to investigate the planet's deep atmosphere, magnetic field, interior structure, and polar regions. Its observations have changed our understanding of how giant planets form and evolve.",

      "Europa Clipper represents the next major step. Launched on 14 October 2024, the spacecraft is traveling toward Jupiter and is scheduled to arrive in April 2030. It will conduct dozens of close flybys of Europa, studying its ice shell and ocean to determine whether the moon has conditions suitable for life."
    ],

    facts: [
      ["1973", "Pioneer 10 reached Jupiter"],
      ["1995", "Galileo entered Jupiter orbit"],
      ["13+ years", "Cassini at Saturn"],
      ["2030", "Europa Clipper arrival"]
    ],

    image: "/missions/planetary-exploration/jupiter-saturn.jpg",
    imageAlt: "Jupiter and Saturn in the outer solar system"
  }
];

/* ---------------------------------------------------------
   Hero
   --------------------------------------------------------- */

function PlanetaryExplorationHero() {
  return (
    <section
      className="missions-detail-intro"
      aria-label="Planetary Exploration"
    >
      <div className="missions-detail-hero">

        <div className="missions-detail-hero-glow" />

        <div className="missions-detail-hero-media">
          <img
            src="/missions/planetary-exploration/planetary-exploration-hero.png"
            alt=""
            aria-hidden="true"
          />
        </div>

        <div className="missions-detail-hero-content">
          <p className="missions-detail-eyebrow">
            02 — Other worlds
          </p>

          <h1>Planetary Exploration</h1>

          <p className="missions-detail-lead">
            Landers, rovers, and orbiters on worlds we can't walk on yet.
          </p>

          <p className="missions-detail-lines">
            We crossed the distance.
            <br />
            We learned to land.
            <br />
            And every world revealed another question.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Introduction
   --------------------------------------------------------- */

function PlanetaryExplorationIntro() {
  const ref = useReveal();

  return (
    <section
      ref={ref}
      className="missions-detail-intro-section"
    >
      <div className="missions-detail-intro-inner">

        <div className="missions-detail-intro-label">
          <span>PLANETARY EXPLORATION</span>
        </div>

        <div className="missions-detail-intro-copy">
          <h2>
            Worlds beyond
            <br />
            our own.
          </h2>

          <p>
            We cannot yet walk across Mars, descend beneath Europa's
            ice, or stand beside the rings of Saturn. So we send machines
            instead.
          </p>

          <p>
            Each mission extends our reach into the solar system,
            turning distant worlds into places we can measure, map,
            photograph, and begin to understand.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Mission Detail
   --------------------------------------------------------- */

function PlanetaryMission({ mission }) {
  const ref = useReveal();

  return (
    <section
      ref={ref}
      id={mission.id}
      className="human-mission"
      aria-labelledby={`${mission.id}-title`}
    >
      <div className="human-mission-inner">

        <header className="human-mission-head">
          <p className="human-mission-index">
            {mission.index}
          </p>

          <h2
            id={`${mission.id}-title`}
            className="human-mission-title"
          >
            {mission.title}
          </h2>

          <p className="human-mission-meta">
            {mission.meta}
          </p>
        </header>

        <div className="human-mission-content">

          <div className="human-mission-copy">

            <p className="human-mission-intro">
              {mission.intro}
            </p>

            {mission.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="human-mission-text"
              >
                {paragraph}
              </p>
            ))}

          </div>

          <figure className="human-mission-image">
            <img
              src={mission.image}
              alt={mission.imageAlt}
              loading="lazy"
            />
          </figure>

          <div className="human-mission-facts">
            {mission.facts.map(([value, label]) => (
              <div
                className="human-fact"
                key={label}
              >
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Page
   --------------------------------------------------------- */

function PlanetaryExploration() {
  return (
    <main className="missions-detail">

      <PlanetaryExplorationHero />

      <PlanetaryExplorationIntro />

      {PLANETARY_MISSIONS.map((mission) => (
        <PlanetaryMission
          key={mission.id}
          mission={mission}
        />
      ))}

      <section className="missions-detail-close">
        <div className="missions-detail-close-inner">

          <p>PLANETARY EXPLORATION</p>

          <h2>
            The solar system
            <br />
            is still unfolding.
          </h2>

          <span>
            Mars. Moon. Giants beyond.
          </span>

        </div>
      </section>

    </main>
  );
}

export default PlanetaryExploration;