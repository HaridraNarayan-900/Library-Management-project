import {
  apiGetAll,
  apiGetOne,
  apiCreate,
  apiUpdate,
  apiDelete,
} from "../services/bookshelfService.js";

import { showAlert } from "../components/Alert.js";
import { renderBookshelfTable } from "../components/bookshelfTable.js";
import { resetBookshelfForm, fillBookshelfForm } from "../components/bookshelfForm.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Initialize
document.addEventListener("DOMContentLoaded", () => initBookshelfController());

export function initBookshelfController() {
  loadBookshelves();

  const form = $("bookshelvesForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        name: $("bookshelfName").value.trim(),
        location: $("bookshelfLocation").value.trim(),
        capacity: Number($("bookshelfCapacity").value),
        current_count: Number($("bookshelfCurrentCount").value),
      };

      const { editingId } = getState();
      editingId ? await updateBookshelf(editingId, data) : await createBookshelf(data);
    });
  }

  const cancelBtn = $("cancelBookshelfBtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      setState({ editingId: null });
      resetBookshelfForm();
    });
  }
}

// Load all bookshelves
export async function loadBookshelves() {
  const spinner = $("loadingSpinner");
  const tableContainer = $("bookshelvesTableContainer");

  if (spinner) spinner.style.display = "block";
  if (tableContainer) tableContainer.style.display = "none";

  try {
    const bookshelves = await apiGetAll();
    setState({ bookshelves });
    renderBookshelfTable(bookshelves || []);
  } catch {
    showAlert("Failed to load bookshelves", "error");
  } finally {
    if (spinner) spinner.style.display = "none";
    if (tableContainer) tableContainer.style.display = "block";
  }
}

// Create
export async function createBookshelf(data) {
  try {
    const result = await apiCreate(data);
    if (result) {
      showAlert("Bookshelf added successfully!");
      resetBookshelfForm();
      loadBookshelves();
    }
  } catch {
    showAlert("Failed to add bookshelf", "error");
  }
}

// Edit
export async function editBookshelf(id) {
  try {
    const bookshelf = await apiGetOne(id);
    if (!bookshelf) return;

    setState({ editingId: id });
    fillBookshelfForm(bookshelf);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch {
    showAlert("Failed to load bookshelf data", "error");
  }
}

// Update
export async function updateBookshelf(id, data) {
  try {
    const result = await apiUpdate(id, data);
    if (result) {
      showAlert("Bookshelf updated successfully!");
      resetBookshelfForm();
      setState({ editingId: null });
      loadBookshelves();
    }
  } catch {
    showAlert("Failed to update bookshelf", "error");
  }
}

// Delete
export async function deleteBookshelf(id) {
  if (!confirm("Delete this bookshelf?")) return;

  try {
    const result = await apiDelete(id);
    if (result) {
      showAlert("Bookshelf deleted successfully!");
      loadBookshelves();
    }
  } catch {
    showAlert("Failed to delete bookshelf", "error");
  }
}
