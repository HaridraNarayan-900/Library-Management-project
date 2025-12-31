import { $ } from "../utils/dom.js";

// ================================
// LIBRARIAN FORM HANDLERS
// ================================

export function resetLibrarianForm() {
  const form = $("librariansForm");
  if (form) form.reset();

  const submitBtn = $("librarianSubmitBtn");
  if (submitBtn) submitBtn.textContent = "Add Librarian";

  const cancelBtn = $("cancelLibrarianBtn");
  if (cancelBtn) cancelBtn.style.display = "none";
}

export function fillLibrarianForm(librarian) {
  if (!librarian) return;

  $("librarianName").value = librarian.name || "";
  $("librarianEmail").value = librarian.email || "";
  $("librarianRole").value = librarian.role || "";
  $("librarianPhone").value = librarian.phone || "";
  $("librarianHireDate").value = librarian.hire_date || "";
  $("librarianSalary").value = librarian.salary ?? 0;

  const submitBtn = $("librarianSubmitBtn");
  if (submitBtn) submitBtn.textContent = "Update Librarian";

  const cancelBtn = $("cancelLibrarianBtn");
  if (cancelBtn) cancelBtn.style.display = "block";
}

