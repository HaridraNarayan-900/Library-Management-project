import { $ } from "../utils/dom.js";

// ================================
// BOOK FORM HANDLERS
// ================================
export function resetForm() {
  const form = $("booksForm");
  if (form) form.reset();

  const submitBtn = $("bookSubmitBtn");
  if (submitBtn) submitBtn.textContent = "Add Book";

  const cancelBtn = $("cancelBookBtn");
  if (cancelBtn) cancelBtn.style.display = "none";
}

export function fillForm(book) {
  if (!book) return;

  $("bookTitle").value = book.title || "";
  $("bookAuthor").value = book.author || "";
  $("bookISBN").value = book.isbn || "";
  $("bookCategory").value = book.category || "";
  $("bookTotalCopies").value = book.total_copies ?? 1;
  $("bookAvailableCopies").value = book.available_copies ?? 1;
  $("bookPublishedYear").value = book.published_year || "";

  const submitBtn = $("bookSubmitBtn");
  if (submitBtn) submitBtn.textContent = "Update Book";

  const cancelBtn = $("cancelBookBtn");
  if (cancelBtn) cancelBtn.style.display = "block";
}


