import { useEffect, useRef } from "react";
import "./Technology.css";
import Button from "../components/Button";
import heroBg from "../assets/technology-hero.jpg";
import grokBg from "../assets/technology-grok.jpg";

/* Figures are order-of-magnitude engineering facts, not a live catalog.
   Engine names and orbit bands are the public ones used on current vehicles. */

const SECTIONS = [
  {
    id: "overview",
    kicker: "Overview",
    title: "What flies",
    lead: "Seven systems. One vehicle.",
    paragraphs: [
      "A launch is not one machine. Propulsion gets the stack off the pad. Guidance keeps it on the path. Power, thermal and avionics keep the spacecraft alive after the engines shut down.",
      "This page is the map of that stack: engines, spacecraft systems, autonomy, robotics, links, energy, and the hardware that lets people stay.",
      "The same pattern shows up on a rideshare, a tanker, or a crew vehicle. Scale changes. The jobs do not.",
    ],
    stats: [
      ["Propulsion", "Liquid, solid, electric"],
      ["Control", "Guidance, nav, attitude"],
      ["Links", "Radio and laser"],
      ["Power", "Solar to nuclear"],
      ["People", "Suit, air, water, shelter"],
      ["Autonomy", "Onboard, not on the ground"],
    ],
    note: "A reading map for the sections below. Detail lives in each block, not in a single number.",
  },
  {
    id: "propulsion",
    kicker: "Propulsion and launch",
    title: "Engines",
    lead: "Push now. Or push for months.",
    paragraphs: [
      "A rocket engine throws mass backward. The vehicle goes forward. Liquid engines meter fuel and oxidizer into a chamber, so they can throttle, shut down and restart. Solid motors cast the mix in advance. They are simple and strong, and usually burn until the grain is gone.",
      "Leaving Earth needs high thrust. Staying on a long cruise does not. Electric thrusters accelerate charged gas with power from the solar arrays. Thrust is small. Propellant use is far lower, which is why they hold satellites on station and finish interplanetary cruises.",
      "Reusable stages bring the high-thrust part home. Grid fins, landing legs and a restartable engine turn the first stage into hardware that flies again, instead of a tank you fly once.",
    ],
    groups: [
      {
        title: "How the push is made",
        rows: [
          ["Liquid", "Throttle, shutdown, restart"],
          ["Solid", "Simple burn, little control"],
          ["Electric", "High efficiency, low thrust"],
          ["Reusable stage", "Land, refly the booster"],
          ["Future", "Nuclear thermal, solar sails"],
        ],
      },
    ],
    note: "Nuclear thermal and sails are research and early tests, not the engines on a current operational launcher.",
  },
  {
    id: "spacecraft",
    kicker: "Spacecraft systems",
    title: "The vehicle itself",
    lead: "Know where you are. Point the right way.",
    paragraphs: [
      "Guidance, navigation and control are three jobs. Navigation estimates position and speed. Guidance picks the path. Control moves engines, reaction wheels or thrusters until the vehicle is on that path.",
      "Avionics is the flight electronics: sensors, wiring, computers and the software that runs them. Flight computers check health, store data and run the timeline. In deep space the round trip is too slow for the ground to fly every second, so the short calls stay onboard.",
      "Attitude is which way the vehicle faces. Arrays want the Sun. Antennas want Earth. Cameras want the target. Wheels, small thrusters and star trackers do that work. Thermal control keeps the same boxes inside their temperature band, with coatings, multilayer insulation, heat pipes and radiators.",
    ],
    groups: [
      {
        title: "Onboard jobs",
        rows: [
          ["GNC", "Navigate, guide, control"],
          ["Avionics", "Sensors, buses, software"],
          ["Flight computer", "Timeline and health"],
          ["Attitude", "Wheels, thrusters, trackers"],
          ["Thermal", "Insulation, pipes, radiators"],
          ["Docking", "Close range, then a hard latch"],
        ],
      },
    ],
    note: "Docking needs a slow relative speed and a mechanical latch. The sensors only get you to the port.",
  },
  {
    id: "ai",
    kicker: "Artificial intelligence",
    title: "Decisions onboard",
    lead: "The link is late. The rock is not.",
    paragraphs: [
      "A signal to Mars takes minutes. A landing takes seconds. Autonomy is how a vehicle keeps the short decisions when the ground cannot be in the loop.",
      "Navigation uses stars, terrain pictures or radio to estimate state. Mission planning orders the day around power, memory and the next pass over a ground station. Science software flags the frames worth sending home, because the link is narrower than the camera.",
      "Robotic autonomy is the same idea in motion. The rover gets a goal. It builds a local map, avoids the rock, and stops if a sensor disagrees.",
    ],
    groups: [
      {
        title: "Where it runs",
        rows: [
          ["Navigation", "State, without a live fix"],
          ["Planning", "Power, memory, next pass"],
          ["Science", "Keep the frame that matters"],
          ["Robotics", "Goal from Earth, path onboard"],
        ],
      },
    ],
    note: "Flight software is still tested like flight software. A model can rank and draft. It does not clear a burn.",
  },
  {
    id: "grok",
    kicker: "Grok and AI systems",
    title: "Ground side",
    lead: "Read the stack. Do not fly it.",
    image: grokBg,
    imageAlt: "Grok logo",
    paragraphs: [
      "Grok sits with the team, not in the guidance loop. It reads a long procedure, a log or a data note and returns a shorter brief a console can use.",
      "The useful jobs are narrow: summarize a shift log, line up an anomaly against the last one, draft the questions for the next planning pass. The call on safety stays with the engineer and the tested procedure.",
      "Onboard, the models that fly are small, fixed and checked. A chat model on the ground is a different tool, with a different rule: it can prepare the work. It does not command the vehicle.",
    ],
    groups: [
      {
        title: "Split of work",
        rows: [
          ["Ground model", "Briefs, comparisons, drafts"],
          ["Onboard software", "Small, tested, in the loop"],
          ["Safety call", "Engineer and procedure"],
          ["Not in the loop", "Burns, separation, landing"],
        ],
      },
    ],
    note: "A ground model can brief a shift. It is not a flight computer, and it is not in the command path.",
  },
  {
    id: "robotics",
    kicker: "Robotics and exploration",
    title: "Hands where we are not",
    lead: "Wheel, arm, station.",
    paragraphs: [
      "A Mars rover is a slow vehicle with a lab inside. Wheels, an arm, cameras and a power source — solar on the small ones, a radioisotope generator on the long ones — carry the science across a day measured from Earth.",
      "The Moon is a different shop. Sharp dust, a very cold night, and a link that comes and goes. Lunar robots are being built to map, haul and prepare a site, often for only a few days of sun.",
      "Arms do the close work: take a sample, place a tool, catch a cargo craft at a station. In free fall every push moves the robot too, so the base has to be held or the motion has to be planned as a pair.",
    ],
    groups: [
      {
        title: "Where the robots are",
        rows: [
          ["Mars rovers", "Drive, sample, analyze"],
          ["Lunar robotics", "Map, haul, prepare"],
          ["Arms", "Sample, place, berth"],
          ["Station robotics", "Cargo and outside inspection"],
          ["Ahead", "Build, service, repair in orbit"],
        ],
      },
    ],
    note: "Full independence is rare. Earth sets the goal. The robot solves the next metre.",
  },
  {
    id: "comms",
    kicker: "Space communications",
    title: "The link",
    lead: "Command up. Science down.",
    paragraphs: [
      "Most missions still speak radio. Data is modulated onto a carrier, an antenna concentrates it, and a ground receiver pulls a weak signal out of noise. Distance is the tax. Farther out, the same transmitter comes back quieter.",
      "The Deep Space Network is a set of large dishes spread in longitude so a distant craft always has a station in view. Time on those dishes is scheduled. Laser links carry more bits on a narrow beam, and they need a harder point. Clouds can close a link to the ground.",
      "Between planets the round trip is minutes to hours. There is no live conversation. Commands go up as a plan. Results come back on the next pass.",
    ],
    groups: [
      {
        title: "The path",
        rows: [
          ["Radio", "Carrier, dish, ground receiver"],
          ["Deep Space Network", "Large dishes, scheduled"],
          ["Laser", "Higher rate, tighter point"],
          ["Satellite relay", "Orbit as the bent pipe"],
          ["Ground station", "Antenna, radio, fibre onward"],
          ["Interplanetary", "Delay measured in minutes"],
        ],
      },
    ],
    note: "Live status of a public network such as Starlink sits on its own page. This block is the spacecraft link in general.",
  },
  {
    id: "power",
    kicker: "Energy and power",
    title: "Watts",
    lead: "Make it, store it, spend it in order.",
    paragraphs: [
      "Near Earth, solar arrays are the default. Cells turn light into current, and the array has to face the Sun. Farther out the light falls off. At Mars, dust cuts it again. Past Jupiter, solar is a hard way to run a spacecraft.",
      "Batteries cover eclipse and the short peaks. Power management holds the bus in voltage and sheds the least important load if generation drops. Computers, the link and heaters stay up. Cameras can wait.",
      "Where the Sun is weak, a radioisotope generator turns decay heat into a small, steady current for years. A fission reactor is the step up in power, studied for a surface base or a high-power electric stage. Launch safety and rejecting heat in vacuum are the hard parts.",
    ],
    groups: [
      {
        title: "Sources",
        rows: [
          ["Solar", "Default near Earth"],
          ["Battery", "Eclipse and peaks"],
          ["Management", "Voltage, then load shed"],
          ["Radioisotope", "Small, steady, far away"],
          ["Fission", "More power, harder safety case"],
        ],
      },
    ],
    note: "Beamed power and next-generation cells are research. A base needs watts it can count on, not a lab record.",
  },
  {
    id: "human",
    kicker: "Human spaceflight",
    title: "Stay",
    lead: "Air, water, shelter, dose.",
    paragraphs: [
      "A suit holds pressure, feeds oxygen and dumps heat. The outer layer takes dust and small debris. Joints are the hard part: a pressurized glove does not want to bend.",
      "Life support supplies oxygen, pulls carbon dioxide, and holds humidity and temperature. A station recycles the air. A water loop recovers humidity and used water so the next launch does not have to lift every litre. Habitat pressure and a quiet place to sleep are the rest of the shelter.",
      "Outside Earth's magnetic field, particle radiation is the long risk. Mass, a storm shelter and shorter time outside are the tools that exist. Exercise is the daily counter to months with little load on bone and muscle.",
    ],
    groups: [
      {
        title: "What the crew needs",
        rows: [
          ["Suit", "Pressure, oxygen, heat"],
          ["Life support", "Oxygen in, CO2 out"],
          ["Habitat", "Pressure, sleep, work"],
          ["Water loop", "Recover, do not resupply all"],
          ["Radiation", "Mass, shelter, time"],
          ["Health", "Exercise and monitoring"],
        ],
      },
    ],
    note: "Radiation on a long cruise is still an open engineering problem. Shielding helps. It does not close the issue.",
  },
];

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
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function InfoSection({ data }) {
  const ref = useReveal();
  const { id, kicker, title, lead, paragraphs, stats, groups, note, image, imageAlt } = data;

  return (
    <section ref={ref} className="tech-section" aria-labelledby={`tech-${id}`}>
      <div className="tech-inner">
        <header className="tech-head">
          <p className="tech-kicker">{kicker}</p>
          <h2 id={`tech-${id}`} className="tech-title">{title}</h2>
          <p className="tech-lead">{lead}</p>
        </header>

        <div className="tech-body">
          {image && (
            <figure className="tech-figure">
              <img
                src={image}
                alt={imageAlt || ""}
                width="533"
                height="512"
                loading="lazy"
                decoding="async"
              />
            </figure>
          )}

          {paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}

          {stats && (
            <dl className="tech-stats">
              {stats.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          )}

          {groups &&
            groups.map((group) => (
              <div key={group.title} className="tech-group">
                <p className="tech-group-title">{group.title}</p>
                <ul className="tech-facts">
                  {group.rows.map(([label, value]) => (
                    <li key={label}>
                      <span>{label}</span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          {note && <p className="tech-note">{note}</p>}
        </div>
      </div>
    </section>
  );
}

function TechnologyNext() {
  const ref = useReveal();

  return (
    <section ref={ref} className="tech-section tech-next" aria-label="Continue">
      <p className="tech-next-text">
        <span className="tech-next-lead">The stack is the vehicle. The network is already up.</span>
        Starlink is the constellation this same launch system keeps filling.
      </p>
      <Button to="/starlink">Starlink</Button>
    </section>
  );
}

function Technology() {
  return (
    <main className="technology">
      <section className="technology-intro" aria-label="Technology">
        <div className="technology-hero">
          <img
            className="technology-hero-bg"
            src={heroBg}
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchpriority="high"
          />
          <div className="technology-hero-overlay" />
          <div className="technology-hero-glow" />

          <div className="technology-hero-content">
            <h1>BUILT TO LEAVE EARTH.</h1>

            <p className="technology-lead">
              Engines, computers, links and life support. The hardware that
              launches, flies and stays — from the pad to a long cruise.
            </p>
          </div>
        </div>
      </section>

      {SECTIONS.map((section) => (
        <InfoSection key={section.id} data={section} />
      ))}

      <TechnologyNext />
    </main>
  );
}

export default Technology;