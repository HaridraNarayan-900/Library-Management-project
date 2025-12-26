// components/LibraryForm.js
import { $, createElement } from "../utils/dom.js";

// ================================
// BOOKS FORM HANDLERS
// ================================
export function resetBookForm() {
  $("bookForm").reset();
  $("bookSubmitBtn").textContent = "Add Book";
  $("bookCancelBtn").style.display = "none";
}

export function fillBookForm(book) {
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
