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
   Space Science data
   --------------------------------------------------------- */

const SPACE_SCIENCE_MISSIONS = [
  {
    id: "webb",
    index: "01 — Infrared",
    title: "James Webb Space Telescope",
    meta: "2021 – present · NASA, ESA, CSA",

    intro:
      "Webb watches the universe in infrared from about 1.5 million kilometers away. Its 6.5 m gold-coated mirror studies the first galaxies and the atmospheres of distant planets.",

    paragraphs: [
      "The James Webb Space Telescope launched on 25 December 2021 on an Ariane 5 rocket from Europe's Spaceport in French Guiana. It is a partnership between NASA, the European Space Agency, and the Canadian Space Agency, named for James E. Webb, who led NASA from 1961 to 1968.",

      "Webb does not orbit Earth. After a month-long journey it settled into an orbit around the Sun–Earth L2 point, about 1.5 million kilometers from Earth, where a sunshield can keep the telescope cold enough for infrared work. A five-layer sunshield blocks heat from the Sun, Earth, and Moon.",

      "The primary mirror is 6.5 meters across, made of 18 hexagonal segments of gold-coated beryllium. It had to fold to fit inside the rocket, then unfold and align in space. Gold reflects infrared light well, and the mirror collects nearly six times more light than Hubble's.",

      "Because it sees infrared, Webb can look through dust and back toward the early universe, when the first galaxies were forming. It also measures starlight passing through the atmospheres of planets around other stars, searching for the gases those worlds hold. Its first full-color images were released on 12 July 2022."
    ],

    facts: [
      ["25 Dec 2021", "launched on Ariane 5"],
      ["6.5 m", "gold-coated primary mirror"],
      ["1.5 million km", "orbit around Sun–Earth L2"],
      ["Infrared", "first galaxies and exoplanet air"]
    ],

    image: "/missions/space-science/webb.jpg",
    imageAlt: "James Webb Space Telescope with its gold mirror and sunshield"
  },

  {
    id: "hubble",
    index: "02 — Visible light",
    title: "Hubble Space Telescope",
    meta: "1990 – present · NASA and ESA",

    intro:
      "Hubble orbits about 540 kilometers above Earth with a 2.4 m mirror. Five astronaut servicing missions kept it sharp, and its images changed how we measure the age and growth of the universe.",

    paragraphs: [
      "Hubble launched on 24 April 1990 aboard Space Shuttle Discovery, on mission STS-31, and was released into low Earth orbit the next day. NASA and ESA built it to look above the blur of Earth's atmosphere, across ultraviolet, visible, and near-infrared light.",

      "The first images were soft. The 2.4 m primary mirror had been polished to the wrong curve, a flaw called spherical aberration. Because Hubble was designed to be serviced, astronauts could fix it. In December 1993, the STS-61 crew installed corrective optics, and the telescope finally reached the sharpness it had been built for.",

      "Four more servicing missions followed: 1997, 1999, 2002, and the last in May 2009, when Space Shuttle Atlantis visited on STS-125. Astronauts replaced cameras, spectrographs, gyroscopes, and batteries. No other space observatory has been repaired and upgraded in orbit this way.",

      "From that orbit, Hubble photographed the Pillars of Creation, the Hubble Deep Field, and galaxies from when the universe was young. Its measurements of how fast the universe is expanding helped set the scale of cosmic time, and later observations became part of the evidence that the expansion is speeding up."
    ],

    facts: [
      ["24 Apr 1990", "deployed from Discovery"],
      ["2.4 m", "primary mirror"],
      ["~540 km", "low Earth orbit"],
      ["5", "astronaut servicing missions"]
    ],

    image: "/missions/space-science/hubble.jpg",
    imageAlt: "Hubble Space Telescope in orbit above Earth"
  },

  {
    id: "chandra",
    index: "03 — X-rays",
    title: "Chandra X-ray Observatory",
    meta: "1999 – present · NASA",

    intro:
      "X-rays do not pass through our atmosphere, so Chandra watches from a high elliptical orbit. It looks at black holes, exploded stars, and the hot gas between galaxies.",

    paragraphs: [
      "Chandra launched on 23 July 1999 aboard Space Shuttle Columbia, on STS-93, the first shuttle mission commanded by a woman, Eileen Collins. It is NASA's flagship X-ray observatory, named for the astrophysicist Subrahmanyan Chandrasekhar, and one of NASA's Great Observatories alongside Hubble.",

      "Earth's atmosphere absorbs X-rays, so this kind of astronomy has to be done from space. Chandra was released into a highly elliptical orbit that swings out to about 139,000 kilometers, far above the belts of trapped radiation that would swamp its detectors. One loop around Earth takes about 64 hours, and most of that time is spent in clean observing conditions.",

      "Its mirrors do not look like a familiar telescope. X-rays would pass through an ordinary mirror, so Chandra uses nested cylindrical mirrors that catch the rays at a very shallow angle and focus them. That design gives it images sharp enough to separate detail in supernova remnants and in the gas around black holes.",

      "With those images, astronomers have traced matter falling toward black holes, mapped the debris of exploded stars, and measured the very hot gas that fills clusters of galaxies. That gas is most of the ordinary matter in those clusters, and it is invisible to a telescope that only sees visible light."
    ],

    facts: [
      ["23 July 1999", "launched on Columbia"],
      ["~139,000 km", "highest point of its orbit"],
      ["64 hours", "time for one orbit"],
      ["X-ray", "black holes and hot gas"]
    ],

    image: "/missions/space-science/chandra.jpg",
    imageAlt: "Chandra X-ray Observatory in high Earth orbit"
  }
];

