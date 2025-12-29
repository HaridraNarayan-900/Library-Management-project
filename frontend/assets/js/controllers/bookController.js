// controllers/bookController.js
import {
  apiGetAll,
  apiGetOne,
  apiCreate,
  apiUpdate,
  apiDelete,
} from "../services/bookService.js";

import { showAlert } from "../components/Alert.js";
import { renderBookTable } from "../components/bookTable.js";
import { resetForm, fillForm } from "../components/bookForm.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Initialize controller
document.addEventListener("DOMContentLoaded", () => initBookController());

export function initBookController() {
  loadBooks();

  const booksForm = $("booksForm");
  if (booksForm) {
    booksForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        title: $("bookTitle").value.trim(),
        author: $("bookAuthor").value.trim(),
        isbn: $("bookISBN").value.trim(),
        category: $("bookCategory").value.trim(),
        total_copies: Number($("bookTotalCopies").value),
        available_copies: Number($("bookAvailableCopies").value),
        published_year: $("bookPublishedYear").value.trim(),
      };

      const { editingId } = getState();
      try {
        editingId
          ? await updateBook(editingId, data)
          : await createNewBook(data);
      } catch {
        showAlert("Operation failed", "error");
      }
    });
  }

  const cancelBtn = $("cancelBookBtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      setState({ editingId: null });
      resetForm();
    });
  }
}

// Load all books
export async function loadBooks() {
  const spinner = $("loadingSpinner");
  const table = $("booksTableContainer");

  if (spinner) spinner.style.display = "block";
  if (table) table.style.display = "none";

  try {
    const books = await apiGetAll();
    setState({ books });
    renderBookTable(books || []);
    console.log("books list", books)
  } catch {
    showAlert("Failed to load books", "error");
  } finally {
    if (spinner) spinner.style.display = "none";
    if (table) table.style.display = "block";
  }
}

// Create a new book
export async function createNewBook(data) {
  try {
    const result = await apiCreate(data);
    if (result) {
      showAlert("Book added!");
      resetForm();
      loadBooks();
    }
  } catch {
    showAlert("Failed to add book", "error");
  }
}

// Load book into form for editing
export async function editBook(id) {
  try {
    const book = await apiGetOne(id);
    if (!book) return;

    setState({ editingId: id });
    fillForm(book);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch {
    showAlert("Failed to load book data", "error");
  }
}

// Update an existing book
export async function updateBook(id, data) {
  try {
    const result = await apiUpdate(id, data);
    if (result) {
      showAlert("Book updated!");
      resetForm();
      setState({ editingId: null });
      loadBooks();
    }
  } catch {
    showAlert("Failed to update book", "error");
  }
}

// Delete a book
export async function deleteBook(id) {
  if (!confirm("Delete this book?")) return;

  try {
    const result = await apiDelete(id);
    if (result) {
      showAlert("Book deleted!");
      loadBooks();
    }
  } catch {
    showAlert("Failed to delete book", "error");
  }
}
