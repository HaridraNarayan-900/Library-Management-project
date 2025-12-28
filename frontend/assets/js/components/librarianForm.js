// frontend/assets/js/components/librarianForm.js
import { $ } from "../utils/dom.js";

// ================================
// LIBRARIAN FORM HANDLERS
// ================================

// Reset the librarian form to default state
export function resetLibrarianForm() {
  const form = $("librarianForm");
  if (form) form.reset();

  // Reset submit button text
  const submitBtn = $("librarianSubmitBtn");
  if (submitBtn) submitBtn.textContent = "Add Librarian";

  // Hide cancel button
  const cancelBtn = $("librarianCancelBtn");
  if (cancelBtn) cancelBtn.style.display = "none";
}

// Fill the librarian form for editing
export function fillLibrarianForm(librarian) {
  if (!librarian) return;

  $("librarianName").value = librarian.name || "";
  $("librarianEmail").value = librarian.email || "";
  $("librarianRole").value = librarian.role || "";
  $("librarianPhone").value = librarian.phone || "";
  $("librarianHireDate").value = librarian.hire_date || "";
  $("librarianSalary").value = librarian.salary ?? 0;

  // Update button text for editing mode
  const submitBtn = $("librarianSubmitBtn");
  if (submitBtn) submitBtn.textContent = "Update Librarian";

  // Show cancel button when editing
  const cancelBtn = $("librarianCancelBtn");
  if (cancelBtn) cancelBtn.style.display = "block";
}
