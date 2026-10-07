import { useEffect, useRef } from "react";
import "./Space.css";
import Card from "../components/Card";
import Button from "../components/Button";

const COVER_VIDEO = "/Hero-Space.mp4";

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
      { threshold: 0.28 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function Mercury() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="planet" aria-label="Mercury">
      <div className="planet-inner">
        <div className="planet-media">
          <div className="planet-frame">
            <img
              className="planet-image"
              src="/mercury.png"
              alt="Mercury, a gray cratered world against black space"
            />
          </div>
        </div>
        <div className="planet-copy">
          <p className="planet-index">01 — Inner planet</p>
          <h2 className="planet-name">Mercury</h2>
          <p className="planet-lead">Closest to the Sun. Smallest of the eight.</p>
          <p className="planet-body">
            Mercury averages 57.9 million km from the Sun, or 0.387 AU.
            Sunlight takes 3.2 minutes to arrive. One orbit lasts 87.97 days,
            at 47.4 km/s — the fastest of the eight planets. A solar day,
            from sunrise to sunrise, lasts 176 Earth days.
          </p>
          <dl className="planet-stats">
            <div>
              <dt>Distance</dt>
              <dd>57.9 million km</dd>
            </div>
            <div>
              <dt>Orbit</dt>
              <dd>87.97 days</dd>
            </div>
            <div>
              <dt>Rotation</dt>
              <dd>58.65 days</dd>
            </div>
            <div>
              <dt>Solar day</dt>
              <dd>176 days</dd>
            </div>
            <div>
              <dt>Diameter</dt>
              <dd>4,879 km</dd>
            </div>
            <div>
              <dt>Gravity</dt>
              <dd>3.70 m/s²</dd>
            </div>
          </dl>
          <div className="planet-block">
            <p className="planet-kicker">Conditions</p>
            <ul className="planet-facts">
              <li>
                <span>Day / night</span>
                <span>430°C / −180°C</span>
              </li>
              <li>
                <span>Sun range</span>
                <span>46.0–69.8 million km</span>
              </li>
              <li>
                <span>Eccentricity</span>
                <span>0.206</span>
              </li>
              <li>
                <span>Axial tilt</span>
                <span>0.034°</span>
              </li>
              <li>
                <span>Density</span>
                <span>5.43 g/cm³</span>
              </li>
              <li>
                <span>Core</span>
                <span>85% of radius</span>
              </li>
              <li>
                <span>Escape speed</span>
                <span>4.3 km/s</span>
              </li>
              <li>
                <span>Moons</span>
                <span>None</span>
              </li>
            </ul>
          </div>
          <p className="planet-note">
            An iron core under a thin rocky shell, and a magnetic field about
            1% of Earth's. Only an exosphere: pressure below 10⁻¹⁴ bar.
            Mapped by Mariner 10 and MESSENGER. BepiColombo enters orbit on
            21 November 2026.
          </p>
        </div>
      </div>
    </section>
  );
}

