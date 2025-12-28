// components/bookForm.js
import { $ } from "../utils/dom.js";

// ================================
// BOOK FORM HANDLERS
// ================================
export function resetForm() {
  $("bookForm").reset();
  $("bookSubmitBtn").textContent = "Add Book";
  $("bookCancelBtn").style.display = "none";
}

export function fillForm(book) {
  $("bookTitle").value = book.title || "";
  $("bookAuthor").value = book.author || "";
  $("bookIsbn").value = book.isbn || "";
  $("bookCategory").value = book.category || "";
  $("bookTotalCopies").value = book.total_copies ?? 1;
  $("bookAvailableCopies").value = book.available_copies ?? 1;
  $("bookPublishedYear").value = book.published_year || "";

  $("bookSubmitBtn").textContent = "Update Book";
  $("bookCancelBtn").style.display = "block";
}

