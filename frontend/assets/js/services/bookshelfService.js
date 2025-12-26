// frontend/assets/js/services/libraryServices.js

const API_BASE_URL = window.ENV?.API_BASE_URL || '/api';

// Helper: safely parse JSON or return null
async function safeJson(res) {
  try {
    return await res.json();
  } catch (_) {
    return null;
  }
}

// ================================
// BOOKSHELVES SERVICE
// ================================
export const bookshelfService = {
  // Fetch all bookshelves
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/bookshelves`);
    if (!res.ok) return [];
    return safeJson(res);
  },

  // Fetch one bookshelf by ID
  getOne: async (id) => {
    const res = await fetch(`${API_BASE_URL}/bookshelves/${id}`);
    if (!res.ok) return null;
    return safeJson(res);
  },

  // Create a new bookshelf
  create: (data) => fetch(`${API_BASE_URL}/bookshelves`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }),

  // Update a bookshelf
  update: (id, data) => fetch(`${API_BASE_URL}/bookshelves/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }),

  // Delete a bookshelf
  delete: (id) => fetch(`${API_BASE_URL}/bookshelves/${id}`, {
    method: "DELETE"
  })
};

