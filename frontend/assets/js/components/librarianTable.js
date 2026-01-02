import { $ } from "../utils/dom.js";
import { editLibrarian, deleteLibrarianAction } from "../controllers/librarianController.js";

// Renders the list of librarians into an HTML table
export function renderLibrarianTable(librarians) {
  // Get references to the table body where rows will be inserted and the 'no librarians' message
  const body = $("librariansTableBody");
  const noLibrarians = $("noLibrarians");

  // Clear any existing rows from the table body before rendering new data
  body.innerHTML = "";

  // Check if the librarian array is empty
  if (librarians.length === 0) {
    // If no librarians are found, display the 'no librarians' message and stop execution
    noLibrarians.style.display = "block";
    return;
  }

  // If librarians exist, hide the 'no librarians' message
  noLibrarians.style.display = "none";

  // Iterate over each librarian object in the provided array
  librarians.forEach(librarian => {
    // Create a new table row element for the current librarian
    const row = document.createElement("tr");
    row.className = "border-b"; // Add styling class (likely Tailwind CSS)

    // Populate the row with dynamic HTML content using a template literal
    row.innerHTML = `
      <td class="px-3 py-2">${librarian.id}</td>
      <td class="px-3 py-2">${librarian.name}</td>
      <td class="px-3 py-2">${librarian.email}</td>
      <td class="px-3 py-2">${librarian.phone}</td>
      <td class="px-3 py-2 flex space-x-2">
        <!-- Buttons are created with data attributes holding the librarian ID -->
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${librarian.id}">Edit</button>

        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${librarian.id}">Delete</button>
      </td>
    `;

    // --- Attach event listeners to the newly created buttons ---

    // Find the 'Edit' button within this specific row and attach a click handler
    // When clicked, call the editlibrarian function with the correct librarian ID
    row.querySelector("[data-edit]").onclick = () => editLibrarian(librarian.id);
    
    // Find the 'Delete' button within this specific row and attach a click handler
    // When clicked, call the deletelibrarianAction function with the correct librarian ID
    row.querySelector("[data-delete]").onclick = () => deleteLibrarianAction(librarian.id);

    // Append the fully constructed row to the table body
    body.appendChild(row);
  });
}