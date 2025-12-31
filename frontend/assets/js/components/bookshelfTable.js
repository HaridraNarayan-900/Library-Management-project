import { $ } from "../utils/dom.js";
import { editBookshelf, handleDeleteBookshelf } from "../controllers/bookshelfController.js";

export function renderBookshelfTable(bookshelves) {
  const body = $("bookshelvesTableBody");
  const noBookshelves = $("noBookshelves");

  if (!body || !noBookshelves) return;

  body.innerHTML = "";

  if (!bookshelves || bookshelves.length === 0) {
    noBookshelves.style.display = "block";
    return;
  }

  noBookshelves.style.display = "none";

  bookshelves.forEach(bookshelf => {
    const row = document.createElement("tr");
    row.className = "border-b hover:bg-gray-50";

    row.innerHTML = `
      <td class="px-4 py-3 text-sm font-medium text-gray-900">${String(bookshelf.id).slice(-8)}</td>
      <td class="px-4 py-3">${bookshelf.name ?? ''}</td>
      <td class="px-4 py-3">${bookshelf.zone ?? ''}</td>
      <td class="px-4 py-3">${bookshelf.capacity ?? 0}</td>
      <td class="px-4 py-3">${bookshelf.current_count ?? 0}</td>
      <td class="px-4 py-3">${bookshelf.location ?? ''}</td>
      <td class="px-4 py-3 text-right space-x-2">
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded text-sm font-medium transition"
                data-edit="${bookshelf.id}">Edit</button>
        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm font-medium transition"
                data-delete="${bookshelf.id}">Delete</button>
      </td>
    `;

    const editBtn = row.querySelector("[data-edit]");
    const deleteBtn = row.querySelector("[data-delete]");

    if (editBtn) editBtn.onclick = () => editBookshelf(bookshelf.id);
    if (deleteBtn) deleteBtn.onclick = () => handleDeleteBookshelf(bookshelf.id);

    body.appendChild(row);
  });
}
