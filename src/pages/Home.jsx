import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

import homeImg from "../assets/images/Homeimg.jpg";
import exploreImg from "../assets/images/explore-earth.jpg";
import starlinkImg from "../assets/images/Starlink.jpg";

import SpaceButton from "../components/SpaceButton";
import Button from "../components/Button";

import spaceIcon from "../assets/images/Space.png";
import rocketIcon from "../assets/images/Rocket.png";

const BRIEFINGS = [
  {
    label: "ORBIT BRIEF",
    text: "Space is no longer a distant backdrop. It is a system we are learning to reach, read, and inhabit.",
  },
  {
    label: "NEXT WINDOW",
    text: "Rockets rise. Satellites listen. Every launch is a sentence in a story still being written above Earth.",
  },
  {
    label: "SIGNAL LOCK",
    text: "From the pad to deep space, the machines we send outward are how humanity stays connected beyond the sky.",
  },
  {
    label: "LOOK UP",
    text: "EQUINOX is a map of what comes next — the vehicles, the missions, and the worlds just past familiar orbit.",
  },
];

function Home() {
  const introRef = useRef(null);
  const heroImageRef = useRef(null);
  const blackRef = useRef(null);
  const contentRef = useRef(null);
  const aboutRef = useRef(null);
  const aboutInnerRef = useRef(null);
  const exploreRef = useRef(null);
  const exploreContentRef = useRef(null);
  const starlinkRef = useRef(null);
  const starlinkContentRef = useRef(null);

  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const intro = introRef.current;
    const heroImage = heroImageRef.current;
    const black = blackRef.current;
    const content = contentRef.current;
    const about = aboutRef.current;
    const aboutInner = aboutInnerRef.current;
    const explore = exploreRef.current;
    const exploreContent = exploreContentRef.current;
    const starlink = starlinkRef.current;
    const starlinkContent = starlinkContentRef.current;

    if (!intro || !heroImage || !black || !content || !about || !aboutInner) {
      return;
    }

    let overlay = 0;
    let contentOp = 1;
    let aboutOp = 0;
    let exploreOp = 0;
    let starlinkOp = 0;
    let scale = 1;
    let frame = 0;
    let running = true;

    const lerp = (start, end, factor) =>
      start + (end - start) * factor;

    const clamp = (value, min = 0, max = 1) =>
      Math.min(max, Math.max(min, value));

    const getHeroProgress = () => {
      const maxScroll = intro.offsetHeight - window.innerHeight;

      const scrolled = Math.min(
        Math.max(-intro.getBoundingClientRect().top, 0),
        maxScroll
      );

      return maxScroll > 0 ? scrolled / maxScroll : 0;
    };

    const getAboutProgress = (heroProgress) => {
      const rect = about.getBoundingClientRect();

      const fromHero = clamp((heroProgress - 0.58) / 0.28);

      const fromSection = clamp(
        (window.innerHeight * 0.96 - rect.top) /
          (window.innerHeight * 0.28)
      );

      return Math.max(fromHero, fromSection);
    };

    const getSectionProgress = (el) => {
      if (!el) return 0;

      const rect = el.getBoundingClientRect();

      const start = window.innerHeight * 0.9;
      const end = window.innerHeight * 0.4;

      return clamp((start - rect.top) / (start - end));
    };

    const tick = () => {
      if (!running) return;

      const progress = getHeroProgress();

      const overlayTarget = clamp(progress / 0.55);
      const contentTarget = clamp(1 - progress / 0.26);
      const aboutTarget = getAboutProgress(progress);
      const exploreTarget = getSectionProgress(explore);
      const starlinkTarget = getSectionProgress(starlink);

      const scaleTarget = 1 + progress * 0.08;

      overlay = lerp(overlay, overlayTarget, 0.1);
      contentOp = lerp(contentOp, contentTarget, 0.1);
      aboutOp = lerp(aboutOp, aboutTarget, 0.1);
      exploreOp = lerp(exploreOp, exploreTarget, 0.09);
      starlinkOp = lerp(starlinkOp, starlinkTarget, 0.09);
      scale = lerp(scale, scaleTarget, 0.07);

      black.style.opacity = String(overlay);

      content.style.opacity = String(contentOp);

      content.style.transform = `translate3d(
        0,
        ${(1 - contentOp) * -32}px,
        0
      )`;

      content.style.pointerEvents =
        contentOp < 0.2 ? "none" : "auto";

      aboutInner.style.opacity = String(aboutOp);

      aboutInner.style.transform = `translate3d(
        0,
        ${(1 - aboutOp) * 36}px,
        0
      )`;

      if (exploreContent) {
        exploreContent.style.opacity = String(exploreOp);

        exploreContent.style.transform = `translate3d(
          -50%,
          ${(1 - exploreOp) * 42}px,
          0
        )`;
      }

      if (starlinkContent) {
        starlinkContent.style.opacity = String(starlinkOp);

        starlinkContent.style.transform = `translate3d(
          0,
          ${(1 - starlinkOp) * 28}px,
          0
        )`;
      }

      heroImage.style.transform = `scale(${scale})`;

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
    };
  }, []);

  const advanceBriefing = () => {
    if (leaving) return;

    setLeaving(true);

    window.setTimeout(() => {
      setActive((current) => (current + 1) % BRIEFINGS.length);
      setLeaving(false);
    }, 320);
  };

  const slide = BRIEFINGS[active];

  return (
    <main className="home">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="home-intro" ref={introRef}>
        <div className="home-hero">

          <img
            ref={heroImageRef}
            className="home-hero-img"
            src={homeImg}
            alt=""
            aria-hidden="true"
          />

          <div className="home-hero-dim"></div>

          <div
            className="home-hero-black"
            ref={blackRef}
          ></div>

          <div
            className="home-hero-content"
            ref={contentRef}
          >
            <h1>WHAT'S NEXT.</h1>

            <p className="home-lead">
              EQUINOX is an exploration of space and the technology
              taking humanity beyond Earth.
            </p>

            <p className="home-lines">
              Discover rockets.
              <br />
              Explore satellites.
              <br />
              Understand the technology.
              <br />
              Look toward the worlds beyond our own.
            </p>

            <p className="home-close">
              Explore what comes next.
            </p>

            <div className="home-actions">
              <NavLink to="/Space">
                <SpaceButton icon={spaceIcon}>
                  Space
                </SpaceButton>
              </NavLink>

              <NavLink to="/Rockets">
                <SpaceButton icon={rocketIcon}>
                  Rockets
                </SpaceButton>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT / MANIFESTO
      ====================================================== */}

      <section
        className="home-about"
        ref={aboutRef}
      >
        <div
          className="home-about-inner"
          ref={aboutInnerRef}
        >
          <h1>
            SPACE IS MORE THAN A DISTANT WORLD — IT IS A PLACE
            WE SEEK TO UNDERSTAND.
          </h1>

          <p>
            EQUINOX explores the technology and achievements
            behind modern space exploration, from SpaceX missions
            and spacecraft to the systems connecting humanity
            beyond Earth.
          </p>

          <div className="eq-deck-wrap">
            <button
              type="button"
              className="eq-widget"
              onClick={advanceBriefing}
              aria-label={`${slide.label}. ${slide.text} Click to see the next briefing.`}
            >
              <div className="eq-widget-glow"></div>

              <div className="eq-time">
                EQUINOX
              </div>

              <div className="eq-note-stage">
                <div
                  key={`${active}-${leaving ? "out" : "in"}`}
                  className={`eq-note ${
                    leaving ? "is-out" : "is-in"
                  }`}
                >
                  <span className="eq-note-label">
                    <span
                      className="eq-note-sun"
                      aria-hidden="true"
                    >
                      ✦
                    </span>

                    {slide.label}
                  </span>

                  <p>{slide.text}</p>
                </div>
              </div>
            </button>

            <div
              className="eq-dots"
              aria-hidden="true"
            >
              {BRIEFINGS.map((item, index) => (
                <span
                  key={item.label}
                  className={
                    index === active ? "is-on" : ""
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BUILT TO EXPLORE
      ====================================================== */}

      <section
        className="home-explore"
        ref={exploreRef}
      >
        <div className="home-explore-sticky">
          <div className="home-explore-image-wrap">
            <img
              src={exploreImg}
              className="home-explore-img"
              alt=""
              aria-hidden="true"
            />

            <div className="home-explore-fade"></div>
          </div>

          <div
            className="home-explore-content"
            ref={exploreContentRef}
          >
            <h1>BUILT TO EXPLORE.</h1>

            <p>
              Every mission begins with a question — and every
              breakthrough brings us closer to an answer.
            </p>

            <div className="home-explore-actions">
              <Button to="/Missions">
                Missions
              </Button>

              <Button to="/Technology">
                Technology
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STARLINK
      ====================================================== */}

      <section
        className="home-starlink"
        ref={starlinkRef}
      >
        <div
          className="home-starlink-inner"
          ref={starlinkContentRef}
        >
          <div className="home-starlink-copy">
            <h1>
              FREEDOM, WITHOUT BORDERS.
            </h1>

            <p>
              Starlink is changing the way we connect with the
              world, bringing high-speed connectivity beyond
              cities and traditional networks. From remote
              landscapes to places far from the ground, distance
              no longer has to define how connected we can be.
            </p>

            <div className="home-starlink-actions">
              <Button to="/Starlink">
                Starlink
              </Button>
            </div>
          </div>

          <div className="home-starlink-image-wrap">
            <img
              src={starlinkImg}
              className="home-starlink-img"
              alt=""
              aria-hidden="true"
            />

            <div className="home-starlink-fade"></div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;