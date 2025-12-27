// frontend/assets/js/controllers/bookController.js

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

// Initialize the controller safely after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initBookController();
});

// ================================
// BOOK CONTROLLER
// ================================
export function initBookController() {
  // Load all books initially
  loadBooks();

  // --- Handle Form Submission ---
  const bookForm = $("bookForm");
  if (bookForm) {
    bookForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        name: $("name").value.trim(),
        email: $("email").value.trim(),
        course: $("course").value.trim(),
        year: $("year").value.trim()
      };

      const { editingId } = getState();
      editingId
        ? await updateBook(editingId, data)
        : await createNewBook(data);
    });
  }

  // --- Handle Cancel Button ---
  const cancelBtn = $("cancelBtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      setState({ editingId: null });
      resetForm();
    });
  }
}

// ================================
// CRUD FUNCTIONS
// ================================

// Load all books
export async function loadBooks() {
  const spinner = $("loadingSpinner");
  const table = $("booksTableContainer");

  if (spinner) spinner.style.display = "block";
  if (table) table.style.display = "none";

  const books = await apiGetAll();
  setState({ books });
  renderBookTable(books || []);

  if (spinner) spinner.style.display = "none";
  if (table) table.style.display = "block";
}

// Create a new book
export async function createNewBook(data) {
  const result = await apiCreate(data);
  if (result) {
    showAlert("Book added!");
    resetForm();
    loadBooks();
  }
}

// Load book into form for editing
export async function editBook(id) {
  const book = await apiGetOne(id);
  if (!book) return;

  setState({ editingId: id });
  fillForm(book);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Update an existing book
export async function updateBook(id, data) {
  const result = await apiUpdate(id, data);
  if (result) {
    showAlert("Book updated!");
    resetForm();
    setState({ editingId: null });
    loadBooks();
  }
}

// Delete a book
export async function deleteBook(id) {
  if (!confirm("Delete this book?")) return;

  const result = await apiDelete(id);
  if (result) {
    showAlert("Book deleted!");
    loadBooks();
  }
}

