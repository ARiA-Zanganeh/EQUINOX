import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

import homeImg from "../assets/images/Homeimg.jpg";
import exploreImg from "../assets/images/explore-earth.jpg";
import starlinkImg from "../assets/images/Starlink.jpg";
import section2Vid from "../assets/videos/Section2-vid.mp4";

import SpaceButton from "../components/SpaceButton";
import Button from "../components/Button";

import spaceIcon from "../assets/images/space.png";
import rocketIcon from "../assets/images/Rocket.png";

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
      content.style.transform = `translate3d(0, ${(1 - contentOp) * -32}px, 0)`;
      content.style.pointerEvents = contentOp < 0.2 ? "none" : "auto";

      aboutInner.style.opacity = String(aboutOp);
      aboutInner.style.transform = `translate3d(0, ${(1 - aboutOp) * 36}px, 0)`;

      if (exploreContent) {
        exploreContent.style.opacity = String(exploreOp);
        exploreContent.style.transform = `translate3d(-50%, ${(1 - exploreOp) * 42}px, 0)`;
      }

      if (starlinkContent) {
        starlinkContent.style.opacity = String(starlinkOp);
        starlinkContent.style.transform = `translate3d(0, ${(1 - starlinkOp) * 28}px, 0)`;
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

  return (
    <main className="home">
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
          <div className="home-hero-black" ref={blackRef}></div>

          <div className="home-hero-content" ref={contentRef}>
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
                <SpaceButton icon={spaceIcon}>Space</SpaceButton>
              </NavLink>

              <NavLink to="/Rockets">
                <SpaceButton icon={rocketIcon}>Rockets</SpaceButton>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className="home-about" ref={aboutRef}>
        <video
          className="home-about-video"
          src={section2Vid}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        <div className="home-about-dim"></div>

        <div className="home-about-inner" ref={aboutInnerRef}>
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
        </div>
      </section>

      <section className="home-explore" ref={exploreRef}>
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

          <div className="home-explore-content" ref={exploreContentRef}>
            <h1>BUILT TO EXPLORE.</h1>

            <p>
              Every mission begins with a question — and every
              breakthrough brings us closer to an answer.
            </p>

            <div className="home-explore-actions">
              <Button to="/Missions">Missions</Button>
              <Button to="/Technology">Technology</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="home-starlink" ref={starlinkRef}>
        <div className="home-starlink-inner" ref={starlinkContentRef}>
          <div className="home-starlink-copy">
            <h1>FREEDOM, WITHOUT BORDERS.</h1>

            <p>
              Starlink is changing the way we connect with the
              world, bringing high-speed connectivity beyond
              cities and traditional networks. From remote
              landscapes to places far from the ground, distance
              no longer has to define how connected we can be.
            </p>

            <div className="home-starlink-actions">
              <Button to="/Starlink">Starlink</Button>
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