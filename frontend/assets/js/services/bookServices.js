// frontend/assets/js/services/bookServices.js

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
// BOOKS SERVICE
// ================================
export const bookService = {
  // Fetch all books
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/books`);
    if (!res.ok) return [];
    return safeJson(res);
  },

  // Fetch one book by ID
  getOne: async (id) => {
    const res = await fetch(`${API_BASE_URL}/books/${id}`);
    if (!res.ok) return null;
    return safeJson(res);
  },

  // Create a new book
  create: (data) => fetch(`${API_BASE_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }),

  // Update a book
  update: (id, data) => fetch(`${API_BASE_URL}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }),

  // Delete a book
  delete: (id) => fetch(`${API_BASE_URL}/books/${id}`, {
    method: "DELETE"
  })
};
