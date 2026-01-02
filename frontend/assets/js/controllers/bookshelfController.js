
import { 
  apiGetAllBookshelves, 
  apiGetOneBookshelf, 
  apiCreateBookshelf, 
  apiUpdateBookshelf, 
  apiDeleteBookshelf 
} from "../services/bookshelfService.js";

import { showAlert } from "../components/Alert.js";
import { renderBookshelfTable } from "../components/bookshelfTable.js";
import { resetForm, fillForm } from "../components/bookshelfForm.js";

import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

// Initialize the main logic and set up all necessary event listeners
export function initBookshelfController() {
  loadBookshelves();

  $("bookshelfForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      location: $("location").value.trim(),
      position: $("position").value.trim(),     
    };

    const { editingId } = getState();

    editingId
      ? await updateBookshelf(editingId, data)
      : await createNewbookshelf(data);
  });

  $("cancelBtn").addEventListener("click", () => {
    setState({ editingId: null });
    resetForm();
  });
}


// Fetch all bookshelf data from the API and update the user interface
export async function loadBookshelves() {
  const spinner = $("loadingSpinner");
  const table = $("bookshelvesTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const bookshelves = await apiGetAllBookshelves();

  setState({ bookshelves });
  renderBookshelfTable(bookshelves);

  spinner.style.display = "none";
  table.style.display = "block";
}


// Create a new bookshelf
export async function createNewbookshelf(data) {
  const res = await apiCreateBookshelf(data);
  if (res.ok) {
    showAlert("bookshelf added!");
    resetForm();
    loadBookshelves();
  }
}


// Load a bookshelf into the form for editing
export async function editBookshelf(id) {
  const bookshelf = await apiGetOneBookshelf(id);

  setState({ editingId: id });
  fillForm(bookshelf);

  window.scrollTo({ top: 0, behavior: "smooth" });
}


// Update an existing bookshelf
export async function updateBookshelf(id, data) {
  const res = await apiUpdateBookshelf(id, data);
  if (res.ok) {
    showAlert("Updated!");
    resetForm();
    setState({ editingId: null });
    loadBookshelves();
  }
}


// Delete a bookshelf
export async function deleteBookshelfAction(id) {
  if (!confirm("Delete this bookshelf?")) return;

  const res = await apiDeleteBookshelf(id);
  if (res.ok) {
    showAlert("Deleted!");
    loadBookshelves();
  }
}