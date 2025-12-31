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
  listeners.forEach((listener) => listener(state));
}

// ============================
