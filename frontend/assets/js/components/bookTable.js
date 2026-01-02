import { $ } from "../utils/dom.js";
import { editBook, deleteBookAction } from "../controllers/bookController.js";

// Renders the list of books into an HTML table
export function renderBookTable(books) {
  // Get references to the table body where rows will be inserted and the 'no books' message
  const body = $("booksTableBody");
  const noBooks = $("noBooks");

  // Clear any existing rows from the table body before rendering new data
  body.innerHTML = "";

  // Check if the book array is empty
  if (books.length === 0) {
    // If no books are found, display the 'no books' message and stop execution
    noBooks.style.display = "block";
    return;
  }

  // If books exist, hide the 'no books' message
  noBooks.style.display = "none";

  // Iterate over each book object in the provided array
  books.forEach(book => {
    // Create a new table row element for the current book
    const row = document.createElement("tr");
    row.className = "border-b"; // Add styling class (likely Tailwind CSS)

    // Populate the row with dynamic HTML content using a template literal
    row.innerHTML = `
      <td class="px-3 py-2">${book.id}</td>
      <td class="px-3 py-2">${book.title}</td>
      <td class="px-3 py-2">${book.author}</td>
      <td class="px-3 py-2">${book.isbn}</td>
      <td class="px-3 py-2">${book.shelf_id}</td>
      <td class="px-3 py-2 flex space-x-2">
        <!-- Buttons are created with data attributes holding the book ID -->
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${book.id}">Edit</button>

        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${book.id}">Delete</button>
      </td>
    `;

    // --- Attach event listeners to the newly created buttons ---

    // Find the 'Edit' button within this specific row and attach a click handler
    // When clicked, call the editbook function with the correct book ID
    row.querySelector("[data-edit]").onclick = () => editBook(book.id);
    
    // Find the 'Delete' button within this specific row and attach a click handler
    // When clicked, call the deletebookAction function with the correct book ID
    row.querySelector("[data-delete]").onclick = () => deleteBookAction(book.id);

    // Append the fully constructed row to the table body
    body.appendChild(row);
  });
}
