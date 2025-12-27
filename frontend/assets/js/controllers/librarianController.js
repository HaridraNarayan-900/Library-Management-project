// frontend/assets/js/controllers/librarianController.js

import {
  apiGetAll,
  apiGetOne, 
  apiCreate, 
  apiUpdate, 
  apiDelete
} from "../services/librarianService.js";

import { showAlert } from "../components/Alert.js";
import { renderlibrarianTable } from "../components/librarianTable.js";
import { resetForm, fillForm } from "../components/librarianForm.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Initialize the controller safely after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initlibrarianController();
});

// ================================
// librarian CONTROLLER
// ================================
export function initlibrarianController() {
  // Load all librarians initially
  loadlibrarians();

  // --- Handle Form Submission ---
  const librarianForm = $("librarianForm");
  if (librarianForm) {
    librarianForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        name: $("name").value.trim(),
        email: $("email").value.trim(),
        course: $("course").value.trim(),
        year: $("year").value.trim()
      };

      const { editingId } = getState();
      editingId
        ? await updatelibrarian(editingId, data)
        : await createNewlibrarian(data);
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

// Load all librarians
export async function loadlibrarians() {
  const spinner = $("loadingSpinner");
  const table = $("librariansTableContainer");

  if (spinner) spinner.style.display = "block";
  if (table) table.style.display = "none";

  const librarians = await apiGetAll();
  setState({ librarians });
  renderlibrarianTable(librarians || []);

  if (spinner) spinner.style.display = "none";
  if (table) table.style.display = "block";
}

// Create a new librarian
export async function createNewlibrarian(data) {
  const result = await apiCreate(data);
  if (result) {
    showAlert("librarian added!");
    resetForm();
    loadlibrarians();
  }
}

// Load librarian into form for editing
export async function editlibrarian(id) {
  const librarian = await apiGetOne(id);
  if (!librarian) return;

  setState({ editingId: id });
  fillForm(librarian);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Update an existing librarian
export async function updatelibrarian(id, data) {
  const result = await apiUpdate(id, data);
  if (result) {
    showAlert("librarian updated!");
    resetForm();
    setState({ editingId: null });
    loadlibrarians();
  }
}

// Delete a librarian
export async function deletelibrarian(id) {
  if (!confirm("Delete this librarian?")) return;

  const result = await apiDelete(id);
  if (result) {
    showAlert("librarian deleted!");
    loadlibrarians();
  }
}