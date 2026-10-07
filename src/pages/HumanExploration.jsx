import { useEffect, useRef } from "react";
import "./MissionsDetail.css";

/* ---------------------------------------------------------
   Reveal on scroll
   Same behaviour as Missions
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
   Mission data
   --------------------------------------------------------- */

const HUMAN_MISSIONS = [
  {
    id: "apollo",
    index: "01 — The first footsteps",
    title: "Apollo",
    meta: "1961–1972 · NASA",

    intro:
      "The Apollo program was the first sustained human exploration beyond low Earth orbit, carrying astronauts to the Moon and changing what humanity believed was possible.",

    paragraphs: [
      "Apollo began in the aftermath of President John F. Kennedy's 1961 commitment to land a human on the Moon and return them safely to Earth before the end of the decade. NASA built an entirely new family of spacecraft and launch vehicles to make that objective possible.",

      "The program's crewed lunar missions used the Saturn V rocket to launch a command and service module together with a lunar module toward the Moon. Once in lunar orbit, astronauts transferred to the lunar module, descended to the surface, and later launched back into orbit to reunite with their crew.",

      "Apollo 11 achieved the defining moment on 20 July 1969, when Neil Armstrong and Buzz Aldrin landed in the Sea of Tranquility while Michael Collins remained in lunar orbit. Armstrong and Aldrin became the first humans to walk on another world.",

      "Between Apollo 11 and Apollo 17, six missions successfully landed astronauts on the Moon. Twelve people walked on its surface, conducting geological experiments, collecting lunar samples, and demonstrating that humans could operate far beyond Earth."
    ],

    facts: [
      ["6", "successful lunar landings"],
      ["12", "people walked on the Moon"],
      ["384,400 km", "average Earth–Moon distance"],
      ["20 Jul 1969", "Apollo 11 lunar landing"]
    ],

    image: "/missions/human-exploration/apollo.jpg",
    imageAlt: "Apollo astronauts on the lunar surface"
  },

  {
    id: "artemis",
    index: "02 — Return to the Moon",
    title: "Artemis",
    meta: "2022 – present · NASA and partners",

    intro:
      "Artemis is the next era of human lunar exploration, designed to take astronauts back to the Moon and build the experience, technology, and infrastructure needed for missions farther into space.",

    paragraphs: [
      "Unlike Apollo, Artemis is not designed around a short series of visits. Its broader goal is to establish a sustained human presence around and on the Moon while developing systems that can eventually support human missions to Mars.",

      "The program uses NASA's Space Launch System rocket, the Orion spacecraft, and a growing set of lunar systems developed with commercial and international partners. The Gateway lunar station is also planned as part of the wider architecture for future lunar exploration.",

      "Artemis I was the program's first integrated flight test. Launched in November 2022, the uncrewed mission sent an Orion spacecraft around the Moon and back to Earth, testing the launch vehicle, spacecraft, heat shield, and deep-space systems before crewed missions.",

      "Future Artemis missions are intended to return astronauts to the lunar surface, expand scientific exploration, and develop techniques for operating in the lunar environment. The lunar south polar region is especially important because permanently shadowed areas may contain water ice."
    ],

    facts: [
      ["2022", "Artemis I first flight"],
      ["Orion", "crewed deep-space spacecraft"],
      ["SLS", "heavy-lift launch vehicle"],
      ["South Pole", "major exploration target"]
    ],

    image: "/missions/human-exploration/artemis.jpg",
    imageAlt: "Artemis lunar exploration concept"
  },

  {
    id: "iss",
    index: "03 — A laboratory in orbit",
    title: "International Space Station",
    meta: "1998 – present · five space agencies",

    intro:
      "The International Space Station is a permanently crewed laboratory orbiting Earth, built through one of the largest international engineering partnerships ever attempted in space.",

    paragraphs: [
      "The ISS began taking shape in 1998 when the first major modules were launched and assembled in orbit. Over the following years, laboratories, living quarters, power systems, radiators, robotic equipment, and other modules were added piece by piece.",

      "The station orbits Earth at roughly 400 kilometres above the surface and travels at about 28,000 kilometres per hour, completing an orbit roughly every 90 minutes. Astronauts therefore experience around 16 sunrises and sunsets during a typical 24-hour period.",

      "The first long-duration expedition began in November 2000, and the station has remained continuously inhabited ever since. Crews from NASA, Roscosmos, ESA, JAXA, and the Canadian Space Agency have lived and worked together aboard the station.",

      "The ISS is more than a place to conduct experiments. It is also a testbed for life-support systems, robotics, medicine, human health, materials science, and the operational challenges of keeping people alive in space for long periods."
    ],

    facts: [
      ["~400 km", "average orbital altitude"],
      ["~90 min", "one orbit around Earth"],
      ["2000", "continuous human presence began"],
      ["5 agencies", "major international partners"]
    ],

    image: "/missions/human-exploration/iss.jpg",
    imageAlt: "International Space Station orbiting Earth"
  }
];

/* ---------------------------------------------------------
   Hero
   --------------------------------------------------------- */

function HumanExplorationHero() {
  return (
    <section className="missions-detail-intro" aria-label="Human Exploration">
      <div className="missions-detail-hero">

        <div className="missions-detail-hero-glow" />

        <div className="missions-detail-hero-media">
          <img
            src="/missions/human-exploration/human-exploration-hero.png"
            alt=""
            aria-hidden="true"
          />
        </div>

        <div className="missions-detail-hero-content">
          <p className="missions-detail-eyebrow">
            01 — People in space
          </p>

          <h1>Human Exploration</h1>

          <p className="missions-detail-lead">
            From the first footsteps on the Moon to a permanent laboratory
            orbiting Earth.
          </p>

          <p className="missions-detail-lines">
            We learned to leave the planet.
            <br />
            We learned to live in orbit.
            <br />
            And now, we are learning how to go farther.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Introduction
   --------------------------------------------------------- */

function HumanExplorationIntro() {
  const ref = useReveal();

  return (
    <section ref={ref} className="missions-detail-intro-section">
      <div className="missions-detail-intro-inner">

        <div className="missions-detail-intro-label">
          <span>HUMAN EXPLORATION</span>
        </div>

        <div className="missions-detail-intro-copy">
          <h2>
            Beyond Earth,
            <br />
            by human hands.
          </h2>

          <p>
            Human spaceflight is more than the act of reaching orbit.
            It is the story of learning how to survive, work, explore,
            and return from environments that were never made for us.
          </p>

          <p>
            From Apollo's journeys to the Moon, to the International
            Space Station's continuous presence above Earth, each
            generation has extended the distance humans can safely travel.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Mission Detail
   --------------------------------------------------------- */

function HumanMission({ mission }) {
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
              <p key={index} className="human-mission-text">
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
              <div className="human-fact" key={label}>
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

function HumanExploration() {
  return (
    <main className="missions-detail">

      <HumanExplorationHero />

      <HumanExplorationIntro />

      {HUMAN_MISSIONS.map((mission) => (
        <HumanMission
          key={mission.id}
          mission={mission}
        />
      ))}

      <section className="missions-detail-close">
        <div className="missions-detail-close-inner">
          <p>HUMAN EXPLORATION</p>

          <h2>
            The journey
            <br />
            continues.
          </h2>

          <span>
            Moon. Orbit. Beyond.
          </span>
        </div>
      </section>

    </main>
  );
}

export default HumanExploration;