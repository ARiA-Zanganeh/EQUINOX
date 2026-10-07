import { useEffect, useRef } from "react";
import "./Rockets.css";
import Button from "../components/Button";

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

function Falcon1() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="rocket" aria-label="Falcon 1">
      <div className="rocket-inner">
        <div className="rocket-media">
          <div className="rocket-frame">
            <img
              className="rocket-image"
              src="/falcon-1.jpg"
              alt="Falcon 1, a small two-stage rocket against black space"
            />
          </div>
        </div>
        <div className="rocket-copy">
          <p className="rocket-index">01 — Small lift</p>
          <h2 className="rocket-name">Falcon 1</h2>
          <p className="rocket-lead">The first privately built liquid rocket to reach orbit.</p>
          <p className="rocket-body">
            Falcon 1 was a two-stage vehicle, 21.3 m tall and 1.7 m across,
            with a liftoff mass of about 28 tonnes. Both stages burned rocket-grade
            kerosene and liquid oxygen. A single Merlin engine lifted the first
            stage. A pressure-fed Kestrel engine, built for vacuum, flew the second.
            Designed payload to low Earth orbit was about 670 kg.
          </p>
          <dl className="rocket-stats">
            <div>
              <dt>Height</dt>
              <dd>21.3 m</dd>
            </div>
            <div>
              <dt>Diameter</dt>
              <dd>1.7 m</dd>
            </div>
            <div>
              <dt>Liftoff mass</dt>
              <dd>28 t</dd>
            </div>
            <div>
              <dt>Stages</dt>
              <dd>2</dd>
            </div>
            <div>
              <dt>Engines</dt>
              <dd>1 Merlin, 1 Kestrel</dd>
            </div>
            <div>
              <dt>Payload, LEO</dt>
              <dd>670 kg</dd>
            </div>
          </dl>
          <div className="rocket-block">
            <p className="rocket-kicker">Vehicle</p>
            <ul className="rocket-facts">
              <li>
                <span>Propellant</span>
                <span>RP-1 / LOX</span>
              </li>
              <li>
                <span>First-stage thrust</span>
                <span>about 350 kN</span>
              </li>
              <li>
                <span>Second stage</span>
                <span>Kestrel, restartable</span>
              </li>
              <li>
                <span>Structure</span>
                <span>Aluminum alloy</span>
              </li>
              <li>
                <span>Flights</span>
                <span>5, then retired</span>
              </li>
              <li>
                <span>Orbit reached</span>
                <span>2008</span>
              </li>
              <li>
                <span>Status</span>
                <span>Retired, 2009</span>
              </li>
              <li>
                <span>Followed by</span>
                <span>Falcon 9</span>
              </li>
            </ul>
          </div>
          <p className="rocket-note">
            Three early flights failed. The fourth reached orbit in September 2008,
            the first time a privately funded liquid-fuel rocket had done it.
            A stretched follow-on, Falcon 1e, was drawn and then dropped.
            The Merlin engine, the tank architecture, and the flight software
            carried forward. The vehicle itself did not.
          </p>
        </div>
      </div>
    </section>
  );
}

function Falcon9() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="rocket" aria-label="Falcon 9">
      <div className="rocket-inner">
        <div className="rocket-media">
          <div className="rocket-frame">
            <img
              className="rocket-image"
              src="/falcon-9.jpg"
              alt="Falcon 9, a tall white rocket with grid fins and nine engines"
            />
          </div>
        </div>
        <div className="rocket-copy">
          <p className="rocket-index">02 — Medium lift</p>
          <h2 className="rocket-name">Falcon 9</h2>
          <p className="rocket-lead">Nine engines. A first stage built to fly again.</p>
          <p className="rocket-body">
            Falcon 9 Block 5 is a two-stage rocket, 70 m tall and 3.7 m in
            diameter, with a liftoff mass of about 549 tonnes. Nine Merlin 1D
            engines produce roughly 7,607 kN at liftoff. The second stage uses
            one Merlin Vacuum, with a larger nozzle for space, and can restart.
            Expendable payload is 22,800 kg to low Earth orbit and 8,300 kg
            to geostationary transfer orbit. Recovering the booster lowers that
            to about 18,500 kg and 5,500 kg.
          </p>
          <dl className="rocket-stats">
            <div>
              <dt>Height</dt>
              <dd>70 m</dd>
            </div>
            <div>
              <dt>Diameter</dt>
              <dd>3.7 m</dd>
            </div>
            <div>
              <dt>Liftoff mass</dt>
              <dd>549 t</dd>
            </div>
            <div>
              <dt>Liftoff thrust</dt>
              <dd>7,607 kN</dd>
            </div>
            <div>
              <dt>Engines</dt>
              <dd>9 + 1 Merlin</dd>
            </div>
            <div>
              <dt>Payload, LEO</dt>
              <dd>22,800 kg</dd>
            </div>
          </dl>
          <div className="rocket-block">
            <p className="rocket-kicker">Vehicle</p>
            <ul className="rocket-facts">
              <li>
                <span>Propellant</span>
                <span>RP-1 / LOX</span>
              </li>
              <li>
                <span>Cycle</span>
                <span>Gas generator</span>
              </li>
              <li>
                <span>Fairing</span>
                <span>5.2 m, recoverable</span>
              </li>
              <li>
                <span>Grid fins</span>
                <span>Titanium</span>
              </li>
              <li>
                <span>Landing</span>
                <span>Pad or drone ship</span>
              </li>
              <li>
                <span>Engine-out</span>
                <span>Yes, on ascent</span>
              </li>
              <li>
                <span>Reuse target</span>
                <span>10 flights, no major work</span>
              </li>
              <li>
                <span>Status</span>
                <span>Active</span>
              </li>
            </ul>
          </div>
          <p className="rocket-note">
            The first stage separates, flips, and lands propulsively. The fairing
            halves are caught or recovered at sea and flown again. Block 5 is the
            operational version: tougher engines, a stronger octaweb, and thermal
            protection meant for rapid turnaround. It is the vehicle that made
            reuse routine, not a demonstration.
          </p>
        </div>
      </div>
    </section>
  );
}

