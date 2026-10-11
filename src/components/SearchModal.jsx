import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";

import { search } from "../data/searchIndex";
import "./SearchModal.css";

const SUGGESTIONS = ["Mars", "Starlink", "Voyager", "Webb", "Falcon"];

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/* Wraps every matched token in <mark> */
function Highlight({ text, tokens }) {
  if (!text || !tokens.length) return text;

  const re = new RegExp(`(${tokens.map(escapeRe).join("|")})`, "gi");

  return text
    .split(re)
    .map((part, i) => (i % 2 === 1 ? <mark key={i}>{part}</mark> : part));
}

/* After navigating, the new page needs a moment to render
   (and App's ScrollToTop runs first), so retry briefly. */
function scrollToTarget(selector, delay) {
  let tries = 0;

  const attempt = () => {
    const found = document.querySelector(selector);
    const node = found?.closest("section") || found;

    if (node) {
      node.scrollIntoView({
        block: "start",
        behavior: delay ? "auto" : "smooth",
      });
      return;
    }

    if (tries++ < 20) setTimeout(attempt, 60);
  };

  setTimeout(attempt, delay);
}

function SearchIcon() {
  return (
    <svg
      className="search-field-icon"
      width="20"
      height="20"
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
  );
}

function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const inputRef = useRef(null);
  const listRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { results, tokens } = useMemo(() => search(query), [query]);

  /* Fresh state + focus each time it opens */
  useEffect(() => {
    if (!open) return;

    setQuery("");
    setActive(0);

    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  /* Lock page scroll while open */
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* Keep the highlighted result visible when using arrow keys */
  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  if (!open) return null;

  const go = (result) => {
    onClose();

    const samePage =
      location.pathname.toLowerCase() === result.to.toLowerCase();

    if (!samePage) navigate(result.to);
    if (result.target) scrollToTarget(result.target, samePage ? 0 : 120);
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter" && results[active]) {
      event.preventDefault();
      go(results[active]);
    }
  };

  const hasQuery = tokens.length > 0;

  return createPortal(
    <div
      className="search-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="search-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        onKeyDown={onKeyDown}
      >
        <div className="search-field">
          <SearchIcon />

          <input
            ref={inputRef}
            className="search-input"
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            placeholder="Search planets, missions, Starlink…"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            enterKeyHint="go"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
            aria-activedescendant={
              results[active] ? `search-option-${active}` : undefined
            }
            aria-label="Search the site"
          />

          <button type="button" className="search-close" onClick={onClose}>
            <span className="search-close-desktop">Esc</span>
            <span className="search-close-mobile">Close</span>
          </button>
        </div>

        <div className="search-body">
          {results.length > 0 && (
            <ul
              id="search-results"
              ref={listRef}
              className="search-results"
              role="listbox"
            >
              {results.map((result, i) => (
                <li
                  key={result.id}
                  id={`search-option-${i}`}
                  className="search-result"
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => active !== i && setActive(i)}
                  onClick={() => go(result)}
                >
                  <span className="search-result-kicker">
                    {result.page}
                    {result.section ? ` · ${result.section}` : ""}
                  </span>

                  <span className="search-result-title">
                    <Highlight text={result.title} tokens={tokens} />
                  </span>

                  {result.snippet && (
                    <span className="search-result-snippet">
                      <Highlight text={result.snippet} tokens={tokens} />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}

          {hasQuery && results.length === 0 && (
            <div className="search-empty" role="status">
              <p className="search-empty-title">No results for “{query.trim()}”</p>
              <p className="search-empty-text">
                Check the spelling, or try a shorter word.
              </p>
            </div>
          )}

          {!hasQuery && (
            <div className="search-empty">
              <p className="search-empty-text">Try one of these</p>

              <div className="search-chips">
                {SUGGESTIONS.map((word) => (
                  <button
                    key={word}
                    type="button"
                    className="search-chip"
                    onClick={() => {
                      setQuery(word);
                      setActive(0);
                      inputRef.current?.focus();
                    }}
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="search-footer" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> to move
          </span>
          <span>
            <kbd>Enter</kbd> to open
          </span>
          <span>
            <kbd>Esc</kbd> to close
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default SearchModal;