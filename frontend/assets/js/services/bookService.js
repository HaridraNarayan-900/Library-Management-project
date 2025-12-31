import {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../services/bookService.js";

import { showAlert } from "../components/Alert.js";
import { renderBooksTable } from "../components/bookTable.js";
import { resetBookForm, fillBookForm } from "../components/bookForm.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Initialize controller on DOM load
document.addEventListener("DOMContentLoaded", () => initBookController());

export function initBookController() {
  loadBooks();

  // Form submit
  const form = $("booksForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        title: $("bookTitle").value.trim(),
        author: $("bookAuthor").value.trim(),
        isbn: $("bookISBN").value.trim(),
        published_date: $("bookPublishedDate").value,
        shelf_id: Number($("bookShelf").value),
      };

      const { editingId } = getState();
      try {
        editingId
          ? await handleUpdateBook(editingId, data)
          : await handleCreateBook(data);
      } catch {
        showAlert("Operation failed", "error");
      }
    });
  }

  // Cancel button
  const cancelBtn = $("cancelBookBtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      setState({ editingId: null });
      resetBookForm();
    });
  }
}

// ================================
// Load all books
// ================================
export async function loadBooks() {
  const spinner = $("loadingSpinner");
  const tableContainer = $("booksTableContainer");

  if (spinner) spinner.style.display = "block";
  if (tableContainer) tableContainer.style.display = "none";

  try {
    const books = await getAllBooks();
    setState({ books });
    renderBooksTable(books || []);
  } catch {
    showAlert("Failed to load books", "error");
  } finally {
    if (spinner) spinner.style.display = "none";
    if (tableContainer) tableContainer.style.display = "block";
  }
}

// ================================
// Create new book
// ================================
export async function handleCreateBook(data) {
  try {
    const result = await createBook(data);
    if (result) {
      showAlert("Book added successfully!");
      resetBookForm();
      loadBooks();
    }
  } catch {
    showAlert("Failed to add book", "error");
  }
}

// ================================
// Edit book
// ================================
export async function editBook(id) {
  try {
    const book = await getBook(id);
    if (!book) return;

    setState({ editingId: id });
    fillBookForm(book);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch {
    showAlert("Failed to load book data", "error");
  }
}

// ================================
// Update book
// ================================
export async function handleUpdateBook(id, data) {
  try {
    const result = await updateBook(id, data);
    if (result) {
      showAlert("Book updated successfully!");
      resetBookForm();
      setState({ editingId: null });
      loadBooks();
    }
  } catch {
    showAlert("Failed to update book", "error");
  }
}

// ================================
// Delete book
// ================================
export async function handleDeleteBook(id) {
  if (!confirm("Delete this book?")) return;

  try {
    const result = await deleteBook(id);
    if (result) {
      showAlert("Book deleted successfully!");
      loadBooks();
    }
  } catch {
    showAlert("Failed to delete book", "error");
  }
}