function FalconHeavy() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="rocket" aria-label="Falcon Heavy">
      <div className="rocket-inner">
        <div className="rocket-media">
          <div className="rocket-frame wide">
            <img
              className="rocket-image"
              src="/falcon-heavy.jpg"
              alt="Falcon Heavy, three white cores side by side against black space"
            />
          </div>
        </div>
        <div className="rocket-copy">
          <p className="rocket-index">03 — Heavy lift</p>
          <h2 className="rocket-name">Falcon Heavy</h2>
          <p className="rocket-lead">Three cores. Twenty-seven engines. One upper stage.</p>
          <p className="rocket-body">
            Falcon Heavy is three Falcon 9 first stages flown as one vehicle:
            a reinforced center core and two side boosters. Together they stand
            70 m tall and 12.2 m wide, with a liftoff mass of about 1,421 tonnes.
            Twenty-seven Merlin engines produce about 22,819 kN, more than
            five million pounds of thrust. Published payload is 63,800 kg to
            low Earth orbit, 26,700 kg to geostationary transfer orbit, and
            16,800 kg onto a Mars trajectory.
          </p>
          <dl className="rocket-stats">
            <div>
              <dt>Height</dt>
              <dd>70 m</dd>
            </div>
            <div>
              <dt>Width</dt>
              <dd>12.2 m</dd>
            </div>
            <div>
              <dt>Liftoff mass</dt>
              <dd>1,421 t</dd>
            </div>
            <div>
              <dt>Liftoff thrust</dt>
              <dd>22,819 kN</dd>
            </div>
            <div>
              <dt>Engines</dt>
              <dd>27 + 1 Merlin</dd>
            </div>
            <div>
              <dt>Payload, LEO</dt>
              <dd>63,800 kg</dd>
            </div>
          </dl>
          <div className="rocket-block">
            <p className="rocket-kicker">Vehicle</p>
            <ul className="rocket-facts">
              <li>
                <span>Propellant</span>
                <span>RP-1 / LOX</span>
              </li>
              <li>
                <span>Side boosters</span>
                <span>Reusable</span>
              </li>
              <li>
                <span>Center core</span>
                <span>Optional recovery</span>
              </li>
              <li>
                <span>Upper stage</span>
                <span>Merlin Vacuum</span>
              </li>
              <li>
                <span>Fairing</span>
                <span>5.2 × 13.1 m</span>
              </li>
              <li>
                <span>GTO payload</span>
                <span>26,700 kg</span>
              </li>
              <li>
                <span>Mars payload</span>
                <span>16,800 kg</span>
              </li>
              <li>
                <span>Status</span>
                <span>Active</span>
              </li>
            </ul>
          </div>
          <p className="rocket-note">
            The side boosters separate first and return to land. The center core
            burns longer and can be expended when the payload demands it.
            With 27 engines, the vehicle can lose more than one and still
            complete most flights. Same propellant, same upper stage, same
            fairing as Falcon 9 — scaled by adding cores, not by inventing
            a new rocket.
          </p>
        </div>
      </div>
    </section>
  );
}

