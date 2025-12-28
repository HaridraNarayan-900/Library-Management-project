// controllers/librarianController.js
import {
  apiGetAll,
  apiGetOne,
  apiCreate,
  apiUpdate,
  apiDelete
} from "../services/librarianService.js";

import { showAlert } from "../components/Alert.js";
import { renderLibrariansTable } from "../components/librarianTable.js"; // plural naming
import { resetLibrarianForm, fillLibrarianForm } from "../components/librarianForm.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Initialize
document.addEventListener("DOMContentLoaded", () => initLibrarianController());

export function initLibrarianController() {
  loadLibrarians();

  const form = $("librarianForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        name: $("librarianName").value.trim(),
        email: $("librarianEmail").value.trim(),
        role: $("librarianRole").value.trim(),
        phone: $("librarianPhone").value.trim(),
        hire_date: $("librarianHireDate").value.trim(),
        salary: Number($("librarianSalary").value),
      };

      const { editingId } = getState();
      try {
        editingId 
          ? await updateLibrarian(editingId, data) 
          : await createNewLibrarian(data);
      } catch (error) {
        showAlert("Operation failed", "error");
      }
    });
  }

  const cancelBtn = $("librarianCancelBtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      setState({ editingId: null });
      resetLibrarianForm();
    });
  }
}

// Load all librarians
export async function loadLibrarians() {
  const spinner = $("loadingSpinner");
  const table = $("librariansTableContainer");

  if (spinner) spinner.style.display = "block";
  if (table) table.style.display = "none";

  try {
    const librarians = await apiGetAll();
    setState({ librarians });
    renderLibrariansTable(librarians || []);
  } catch (error) {
    showAlert("Failed to load librarians", "error");
  } finally {
    if (spinner) spinner.style.display = "none";
    if (table) table.style.display = "block";
  }
}

// Create
export async function createNewLibrarian(data) {
  try {
    const result = await apiCreate(data);
    if (result) {
      showAlert("Librarian added!");
      resetLibrarianForm();
      loadLibrarians();
    }
  } catch {
    showAlert("Failed to add librarian", "error");
  }
}

// Edit
export async function editLibrarian(id) {
  try {
    const librarian = await apiGetOne(id);
    if (!librarian) return;

    setState({ editingId: id });
    fillLibrarianForm(librarian);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch {
    showAlert("Failed to load librarian data", "error");
  }
}

// Update
export async function updateLibrarian(id, data) {
  try {
    const result = await apiUpdate(id, data);
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

// Delete
export async function deleteLibrarian(id) {
  if (!confirm("Delete this librarian?")) return;

  try {
    const result = await apiDelete(id);
    if (result) {
      showAlert("Librarian deleted!");
      loadLibrarians();
    }
  } catch {
    showAlert("Failed to delete librarian", "error");
  }
}


