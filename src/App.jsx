import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import Dashboard from "./pages/Dashboard";
import ListSearch from "./pages/ListSearch";
import Details from "./pages/Details";
import AddEditForm from "./pages/AddEditForm";
import Summary from "./pages/Summary";
import { loadInternships, persistInternships } from "./utils/storage";

function App() {
  // Internship data lives here and is passed down as props — this is
  // the single source of truth for every page.
  const [internships, setInternships] = useState([]);
  const [toast, setToast] = useState("");

  // Load once on mount (from localStorage, seeded with mock data).
  useEffect(() => {
    setInternships(loadInternships());
  }, []);

  // Keep localStorage in sync whenever the list changes.
  useEffect(() => {
    if (internships.length > 0) persistInternships(internships);
  }, [internships]);

  const handleSave = useCallback((entry, isEdit) => {
    setInternships((prev) => {
      if (isEdit) {
        return prev.map((i) => (i.id === entry.id ? entry : i));
      }
      return [entry, ...prev];
    });
    setToast(isEdit ? "Changes saved." : "Added to your board.");
  }, []);

  const handleDelete = useCallback((id) => {
    setInternships((prev) => prev.filter((i) => i.id !== id));
    setToast("Removed from your board.");
  }, []);

  const handleStatusChange = useCallback((id, status) => {
    setInternships((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
    setToast(`Status updated to ${status}.`);
  }, []);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard internships={internships} />} />
          <Route
            path="/internships"
            element={<ListSearch internships={internships} />}
          />
          <Route
            path="/internships/:id"
            element={
              <Details
                internships={internships}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            }
          />
          <Route
            path="/add"
            element={
              <AddEditForm internships={internships} onSave={handleSave} />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <AddEditForm internships={internships} onSave={handleSave} />
            }
          />
          <Route
            path="/summary"
            element={<Summary internships={internships} />}
          />
        </Routes>
      </main>
      <p className="footer-note">Internship Finder · built with React</p>
      <Toast message={toast} onDone={() => setToast("")} />
    </div>
  );
}

export default App;
