const API_BASE_URL = window.ENV?.API_BASE_URL || "/api";

// Helper: safely parse JSON
async function safeJson(res) {
  try {
    return await res.json();
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return null;
  }
}

// ================================
// BOOKSHELF API FUNCTIONS
// ================================

// Fetch all bookshelves
export async function apiGetAll() {
  try {
    const res = await fetch(`${API_BASE_URL}/bookshelves`);
    if (!res.ok) return [];
    return await safeJson(res);
  } catch (err) {
    console.error("Failed to fetch bookshelves:", err);
    return [];
  }
}

// Fetch one bookshelf by ID
export async function apiGetOne(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/bookshelves/${id}`);
    if (!res.ok) return null;
    return await safeJson(res);
  } catch (err) {
    console.error(`Failed to fetch bookshelf ${id}:`, err);
    return null;
  }
}

// Create a new bookshelf
export async function apiCreate(data) {
  try {
    const res = await fetch(`${API_BASE_URL}/bookshelves`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return await safeJson(res);
  } catch (err) {
    console.error("Failed to create bookshelf:", err);
    return null;
  }
}

// Update a bookshelf
export async function apiUpdate(id, data) {
  try {
    const res = await fetch(`${API_BASE_URL}/bookshelves/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return await safeJson(res);
  } catch (err) {
    console.error(`Failed to update bookshelf ${id}:`, err);
    return null;
  }
}

// Delete a bookshelf
export async function apiDelete(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/bookshelves/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (err) {
    console.error(`Failed to delete bookshelf ${id}:`, err);
    return false;
  }
}
