// Base API URL from env.js
const API_URL = window.ENV.API_BASE_URL;

// Helper: safely parse JSON or return null
async function safeJson(res) {
  try {
    return await res.json();
  } catch (_) {
    return null;
  }
}

// Fetch all Bookshelves
export async function apiGetAllBookshelves() {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  return safeJson(res);
}

// Fetch one Bookshelf by ID
export async function apiGetOneBookshelf(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return null;
  return safeJson(res);
}

// Create a new Bookshelf
export function apiCreateBookshelf(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Update a Bookshelf
export function apiUpdateBookshelf(id, data) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Delete a Bookshelf
export function apiDeleteBookshelf(id) {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

