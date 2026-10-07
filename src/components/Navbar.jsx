import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";

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

  const navItems = [
    { name: "Home", path: "/", icon: homeIcon },
    { name: "Space", path: "/Space", icon: spaceIcon },
    { name: "Rockets", path: "/Rockets", icon: rocketIcon },
    { name: "Missions", path: "/Missions", icon: mountainIcon },
    { name: "Starlink", path: "/Starlink", icon: starlinkIcon },
    { name: "Technology", path: "/Technology", icon: aiIcon },
    { name: "About DeV", path: "/AboutDeV", icon: aboutDevIcon, wide: true },
  ];

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 769px)");
    const onChange = (event) => {
      if (event.matches) setMenuOpen(false);
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflow || "";
    }

    return () => {
      document.body.style.overflow = previousOverflow || "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
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

        <div className="navbar-mobile-sheet" role="dialog" aria-modal="true">
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
                <span className="navbar-mobile-arrow" aria-hidden="true">
                  →
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <>
      <nav className={`navbar${menuOpen ? " menu-open" : ""}`}>
        <NavLink
          to="/"
          className="navbar-logo"
          aria-label="EQUINOX Home"
          onClick={closeMenu}
        >
          <img src={logoIcon} alt="EQUINOX" />
        </NavLink>

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
      </nav>

      {mobileMenu}
    </>
  );
}

export default Navbar;