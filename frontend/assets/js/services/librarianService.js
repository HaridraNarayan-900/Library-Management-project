// frontend/assets/js/services/libraryServices.js

const API_BASE_URL = window.ENV?.API_BASE_URL || '/api';

// Helper: safely parse JSON or return null
async function safeJson(res) {
  try {
    return await res.json();
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return null;
  }
}

// ================================
// LIBRARIANS SERVICE
// ================================
export const librarianService = {
  // Fetch all librarians
  getAll: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/librarians`);
      if (!res.ok) return [];
      return safeJson(res);
    } catch (err) {
      console.error("Failed to fetch librarians:", err);
      return [];
    }
  },

  // Fetch one librarian by ID
  getOne: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/librarians/${id}`);
      if (!res.ok) return null;
      return safeJson(res);
    } catch (err) {
      console.error(`Failed to fetch librarian ${id}:`, err);
      return null;
    }
  },

  // Create a new librarian
  create: async (data) => {
    try {
      const res = await fetch(`${API_BASE_URL}/librarians`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) return null;
      return safeJson(res);
    } catch (err) {
      console.error("Failed to create librarian:", err);
      return null;
    }
  },

  // Update a librarian
  update: async (id, data) => {
    try {
      const res = await fetch(`${API_BASE_URL}/librarians/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) return null;
      return safeJson(res);
    } catch (err) {
      console.error(`Failed to update librarian ${id}:`, err);
      return null;
    }
  },

  // Delete a librarian
  delete: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/librarians/${id}`, {
        method: "DELETE",
      });
      return res.ok; // true if deleted successfully
    } catch (err) {
      console.error(`Failed to delete librarian ${id}:`, err);
      return false;
    }
  },
};




