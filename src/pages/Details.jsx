import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import StatusPill from "../components/StatusPill";
import ConfirmModal from "../components/ConfirmModal";
import EmptyState from "../components/EmptyState";
import { STATUS_OPTIONS } from "../utils/storage";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Details screen — the full "posting sheet" for one internship, plus
// the quick-actions a student needs: change status, edit, or delete.
function Details({ internships, onDelete, onStatusChange }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const internship = internships.find((i) => i.id === id);

  if (!internship) {
    return (
      <EmptyState
        title="This posting isn't on the board"
        message="It may have been deleted already."
      />
    );
  }

  const {
    role,
    company,
    location,
    mode,
    domain,
    stipend,
    duration,
    deadline,
    posted,
    description,
    requirements,
    status,
    notes,
  } = internship;

  const handleDelete = () => {
    onDelete(id);
    navigate("/internships");
  };

  return (
    <div>
      <Link to="/internships" className="btn btn-ghost btn-sm" style={{ marginBottom: 18 }}>
        ← Back to board
      </Link>

      <div className="details-sheet">
        <div className="details-top">
          <div>
            <h1 className="details-role">{role}</h1>
            <p className="details-company">
              {company} · {location}
            </p>
          </div>
          <StatusPill status={status} />
        </div>

        <div className="pin-tags">
          {domain.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <dl className="details-grid">
          <div>
            <dt>Mode</dt>
            <dd>{mode}</dd>
          </div>
          <div>
            <dt>Stipend</dt>
            <dd>₹{stipend.toLocaleString("en-IN")}/mo</dd>
          </div>
          <div>
            <dt>Duration</dt>
            <dd>{duration}</dd>
          </div>
          <div>
            <dt>Deadline</dt>
            <dd>{formatDate(deadline)}</dd>
          </div>
          <div>
            <dt>Posted</dt>
            <dd>{formatDate(posted)}</dd>
          </div>
        </dl>

        <div className="details-section">
          <h3>About the role</h3>
          <p>{description}</p>
        </div>

        <div className="details-section">
          <h3>What they're looking for</h3>
          <ul>
            {requirements.map((req) => (
              <li key={req}>{req}</li>
            ))}
          </ul>
        </div>

        {notes && (
          <div className="details-section">
            <h3>Your notes</h3>
            <p>{notes}</p>
          </div>
        )}

        <div className="form-row" style={{ maxWidth: 220 }}>
          <label htmlFor="status-select">Update status</label>
          <select
            id="status-select"
            className="input select"
            value={status}
            onChange={(e) => onStatusChange(id, e.target.value)}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="details-actions">
          <Link to={`/edit/${id}`} className="btn btn-primary">
            Edit
          </Link>
          <button className="btn btn-danger" onClick={() => setConfirmOpen(true)}>
            Delete
          </button>
        </div>
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Remove this posting?"
        message={`This will remove "${role}" at ${company} from your board. This can't be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default Details;
