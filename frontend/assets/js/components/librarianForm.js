// components/LibraryForm.js
import { $, createElement } from "../utils/dom.js";
// ================================
// LIBRARIAN FORM HANDLERS
// ================================
export function resetLibrarianForm() {
  $("librarianForm").reset();
  $("librarianSubmitBtn").textContent = "Add Librarian";
  $("librarianCancelBtn").style.display = "none";
}

export function fillLibrarianForm(librarian) {
  $("librarianName").value = librarian.name || "";
  $("librarianEmail").value = librarian.email || "";
  $("librarianRole").value = librarian.role || "";
  $("librarianPhone").value = librarian.phone || "";
  $("librarianHireDate").value = librarian.hire_date || "";
  $("librarianSalary").value = librarian.salary ?? 0;
  
  $("librarianSubmitBtn").textContent = "Update Librarian";
  $("librarianCancelBtn").style.display = "block";
}
