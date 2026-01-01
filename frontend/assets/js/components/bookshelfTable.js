import { editBookshelf, handleDeleteBookshelf } from "../controllers/bookshelfController.js";
import { $ } from "../utils/dom.js";

export function renderBookshelvesTable(data = []) {
  const body = $("bookshelvesTableBody");
  const empty = $("noBookshelves");

  body.innerHTML = "";

  if (!data.length) {
    empty.classList.remove("hidden");
    return;
  }

  empty.classList.add("hidden");

  data.forEach(b => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${b.id}</td>
      <td>${b.name}</td>
      <td>${b.location}</td>
      <td>${b.capacity}</td>
      <td>
        <button data-edit>Edit</button>
        <button data-del>Delete</button>
      </td>
    `;

    tr.querySelector("[data-edit]").onclick = () => editBookshelf(b.id);
    tr.querySelector("[data-del]").onclick = () => handleDeleteBookshelf(b.id);
    body.appendChild(tr);
  });
}

