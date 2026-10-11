/* Searchable text for the Space page (Space.jsx keeps its own markup).
   If you edit a planet's text in Space.jsx, update it here too. */

export const PLANETS = [
  {
    name: "Mercury",
    kind: "Inner planet",
    lead: "Closest to the Sun. Smallest of the eight.",
    body: "Mercury averages 57.9 million km from the Sun, or 0.387 AU. Sunlight takes 3.2 minutes to arrive. One orbit lasts 87.97 days, at 47.4 km/s — the fastest of the eight planets. A solar day, from sunrise to sunrise, lasts 176 Earth days.",
    note: "An iron core under a thin rocky shell, and a magnetic field about 1% of Earth's. Only an exosphere. Mapped by Mariner 10 and MESSENGER. BepiColombo enters orbit on 21 November 2026. No moons. Day 430°C, night −180°C.",
  },
  {
    name: "Venus",
    kind: "Inner planet",
    lead: "Earth's size. Not Earth's climate.",
    body: "Venus averages 108.2 million km from the Sun, or 0.723 AU. Sunlight takes 6.0 minutes to arrive. One orbit lasts 224.70 days, at 35.0 km/s. It spins backwards: a sidereal day is 243.02 Earth days, and a solar day lasts 116.75.",
    note: "A runaway greenhouse. Clouds of sulfuric acid hide a volcanic surface, and the thick air keeps day and night nearly the same temperature. Surface 464°C, pressure 92 bar, 96.5% CO₂. No global magnetic field. Mapped by Magellan. The Sun rises in the west.",
  },
  {
    name: "Earth",
    kind: "Inner planet",
    lead: "The only known world with life.",
    body: "Earth averages 149.6 million km from the Sun, or 1.000 AU. Sunlight takes 8.3 minutes to arrive. One orbit lasts 365.26 days, at 29.8 km/s. A sidereal day is 23.93 hours. The solar day, noon to noon, is 24 hours.",
    note: "Liquid water, a protective magnetic field, and an oxygen-rich atmosphere of 78% nitrogen and 21% oxygen. The Moon is 3,475 km across and keeps the tilt comparatively steady. Seasons come from the 23.4° lean, not from distance to the Sun.",
  },
  {
    name: "Mars",
    kind: "Inner planet",
    lead: "A cold desert with a thin sky.",
    body: "Mars averages 228.0 million km from the Sun, or 1.524 AU. Sunlight takes 12.7 minutes to arrive. One orbit lasts 687.0 days, at 24.1 km/s. A sidereal day is 24.6 hours. A solar day, one sol, lasts 24.7 hours.",
    note: "Iron oxide gives the surface its rust color. Olympus Mons is the tallest volcano in the Solar System, and Valles Marineris is a canyon system about 4,000 km long. Phobos and Deimos are both small. Mean surface −63°C. No global magnetic field.",
  },
  {
    name: "Jupiter",
    kind: "Gas giant",
    lead: "Largest world. Mostly hydrogen.",
    body: "Jupiter averages 778.5 million km from the Sun, or 5.20 AU. Sunlight takes 43 minutes to arrive. One orbit lasts 4,333 days, 11.86 years, at 13.1 km/s. It spins once every 9.9 hours — the shortest day of the eight planets.",
    note: "More mass than the other planets combined. A faint ring system, a strong magnetic field, the Great Red Spot, and four large moons: Io, Europa, Ganymede, and Callisto. Ganymede is bigger than Mercury. 95 moons.",
  },
  {
    name: "Saturn",
    kind: "Gas giant",
    lead: "The ringed world. Less dense than water.",
    body: "Saturn averages 1,432 million km from the Sun, or 9.58 AU. Sunlight takes 80 minutes to arrive. One orbit lasts 10,747 days, 29.45 years, at 9.7 km/s. A day is 10.7 hours. The rings span about 280,000 km, but are only tens of meters thick.",
    note: "Mean density is below water. Titan is larger than Mercury and has a thick nitrogen atmosphere. Enceladus vents ice into space. Cassini mapped the system from 2004 to 2017. 274 moons.",
  },
  {
    name: "Uranus",
    kind: "Ice giant",
    lead: "Tipped on its side.",
    body: "Uranus averages 2,867 million km from the Sun, or 19.17 AU. Sunlight takes 2.7 hours to arrive. One orbit lasts 30,589 days, 84.0 years, at 6.8 km/s. It spins backwards in 17.2 hours. The axis leans 97.8°, so each pole spends decades in daylight.",
    note: "Methane gives the pale blue-green color. Under the gas is a mantle of water, ammonia, and methane ices. Voyager 2 is the only spacecraft to have flown past, in 1986. 28 moons, 13 faint rings.",
  },
  {
    name: "Neptune",
    kind: "Ice giant",
    lead: "The last of the eight. The windiest.",
    body: "Neptune averages 4,515 million km from the Sun, or 30.18 AU. Sunlight takes 4.2 hours to arrive. One orbit lasts 59,800 days, 164.8 years, at 5.4 km/s. A day is 16.1 hours. Winds reach about 2,000 km/h, the fastest measured on any planet.",
    note: "Found by calculation in 1846, before it was seen. Triton orbits backwards and is likely a captured world. Voyager 2 flew past in 1989 and is still the only visitor. 16 moons.",
  },
];