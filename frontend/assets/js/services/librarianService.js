import { API_BASE_URL, safeJson } from "./app.js";

export async function getAllLibrarians() {
  const res = await fetch(`${API_BASE_URL}/librarians`);
  return res.ok ? safeJson(res) : [];
}

export async function getLibrarian(id) {
  const res = await fetch(`${API_BASE_URL}/librarians/${id}`);
  return res.ok ? safeJson(res) : null;
}

export async function createLibrarian(data) {
  const res = await fetch(`${API_BASE_URL}/librarians`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.ok ? safeJson(res) : null;
}

export async function updateLibrarian(id, data) {
  const res = await fetch(`${API_BASE_URL}/librarians/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.ok ? safeJson(res) : null;
}

export async function deleteLibrarian(id) {
  const res = await fetch(`${API_BASE_URL}/librarians/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}