function Venus() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="planet" aria-label="Venus">
      <div className="planet-inner">
        <div className="planet-media">
          <div className="planet-frame">
            <img
              className="planet-image"
              src="/venus.png"
              alt="Venus, a pale cloud-covered world against black space"
            />
          </div>
        </div>
        <div className="planet-copy">
          <p className="planet-index">02 — Inner planet</p>
          <h2 className="planet-name">Venus</h2>
          <p className="planet-lead">Earth’s size. Not Earth’s climate.</p>
          <p className="planet-body">
            Venus averages 108.2 million km from the Sun, or 0.723 AU.
            Sunlight takes 6.0 minutes to arrive. One orbit lasts 224.70 days,
            at 35.0 km/s. It spins backwards: a sidereal day is 243.02 Earth
            days, and a solar day lasts 116.75.
          </p>
          <dl className="planet-stats">
            <div>
              <dt>Distance</dt>
              <dd>108.2 million km</dd>
            </div>
            <div>
              <dt>Orbit</dt>
              <dd>224.70 days</dd>
            </div>
            <div>
              <dt>Rotation</dt>
              <dd>243.02 days</dd>
            </div>
            <div>
              <dt>Solar day</dt>
              <dd>116.75 days</dd>
            </div>
            <div>
              <dt>Diameter</dt>
              <dd>12,104 km</dd>
            </div>
            <div>
              <dt>Gravity</dt>
              <dd>8.87 m/s²</dd>
            </div>
          </dl>
          <div className="planet-block">
            <p className="planet-kicker">Conditions</p>
            <ul className="planet-facts">
              <li>
                <span>Surface</span>
                <span>464°C</span>
              </li>
              <li>
                <span>Sun range</span>
                <span>107.5–108.9 million km</span>
              </li>
              <li>
                <span>Pressure</span>
                <span>92 bar</span>
              </li>
              <li>
                <span>Air</span>
                <span>96.5% CO₂</span>
              </li>
              <li>
                <span>Axial tilt</span>
                <span>177.4°</span>
              </li>
              <li>
                <span>Density</span>
                <span>5.24 g/cm³</span>
              </li>
              <li>
                <span>Escape speed</span>
                <span>10.4 km/s</span>
              </li>
              <li>
                <span>Moons</span>
                <span>None</span>
              </li>
            </ul>
          </div>
          <p className="planet-note">
            A runaway greenhouse. Clouds of sulfuric acid hide a volcanic
            surface, and the thick air keeps day and night nearly the same
            temperature. No global magnetic field. Mapped by Magellan.
            The Sun rises in the west.
          </p>
        </div>
      </div>
    </section>
  );
}

function Earth() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="planet" aria-label="Earth">
      <div className="planet-inner">
        <div className="planet-media">
          <div className="planet-frame">
            <img
              className="planet-image"
              src="/earth.png"
              alt="Earth, blue oceans and white clouds against black space"
            />
          </div>
        </div>
        <div className="planet-copy">
          <p className="planet-index">03 — Inner planet</p>
          <h2 className="planet-name">Earth</h2>
          <p className="planet-lead">The only known world with life.</p>
          <p className="planet-body">
            Earth averages 149.6 million km from the Sun, or 1.000 AU.
            Sunlight takes 8.3 minutes to arrive. One orbit lasts 365.26 days,
            at 29.8 km/s. A sidereal day is 23.93 hours. The solar day,
            noon to noon, is 24 hours.
          </p>
          <dl className="planet-stats">
            <div>
              <dt>Distance</dt>
              <dd>149.6 million km</dd>
            </div>
            <div>
              <dt>Orbit</dt>
              <dd>365.26 days</dd>
            </div>
            <div>
              <dt>Rotation</dt>
              <dd>23.93 hours</dd>
            </div>
            <div>
              <dt>Solar day</dt>
              <dd>24.00 hours</dd>
            </div>
            <div>
              <dt>Diameter</dt>
              <dd>12,756 km</dd>
            </div>
            <div>
              <dt>Gravity</dt>
              <dd>9.80 m/s²</dd>
            </div>
          </dl>
          <div className="planet-block">
            <p className="planet-kicker">Conditions</p>
            <ul className="planet-facts">
              <li>
                <span>Mean surface</span>
                <span>15°C</span>
              </li>
              <li>
                <span>Sun range</span>
                <span>147.1–152.1 million km</span>
              </li>
              <li>
                <span>Pressure</span>
                <span>1.01 bar</span>
              </li>
              <li>
                <span>Air</span>
                <span>78% N₂, 21% O₂</span>
              </li>
              <li>
                <span>Axial tilt</span>
                <span>23.4°</span>
              </li>
              <li>
                <span>Density</span>
                <span>5.51 g/cm³</span>
              </li>
              <li>
                <span>Escape speed</span>
                <span>11.2 km/s</span>
              </li>
              <li>
                <span>Moons</span>
                <span>1</span>
              </li>
            </ul>
          </div>
          <p className="planet-note">
            Liquid water, a protective magnetic field, and an oxygen-rich
            atmosphere. The Moon is 3,475 km across and keeps the tilt
            comparatively steady. Seasons come from the 23.4° lean, not
            from distance to the Sun.
          </p>
        </div>
      </div>
    </section>
  );
}

