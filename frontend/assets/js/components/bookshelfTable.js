// components/bookshelfTable.js
import { $ } from "../utils/dom.js";
import { editbookshelf, deletebookshelf } from "../controllers/bookshelfController.js";
// ================================
// bookshelfS TABLE RENDERER
// ================================
export function renderbookshelfTable(bookshelves) {
  const body = $("bookshelfsTableBody");
  const nobookshelfs = $("nobookshelfs");

  body.innerHTML = "";
  
  if (bookshelves.length === 0) {
    nobookshelfs.style.display = "block";
    return;
  }

  nobookshelfs.style.display = "none";

  bookshelves.forEach(bookshelf => {
    const row = document.createElement("tr");
    row.className = "border-b hover:bg-gray-50";

    row.innerHTML = `
      <td class="px-4 py-3 text-sm font-medium text-gray-900">${bookshelf.id?.slice(-8) || ''}</td>
      <td class="px-4 py-3">
        <div class="font-medium text-gray-900">${bookshelf.name || ''}</div>
        <div class="text-sm text-gray-500">${bookshelf.email || ''}</div>
      </td>
      <td class="px-4 py-3">
        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">${bookshelf.role || 'Staff'}</span>
      </td>
      <td class="px-4 py-3 text-sm">${bookshelf.phone || ''}</td>
      <td class="px-4 py-3 text-sm text-gray-500">${bookshelf.hire_date ? new Date(bookshelf.hire_date).toLocaleDateString() : ''}</td>
      <td class="px-4 py-3 font-mono text-sm text-gray-900">$${bookshelf.salary?.toLocaleString() || '0'}</td>
      <td class="px-4 py-3 text-right space-x-2">
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded text-sm font-medium transition"
                data-edit="${bookshelf.id}">Edit</button>
        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm font-medium transition"
                data-delete="${bookshelf.id}">Delete</button>
      </td>
    `;

    row.querySelector("[data-edit]").onclick = () => editbookshelf(bookshelf.id);
    row.querySelector("[data-delete]").onclick = () => deletebookshelf(bookshelf.id);
    
    body.appendChild(row);
  });
}
