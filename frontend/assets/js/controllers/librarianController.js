import {
  getAllLibrarians,
  getLibrarian,
  createLibrarian,
  updateLibrarian,
  deleteLibrarian,
} from "../services/librarianService.js";

import { showAlert } from "../components/Alert.js";
import { renderLibrariansTable } from "../components/librarianTable.js";
import { resetLibrarianForm, fillLibrarianForm } from "../components/librarianForm.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Initialize controller on DOM load
document.addEventListener("DOMContentLoaded", () => initLibrarianController());

export function initLibrarianController() {
  loadLibrarians();

  // Form submit
  const form = $("librariansForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        name: $("librarianName").value.trim(),
        email: $("librarianEmail").value.trim(),
        phone: $("librarianPhone").value.trim(),
        position: $("librarianPosition").value.trim(),
      };

      const { editingId } = getState();
      try {
        editingId
          ? await handleUpdateLibrarian(editingId, data)
          : await handleCreateLibrarian(data);
      } catch {
        showAlert("Operation failed", "error");
      }
    });
  }

  // Cancel button
  const cancelBtn = $("cancelLibrarianBtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      setState({ editingId: null });
      resetLibrarianForm();
    });
  }
}

// ================================
// Load all librarians
// ================================
export async function loadLibrarians() {
  const spinner = $("loadingSpinner");
  const table = $("librariansTableContainer");

  if (spinner) spinner.style.display = "block";
  if (table) table.style.display = "none";

  try {
    const librarians = await getAllLibrarians();
    setState({ librarians });
    renderLibrariansTable(librarians || []);
  } catch {
    showAlert("Failed to load librarians", "error");
  } finally {
    if (spinner) spinner.style.display = "none";
    if (table) table.style.display = "block";
  }
}

// ================================
// Create new librarian
// ================================
export async function handleCreateLibrarian(data) {
  try {
    const result = await createLibrarian(data);
    if (result) {
      showAlert("Librarian added!");
      resetLibrarianForm();
      loadLibrarians();
    }
  } catch {
    showAlert("Failed to add librarian", "error");
  }
}

// ================================
// Edit librarian
// ================================
export async function editLibrarian(id) {
  try {
    const librarian = await getLibrarian(id);
    if (!librarian) return;

    setState({ editingId: id });
    fillLibrarianForm(librarian);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch {
    showAlert("Failed to load librarian data", "error");
  }
}

// ================================
// Update librarian
// ================================
export async function handleUpdateLibrarian(id, data) {
  try {
    const result = await updateLibrarian(id, data);
    if (result) {
      showAlert("Librarian updated!");
      resetLibrarianForm();
      setState({ editingId: null });
      loadLibrarians();
    }
  } catch {
    showAlert("Failed to update librarian", "error");
  }
}

// ================================
// Delete librarian
// ================================
export async function handleDeleteLibrarian(id) {
  if (!confirm("Delete this librarian?")) return;

  try {
    const result = await deleteLibrarian(id);
    if (result) {
      showAlert("Librarian deleted!");
      loadLibrarians();
    }
  } catch {
    showAlert("Failed to delete librarian", "error");
  }
}