function Starship() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="rocket" aria-label="Starship">
      <div className="rocket-inner">
        <div className="rocket-media">
          <div className="rocket-frame">
            <img
              className="rocket-image"
              src="/starship.jpg"
              alt="Starship full stack, stainless steel ship on a Super Heavy booster"
            />
          </div>
        </div>
        <div className="rocket-copy">
          <p className="rocket-index">04 — Super heavy</p>
          <h2 className="rocket-name">Starship</h2>
          <p className="rocket-lead">Both stages built to come back.</p>
          <p className="rocket-body">
            Starship is a two-part vehicle: the Super Heavy booster and the
            Starship ship. The current stack is about 124 m tall and 9 m in
            diameter. Super Heavy is about 72 m tall and flies on 33 Raptor
            engines. The ship is about 52 m tall and flies on six: three at
            sea-level pressure, three with vacuum nozzles. Both stages burn
            liquid methane and liquid oxygen. The design target is more than
            100 tonnes to low Earth orbit with the full stack reused, and up
            to 150 tonnes on later versions.
          </p>
          <dl className="rocket-stats">
            <div>
              <dt>Stack height</dt>
              <dd>124 m</dd>
            </div>
            <div>
              <dt>Diameter</dt>
              <dd>9 m</dd>
            </div>
            <div>
              <dt>Booster</dt>
              <dd>72 m, 33 Raptors</dd>
            </div>
            <div>
              <dt>Ship</dt>
              <dd>52 m, 6 Raptors</dd>
            </div>
            <div>
              <dt>Propellant</dt>
              <dd>CH4 / LOX</dd>
            </div>
            <div>
              <dt>Payload, LEO</dt>
              <dd>100–150 t</dd>
            </div>
          </dl>
          <div className="rocket-block">
            <p className="rocket-kicker">Architecture</p>
            <ul className="rocket-facts">
              <li>
                <span>Structure</span>
                <span>Stainless steel</span>
              </li>
              <li>
                <span>Engine cycle</span>
                <span>Full-flow staged combustion</span>
              </li>
              <li>
                <span>Booster thrust</span>
                <span>about 7,600–8,200 tf</span>
              </li>
              <li>
                <span>Ship engines</span>
                <span>3 sea level, 3 vacuum</span>
              </li>
              <li>
                <span>Heat shield</span>
                <span>Ceramic tiles, windward side</span>
              </li>
              <li>
                <span>Control</span>
                <span>Flaps, no grid fins on ship</span>
              </li>
              <li>
                <span>Booster return</span>
                <span>Tower catch</span>
              </li>
              <li>
                <span>Ship return</span>
                <span>Belly-flop, then landing burn</span>
              </li>
            </ul>
          </div>
          <p className="rocket-note">
            Raptor is a full-flow staged-combustion engine: both fuel and
            oxidizer are burned in separate preburners before they reach the
            main chamber. Methane leaves less soot than kerosene, which matters
            if an engine is meant to fly again the same week. The booster does
            not land on legs. Arms on the launch tower are meant to catch it.
            The ship reenters engines-up, belly into the airstream, then flips
            for a landing burn. Header tanks in the nose keep the engines fed
            during that flip. Payload figures are design targets for a fully
            reusable flight, not a number from an expended throwaway stage.
          </p>
        </div>
      </div>
    </section>
  );
}

function RocketsNext() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="rockets-next" aria-label="Continue">
      <p className="rockets-next-text">
        <span className="rockets-next-lead">Four vehicles. One line of work.</span>
        A single engine proved the idea. Nine engines made return ordinary.
        Twenty-seven carried the heavy loads. Thirty-three, on methane and steel,
        are built so the whole stack can leave and come back. The machines are
        only half of it.
      </p>

      <div className="rockets-next-action">
        <Button to="/missions">Missions</Button>
      </div>
    </section>
  );
}

function Rockets() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const play = () => {
      const attempt = video.play();
      if (attempt) attempt.catch(() => {});
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("canplay", play, { once: true });

    return () => video.removeEventListener("canplay", play);
  }, []);

  return (
    <main className="rockets">
      <section className="rockets-intro" aria-label="Rockets">
        <div className="rockets-hero">
          <video
            ref={videoRef}
            className="rockets-hero-video"
            src="/rockets-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />

          <div className="rockets-hero-dim" />

          <div className="rockets-hero-content">
            <h1>ROCKETS</h1>

            <p className="rockets-lead">Earth was never the end.</p>

            <p className="rockets-lines">
              It was the beginning.
              <br />
              From the first step beyond our atmosphere
              <br />
              to machines built to carry us farther,
              <br />
              this journey has always been about one thing:
            </p>

            <p className="rockets-close">Going beyond.</p>
          </div>
        </div>
      </section>

      <Falcon1 />
      <Falcon9 />
      <FalconHeavy />
      <Starship />
      <RocketsNext />
    </main>
  );
}

export default Rockets;