function Mars() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="planet" aria-label="Mars">
      <div className="planet-inner">
        <div className="planet-media">
          <div className="planet-frame">
            <img
              className="planet-image"
              src="/mars.png"
              alt="Mars, a rust-red world against black space"
            />
          </div>
        </div>
        <div className="planet-copy">
          <p className="planet-index">04 — Inner planet</p>
          <h2 className="planet-name">Mars</h2>
          <p className="planet-lead">A cold desert with a thin sky.</p>
          <p className="planet-body">
            Mars averages 228.0 million km from the Sun, or 1.524 AU.
            Sunlight takes 12.7 minutes to arrive. One orbit lasts 687.0 days,
            at 24.1 km/s. A sidereal day is 24.6 hours. A solar day, one sol,
            lasts 24.7 hours.
          </p>
          <dl className="planet-stats">
            <div>
              <dt>Distance</dt>
              <dd>228.0 million km</dd>
            </div>
            <div>
              <dt>Orbit</dt>
              <dd>687.0 days</dd>
            </div>
            <div>
              <dt>Rotation</dt>
              <dd>24.6 hours</dd>
            </div>
            <div>
              <dt>Solar day</dt>
              <dd>24.7 hours</dd>
            </div>
            <div>
              <dt>Diameter</dt>
              <dd>6,792 km</dd>
            </div>
            <div>
              <dt>Gravity</dt>
              <dd>3.71 m/s²</dd>
            </div>
          </dl>
          <div className="planet-block">
            <p className="planet-kicker">Conditions</p>
            <ul className="planet-facts">
              <li>
                <span>Mean surface</span>
                <span>−63°C</span>
              </li>
              <li>
                <span>Sun range</span>
                <span>206.7–249.3 million km</span>
              </li>
              <li>
                <span>Pressure</span>
                <span>0.006 bar</span>
              </li>
              <li>
                <span>Air</span>
                <span>95% CO₂</span>
              </li>
              <li>
                <span>Axial tilt</span>
                <span>25.2°</span>
              </li>
              <li>
                <span>Density</span>
                <span>3.93 g/cm³</span>
              </li>
              <li>
                <span>Escape speed</span>
                <span>5.0 km/s</span>
              </li>
              <li>
                <span>Moons</span>
                <span>2</span>
              </li>
            </ul>
          </div>
          <p className="planet-note">
            Iron oxide gives the surface its rust color. Olympus Mons is the
            tallest volcano in the Solar System, and Valles Marineris is a
            canyon system about 4,000 km long. Phobos and Deimos are both
            small. No global magnetic field.
          </p>
        </div>
      </div>
    </section>
  );
}

