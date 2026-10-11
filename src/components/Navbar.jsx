import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation } from "react-router-dom";

import SearchModal from "./SearchModal";
import "./NavbarSearch.css";

import logoIcon from "../assets/icons/logo.png";
import homeIcon from "../assets/icons/home.png";
import spaceIcon from "../assets/icons/space.png";
import mountainIcon from "../assets/icons/mountain.png";
import rocketIcon from "../assets/icons/rocket.png";
import starlinkIcon from "../assets/icons/starlink.png";
import aiIcon from "../assets/icons/ai.png";
import aboutDevIcon from "../assets/icons/AboutDeV.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: homeIcon },
    { name: "Space", path: "/Space", icon: spaceIcon },
    { name: "Rockets", path: "/Rockets", icon: rocketIcon },
    { name: "Missions", path: "/Missions", icon: mountainIcon },
    { name: "Starlink", path: "/Starlink", icon: starlinkIcon },
    { name: "Technology", path: "/Technology", icon: aiIcon },
    {
      name: "About DeV",
      path: "/AboutDeV",
      icon: aboutDevIcon,
      wide: true,
    },
  ];

  const getPageTitle = (pathname) => {
    const normalizedPath =
      pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

    const titles = {
      "/": "HOME",
      "/Space": "SPACE",
      "/Rockets": "ROCKETS",
      "/Missions": "MISSIONS",
      "/Starlink": "STARLINK",
      "/Technology": "TECHNOLOGY",
      "/AboutDeV": "ABOUT DEV",
      "/missions/human-exploration": "HUMAN EXPLORATION",
      "/missions/planetary-exploration": "PLANETARY EXPLORATION",
      "/missions/deep-space": "DEEP SPACE",
      "/missions/space-science": "SPACE SCIENCE",
      "/missions/earth-and-sun": "EARTH AND SUN",
    };

    return titles[normalizedPath] || "EQUINOX";
  };

  const pageTitle = getPageTitle(location.pathname);

  const closeMenu = () => setMenuOpen(false);

  const openSearch = () => {
    setMenuOpen(false);
    setSearchOpen(true);
  };

  const closeSearch = () => setSearchOpen(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 769px)");

    const onChange = (event) => {
      if (event.matches) {
        setMenuOpen(false);
      }
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMenuOpen(false);
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const mobileMenu =
    typeof document !== "undefined" &&
    createPortal(
      <div
        id="navbar-mobile-menu"
        className={`navbar-mobile-menu${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="navbar-mobile-backdrop"
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        />
        <div
          className="navbar-mobile-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <p className="navbar-mobile-label">Navigation</p>
          <div className="navbar-mobile-links">
            {navItems.map((item, index) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `navbar-mobile-link${isActive ? " active" : ""}`
                }
                style={{ "--i": index }}
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMenu}
              >
                <span className="navbar-mobile-icon">
                  <img src={item.icon} alt="" aria-hidden="true" />
                </span>
                <span className="navbar-mobile-text">{item.name}</span>
                <span className="navbar-mobile-arrow" aria-hidden="true">→</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <>
      <header className="navbar-shell">
        <nav className={`navbar${menuOpen ? " menu-open" : ""}`}>
          {/* Logo */}
          <NavLink
            to="/"
            className="navbar-logo"
            aria-label="EQUINOX Home"
            onClick={closeMenu}
          >
            <img src={logoIcon} alt="EQUINOX" />
          </NavLink>

          {/* Animated current page title */}
          <div className="navbar-title" aria-hidden="true">
            <span key={pageTitle} className="navbar-title-text">
              {pageTitle}
            </span>
          </div>

          {/* Desktop navigation */}
          <div className="navbar-links">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `navbar-link${isActive ? " active" : ""}${
                    item.wide ? " is-about" : ""
                  }`
                }
              >
                <img
                  className="navbar-icon"
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Right side group: Search + Hamburger */}
          <div className="navbar-right">
            <button
              type="button"
              className="navbar-search"
              onClick={openSearch}
              aria-label="Search"
              aria-haspopup="dialog"
              title="Search (Ctrl K)"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>

            <button
              type="button"
              className={`navbar-menu-button${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="navbar-mobile-menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>

      {mobileMenu}
      <SearchModal open={searchOpen} onClose={closeSearch} />
    </>
  );
}

export default Navbar;