// ================================
// GLOBAL STATE
// ================================
let state = {
  editingId: null,      // ID of the item currently being edited
  books: [],            // Array of all books
  librarians: [],       // Array of all librarians
  bookshelves: []       // Array of all bookshelves
};

// Optional: listeners for reactive updates
const listeners = [];

// ================================
// SET STATE
// ================================
export function setState(newState) {
  state = { ...state, ...newState };
  // Notify all listeners of state change
  listeners.forEach((listener) => listener({ ...state }));
}

// ================================
// GET STATE
// ================================
export function getState() {
  // Return a copy to prevent accidental direct mutation
  return { ...state };
}

// ================================
// SUBSCRIBE TO STATE CHANGES (optional)
// ================================
export function subscribe(listener) {
  if (typeof listener === "function") {
    listeners.push(listener);
  }
}