function Jupiter() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="planet" aria-label="Jupiter">
      <div className="planet-inner">
        <div className="planet-media">
          <div className="planet-frame">
            <img
              className="planet-image"
              src="/jupiter.png"
              alt="Jupiter, a banded gas giant against black space"
            />
          </div>
        </div>
        <div className="planet-copy">
          <p className="planet-index">05 — Gas giant</p>
          <h2 className="planet-name">Jupiter</h2>
          <p className="planet-lead">Largest world. Mostly hydrogen.</p>
          <p className="planet-body">
            Jupiter averages 778.5 million km from the Sun, or 5.20 AU.
            Sunlight takes 43 minutes to arrive. One orbit lasts 4,333 days,
            11.86 years, at 13.1 km/s. It spins once every 9.9 hours — the
            shortest day of the eight planets.
          </p>
          <dl className="planet-stats">
            <div>
              <dt>Distance</dt>
              <dd>778.5 million km</dd>
            </div>
            <div>
              <dt>Orbit</dt>
              <dd>11.86 years</dd>
            </div>
            <div>
              <dt>Rotation</dt>
              <dd>9.9 hours</dd>
            </div>
            <div>
              <dt>Diameter</dt>
              <dd>142,984 km</dd>
            </div>
            <div>
              <dt>Gravity</dt>
              <dd>24.79 m/s²</dd>
            </div>
            <div>
              <dt>Moons</dt>
              <dd>95</dd>
            </div>
          </dl>
          <div className="planet-block">
            <p className="planet-kicker">Conditions</p>
            <ul className="planet-facts">
              <li>
                <span>Cloud tops</span>
                <span>−110°C</span>
              </li>
              <li>
                <span>Sun range</span>
                <span>740.6–816.4 million km</span>
              </li>
              <li>
                <span>Air</span>
                <span>Hydrogen, helium</span>
              </li>
              <li>
                <span>Axial tilt</span>
                <span>3.1°</span>
              </li>
              <li>
                <span>Density</span>
                <span>1.33 g/cm³</span>
              </li>
              <li>
                <span>Escape speed</span>
                <span>59.5 km/s</span>
              </li>
              <li>
                <span>Rings</span>
                <span>Faint</span>
              </li>
              <li>
                <span>Great Red Spot</span>
                <span>Centuries old</span>
              </li>
            </ul>
          </div>
          <p className="planet-note">
            More mass than the other planets combined. A faint ring system,
            a strong magnetic field, and four large moons: Io, Europa,
            Ganymede, and Callisto. Ganymede is bigger than Mercury.
          </p>
        </div>
      </div>
    </section>
  );
}

function Saturn() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="planet" aria-label="Saturn">
      <div className="planet-inner">
        <div className="planet-media">
          <div className="planet-frame">
            <img
              className="planet-image rings"
              src="/saturn.png"
              alt="Saturn and its rings against black space"
            />
          </div>
        </div>
        <div className="planet-copy">
          <p className="planet-index">06 — Gas giant</p>
          <h2 className="planet-name">Saturn</h2>
          <p className="planet-lead">The ringed world. Less dense than water.</p>
          <p className="planet-body">
            Saturn averages 1,432 million km from the Sun, or 9.58 AU.
            Sunlight takes 80 minutes to arrive. One orbit lasts 10,747 days,
            29.45 years, at 9.7 km/s. A day is 10.7 hours. The rings span
            about 280,000 km, but are only tens of meters thick.
          </p>
          <dl className="planet-stats">
            <div>
              <dt>Distance</dt>
              <dd>1,432 million km</dd>
            </div>
            <div>
              <dt>Orbit</dt>
              <dd>29.45 years</dd>
            </div>
            <div>
              <dt>Rotation</dt>
              <dd>10.7 hours</dd>
            </div>
            <div>
              <dt>Diameter</dt>
              <dd>120,536 km</dd>
            </div>
            <div>
              <dt>Gravity</dt>
              <dd>10.44 m/s²</dd>
            </div>
            <div>
              <dt>Moons</dt>
              <dd>274</dd>
            </div>
          </dl>
          <div className="planet-block">
            <p className="planet-kicker">Conditions</p>
            <ul className="planet-facts">
              <li>
                <span>Cloud tops</span>
                <span>−140°C</span>
              </li>
              <li>
                <span>Sun range</span>
                <span>1,358–1,507 million km</span>
              </li>
              <li>
                <span>Air</span>
                <span>Hydrogen, helium</span>
              </li>
              <li>
                <span>Axial tilt</span>
                <span>26.7°</span>
              </li>
              <li>
                <span>Density</span>
                <span>0.69 g/cm³</span>
              </li>
              <li>
                <span>Escape speed</span>
                <span>35.5 km/s</span>
              </li>
              <li>
                <span>Rings</span>
                <span>Ice and rock</span>
              </li>
              <li>
                <span>Largest moon</span>
                <span>Titan</span>
              </li>
            </ul>
          </div>
          <p className="planet-note">
            Mean density is below water. Titan is larger than Mercury and
            has a thick nitrogen atmosphere. Enceladus vents ice into space.
            Cassini mapped the system from 2004 to 2017.
          </p>
        </div>
      </div>
    </section>
  );
}

