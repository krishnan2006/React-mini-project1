const CLASS_MAP = {
  Saved: "stamp-saved",
  Applied: "stamp-applied",
  Interview: "stamp-interview",
  Offer: "stamp-offer",
  Rejected: "stamp-rejected",
};

// Renders a status as a little rubber-stamp badge. Reused on cards,
// the details sheet, and the summary board.
function StatusPill({ status }) {
  const cls = CLASS_MAP[status] || "stamp-saved";
  return <span className={`stamp ${cls}`}>{status}</span>;
}

export default StatusPill;
