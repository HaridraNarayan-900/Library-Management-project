import { $ } from "../utils/dom.js";

export function resetLibrarianForm() {
  $("librariansForm")?.reset();
  $("librarianSubmitBtn").textContent = "Add Librarian";
  $("cancelLibrarianBtn").classList.add("hidden");
}

export function fillLibrarianForm(l) {
  $("librarianName").value = l.name || "";
  $("librarianEmail").value = l.email || "";
  $("librarianPhone").value = l.phone || "";
  $("librarianPosition").value = l.position || "";

  $("librarianSubmitBtn").textContent = "Update Librarian";
  $("cancelLibrarianBtn").classList.remove("hidden");
}


