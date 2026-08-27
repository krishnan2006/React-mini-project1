import { Link } from "react-router-dom";
import { STATUS_OPTIONS } from "../utils/storage";
import EmptyState from "../components/EmptyState";

// Summary / Status — a kanban-style overview of the whole pipeline,
// grouped by status with reduce() so every posting appears exactly
// once, in the right column.
function Summary({ internships }) {
  const grouped = STATUS_OPTIONS.reduce((acc, status) => {
    acc[status] = internships.filter((i) => i.status === status);
    return acc;
  }, {});

  if (internships.length === 0) {
    return (
      <EmptyState
        title="Your board is empty"
        message="Add an internship to see your pipeline summary here."
      />
    );
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <p className="page-eyebrow">Pipeline</p>
          <h1 className="page-title">Where things stand</h1>
          <p className="page-sub">
            Every internship you're tracking, grouped by where it is in the
            process.
          </p>
        </div>
      </div>

      <div className="kanban">
        {STATUS_OPTIONS.map((status) => (
          <div className="kanban-col" key={status}>
            <div className="kanban-col-head">
              <strong>{status}</strong>
              <span className="kanban-count">{grouped[status].length}</span>
            </div>
            {grouped[status].map((item) => (
              <Link
                key={item.id}
                to={`/internships/${item.id}`}
                className="kanban-item"
              >
                <strong>{item.role}</strong>
                <span>{item.company}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Summary;
