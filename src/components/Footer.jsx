import { Link } from "react-router-dom";
import logo from "../assets/images/EmpireX.jpg";
import "./Footer.css";

function Footer() {
  return (
    <footer className="eq-footer">
      <div className="eq-footer-card">
        <div className="eq-footer-top">
          <div className="eq-footer-brand">
            <Link to="/" className="eq-footer-logo">
              <img src={logo} alt="EQUINOX" />
              <span>EQUINOX</span>
            </Link>

            <p>
              A short line about the project goes here.
              Replace this text later with your own description.
            </p>

            <div className="eq-footer-socials">
              <a
                href="https://github.com/ARiA-Zanganeh"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"
                  />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/aria-zanganeh-821151422"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M6.94 8.5H3.75V20h3.19V8.5ZM5.34 3.5A1.85 1.85 0 1 0 5.35 7.2 1.85 1.85 0 0 0 5.34 3.5ZM20.25 20h-3.18v-5.6c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95V20H9.88V8.5h3.05v1.57h.04c.42-.8 1.46-1.65 3.01-1.65 3.22 0 3.82 2.12 3.82 4.87V20Z"
                  />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/ToEmpireX"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm9.25 1.5a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 2a1.8 1.8 0 1 0 1.8 1.8A1.8 1.8 0 0 0 12 10.2Z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="eq-footer-cols">
            <div className="eq-footer-col">
              <h4>Explore</h4>
              <Link to="/Space">Space</Link>
              <Link to="/Rockets">Rockets</Link>
              <Link to="/Missions">Missions</Link>
              <Link to="/Starlink">Starlink</Link>
            </div>

            <div className="eq-footer-col">
              <h4>Resources</h4>
              <Link to="/Technology">Technology</Link>
              <Link to="/Missions">Briefings</Link>
              <Link to="/Starlink">Updates</Link>
              <Link to="/Technology">Support</Link>
            </div>

            <div className="eq-footer-col">
              <h4>Project</h4>
              <Link to="/AboutDeV">About DeV</Link>
              <Link to="/">Home</Link>
              <Link to="/AboutDeV">Contact</Link>
              <Link to="/AboutDeV">Credits</Link>
            </div>
          </div>
        </div>

        <div className="eq-footer-bottom">
          <p>© {new Date().getFullYear()} EQUINOX. All rights reserved.</p>

          <div className="eq-footer-legal">
            <Link to="/AboutDeV">Privacy Policy</Link>
            <Link to="/AboutDeV">Terms of Service</Link>
            <Link to="/AboutDeV">Cookies Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
