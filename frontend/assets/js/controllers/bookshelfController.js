import {
  getAllBookshelves,
  getBookshelf,
  createBookshelf,
  updateBookshelf,
  deleteBookshelf,
} from "../services/bookshelfService.js";

import { renderBookshelvesTable } from "../components/bookshelfTable.js";
import { resetBookshelfForm, fillBookshelfForm } from "../components/bookshelfForm.js";
import { showAlert } from "../components/Alert.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

export async function initBookshelfController() {
  await load();

  $("bookshelfForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: $("shelfName").value.trim(),
      location: $("shelfLocation").value.trim(),
      capacity: Number($("shelfCapacity").value),
    };

    const { editingId } = getState();
    editingId ? await update(editingId, data) : await create(data);
  });

  $("cancelBookshelfBtn")?.addEventListener("click", () => {
    setState({ editingId: null });
    resetBookshelfForm();
  });
}

async function load() {
  renderBookshelvesTable(await getAllBookshelves());
}

async function create(data) {
  await createBookshelf(data);
  showAlert("Bookshelf added");
  resetBookshelfForm();
  load();
}

export async function editBookshelf(id) {
  const shelf = await getBookshelf(id);
  if (!shelf) return;

  setState({ editingId: id });
  fillBookshelfForm(shelf);
}

async function update(id, data) {
  await updateBookshelf(id, data);
  showAlert("Bookshelf updated");
  resetBookshelfForm();
  setState({ editingId: null });
  load();
}

export async function handleDeleteBookshelf(id) {
  if (!confirm("Delete this shelf?")) return;
  await deleteBookshelf(id);
  showAlert("Bookshelf deleted");
  load();
}
