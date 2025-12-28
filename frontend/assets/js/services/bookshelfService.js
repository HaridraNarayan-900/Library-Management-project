const API_BASE_URL = window.ENV?.API_BASE_URL || "/api";

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// ================================
// BOOKSHELF API FUNCTIONS
// ================================
export async function apiGetAll() {
  const res = await fetch(`${API_BASE_URL}/books`);
  return res.ok ? safeJson(res) : [];
}

export async function apiGetOne(id) {
  const res = await fetch(`${API_BASE_URL}/books/${id}`);
  return res.ok ? safeJson(res) : null;
}

export async function apiCreate(data) {
  const res = await fetch(`${API_BASE_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.ok ? safeJson(res) : null;
}

export async function apiUpdate(id, data) {
  const res = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.ok ? safeJson(res) : null;
}

export async function apiDelete(id) {
  const res = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}
