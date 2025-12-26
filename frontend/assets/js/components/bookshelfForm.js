// components/LibraryForm.js
import { $, createElement } from "../utils/dom.js";
// ================================
// BOOKSHELF FORM HANDLERS
// ================================
export function resetBookshelfForm() {
  $("bookshelfForm").reset();
  $("bookshelfSubmitBtn").textContent = "Add Bookshelf";
  $("bookshelfCancelBtn").style.display = "none";
}

export function fillBookshelfForm(bookshelf) {
  $("bookshelfName").value = bookshelf.name || "";
  $("bookshelfZone").value = bookshelf.zone || "";
  $("bookshelfCapacity").value = bookshelf.capacity ?? 50;
  $("bookshelfCurrentCount").value = bookshelf.current_count ?? 0;
  $("bookshelfLocation").value = bookshelf.location || "";
  
  $("bookshelfSubmitBtn").textContent = "Update Bookshelf";
  $("bookshelfCancelBtn").style.display = "block";
}
