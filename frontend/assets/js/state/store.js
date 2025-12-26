let state = {
  editingId: null,
  books: [],
  librarians: [],
  bookshelves: []

};

// Update part of the state
export function setState(newState) {
  state = { ...state, ...newState };
}

// Read the current state
export function getState() {
  return state;
}