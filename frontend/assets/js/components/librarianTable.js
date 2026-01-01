import { editLibrarian, handleDeleteLibrarian } from "../controllers/librarianController.js";
import { $ } from "../utils/dom.js";

export function renderLibrariansTable(librarians = []) {
  const body = $("librariansTableBody");
  const empty = $("noLibrarians");

  body.innerHTML = "";

  if (!librarians.length) {
    empty.classList.remove("hidden");
    return;
  }

  empty.classList.add("hidden");

  librarians.forEach(l => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${l.id}</td>
      <td>${l.name}</td>
      <td>${l.email}</td>
      <td>${l.position}</td>
      <td>
        <button data-edit>Edit</button>
        <button data-del>Delete</button>
      </td>
    `;

    tr.querySelector("[data-edit]").onclick = () => editLibrarian(l.id);
    tr.querySelector("[data-del]").onclick = () => handleDeleteLibrarian(l.id);
    body.appendChild(tr);
  });
}
