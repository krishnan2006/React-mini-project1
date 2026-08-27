import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { STATUS_OPTIONS, MODE_OPTIONS, makeId } from "../utils/storage";

const BLANK = {
  company: "",
  role: "",
  location: "",
  mode: "Onsite",
  domain: "",
  stipend: "",
  duration: "",
  deadline: "",
  description: "",
  requirements: "",
  status: "Saved",
  notes: "",
};

// Add / Edit — one controlled form doubles as both screens. When the
// route carries an :id, it's pre-filled from the matching internship
// and submits update onSave(); otherwise it creates a new entry.
function AddEditForm({ internships, onSave }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(BLANK);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isEdit) return;
    const existing = internships.find((i) => i.id === id);
    if (existing) {
      setForm({
        ...existing,
        domain: existing.domain.join(", "),
        requirements: existing.requirements.join("\n"),
        stipend: String(existing.stipend),
      });
    }
  }, [id, isEdit, internships]);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!form.company.trim()) next.company = "Company name is required.";
    if (!form.role.trim()) next.role = "Role title is required.";
    if (!form.location.trim()) next.location = "Location is required.";
    if (!form.domain.trim()) next.domain = "Add at least one domain/tag.";

    const stipendNum = Number(form.stipend);
    if (!form.stipend || Number.isNaN(stipendNum) || stipendNum <= 0) {
      next.stipend = "Enter a stipend amount greater than 0.";
    }

    if (!form.duration.trim()) next.duration = "Duration is required.";

    if (!form.deadline) {
      next.deadline = "Pick an application deadline.";
    }

    if (!form.description.trim() || form.description.trim().length < 20) {
      next.description = "Describe the role in at least 20 characters.";
    }

    if (!form.requirements.trim()) {
      next.requirements = "List at least one requirement (one per line).";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      id: isEdit ? id : makeId(),
      company: form.company.trim(),
      role: form.role.trim(),
      location: form.location.trim(),
      mode: form.mode,
      domain: form.domain
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean),
      stipend: Number(form.stipend),
      duration: form.duration.trim(),
      deadline: form.deadline,
      posted: isEdit
        ? internships.find((i) => i.id === id)?.posted ?? new Date().toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      description: form.description.trim(),
      requirements: form.requirements
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
      status: form.status,
      notes: form.notes.trim(),
    };

    onSave(payload, isEdit);
    navigate(`/internships/${payload.id}`);
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <p className="page-eyebrow">{isEdit ? "Edit" : "Add"}</p>
          <h1 className="page-title">
            {isEdit ? "Update this posting" : "Pin a new internship"}
          </h1>
          <p className="page-sub">
            Fields marked required keep your board searchable and your
            summary board accurate.
          </p>
        </div>
      </div>

      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <div className="form-grid-2">
          <div className="form-row">
            <label htmlFor="company">Company *</label>
            <input
              id="company"
              className={`input ${errors.company ? "has-error" : ""}`}
              value={form.company}
              onChange={handleChange("company")}
              placeholder="e.g. Cognizant"
            />
            {errors.company && <span className="field-error">{errors.company}</span>}
          </div>

          <div className="form-row">
            <label htmlFor="role">Role title *</label>
            <input
              id="role"
              className={`input ${errors.role ? "has-error" : ""}`}
              value={form.role}
              onChange={handleChange("role")}
              placeholder="e.g. Embedded Systems Intern"
            />
            {errors.role && <span className="field-error">{errors.role}</span>}
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-row">
            <label htmlFor="location">Location *</label>
            <input
              id="location"
              className={`input ${errors.location ? "has-error" : ""}`}
              value={form.location}
              onChange={handleChange("location")}
              placeholder="e.g. Coimbatore / Remote"
            />
            {errors.location && <span className="field-error">{errors.location}</span>}
          </div>

          <div className="form-row">
            <label htmlFor="mode">Mode</label>
            <select
              id="mode"
              className="input select"
              value={form.mode}
              onChange={handleChange("mode")}
            >
              {MODE_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="domain">Domain / tags *</label>
          <input
            id="domain"
            className={`input ${errors.domain ? "has-error" : ""}`}
            value={form.domain}
            onChange={handleChange("domain")}
            placeholder="Comma separated, e.g. IoT, Embedded Systems"
          />
          {errors.domain && <span className="field-error">{errors.domain}</span>}
        </div>

        <div className="form-grid-2">
          <div className="form-row">
            <label htmlFor="stipend">Stipend (₹/month) *</label>
            <input
              id="stipend"
              type="number"
              min="0"
              className={`input ${errors.stipend ? "has-error" : ""}`}
              value={form.stipend}
              onChange={handleChange("stipend")}
              placeholder="e.g. 12000"
            />
            {errors.stipend && <span className="field-error">{errors.stipend}</span>}
          </div>

          <div className="form-row">
            <label htmlFor="duration">Duration *</label>
            <input
              id="duration"
              className={`input ${errors.duration ? "has-error" : ""}`}
              value={form.duration}
              onChange={handleChange("duration")}
              placeholder="e.g. 8 weeks"
            />
            {errors.duration && <span className="field-error">{errors.duration}</span>}
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-row">
            <label htmlFor="deadline">Application deadline *</label>
            <input
              id="deadline"
              type="date"
              className={`input ${errors.deadline ? "has-error" : ""}`}
              value={form.deadline}
              onChange={handleChange("deadline")}
            />
            {errors.deadline && <span className="field-error">{errors.deadline}</span>}
          </div>

          <div className="form-row">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              className="input select"
              value={form.status}
              onChange={handleChange("status")}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="description">Role description *</label>
          <textarea
            id="description"
            className={`input ${errors.description ? "has-error" : ""}`}
            rows={4}
            value={form.description}
            onChange={handleChange("description")}
            placeholder="What will you actually be doing?"
          />
          {errors.description && (
            <span className="field-error">{errors.description}</span>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="requirements">Requirements * (one per line)</label>
          <textarea
            id="requirements"
            className={`input ${errors.requirements ? "has-error" : ""}`}
            rows={3}
            value={form.requirements}
            onChange={handleChange("requirements")}
            placeholder={"e.g.\nBasics of C/C++\nCoursework in embedded systems"}
          />
          {errors.requirements && (
            <span className="field-error">{errors.requirements}</span>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="notes">Your notes (optional)</label>
          <textarea
            id="notes"
            className="input"
            rows={2}
            value={form.notes}
            onChange={handleChange("notes")}
            placeholder="Referral contact, interview prep reminders…"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEdit ? "Save changes" : "Add to board"}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditForm;
