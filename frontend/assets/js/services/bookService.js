// Base API URL from env.js
const API_URL = `${window.ENV.API_BASE_URL}/books`;

// Helper: safely parse JSON or return null
async function safeJson(res) {
  try {
    return await res.json();
  } catch (_) {
    return null;
  }
}

// Fetch all books
export async function apiGetAllBooks() {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  return safeJson(res);
}

// Fetch one book by ID
export async function apiGetOneBook(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return null;
  return safeJson(res);
}

// Create a new book
export function apiCreateBook(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Update a book
export function apiUpdateBook(id, data) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Delete a book
export function apiDeleteBook(id) {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

