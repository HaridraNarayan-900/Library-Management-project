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
export async function getAllLibrarians() {
  try {
    const res = await fetch(`${API_BASE_URL}/librarians`);
    if (!res.ok) return [];
    return await safeJson(res);
  } catch (err) {
    console.error("Failed to fetch librarians:", err);
    return [];
  }
}

export async function getLibrarian(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/librarians/${id}`);
    if (!res.ok) return null;
    return await safeJson(res);
  } catch (err) {
    console.error(`Failed to fetch librarian ${id}:`, err);
    return null;
  }
}

export async function createLibrarian(data) {
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

export async function updateLibrarian(id, data) {
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

export async function deleteLibrarian(id) {
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
