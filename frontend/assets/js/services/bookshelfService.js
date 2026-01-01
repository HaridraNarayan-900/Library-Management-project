import { API_BASE_URL, safeJson } from "./app.js";

export async function getAllBookshelves() {
  const res = await fetch(`${API_BASE_URL}/bookshelves`);
  return res.ok ? safeJson(res) : [];
}

export async function getBookshelf(id) {
  const res = await fetch(`${API_BASE_URL}/bookshelves/${id}`);
  return res.ok ? safeJson(res) : null;
}

export async function createBookshelf(data) {
  const res = await fetch(`${API_BASE_URL}/bookshelves`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.ok ? safeJson(res) : null;
}

export async function updateBookshelf(id, data) {
  const res = await fetch(`${API_BASE_URL}/bookshelves/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.ok ? safeJson(res) : null;
}

export async function deleteBookshelf(id) {
  const res = await fetch(`${API_BASE_URL}/bookshelves/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}
