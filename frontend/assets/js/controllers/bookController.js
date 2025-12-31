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
// BOOK API FUNCTIONS
// ================================
export async function getAllBooks() {
  try {
    const res = await fetch(`${API_BASE_URL}/books`);
    if (!res.ok) return [];
    return await safeJson(res);
  } catch (err) {
    console.error("Failed to fetch books:", err);
    return [];
  }
}

export async function getBook(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/books/${id}`);
    if (!res.ok) return null;
    return await safeJson(res);
  } catch (err) {
    console.error(`Failed to fetch book ${id}:`, err);
    return null;
  }
}

export async function createBook(data) {
  try {
    const res = await fetch(`${API_BASE_URL}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return await safeJson(res);
  } catch (err) {
    console.error("Failed to create book:", err);
    return null;
  }
}

export async function updateBook(id, data) {
  try {
    const res = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return await safeJson(res);
  } catch (err) {
    console.error(`Failed to update book ${id}:`, err);
    return null;
  }
}

export async function deleteBook(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (err) {
    console.error(`Failed to delete book ${id}:`, err);
    return false;
  }
}
