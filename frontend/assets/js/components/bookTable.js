import { $ } from "../utils/dom.js";
import { editBook, handleDeleteBook } from "../controllers/bookController.js";

// ================================
// BOOK TABLE RENDERER
// ================================
export function renderBooksTable(books) {
  const body = $("booksTableBody");
  const noBooks = $("noBooks");

  if (!body || !noBooks) return;

  body.innerHTML = "";

  if (!books || books.length === 0) {
    noBooks.style.display = "block";
    return;
  }

  noBooks.style.display = "none";

  books.forEach(book => {
    const row = document.createElement("tr");
    row.className = "border-b hover:bg-gray-50";

    row.innerHTML = `
      <td class="px-4 py-3 text-sm font-medium text-gray-900">${String(book.id).slice(-8)}</td>
      <td class="px-4 py-3">${book.title ?? ''}</td>
      <td class="px-4 py-3">${book.author ?? ''}</td>
      <td class="px-4 py-3">${book.isbn ?? ''}</td>
      <td class="px-4 py-3">${book.genre ?? ''}</td>
      <td class="px-4 py-3">${book.shelf_id ?? ''}</td>
      <td class="px-4 py-3 text-right space-x-2">
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded text-sm font-medium transition"
                data-edit="${book.id}">Edit</button>
        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm font-medium transition"
                data-delete="${book.id}">Delete</button>
      </td>
    `;

    const editBtn = row.querySelector("[data-edit]");
    const deleteBtn = row.querySelector("[data-delete]");

    if (editBtn) editBtn.onclick = () => editBook(book.id);
    if (deleteBtn) deleteBtn.onclick = () => handleDeleteBook(book.id);

    body.appendChild(row);
  });
}

