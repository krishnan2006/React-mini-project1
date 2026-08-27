import { Link } from "react-router-dom";
import StatusPill from "./StatusPill";

function formatDeadline(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

// A single "pinned note" card. Used on the Browse/List page and the
// Dashboard's recent-postings strip. Receives one internship via props.
function InternshipCard({ internship }) {
  const { id, role, company, location, mode, domain, stipend, deadline, status } =
    internship;

  return (
    <Link to={`/internships/${id}`} className="pin-card">
      <div className="pin-card-head">
        <div>
          <h3 className="pin-role">{role}</h3>
          <p className="pin-company">{company}</p>
        </div>
        <StatusPill status={status} />
      </div>

      <div className="pin-meta">
        <span>{location}</span>
        <span>·</span>
        <span>{mode}</span>
        <span>·</span>
        <span>₹{stipend.toLocaleString("en-IN")}/mo</span>
      </div>

      <div className="pin-tags">
        {domain.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="pin-footer">
        <span className="deadline">Apply by {formatDeadline(deadline)}</span>
        <span className="btn btn-ghost btn-sm">View →</span>
      </div>
    </Link>
  );
}

export default InternshipCard;
