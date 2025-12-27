// frontend/assets/js/services/bookServices.js

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
// BOOKS SERVICE
// ================================
export const bookService = {
  // Fetch all books
  getAll: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/books`);
      if (!res.ok) {
        console.error(`Failed to fetch books: ${res.status} ${res.statusText}`);
        return [];
      }
      return await safeJson(res);
    } catch (err) {
      console.error("Failed to fetch books:", err);
      return [];
    }
  },

  // Fetch one book by ID
  getOne: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/books/${id}`);
      if (!res.ok) {
        console.error(`Failed to fetch book ${id}: ${res.status} ${res.statusText}`);
        return null;
      }
      return await safeJson(res);
    } catch (err) {
      console.error(`Failed to fetch book ${id}:`, err);
      return null;
    }
  },

  // Create a new book
  create: async (data) => {
    try {
      const res = await fetch(`${API_BASE_URL}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        console.error(`Failed to create book: ${res.status} ${res.statusText}`);
        return null;
      }
      return await safeJson(res);
    } catch (err) {
      console.error("Failed to create book:", err);
      return null;
    }
  },

  // Update a book
  update: async (id, data) => {
    try {
      const res = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        console.error(`Failed to update book ${id}: ${res.status} ${res.statusText}`);
        return null;
      }
      return await safeJson(res);
    } catch (err) {
      console.error(`Failed to update book ${id}:`, err);
      return null;
    }
  },

  // Delete a book
  delete: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        console.error(`Failed to delete book ${id}: ${res.status} ${res.statusText}`);
        return false;
      }
      return true;
    } catch (err) {
      console.error(`Failed to delete book ${id}:`, err);
      return false;
    }
  },
};

