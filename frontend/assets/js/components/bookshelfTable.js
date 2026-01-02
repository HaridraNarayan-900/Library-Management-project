import { $ } from "../utils/dom.js";
import { editBookshelf, deleteBookshelfAction } from "../controllers/bookshelfController.js";

// Renders the list of bookshelfs into an HTML table
export function renderbookshelfTable(bookshelves) {
  // Get references to the table body where rows will be inserted and the 'no bookshelfs' message
  const body = $("bookshelfsTableBody");
  const noBookshelves = $("nobookshelves");

  // Clear any existing rows from the table body before rendering new data
  body.innerHTML = "";

  // Check if the bookshelf array is empty
  if (bookshelves.length === 0) {
    // If no bookshelfs are found, display the 'no bookshelfs' message and stop execution
    noBookshelves.style.display = "block";
    return;
  }

  // If bookshelfs exist, hide the 'no bookshelfs' message
  noBookshelves.style.display = "none";

  // Iterate over each bookshelf object in the provided array
  bookshelves.forEach(bookshelf => {
    // Create a new table row element for the current bookshelf
    const row = document.createElement("tr");
    row.className = "border-b"; // Add styling class (likely Tailwind CSS)

    // Populate the row with dynamic HTML content using a template literal
    row.innerHTML = `
      <td class="px-3 py-2">${bookshelf.location}</td>
      <td class="px-3 py-2">${bookshelf.position}</td>
      <td class="px-3 py-2 flex space-x-2">
        <!-- Buttons are created with data attributes holding the bookshelf ID -->
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${bookshelf.id}">Edit</button>

        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${bookshelf.id}">Delete</button>
      </td>
    `;

    // --- Attach event listeners to the newly created buttons ---

    // Find the 'Edit' button within this specific row and attach a click handler
    // When clicked, call the editbookshelf function with the correct bookshelf ID
    row.querySelector("[data-edit]").onclick = () => editBookshelf(bookshelf.id);
    
    // Find the 'Delete' button within this specific row and attach a click handler
    // When clicked, call the deletebookshelfAction function with the correct bookshelf ID
    row.querySelector("[data-delete]").onclick = () => deleteBookshelfAction(bookshelf.id);

    // Append the fully constructed row to the table body
    body.appendChild(row);
  });
}