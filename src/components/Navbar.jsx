import { useState } from "react";
import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/internships", label: "Browse" },
  { to: "/add", label: "Add New" },
  { to: "/summary", label: "Summary" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">◆</span>
          <span className="brand-name">Internship Finder</span>
        </NavLink>

        <button
          className="nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