function Uranus() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="planet" aria-label="Uranus">
      <div className="planet-inner">
        <div className="planet-media">
          <div className="planet-frame">
            <img
              className="planet-image"
              src="/uranus.png"
              alt="Uranus, a pale cyan ice giant against black space"
            />
          </div>
        </div>
        <div className="planet-copy">
          <p className="planet-index">07 — Ice giant</p>
          <h2 className="planet-name">Uranus</h2>
          <p className="planet-lead">Tipped on its side.</p>
          <p className="planet-body">
            Uranus averages 2,867 million km from the Sun, or 19.17 AU.
            Sunlight takes 2.7 hours to arrive. One orbit lasts 30,589 days,
            84.0 years, at 6.8 km/s. It spins backwards in 17.2 hours.
            The axis leans 97.8°, so each pole spends decades in daylight.
          </p>
          <dl className="planet-stats">
            <div>
              <dt>Distance</dt>
              <dd>2,867 million km</dd>
            </div>
            <div>
              <dt>Orbit</dt>
              <dd>84.0 years</dd>
            </div>
            <div>
              <dt>Rotation</dt>
              <dd>17.2 hours</dd>
            </div>
            <div>
              <dt>Diameter</dt>
              <dd>51,118 km</dd>
            </div>
            <div>
              <dt>Gravity</dt>
              <dd>8.87 m/s²</dd>
            </div>
            <div>
              <dt>Moons</dt>
              <dd>28</dd>
            </div>
          </dl>
          <div className="planet-block">
            <p className="planet-kicker">Conditions</p>
            <ul className="planet-facts">
              <li>
                <span>Cloud tops</span>
                <span>−195°C</span>
              </li>
              <li>
                <span>Sun range</span>
                <span>2,733–3,001 million km</span>
              </li>
              <li>
                <span>Air</span>
                <span>H₂, He, methane</span>
              </li>
              <li>
                <span>Axial tilt</span>
                <span>97.8°</span>
              </li>
              <li>
                <span>Density</span>
                <span>1.27 g/cm³</span>
              </li>
              <li>
                <span>Escape speed</span>
                <span>21.3 km/s</span>
              </li>
              <li>
                <span>Rings</span>
                <span>13, faint</span>
              </li>
              <li>
                <span>Visited</span>
                <span>Voyager 2</span>
              </li>
            </ul>
          </div>
          <p className="planet-note">
            Methane gives the pale blue-green color. Under the gas is a
            mantle of water, ammonia, and methane ices. Voyager 2 is the
            only spacecraft to have flown past, in 1986.
          </p>
        </div>
      </div>
    </section>
  );
}

