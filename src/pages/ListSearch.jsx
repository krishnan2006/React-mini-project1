import { useState } from "react";
import FilterBar from "../components/FilterBar";
import InternshipCard from "../components/InternshipCard";
import EmptyState from "../components/EmptyState";

// List / Search — browse the full board with live text search and
// mode filtering. All filtering state is local (useState); the data
// itself is lifted up in App and passed down as a prop.
function ListSearch({ internships }) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("All");

  const filtered = internships.filter((item) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q === "" ||
      item.role.toLowerCase().includes(q) ||
      item.company.toLowerCase().includes(q) ||
      item.domain.some((d) => d.toLowerCase().includes(q));
    const matchesMode = mode === "All" || item.mode === mode;
    return matchesQuery && matchesMode;
  });

  return (
    <div>
      <div className="page-head">
        <div>
          <p className="page-eyebrow">Browse</p>
          <h1 className="page-title">All internships</h1>
          <p className="page-sub">
            {filtered.length} of {internships.length} postings match your
            filters.
          </p>
        </div>
      </div>

      <FilterBar
        query={query}
        onQueryChange={setQuery}
        activeMode={mode}
        onModeChange={setMode}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No matches"
          message="Try a different keyword or clear the mode filter."
        />
      ) : (
        <div className="board-grid">
          {filtered.map((item) => (
            <InternshipCard key={item.id} internship={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListSearch;
