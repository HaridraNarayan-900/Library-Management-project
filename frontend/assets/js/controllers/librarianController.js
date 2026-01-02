import { 
  apiGetAllLibrarians, 
  apiGetOneLibrarian, 
  apiCreateLibrarian, 
  apiUpdateLibrarian, 
  apiDeleteLibrarian 
} from "../services/librarianService.js";

import { showAlert } from "../components/Alert.js";
import { renderLibrarianTable } from "../components/librarianTable.js";
import { resetForm, fillForm } from "../components/librarianForm.js";

import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

// Initialize the main logic and set up all necessary event listeners
export function initLibrarianController() {
  loadLibrarians();

  $("librarianForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: $("name").value.trim(),
      email: $("email").value.trim(),
      phone: $("phone").value.trim(),
     
    };

    const { editingId } = getState();

    editingId
      ? await updateLibrarian(editingId, data)
      : await createNewLibrarian(data);
  });

  $("cancelBtn").addEventListener("click", () => {
    setState({ editingId: null });
    resetForm();
  });
}


// Fetch all librarian data from the API and update the user interface
export async function loadLibrarians() {
  const spinner = $("loadingSpinner");
  const table = $("librariansTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const librarians = await apiGetAllLibrarians();

  setState({ librarians });
  renderLibrarianTable(librarians);

  spinner.style.display = "none";
  table.style.display = "block";
}


// Create a new librarian
export async function createNewLibrarian(data) {
  const res = await apiCreateLibrarian(data);
  if (res.ok) {
    showAlert("librarian added!");
    resetForm();
    loadLibrarians();
  }
}


// Load a librarian into the form for editing
export async function editLibrarian(id) {
  const librarian = await apiGetOneLibrarian(id);

  setState({ editingId: id });
  fillForm(librarian);

  window.scrollTo({ top: 0, behavior: "smooth" });
}


// Update an existing librarian
export async function updateLibrarian(id, data) {
  const res = await apiUpdateLibrarian(id, data);
  if (res.ok) {
    showAlert("Updated!");
    resetForm();
    setState({ editingId: null });
    loadLibrarians();
  }
}


// Delete a librarian
export async function deleteLibrarianAction(id) {
  if (!confirm("Delete this librarian?")) return;

  const res = await apiDeleteLibrarian(id);
  if (res.ok) {
    showAlert("Deleted!");
    loadLibrarians();
  }
}
