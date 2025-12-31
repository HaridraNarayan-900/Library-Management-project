import {
  getAllBookshelves,
  getBookshelf,
  createBookshelf,
  updateBookshelf,
  deleteBookshelf,
} from "../services/bookshelfService.js";

import { showAlert } from "../components/Alert.js";
import { renderBookshelfTable } from "../components/bookshelfTable.js";
import { resetBookshelfForm, fillBookshelfForm } from "../components/bookshelfForm.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Initialize controller on DOM load
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
      try {
        editingId
          ? await handleUpdateBookshelf(editingId, data)
          : await handleCreateBookshelf(data);
      } catch {
        showAlert("Operation failed", "error");
      }
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

// ================================
// Load all bookshelves
// ================================
export async function loadBookshelves() {
  const spinner = $("loadingSpinner");
  const tableContainer = $("bookshelvesTableContainer");

  if (spinner) spinner.style.display = "block";
  if (tableContainer) tableContainer.style.display = "none";

  try {
    const bookshelves = await getAllBookshelves();
    setState({ bookshelves });
    renderBookshelfTable(bookshelves || []);
  } catch {
    showAlert("Failed to load bookshelves", "error");
  } finally {
    if (spinner) spinner.style.display = "none";
    if (tableContainer) tableContainer.style.display = "block";
  }
}

// ================================
// Create new bookshelf
// ================================
export async function handleCreateBookshelf(data) {
  try {
    const result = await createBookshelf(data);
    if (result) {
      showAlert("Bookshelf added successfully!");
      resetBookshelfForm();
      loadBookshelves();
    }
  } catch {
    showAlert("Failed to add bookshelf", "error");
  }
}

// ================================
// Edit bookshelf
// ================================
export async function editBookshelf(id) {
  try {
    const bookshelf = await getBookshelf(id);
    if (!bookshelf) return;

    setState({ editingId: id });
    fillBookshelfForm(bookshelf);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch {
    showAlert("Failed to load bookshelf data", "error");
  }
}

// ================================
// Update bookshelf
// ================================
export async function handleUpdateBookshelf(id, data) {
  try {
    const result = await updateBookshelf(id, data);
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

// ================================
// Delete bookshelf
// ================================
export async function handleDeleteBookshelf(id) {
  if (!confirm("Delete this bookshelf?")) return;

  try {
    const result = await deleteBookshelf(id);
    if (result) {
      showAlert("Bookshelf deleted successfully!");
      loadBookshelves();
    }
  } catch {
    showAlert("Failed to delete bookshelf", "error");
  }
}

