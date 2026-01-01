const state = {
  editingId: null,
};

export function setState(newState) {
  Object.assign(state, newState);
}

export function getState() {
  return state;
}


