import { $ } from "../utils/dom.js";
import { editBook, deleteBook } from "../controllers/bookController.js";

// ================================
// BOOK TABLE RENDERER
// ================================
export function renderBookTable(books) {
  const body = $("booksTableBody");
  const noBooks = $("noBooks");

  if (!body || !noBooks) {
    console.error("Required elements not found!");
    return;
  }

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
      <td class="px-4 py-3 text-sm font-medium text-gray-900">${book.id ?? ''}</td>
      <td class="px-4 py-3 text-sm font-medium text-blue-600">${book.title ?? ''}</td>
      <td class="px-4 py-3 text-sm text-gray-700">${book.author ?? ''}</td>
      <td class="px-4 py-3 text-sm">${book.isbn ?? ''}</td>
      <td class="px-4 py-3 text-sm text-gray-700">${book.category ?? 'General'}</td>
      <td class="px-4 py-3 text-sm font-medium">
        <span class="text-green-600">${book.available_copies ?? 0}</span> / 
        <span class="text-gray-600">${book.total_copies ?? 0}</span>
      </td>
      <td class="px-4 py-3 text-right space-x-2">
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded text-sm font-medium transition"
                data-edit="${book.id}">Edit</button>
        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm font-medium transition"
                data-delete="${book.id}">Delete</button>
      </td>
    `;

    row.querySelector("[data-edit]").onclick = () => editBook(book.id);
    row.querySelector("[data-delete]").onclick = () => deleteBook(book.id);

    body.appendChild(row);
  });
}
