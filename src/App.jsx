import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Space from "./pages/Space";
import Rockets from "./pages/Rockets";
import Missions from "./pages/Missions";
import Starlink from "./pages/Starlink";
import Technology from "./pages/Technology";
import AboutDeV from "./pages/AboutDeV";

import HumanExploration from "./pages/HumanExploration";
import PlanetaryExploration from "./pages/PlanetaryExploration";
import DeepSpace from "./pages/DeepSpace";
import SpaceScience from "./pages/SpaceScience";
import EarthSun from "./pages/EarthSun";

/* Each route change should open at the top, not at the old scroll position. */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    document.querySelectorAll(".app-content, .app-shell").forEach((node) => {
      node.scrollTop = 0;
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <div className="app-shell">
        <Navbar />

        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Space" element={<Space />} />
            <Route path="/Rockets" element={<Rockets />} />
            <Route path="/Missions" element={<Missions />} />
            <Route path="/Starlink" element={<Starlink />} />
            <Route path="/Technology" element={<Technology />} />
            <Route path="/AboutDeV" element={<AboutDeV />} />

            <Route
              path="/missions/human-exploration"
              element={<HumanExploration />}
            />
            <Route
              path="/missions/planetary-exploration"
              element={<PlanetaryExploration />}
            />
            <Route path="/missions/deep-space" element={<DeepSpace />} />
            <Route path="/missions/space-science" element={<SpaceScience />} />
            <Route path="/missions/earth-and-sun" element={<EarthSun />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;