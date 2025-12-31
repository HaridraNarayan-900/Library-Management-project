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
// LIBRARIAN API FUNCTIONS
// ================================

// Fetch all librarians
export async function apiGetAll() {
  try {
    const res = await fetch(`${API_BASE_URL}/librarians`);
    if (!res.ok) return [];
    return await safeJson(res);
  } catch (err) {
    console.error("Failed to fetch librarians:", err);
    return [];
  }
}

// Fetch one librarian by ID
export async function apiGetOne(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/librarians/${id}`);
    if (!res.ok) return null;
    return await safeJson(res);
  } catch (err) {
    console.error(`Failed to fetch librarian ${id}:`, err);
    return null;
  }
}

// Create a new librarian
export async function apiCreate(data) {
  try {
    const res = await fetch(`${API_BASE_URL}/librarians`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return await safeJson(res);
  } catch (err) {
    console.error("Failed to create librarian:", err);
    return null;
  }
}

// Update a librarian
export async function apiUpdate(id, data) {
  try {
    const res = await fetch(`${API_BASE_URL}/librarians/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return await safeJson(res);
  } catch (err) {
    console.error(`Failed to update librarian ${id}:`, err);
    return null;
  }
}

// Delete a librarian
export async function apiDelete(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/librarians/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (err) {
    console.error(`Failed to delete librarian ${id}:`, err);
    return false;
  }
}
