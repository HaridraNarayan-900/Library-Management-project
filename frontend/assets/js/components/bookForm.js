import { $ } from "../utils/dom.js";

export function resetBookForm() {
  $("booksForm")?.reset();
  $("bookSubmitBtn").textContent = "Add Book";
  $("cancelBookBtn").classList.add("hidden");
}

export function fillBookForm(book) {
  $("bookTitle").value = book.title || "";
  $("bookAuthor").value = book.author || "";
  $("bookISBN").value = book.isbn || "";
  $("bookCategory").value = book.category || "";
  $("bookPublishedYear").value = book.published_year || "";
  $("bookTotalCopies").value = book.total_copies ?? 1;
  $("bookAvailableCopies").value = book.available_copies ?? 1;

  $("bookSubmitBtn").textContent = "Update Book";
  $("cancelBookBtn").classList.remove("hidden");
}
