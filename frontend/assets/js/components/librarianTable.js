// components/librarianTable.js
import { $ } from "../utils/dom.js";
import { editLibrarian, deleteLibrarian } from "../controllers/librarianController.js";
// ================================
// LIBRARIANS TABLE RENDERER
// ================================
export function renderLibrarianTable(librarians) {
  const body = $("librariansTableBody");
  const noLibrarians = $("noLibrarians");

  body.innerHTML = "";
  
  if (librarians.length === 0) {
    noLibrarians.style.display = "block";
    return;
  }

  noLibrarians.style.display = "none";

  librarians.forEach(librarian => {
    const row = document.createElement("tr");
    row.className = "border-b hover:bg-gray-50";

    row.innerHTML = `
      <td class="px-4 py-3 text-sm font-medium text-gray-900">${librarian.id?.slice(-8) || ''}</td>
      <td class="px-4 py-3">
        <div class="font-medium text-gray-900">${librarian.name || ''}</div>
        <div class="text-sm text-gray-500">${librarian.email || ''}</div>
      </td>
      <td class="px-4 py-3">
        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">${librarian.role || 'Staff'}</span>
      </td>
      <td class="px-4 py-3 text-sm">${librarian.phone || ''}</td>
      <td class="px-4 py-3 text-sm text-gray-500">${librarian.hire_date ? new Date(librarian.hire_date).toLocaleDateString() : ''}</td>
      <td class="px-4 py-3 font-mono text-sm text-gray-900">$${librarian.salary?.toLocaleString() || '0'}</td>
      <td class="px-4 py-3 text-right space-x-2">
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded text-sm font-medium transition"
                data-edit="${librarian.id}">Edit</button>
        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm font-medium transition"
                data-delete="${librarian.id}">Delete</button>
      </td>
    `;

    row.querySelector("[data-edit]").onclick = () => editLibrarian(librarian.id);
    row.querySelector("[data-delete]").onclick = () => deleteLibrarian(librarian.id);
    
    body.appendChild(row);
  });
}
