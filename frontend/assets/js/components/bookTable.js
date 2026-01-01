import { editBook, handleDeleteBook } from "../controllers/bookController.js";
import { $ } from "../utils/dom.js";

export function renderBooksTable(books = []) {
  const body = $("booksTableBody");
  const empty = $("noBooks");

  body.innerHTML = "";

  if (!books.length) {
    empty.classList.remove("hidden");
    return;
  }

  empty.classList.add("hidden");

  books.forEach((b) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${b.id}</td>
      <td>${b.title}</td>
      <td>${b.author}</td>
      <td>${b.isbn}</td>
      <td>${b.category}</td>
      <td>${b.available_copies}</td>
      <td>
        <button data-edit>Edit</button>
        <button data-del>Delete</button>
      </td>
    `;
    tr.querySelector("[data-edit]").onclick = () => editBook(b.id);
    tr.querySelector("[data-del]").onclick = () => handleDeleteBook(b.id);
    body.appendChild(tr);
  });
}
