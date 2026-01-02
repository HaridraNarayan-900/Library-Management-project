import { $, createElement } from "../utils/dom.js";

// Resets the input form to its default state for creating a new book
export function resetForm() {
  // Use the native .reset() method on the HTML form element
  $("bookForm").reset();

  // Change the submit button text back to "Add Book"
  $("submitBtn").textContent = "Add book";

  // Hide the "Cancel" button, as we are no longer in 'edit' mode
  $("cancelBtn").style.display = "none";
}

// Populates the input form fields with data from a selected book object (for editing)
export function fillForm(book) {
  // Fill each input field with the corresponding property from the book data
  $("title").value = book.title;
  $("author").value = book.author;
  $("isbn").value = book.isbn;
  $("shelf_id").value = book.shelf_id;

  // Change the submit button text to "Update book"
  $("submitBtn").textContent = "Update Book";

  // Show the "Cancel" button, allowing the user to exit 'edit' mode
  $("cancelBtn").style.display = "inline-block";
}