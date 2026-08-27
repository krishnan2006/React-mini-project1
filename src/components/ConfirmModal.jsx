// Small confirm dialog, kept generic so it can be reused for any
// destructive action. Parent controls visibility via the `open` prop.
function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h4>{title}</h4>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn btn-ghost btn-sm" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger btn-sm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
