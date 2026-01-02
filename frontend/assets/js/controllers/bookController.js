import { 
  apiGetAllBooks, 
  apiGetOneBook, 
  apiCreateBook, 
  apiUpdateBook, 
  apiDeleteBook 
} from "../services/bookService.js";

import { showAlert } from "../components/Alert.js";
import { renderBookTable } from "../components/bookTable.js";
import { resetForm, fillForm } from "../components/bookForm.js";

import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

// Initialize the main logic and set up all necessary event listeners
export function initBookController() {
  loadBooks();

  $("bookForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      title: $("title").value.trim(),
      author: $("author").value.trim(),
      isbn: $("isbn").value.trim(),
      shelf_id: $("shelf_id").value.trim()
    };

    const { editingId } = getState();

    editingId
      ? await updateBook(editingId, data)
      : await createNewBook(data);
  });

  $("cancelBtn").addEventListener("click", () => {
    setState({ editingId: null });
    resetForm();
  });
}


// Fetch all book data from the API and update the user interface
export async function loadBooks() {
  const spinner = $("loadingSpinner");
  const table = $("booksTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const books = await apiGetAllBooks();

  setState({ books });
  renderBookTable(books);

  spinner.style.display = "none";
  table.style.display = "block";
}


// Create a new book
export async function createNewBook(data) {
  const res = await apiCreateBook(data);
  if (res.ok) {
    showAlert("book added!");
    resetForm();
    loadBooks();
  }
}


// Load a book into the form for editing
export async function editBook(id) {
  const book = await apiGetOneBook(id);

  setState({ editingId: id });
  fillForm(book);

  window.scrollTo({ top: 0, behavior: "smooth" });
}


// Update an existing book
export async function updateBook(id, data) {
  const res = await apiUpdateBook(id, data);
  if (res.ok) {
    showAlert("Updated!");
    resetForm();
    setState({ editingId: null });
    loadBooks();
  }
}


// Delete a book
export async function deleteBookAction(id) {
  if (!confirm("Delete this book?")) return;

  const res = await apiDeleteBook(id);
  if (res.ok) {
    showAlert("Deleted!");
    loadBooks();
  }
}

