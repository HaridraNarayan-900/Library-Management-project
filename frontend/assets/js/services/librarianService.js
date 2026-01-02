// Base API URL from env.js
const API_URL = `${window.ENV.API_BASE_URL}/librarians`;

// Helper: safely parse JSON or return null
async function safeJson(res) {
  try {
    return await res.json();
  } catch (_) {
    return null;
  }
}

// Fetch all Librarians
export async function apiGetAllLibrarians() {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  return safeJson(res);
}

// Fetch one Librarian by ID
export async function apiGetOneLibrarian(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return null;
  return safeJson(res);
}

// Create a new Librarian
export function apiCreateLibrarian(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Update a Librarian
export function apiUpdateLibrarian(id, data) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Delete a Librarian
export function apiDeleteLibrarian(id) {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

