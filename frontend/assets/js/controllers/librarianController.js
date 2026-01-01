import {
  getAllLibrarians,
  getLibrarian,
  createLibrarian,
  updateLibrarian,
  deleteLibrarian,
} from "../services/librarianService.js";

import { renderLibrariansTable } from "../components/librarianTable.js";
import { resetLibrarianForm, fillLibrarianForm } from "../components/librarianForm.js";
import { showAlert } from "../components/Alert.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

export async function initLibrarianController() {
  await loadLibrarians();

  $("librariansForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: $("librarianName").value.trim(),
      email: $("librarianEmail").value.trim(),
      phone: $("librarianPhone").value.trim(),
      position: $("librarianPosition").value.trim(),
    };

    const { editingId } = getState();
    editingId ? await update(editingId, data) : await create(data);
  });

  $("cancelLibrarianBtn")?.addEventListener("click", () => {
    setState({ editingId: null });
    resetLibrarianForm();
  });
}

async function loadLibrarians() {
  const data = await getAllLibrarians();
  renderLibrariansTable(data);
}

async function create(data) {
  await createLibrarian(data);
  showAlert("Librarian added");
  resetLibrarianForm();
  loadLibrarians();
}

export async function editLibrarian(id) {
  const librarian = await getLibrarian(id);
  if (!librarian) return;

  setState({ editingId: id });
  fillLibrarianForm(librarian);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function update(id, data) {
  await updateLibrarian(id, data);
  showAlert("Librarian updated");
  resetLibrarianForm();
  setState({ editingId: null });
  loadLibrarians();
}

export async function handleDeleteLibrarian(id) {
  if (!confirm("Delete this librarian?")) return;
  await deleteLibrarian(id);
  showAlert("Librarian deleted");
  loadLibrarians();
}
