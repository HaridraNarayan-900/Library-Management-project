import { API_BASE_URL, safeJson } from "./app.js";

export async function getAllBooks() {
  const res = await fetch(`${API_BASE_URL}/books`);
  return res.ok ? safeJson(res) : [];
}

export async function getBook(id) {
  const res = await fetch(`${API_BASE_URL}/books/${id}`);
  return res.ok ? safeJson(res) : null;
}

export async function createBook(data) {
  const res = await fetch(`${API_BASE_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.ok ? safeJson(res) : null;
}

export async function updateBook(id, data) {
  const res = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.ok ? safeJson(res) : null;
}

export async function deleteBook(id) {
  const res = await fetch(`${API_BASE_URL}/books/${id}`, { method: "DELETE" });
  return res.ok;
}
