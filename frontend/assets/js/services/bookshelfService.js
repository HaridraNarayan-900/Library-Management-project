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
// BOOKSHELF SERVICE
// ================================
export const bookshelfService = {
  // Fetch all bookshelves
  getAll: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/bookshelves`);
      if (!res.ok) return [];
      return safeJson(res);
    } catch (err) {
      console.error("Failed to fetch bookshelves:", err);
      return [];
    }
  },

  // Fetch one bookshelf by ID
  getOne: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/bookshelves/${id}`);
      if (!res.ok) return null;
      return safeJson(res);
    } catch (err) {
      console.error(`Failed to fetch bookshelf ${id}:`, err);
      return null;
    }
  },

  // Create a new bookshelf
  create: async (data) => {
    try {
      const res = await fetch(`${API_BASE_URL}/bookshelves`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) return null;
      return safeJson(res);
    } catch (err) {
      console.error("Failed to create bookshelf:", err);
      return null;
    }
  },

  // Update a bookshelf
  update: async (id, data) => {
    try {
      const res = await fetch(`${API_BASE_URL}/bookshelves/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) return null;
      return safeJson(res);
    } catch (err) {
      console.error(`Failed to update bookshelf ${id}:`, err);
      return null;
    }
  },

  // Delete a bookshelf
  delete: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/bookshelves/${id}`, {
        method: "DELETE",
      });
      return res.ok; // true if deleted successfully
    } catch (err) {
      console.error(`Failed to delete bookshelf ${id}:`, err);
      return false;
    }
  },
};