function Neptune() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="planet" aria-label="Neptune">
      <div className="planet-inner">
        <div className="planet-media">
          <div className="planet-frame">
            <img
              className="planet-image"
              src="/neptune.png"
              alt="Neptune, a deep blue ice giant against black space"
            />
          </div>
        </div>
        <div className="planet-copy">
          <p className="planet-index">08 — Ice giant</p>
          <h2 className="planet-name">Neptune</h2>
          <p className="planet-lead">The last of the eight. The windiest.</p>
          <p className="planet-body">
            Neptune averages 4,515 million km from the Sun, or 30.18 AU.
            Sunlight takes 4.2 hours to arrive. One orbit lasts 59,800 days,
            164.8 years, at 5.4 km/s. A day is 16.1 hours. Winds reach about
            2,000 km/h, the fastest measured on any planet.
          </p>
          <dl className="planet-stats">
            <div>
              <dt>Distance</dt>
              <dd>4,515 million km</dd>
            </div>
            <div>
              <dt>Orbit</dt>
              <dd>164.8 years</dd>
            </div>
            <div>
              <dt>Rotation</dt>
              <dd>16.1 hours</dd>
            </div>
            <div>
              <dt>Diameter</dt>
              <dd>49,528 km</dd>
            </div>
            <div>
              <dt>Gravity</dt>
              <dd>11.15 m/s²</dd>
            </div>
            <div>
              <dt>Moons</dt>
              <dd>16</dd>
            </div>
          </dl>
          <div className="planet-block">
            <p className="planet-kicker">Conditions</p>
            <ul className="planet-facts">
              <li>
                <span>Cloud tops</span>
                <span>−200°C</span>
              </li>
              <li>
                <span>Sun range</span>
                <span>4,471–4,559 million km</span>
              </li>
              <li>
                <span>Air</span>
                <span>H₂, He, methane</span>
              </li>
              <li>
                <span>Axial tilt</span>
                <span>28.3°</span>
              </li>
              <li>
                <span>Density</span>
                <span>1.64 g/cm³</span>
              </li>
              <li>
                <span>Escape speed</span>
                <span>23.5 km/s</span>
              </li>
              <li>
                <span>Rings</span>
                <span>Faint</span>
              </li>
              <li>
                <span>Largest moon</span>
                <span>Triton</span>
              </li>
            </ul>
          </div>
          <p className="planet-note">
            Found by calculation in 1846, before it was seen. Triton orbits
            backwards and is likely a captured world. Voyager 2 flew past in
            1989 and is still the only visitor.
          </p>
        </div>
      </div>
    </section>
  );
}

function SpaceNext() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="space-next" aria-label="Continue">
      <p className="space-next-text">
        <span className="space-next-lead">
          Eight planets, one Sun, and infinite questions.
        </span>
        From scorching Mercury to frozen Neptune, every world is a chapter in
        the story of our home, and this is only the beginning of the journey.
      </p>

      <div className="space-next-action">
        <Card title="this is only the beginning" />
        <Button to="/rockets">Rockets</Button>
      </div>
    </section>
  );
}

function Space() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const forcePlay = () => {
      video.muted = true;
      video.play().catch(() => {});
    };

    forcePlay();
    video.addEventListener("loadeddata", forcePlay);
    video.addEventListener("canplay", forcePlay);
    video.addEventListener("pause", forcePlay);
    document.addEventListener("visibilitychange", forcePlay);
    window.addEventListener("focus", forcePlay);

    return () => {
      video.removeEventListener("loadeddata", forcePlay);
      video.removeEventListener("canplay", forcePlay);
      video.removeEventListener("pause", forcePlay);
      document.removeEventListener("visibilitychange", forcePlay);
      window.removeEventListener("focus", forcePlay);
    };
  }, []);

  return (
    <main className="space-page">
      <section className="space-hero" aria-label="Our Solar System">
        <div className="space-hero-inner">
          <div className="space-media">
            <div className="space-video-frame">
              <video
                ref={videoRef}
                className="space-video"
                src={COVER_VIDEO}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            </div>
          </div>
          <div className="space-copy">
            <h1 className="space-title">OUR SOLAR SYSTEM</h1>
            <p className="space-subtitle">ONE STAR. EIGHT WORLDS.</p>
            <p className="space-body">
              The Solar System is a vast collection of worlds
              held together by the gravity of the Sun.
              From rocky planets close to the Sun to the
              distant giants of the outer system, each world
              follows its own path through space.
            </p>
          </div>
        </div>
      </section>
      <Mercury />
      <Venus />
      <Earth />
      <Mars />
      <Jupiter />
      <Saturn />
      <Uranus />
      <Neptune />
      <SpaceNext />
    </main>
  );
}

export default Space;