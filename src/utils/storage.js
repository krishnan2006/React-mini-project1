import seedData from "../data/internships";

const STORAGE_KEY = "internship-finder-data";

// Load internships from localStorage, seeding it with mock data on first run.
export function loadInternships() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    return seedData;
  } catch (err) {
    console.error("Could not read internships from storage", err);
    return seedData;
  }
}

export function persistInternships(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error("Could not save internships to storage", err);
  }
}

export function makeId() {
  return `int-${Date.now().toString(36)}`;
}

export const STATUS_OPTIONS = [
  "Saved",
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

export const MODE_OPTIONS = ["Onsite", "Remote", "Hybrid"];