/* ---------------------------------------------------------
   Hero
   --------------------------------------------------------- */

function SpaceScienceHero() {
  return (
    <section
      className="missions-detail-intro"
      aria-label="Space Science"
    >
      <div className="missions-detail-hero">

        <div className="missions-detail-hero-glow" />

        <div className="missions-detail-hero-media">
          <img
            src="/missions/space-science/space-science-hero.png"
            alt=""
            aria-hidden="true"
          />
        </div>

        <div className="missions-detail-hero-content">
          <p className="missions-detail-eyebrow">
            04 — Looking farther
          </p>

          <h1>Space Science</h1>

          <p className="missions-detail-lead">
            Telescopes above the air, each built for a different kind of light.
          </p>

          <p className="missions-detail-lines">
            We lifted the mirrors.
            <br />
            We got above the atmosphere.
            <br />
            And the universe came into focus.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Introduction
   --------------------------------------------------------- */

function SpaceScienceIntro() {
  const ref = useReveal();

  return (
    <section
      ref={ref}
      className="missions-detail-intro-section"
    >
      <div className="missions-detail-intro-inner">

        <div className="missions-detail-intro-label">
          <span>SPACE SCIENCE</span>
        </div>

        <div className="missions-detail-intro-copy">
          <h2>
            Light we cannot
            <br />
            catch from the ground.
          </h2>

          <p>
            Air blurs visible light, and it blocks most infrared and
            almost every X-ray. To see clearly, the telescope has to
            leave the ground.
          </p>

          <p>
            Hubble, Chandra, and Webb do that work in three different
            kinds of light. Together they turn distant galaxies, exploded
            stars, and planets around other suns into things we can measure.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Mission Detail
   --------------------------------------------------------- */

function SpaceScienceMission({ mission }) {
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

function SpaceScience() {
  return (
    <main className="missions-detail">

      <SpaceScienceHero />

      <SpaceScienceIntro />

      {SPACE_SCIENCE_MISSIONS.map((mission) => (
        <SpaceScienceMission
          key={mission.id}
          mission={mission}
        />
      ))}

      <section className="missions-detail-close">
        <div className="missions-detail-close-inner">

          <p>SPACE SCIENCE</p>

          <h2>
            Three kinds of light.
            <br />
            One sky.
          </h2>

          <span>
            Webb. Hubble. Chandra.
          </span>

        </div>
      </section>

    </main>
  );
}

export default SpaceScience;
