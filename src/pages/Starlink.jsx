import { useEffect, useRef } from "react";
import "./starlink.css";
import Button from "../components/Button";
import heroBg from "../assets/Starlink-Hero.jpg";

/* Figures: October 2026. Prices are US list prices and vary by country
   and address. Always confirm at starlink.com before publishing. */

const SECTIONS = [
  {
    id: "overview",
    kicker: "Overview",
    title: "What Starlink is",
    lead: "The largest satellite constellation ever flown.",
    paragraphs: [
      "Starlink is a satellite internet service run by SpaceX. Thousands of small satellites in low Earth orbit connect to a dish at your location, and to ground stations that link the network to the wider internet.",
      "Because the satellites orbit at roughly 550 km instead of the 35,786 km of traditional geostationary satellites, signals travel a far shorter distance. That is what makes video calls, gaming and cloud work practical from a farm, a ship or a mountain.",
      "Starlink began launching in 2019 and now accounts for roughly two-thirds of all active satellites in orbit.",
    ],
    stats: [
      ["Satellites in orbit", "11,100+"],
      ["Launched since 2019", "12,988"],
      ["Subscribers", "12M+ (Jun 2026)"],
      ["Countries and territories", "about 160"],
      ["Core orbit", "about 550 km"],
      ["US median latency", "25.7 ms"],
    ],
    note: "Satellite counts: KeepTrack, 6 Oct 2026. Subscriber and market counts: Starlink, June 2026. Latency is the US peak-hour median from Starlink's 2025 network update.",
  },
  {
    id: "how",
    kicker: "How it works",
    title: "Dish, satellite, ground",
    lead: "Three links and one mesh in space.",
    paragraphs: [
      "Your dish is a phased-array antenna. It steers its beam electronically, with no moving parts, and hands your connection from one satellite to the next as they pass overhead every few minutes.",
      "The satellite sends your traffic to a gateway ground station if one is in view. Where none is, satellites pass data to each other over laser links, forming a mesh that carries traffic across oceans and poles before it comes down to Earth.",
      "A gateway connects to the internet through fibre. Your router then does the rest, like any other broadband connection.",
    ],
    groups: [
      {
        title: "The path of a request",
        rows: [
          ["1. Dish", "Phased array, auto-aiming"],
          ["2. Satellite", "Low Earth orbit, about 550 km"],
          ["3. Laser link", "Satellite to satellite"],
          ["4. Gateway", "Ground station on fibre"],
          ["5. Internet", "Normal routing from here"],
        ],
      },
    ],
    note: "Every satellite stays in motion. The dish needs a clear view of the sky, not of one fixed point.",
  },
  {
    id: "generations",
    kicker: "Constellation",
    title: "Four generations",
    lead: "Each generation adds capacity, not just satellites.",
    paragraphs: [
      "The first operational satellites (v1.0) weighed about 260 kg and relied on ground stations. Later versions added laser links, then much larger V2 Mini satellites with far more capacity per launch.",
      "On 28 September 2026, Starship Flight 14 put the first 26 V3 satellites into orbit. They are in their orbit-raising phase and SpaceX has said it expects them to begin serving customers within weeks. Treat V3 as just starting, not as the network you use today.",
    ],
    groups: [
      {
        title: "Satellite generations",
        rows: [
          ["V1.0 / V1.5", "About 260 kg. V1.5 added lasers"],
          ["V2 Mini", "Falcon 9. About 100 Gbps each"],
          ["V3", "Starship. About 1 Tbps down, 160 Gbps up"],
          ["V3 altitude", "About 350 km, lower latency"],
          ["Direct to Cell", "About 360 km, phone-direct"],
        ],
      },
      {
        title: "Regulatory approvals",
        rows: [
          ["Filed with FCC and ITU", "Up to about 42,000 satellites"],
          ["Gen2 authorised", "15,000 satellites"],
        ],
      },
    ],
    note: "V3 capacity figures are SpaceX design numbers. Real-world speeds depend on how many V3 satellites are in service in your area.",
  },
  {
    id: "hardware",
    kicker: "Hardware",
    title: "Pick a dish",
    lead: "Three terminals, three jobs.",
    paragraphs: [
      "Standard is the home kit: a dish and a separate Wi-Fi router, built to stay in one place. Mini is a small portable dish with the router built in, powered over USB-C. High Performance is a larger flat dish for in-motion use, such as vessels and vehicles, and needs a Priority plan.",
    ],
    groups: [
      {
        title: "Standard (Gen 3)",
        rows: [
          ["Price", "$349, or rent for about $10/mo on Residential"],
          ["Power", "About 75–100 W active"],
          ["Plans", "Residential and Roam"],
          ["Best for", "Homes, cabins, fixed sites"],
        ],
      },
      {
        title: "Mini",
        rows: [
          ["Price", "$199–$249 depending on offer"],
          ["Weight", "About 1.1 kg"],
          ["Power", "About 20–40 W, USB-C PD"],
          ["Plans", "Roam"],
          ["Best for", "Vans, boats, backpacks, backup"],
        ],
      },
      {
        title: "High Performance (flat)",
        rows: [
          ["Price", "About $2,000–$2,500"],
          ["Power", "About 110–150 W"],
          ["Plans", "Priority"],
          ["Best for", "Moving vessels, vehicles, business"],
        ],
      },
    ],
    note: "Hardware prices change often and some regions offer free or discounted kits. The checkout page for your address is the final source.",
  },
  {
    id: "plans",
    kicker: "Plans and pricing",
    title: "What it costs",
    lead: "Home, roam, or priority.",
    paragraphs: [
      "Residential is for a fixed address. Roam is for portable use and offers data blocks. Priority is the business tier, where your data is served ahead of Residential and Roam traffic when a cell is busy. Local Priority covers your region, and Global Priority covers the world.",
      "There is no long-term contract on consumer plans. Professional installation is included on the two higher Residential tiers.",
    ],
    groups: [
      {
        title: "Residential, per month",
        rows: [
          ["Residential 100 Mbps", "$55"],
          ["Residential 200 Mbps", "$85"],
          ["Residential Max, up to 400+ Mbps", "$130"],
        ],
      },
      {
        title: "Roam, per month",
        rows: [
          ["Roam 100 GB", "$55"],
          ["Roam 300 GB", "$80"],
          ["Roam Unlimited", "$175"],
        ],
      },
      {
        title: "Priority, per month",
        rows: [
          ["Local Priority, 50 GB", "from $55"],
          ["Local Priority, 500 GB", "$155"],
          ["Global Priority, 50 GB", "from $250"],
        ],
      },
    ],
    note: "US prices checked in September 2026. UK Residential starts at £40/month. Taxes, hardware and local surcharges are extra, and offers differ by address.",
  },
  {
    id: "coverage",
    kicker: "Coverage",
    title: "Where it works",
    lead: "About 160 countries and territories, and still growing.",
    paragraphs: [
      "Starlink is live across North America, most of Europe, Oceania, large parts of Latin America, Africa and Asia, and in remote places such as ships at sea. Each market needs a local licence, so availability is decided country by country.",
      "Some countries are not authorised, and a few are waiting on regulators. Check your exact address on the Starlink availability map before you order.",
    ],
    groups: [
      {
        title: "Examples by region",
        rows: [
          ["North America", "US, Canada, Mexico"],
          ["Europe", "UK, Germany, France, Italy, Spain, Poland, Ukraine"],
          ["Oceania", "Australia, New Zealand"],
          ["Asia", "Japan, Philippines, Malaysia, Indonesia, Mongolia"],
          ["Latin America", "Brazil, Chile, Peru, Colombia"],
          ["Africa", "Nigeria, Kenya, Rwanda, Mozambique, Zambia"],
        ],
      },
    ],
    note: "A sample of markets, not a complete or guaranteed list. Live status: starlink.com/map.",
  },
  {
    id: "dtc",
    kicker: "Direct to Cell",
    title: "Your phone, no dish",
    lead: "Satellites that act like cell towers in space.",
    paragraphs: [
      "Direct to Cell links satellites straight to ordinary LTE phones, with no extra hardware. More than 650 of these satellites fly lower, at about 360 km, and connect to the main network by laser.",
      "In the US it runs as T-Mobile's T-Satellite, which launched in July 2025 with texting, added limited app data in October 2025, and works with around 60 phone models. It costs $10/month, or is included on T-Mobile's Experience Beyond plan. Partner carriers in other countries are rolling it out.",
      "It is built for dead zones and emergencies, not for replacing your home internet.",
    ],
    groups: [
      {
        title: "What to know",
        rows: [
          ["Satellites", "650+ in orbit"],
          ["US service", "T-Satellite, $10/mo add-on"],
          ["What works", "Text, location, selected apps"],
          ["Voice", "In testing"],
          ["Next generation", "V2 on Starship, targeted 2027"],
        ],
      },
    ],
    note: "SpaceX bought about 65 MHz of EchoStar spectrum for its own mobile service. The FCC approved the transfer on 12 May 2026. The next-generation satellites are targeted for 2027, so treat their performance claims as goals.",
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
  const { id, kicker, title, lead, paragraphs, stats, groups, note } = data;

  return (
    <section ref={ref} className="sl-section" aria-labelledby={`sl-${id}`}>
      <div className="sl-inner">
        <header className="sl-head">
          <p className="sl-kicker">{kicker}</p>
          <h2 id={`sl-${id}`} className="sl-title">{title}</h2>
          <p className="sl-lead">{lead}</p>
        </header>

        <div className="sl-body">
          {paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}

          {stats && (
            <dl className="sl-stats">
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
              <div key={group.title} className="sl-group">
                <p className="sl-group-title">{group.title}</p>
                <ul className="sl-facts">
                  {group.rows.map(([label, value]) => (
                    <li key={label}>
                      <span>{label}</span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          {note && <p className="sl-note">{note}</p>}
        </div>
      </div>
    </section>
  );
}

function StarlinkNext() {
  const ref = useReveal();

  return (
    <section ref={ref} className="sl-section sl-next" aria-label="Continue">
      <p className="sl-next-text">
        <span className="sl-next-lead">Rockets built the network. Missions use it.</span>
        Every Starlink satellite reached orbit on a Falcon 9 or Starship.
        See where the same vehicles are headed next.
      </p>
      <Button to="/missions">Missions</Button>
    </section>
  );
}

function Starlink() {
  return (
    <main className="starlink">
      <section className="starlink-intro" aria-label="Starlink">
        <div className="starlink-hero">
          <img
            className="starlink-hero-bg"
            src={heroBg}
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchpriority="high"
          />
          <div className="starlink-hero-overlay" />
          <div className="starlink-hero-glow" />

          <div className="starlink-hero-content">
            <h1>CONNECTED WITHOUT LIMITS.</h1>

            <p className="starlink-lead">
              High-speed internet, delivered from orbit. Starlink brings fast,
              reliable connectivity to places beyond the reach of traditional
              networks — giving you the freedom to stay connected, wherever you
              are.
            </p>
          </div>
        </div>
      </section>

      {SECTIONS.map((section) => (
        <InfoSection key={section.id} data={section} />
      ))}

      <StarlinkNext />
    </main>
  );
}

export default Starlink;