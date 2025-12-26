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
// Librarians SERVICE
// ================================
export const librarianService = {
  // Fetch all librarians
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/librarians`);
    if (!res.ok) return [];
    return safeJson(res);
  },

  // Fetch one librarian by ID
  getOne: async (id) => {
    const res = await fetch(`${API_BASE_URL}/librarians/${id}`);
    if (!res.ok) return null;
    return safeJson(res);
  },

  // Create a new librarian
  create: (data) => fetch(`${API_BASE_URL}/librarians`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }),

  // Update a librarian
  update: (id, data) => fetch(`${API_BASE_URL}/librarians/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }),

  // Delete a librarian
  delete: (id) => fetch(`${API_BASE_URL}/librarians/${id}`, {
    method: "DELETE"
  })
};



