import {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../services/bookService.js";

import { renderBooksTable } from "../components/bookTable.js";
import { resetBookForm, fillBookForm } from "../components/bookForm.js";
import { showAlert } from "../components/Alert.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

export async function initBookController() {
  await loadBooks();

  $("booksForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      title: $("bookTitle").value.trim(),
      author: $("bookAuthor").value.trim(),
      isbn: $("bookISBN").value.trim(),
      category: $("bookCategory").value.trim(),
      published_year: $("bookPublishedYear").value,
      total_copies: Number($("bookTotalCopies").value),
      available_copies: Number($("bookAvailableCopies").value),
    };

    const { editingId } = getState();
    editingId ? await update(editingId, data) : await create(data);
  });

  $("cancelBookBtn")?.addEventListener("click", () => {
    setState({ editingId: null });
    resetBookForm();
  });
}

async function loadBooks() {
  const books = await getAllBooks();
  setState({ books });
  renderBooksTable(books);
}

async function create(data) {
  await createBook(data);
  showAlert("Book added");
  resetBookForm();
  loadBooks();
}

export async function editBook(id) {
  const book = await getBook(id);
  if (!book) return;
  setState({ editingId: id });
  fillBookForm(book);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function update(id, data) {
  await updateBook(id, data);
  showAlert("Book updated");
  resetBookForm();
  setState({ editingId: null });
  loadBooks();
}

export async function handleDeleteBook(id) {
  if (!confirm("Delete this book?")) return;
  await deleteBook(id);
  showAlert("Book deleted");
  loadBooks();
}

