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
   Deep Space data
   --------------------------------------------------------- */

const DEEP_SPACE_MISSIONS = [
  {
    id: "voyager",
    index: "01 — Leaving the Sun",
    title: "Voyager",
    meta: "1977 – present · NASA",

    intro:
      "Voyager 1 and Voyager 2 toured the outer planets, then kept going. They are the first spacecraft to leave the Sun's protective bubble and enter interstellar space, and each still carries a Golden Record: a message from Earth to anyone who finds it.",

    paragraphs: [
      "Voyager 2 launched on 20 August 1977, and Voyager 1 followed on 5 September. Voyager 1 was sent on a faster path, so it reached Jupiter and Saturn first. Together the two spacecraft studied all four giant planets — Jupiter, Saturn, Uranus, and Neptune — along with dozens of their moons, rings, and magnetic fields.",

      "Voyager 1 flew past Jupiter in 1979 and Saturn in 1980, then turned outward. Voyager 2 continued the tour alone. It became the first spacecraft to visit Uranus, on 24 January 1986, and the first to visit Neptune, on 25 August 1989. No other mission has flown past those two planets.",

      "After the planets, both spacecraft entered the Voyager Interstellar Mission. Voyager 1 crossed the heliopause — the boundary where the solar wind gives way to interstellar space — on 25 August 2012. Voyager 2 crossed the same boundary on 5 November 2018. They remain the most distant human-made objects.",

      "Before launch, each spacecraft was fitted with a gold-plated copper disc, the Golden Record. It holds images, sounds, music, and greetings in many languages, chosen as a portrait of Earth. The records are not a distress call. They are a message, meant to last long after the spacecraft stop transmitting."
    ],

    facts: [
      ["1977", "both Voyagers launched"],
      ["1986 · 1989", "only visits to Uranus and Neptune"],
      ["2012", "Voyager 1 entered interstellar space"],
      ["2018", "Voyager 2 crossed the heliopause"]
    ],

    image: "/missions/deep-space/voyager.jpg",
    imageAlt: "Voyager spacecraft in deep space"
  },

  {
    id: "new-horizons",
    index: "02 — The Kuiper Belt",
    title: "New Horizons",
    meta: "2006 – present · NASA",

    intro:
      "New Horizons gave us the first close look at Pluto, then kept flying into the Kuiper Belt. It is the only spacecraft to have visited Pluto, and the one that flew past the most distant object ever explored up close.",

    paragraphs: [
      "New Horizons launched on 19 January 2006 from Cape Canaveral on an Atlas V rocket, on one of the fastest departure trajectories ever given to a spacecraft. In February 2007 it flew past Jupiter, using the planet's gravity to gain speed and studying Jupiter and its moons on the way through.",

      "On 14 July 2015, after a journey of more than nine years, New Horizons flew about 7,800 kilometers above Pluto. The dwarf planet, barely resolved from Earth, turned out to be a complex world: nitrogen glaciers, towering water-ice mountains, and a heart-shaped plain now called Tombaugh Regio. The flyby also mapped Pluto's large moon Charon and its smaller moons.",

      "The mission did not end at Pluto. On 1 January 2019, New Horizons flew past Arrokoth, a small icy body in the Kuiper Belt about a billion miles beyond Pluto. It came within about 3,500 kilometers. Arrokoth, once nicknamed Ultima Thule, is a contact binary — two flattened lobes joined together — and the most distant world a spacecraft has ever explored up close.",

      "New Horizons continues outward through the Kuiper Belt, studying the solar wind and distant icy bodies from a region no other working spacecraft has reached. Pluto was the first close look. Arrokoth showed that the outer solar system still holds worlds we had never seen."
    ],

    facts: [
      ["2006", "launched toward Pluto"],
      ["14 July 2015", "first close look at Pluto"],
      ["1 Jan 2019", "Arrokoth flyby"],
      ["Kuiper Belt", "still traveling outward"]
    ],

    image: "/missions/deep-space/new-horizons.jpg",
    imageAlt: "New Horizons at the edge of the solar system"
  }
];

/* ---------------------------------------------------------
   Hero
   --------------------------------------------------------- */

function DeepSpaceHero() {
  return (
    <section
      className="missions-detail-intro"
      aria-label="Deep Space"
    >
      <div className="missions-detail-hero">

        <div className="missions-detail-hero-glow" />

        <div className="missions-detail-hero-media">
          <img
            src="/missions/deep-space/deep-space-hero.png"
            alt=""
            aria-hidden="true"
          />
        </div>

        <div className="missions-detail-hero-content">
          <p className="missions-detail-eyebrow">
            03 — Beyond the planets
          </p>

          <h1>Deep Space</h1>

          <p className="missions-detail-lead">
            Spacecraft that left the planets behind and kept going.
          </p>

          <p className="missions-detail-lines">
            We sent them outward.
            <br />
            They crossed the last planets.
            <br />
            And they are still traveling.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Introduction
   --------------------------------------------------------- */

function DeepSpaceIntro() {
  const ref = useReveal();

  return (
    <section
      ref={ref}
      className="missions-detail-intro-section"
    >
      <div className="missions-detail-intro-inner">

        <div className="missions-detail-intro-label">
          <span>DEEP SPACE</span>
        </div>

        <div className="missions-detail-intro-copy">
          <h2>
            Past the last
            <br />
            planet.
          </h2>

          <p>
            Most missions turn around, orbit, or land. A few were built
            to keep going — past Jupiter, past Saturn, past Pluto, and
            out toward the space between the stars.
          </p>

          <p>
            Voyager and New Horizons are those missions. One pair has
            already left the Sun's influence. The other gave us Pluto,
            then a world even farther out.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Mission Detail
   --------------------------------------------------------- */

function DeepSpaceMission({ mission }) {
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

function DeepSpace() {
  return (
    <main className="missions-detail">

      <DeepSpaceHero />

      <DeepSpaceIntro />

      {DEEP_SPACE_MISSIONS.map((mission) => (
        <DeepSpaceMission
          key={mission.id}
          mission={mission}
        />
      ))}

      <section className="missions-detail-close">
        <div className="missions-detail-close-inner">

          <p>DEEP SPACE</p>

          <h2>
            Still outward.
            <br />
            Still listening.
          </h2>

          <span>
            Voyager. New Horizons.
          </span>

        </div>
      </section>

    </main>
  );
}

export default DeepSpace;
