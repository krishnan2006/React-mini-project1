import { MODE_OPTIONS } from "../utils/storage";

// Controlled search + mode-filter bar. Parent owns the state and
// passes down the current values and change handlers via props.
function FilterBar({ query, onQueryChange, activeMode, onModeChange }) {
  return (
    <div className="filter-bar">
      <input
        className="input search-input"
        type="text"
        placeholder="Search by role, company, or skill…"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        aria-label="Search internships"
      />
      <div className="chip-row">
        <button
          className={`chip ${activeMode === "All" ? "active" : ""}`}
          onClick={() => onModeChange("All")}
        >
          All
        </button>
        {MODE_OPTIONS.map((mode) => (
          <button
            key={mode}
            className={`chip ${activeMode === mode ? "active" : ""}`}
            onClick={() => onModeChange(mode)}
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
