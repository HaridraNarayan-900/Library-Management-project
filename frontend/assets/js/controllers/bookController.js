import {
  apiGetAll,
  apiGetOne, 
  apiCreate, 
  apiUpdate, 
  apiDelete }
from "../services/bookService.js";

import { showAlert } from "../components/Alert.js";
import { renderbookTable } from "../components/bookTable.js";
import { resetForm, fillForm } from "../components/bookForm.js";

import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

// Setup event listeners and load initial data
// Initialize the main logic and set up all necessary event listeners
export function initbookController() {
  // Start by fetching and displaying all book data immediately upon load
  loadbooks();

  // --- Handle Form Submissions ---

  // Attach a listener to the 'submit' event of the book input form
  $("bookForm").addEventListener("submit", async (e) => {
    // Prevent the browser's default form submission behavior (page refresh)
    e.preventDefault();

    // Collect data from the input fields using the custom '$' selector
    const data = {
      name: $("name").value.trim(),   // Get name value, remove whitespace
      email: $("email").value.trim(), // Get email value
      course: $("course").value.trim(), // Get course value
      year: $("year").value.trim()    // Get year value
    };

    // Check the application state to see if we are currently editing an existing record
    const { editingId } = getState();

    // Use a ternary operator to decide which action to take:
    editingId
      ? await updatebook(editingId, data) // If editingId exists, update the book
      : await createNewbook(data);        // Otherwise, create a new book
  });

  // --- Handle Cancel Button Click ---

  // Attach a listener to the 'click' event of the cancel button
  $("cancelBtn").addEventListener("click", () => {
    // Clear the editing state (set the ID to null)
    setState({ editingId: null });
    // Clear all input fields in the form
    resetForm();
  });
}


// Fetch all book data from the API and update the user interface
export async function loadbooks() {
  // Get references to the loading spinner and the main data table elements
  const spinner = $("loadingSpinner");
  const table = $("booksTableContainer");

  // Show the spinner and hide the table to indicate a loading state
  spinner.style.display = "block";
  table.style.display = "none";

  // Asynchronously fetch all book records from the backend API
  const books = await apiGetAll();

  // Store the retrieved book array in the application's global state
  setState({ books });
  // Render the fetched book data into the HTML table structure
  renderbookTable(books);

  // Hide the spinner and show the table now that the data is loaded and displayed
  spinner.style.display = "none";
  table.style.display = "block";
}


// Create a new book
 export async function createNewbook(data) {
   const res = await apiCreate(data);
   if (res.ok) {
     showAlert("book added!");
     resetForm();
     loadbooks();
   }
 }

// Load a book into the form for editing
 export async function editbook(id) {
   const book = await apiGetOne(id);

   setState({ editingId: id });
   fillForm(book);

   window.scrollTo({ top: 0, behavior: "smooth" });
 }

// // Update an existing book
 export async function updatebook(id, data) {
   const res = await apiUpdate(id, data);
   if (res.ok) {
     showAlert("Updated!");
     resetForm();
     setState({ editingId: null });
     loadbooks();
   }
 }

// Delete a book
 export async function deletebookAction(id) {
   if (!confirm("Delete this book?")) return;

   const res = await apiDelete(id);
  	if (res.ok) {
     showAlert("Deleted!");
    loadbooks();
  }
}