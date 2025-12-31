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
export async function getAllBookshelves() {
  try {
    const res = await fetch(`${API_BASE_URL}/bookshelves`);
    if (!res.ok) return [];
    return await safeJson(res);
  } catch (err) {
    console.error("Failed to fetch bookshelves:", err);
    return [];
  }
}

export async function getBookshelf(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/bookshelves/${id}`);
    if (!res.ok) return null;
    return await safeJson(res);
  } catch (err) {
    console.error(`Failed to fetch bookshelf ${id}:`, err);
    return null;
  }
}

export async function createBookshelf(data) {
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

export async function updateBookshelf(id, data) {
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

export async function deleteBookshelf(id) {
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
