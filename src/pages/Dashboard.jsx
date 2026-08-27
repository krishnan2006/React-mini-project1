import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import InternshipCard from "../components/InternshipCard";
import EmptyState from "../components/EmptyState";
import { STATUS_OPTIONS } from "../utils/storage";

// Home / Dashboard — the landing screen. Summarises the student's
// pipeline at a glance and surfaces the most recently posted roles.
function Dashboard({ internships }) {
  const counts = STATUS_OPTIONS.reduce((acc, status) => {
    acc[status] = internships.filter((i) => i.status === status).length;
    return acc;
  }, {});

  const deadlineSoon = internships.filter((i) => {
    const days = (new Date(i.deadline) - new Date()) / 86400000;
    return days >= 0 && days <= 7 && i.status !== "Rejected";
  }).length;

  const recent = [...internships]
    .sort((a, b) => new Date(b.posted) - new Date(a.posted))
    .slice(0, 3);

  return (
    <div>
      <div className="page-head">
        <div>
          <p className="page-eyebrow">Placement Cell · Your Board</p>
          <h1 className="page-title">Good to see you, Krishnan.</h1>
          <p className="page-sub">
            Track every internship you're eyeing, applying to, or hearing
            back from — all pinned to one board.
          </p>
        </div>
        <Link to="/add" className="btn btn-primary">
          + Add Internship
        </Link>
      </div>

      <div className="stat-grid">
        <StatCard label="Total tracked" value={internships.length} />
        <StatCard label="Saved" value={counts.Saved} />
        <StatCard label="Applied" value={counts.Applied} />
        <StatCard label="Interviews" value={counts.Interview} />
        <StatCard label="Due in 7 days" value={deadlineSoon} />
      </div>

      <div className="page-head">
        <div>
          <p className="page-eyebrow">Fresh on the board</p>
          <h2 className="page-title" style={{ fontSize: "1.4rem" }}>
            Recently posted
          </h2>
        </div>
        <Link to="/internships" className="btn btn-ghost btn-sm">
          Browse all →
        </Link>
      </div>

      {recent.length === 0 ? (
        <EmptyState
          title="Nothing pinned yet"
          message="Add your first internship to start tracking it here."
        />
      ) : (
        <div className="board-grid">
          {recent.map((item) => (
            <InternshipCard key={item.id} internship={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
