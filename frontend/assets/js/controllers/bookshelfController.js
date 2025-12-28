// controllers/bookshelfController.js
import {
  apiGetAll,
  apiGetOne,
  apiCreate,
  apiUpdate,
  apiDelete,
} from "../services/bookshelfService.js";

import { showAlert } from "../components/Alert.js";
import { renderBookshelfTable } from "../components/bookshelfTable.js";
import {
  resetBookshelfForm,
  fillBookshelfForm,
} from "../components/bookshelfForm.js";

import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// ================================
// INIT CONTROLLER
// ================================
document.addEventListener("DOMContentLoaded", () => {
  initBookshelfController();
});

export function initBookshelfController() {
  loadBookshelves();

  const form = $("bookshelfForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        name: $("bookshelfName").value.trim(),
        zone: $("bookshelfZone").value.trim(),
        capacity: Number($("bookshelfCapacity").value),
        current_count: Number($("bookshelfCurrentCount").value),
        location: $("bookshelfLocation").value.trim(),
      };

      const { editingId } = getState();

      if (editingId) {
        await updateBookshelf(editingId, data);
      } else {
        await createBookshelf(data);
      }
    });
  }

  const cancelBtn = $("bookshelfCancelBtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      setState({ editingId: null });
      resetBookshelfForm();
    });
  }
}

// ================================
// CRUD FUNCTIONS
// ================================

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
  } catch (error) {
    showAlert("Failed to load bookshelves", "error");
  } finally {
    if (spinner) spinner.style.display = "none";
    if (tableContainer) tableContainer.style.display = "block";
  }
}

// Create new bookshelf
export async function createBookshelf(data) {
  try {
    const result = await apiCreate(data);
    if (result) {
      showAlert("Bookshelf added successfully!");
      resetBookshelfForm();
      loadBookshelves();
    }
  } catch (error) {
    showAlert("Failed to add bookshelf", "error");
  }
}

// Load a bookshelf into the form for editing
export async function editBookshelf(id) {
  try {
    const bookshelf = await apiGetOne(id);
    if (!bookshelf) return;

    setState({ editingId: id });
    fillBookshelfForm(bookshelf);

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    showAlert("Failed to load bookshelf data", "error");
  }
}

// Update an existing bookshelf
export async function updateBookshelf(id, data) {
  try {
    const result = await apiUpdate(id, data);
    if (result) {
      showAlert("Bookshelf updated successfully!");
      setState({ editingId: null });
      resetBookshelfForm();
      loadBookshelves();
    }
  } catch (error) {
    showAlert("Failed to update bookshelf", "error");
  }
}

// Delete a bookshelf
export async function deleteBookshelf(id) {
  if (!confirm("Delete this bookshelf?")) return;

  try {
    const result = await apiDelete(id);
    if (result) {
      showAlert("Bookshelf deleted successfully!");
      loadBookshelves();
    }
  } catch (error) {
    showAlert("Failed to delete bookshelf", "error");
  }
}

