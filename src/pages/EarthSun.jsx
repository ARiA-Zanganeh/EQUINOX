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
   Earth & Sun data
   --------------------------------------------------------- */

const EARTH_SUN_MISSIONS = [
  {
    id: "earth-observation",
    index: "01 — Our planet",
    title: "Earth Observation",
    meta: "1972 – present",

    intro:
      "Landsat has imaged Earth's surface since 1972. Satellites such as Terra and the Sentinel fleet track forests, ice, oceans, and weather, and they give us decades of comparable data.",

    paragraphs: [
      "The record starts with Landsat 1. NASA launched it on 23 July 1972 as the Earth Resources Technology Satellite, the first satellite built to study Earth's land from orbit. It was designed for one year and worked for nearly six, and the program never stopped. Later Landsats kept the same kind of view, so a forest, a city, or a shrinking lake can be compared across decades.",

      "Terra, launched on 18 December 1999, widened that view. As the flagship of NASA's Earth Observing System, it carries instruments that measure land cover, clouds, reflected sunlight, and particles in the air at the same time. One satellite can connect a fire, the smoke it sends up, and the sunlight that smoke blocks.",

      "Europe's Copernicus programme added the Sentinel fleet. Sentinel-1, first launched in 2014, uses radar that sees through cloud and darkness, which matters for ice, floods, and ships. Sentinel-2 images land and vegetation in color close enough to track crops and forests. Later Sentinels watch the oceans, the atmosphere, and the height of the sea.",

      "Together these missions are less about a single picture than about a timeline. The same places, measured the same way, year after year, show ice retreating, forests changing, cities spreading, and oceans warming — a record that only works because the satellites kept flying."
    ],

    facts: [
      ["23 July 1972", "Landsat 1 launched"],
      ["1999", "Terra entered orbit"],
      ["2014", "first Sentinel launched"],
      ["Decades", "comparable views of Earth"]
    ],

    image: "/missions/earth-sun/earth-observation.jpg",
    imageAlt: "Earth seen from an observation satellite"
  },

  {
    id: "solar-missions",
    index: "02 — Our star",
    title: "Solar Missions",
    meta: "1995 – present",

    intro:
      "SOHO has watched the Sun since 1995. Parker Solar Probe, launched in 2018, now passes about 6.1 million kilometers from the solar surface, closer than any spacecraft before it.",

    paragraphs: [
      "SOHO, the Solar and Heliospheric Observatory, launched on 2 December 1995 as a joint mission of ESA and NASA. It sits in a halo orbit around the Sun–Earth L1 point, about 1.5 million kilometers sunward of Earth, where it can watch the Sun without Earth's shadow getting in the way. It has tracked solar flares, coronal mass ejections, and the solar wind for a full set of solar cycles.",

      "From that post, SOHO also became an unexpected comet finder. Its coronagraphs, built to hide the bright disk and study the outer atmosphere, have recorded thousands of comets falling toward the Sun. The spacecraft was meant to last two years. It is still returning data.",

      "Parker Solar Probe was built to go in, not to watch from a distance. NASA launched it on 12 August 2018, named for Eugene Parker, who predicted the solar wind. Repeated flybys of Venus tighten its orbit, so each pass swings closer to the Sun than the one before.",

      "On 24 December 2024 it reached its closest planned distance: about 6.1 million kilometers above the solar surface, flying through the corona at roughly 692,000 kilometers per hour, the fastest speed of any human-made object. A carbon heat shield takes the glare while the instruments measure the solar wind where it begins."
    ],

    facts: [
      ["2 Dec 1995", "SOHO launched"],
      ["L1", "SOHO watches the Sun continuously"],
      ["12 Aug 2018", "Parker Solar Probe launched"],
      ["6.1 million km", "closest pass to the solar surface"]
    ],

    image: "/missions/earth-sun/solar-missions.jpg",
    imageAlt: "The Sun studied by solar observatories"
  }
];

/* ---------------------------------------------------------
   Hero
   --------------------------------------------------------- */

function EarthSunHero() {
  return (
    <section
      className="missions-detail-intro"
      aria-label="Earth and Sun"
    >
      <div className="missions-detail-hero">

        <div className="missions-detail-hero-glow" />

        <div className="missions-detail-hero-media">
          <img
            src="/missions/earth-sun/earth-sun-hero.png"
            alt=""
            aria-hidden="true"
          />
        </div>

        <div className="missions-detail-hero-content">
          <p className="missions-detail-eyebrow">
            05 — Home and the star
          </p>

          <h1>Earth & Sun</h1>

          <p className="missions-detail-lead">
            Satellites that watch our planet, and spacecraft that fly toward our star.
          </p>

          <p className="missions-detail-lines">
            We looked down.
            <br />
            We looked at the Sun.
            <br />
            And both records are still growing.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Introduction
   --------------------------------------------------------- */

function EarthSunIntro() {
  const ref = useReveal();

  return (
    <section
      ref={ref}
      className="missions-detail-intro-section"
    >
      <div className="missions-detail-intro-inner">

        <div className="missions-detail-intro-label">
          <span>EARTH & SUN</span>
        </div>

        <div className="missions-detail-intro-copy">
          <h2>
            The world under us.
            <br />
            The star above it.
          </h2>

          <p>
            Some missions leave Earth to study other worlds. These stay
            with the system we already live in: the planet under the
            satellites, and the Sun that drives its weather.
          </p>

          <p>
            One set of spacecraft builds a long record of forests, ice,
            oceans, and cities. The other watches the Sun from a safe
            distance, or flies close enough to touch its outer atmosphere.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Mission Detail
   --------------------------------------------------------- */

function EarthSunMission({ mission }) {
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

function EarthSun() {
  return (
    <main className="missions-detail">

      <EarthSunHero />

      <EarthSunIntro />

      {EARTH_SUN_MISSIONS.map((mission) => (
        <EarthSunMission
          key={mission.id}
          mission={mission}
        />
      ))}

      <section className="missions-detail-close">
        <div className="missions-detail-close-inner">

          <p>EARTH & SUN</p>

          <h2>
            Watched from above.
            <br />
            Studied up close.
          </h2>

          <span>
            Earth. Sun.
          </span>

        </div>
      </section>

    </main>
  );
}

export default EarthSun;
