// frontend/assets/js/controllers/bookshelveshelfController.js

import {
  apiGetAll,
  apiGetOne, 
  apiCreate, 
  apiUpdate, 
  apiDelete
} from "../services/bookshelveservice.js";

import { showAlert } from "../components/Alert.js";
import { renderbookshelfTable } from "../components/bookshelfTable.js";
import { resetForm, fillForm } from "../components/bookshelfForm.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Initialize the controller safely after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initbookshelfController();
});

// ================================
// bookshelf CONTROLLER
// ================================
export function initbookshelfController() {
  // Load all bookshelves initially
  loadbookshelves();

  // --- Handle Form Submission ---
  const bookshelfForm = $("bookshelfForm");
  if (bookshelfForm) {
    bookshelfForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        name: $("name").value.trim(),
        email: $("email").value.trim(),
        course: $("course").value.trim(),
        year: $("year").value.trim()
      };

      const { editingId } = getState();
      editingId
        ? await updatebookshelf(editingId, data)
        : await createNewbookshelf(data);
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

// Load all bookshelves
export async function loadbookshelves() {
  const spinner = $("loadingSpinner");
  const table = $("bookshelvesTableContainer");

  if (spinner) spinner.style.display = "block";
  if (table) table.style.display = "none";

  const bookshelves = await apiGetAll();
  setState({ bookshelves });
  renderbookshelfTable(bookshelves || []);

  if (spinner) spinner.style.display = "none";
  if (table) table.style.display = "block";
}

// Create a new bookshelf
export async function createNewbookshelf(data) {
  const result = await apiCreate(data);
  if (result) {
    showAlert("bookshelf added!");
    resetForm();
    loadbookshelves();
  }
}

// Load bookshelf into form for editing
export async function editbookshelf(id) {
  const bookshelf = await apiGetOne(id);
  if (!bookshelf) return;

  setState({ editingId: id });
  fillForm(bookshelf);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Update an existing bookshelf
export async function updatebookshelf(id, data) {
  const result = await apiUpdate(id, data);
  if (result) {
    showAlert("bookshelf updated!");
    resetForm();
    setState({ editingId: null });
    loadbookshelves();
  }
}

// Delete a bookshelf
export async function deletebookshelf(id) {
  if (!confirm("Delete this bookshelf?")) return;

  const result = await apiDelete(id);
  if (result) {
    showAlert("bookshelf deleted!");
    loadbookshelves();
  }
}
