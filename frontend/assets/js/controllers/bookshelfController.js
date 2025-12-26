import {
  apiGetAll,
  apiGetOne, 
  apiCreate, 
  apiUpdate, 
  apiDelete }
from "../services/bookshelveservice.js";

import { showAlert } from "../components/Alert.js";
import { renderbookshelfTable } from "../components/bookshelfTable.js";
import { resetForm, fillForm } from "../components/bookshelfForm.js";

import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

// Setup event listeners and load initial data
// Initialize the main logic and set up all necessary event listeners
export function initbookshelfController() {
  // Start by fetching and displaying all bookshelf data immediately upon load
  loadbookshelves();

  // --- Handle Form Submissions ---

  // Attach a listener to the 'submit' event of the bookshelf input form
  $("bookshelfForm").addEventListener("submit", async (e) => {
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
      ? await updatebookshelf(editingId, data) // If editingId exists, update the bookshelf
      : await createNewbookshelf(data);        // Otherwise, create a new bookshelf
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


// Fetch all bookshelf data from the API and update the user interface
export async function loadbookshelves() {
  // Get references to the loading spinner and the main data table elements
  const spinner = $("loadingSpinner");
  const table = $("bookshelvesTableContainer");

  // Show the spinner and hide the table to indicate a loading state
  spinner.style.display = "block";
  table.style.display = "none";

  // Asynchronously fetch all bookshelf records from the backend API
  const bookshelves = await apiGetAll();

  // Store the retrieved bookshelf array in the application's global state
  setState({ bookshelves });
  // Render the fetched bookshelf data into the HTML table structure
  renderbookshelfTable(bookshelves);

  // Hide the spinner and show the table now that the data is loaded and displayed
  spinner.style.display = "none";
  table.style.display = "block";
}


// Create a new bookshelf
export async function createNewbookshelf(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("bookshelf added!");
    resetForm();
    loadbookshelves();
  }
}

// Load a bookshelf into the form for editing
export async function editbookshelf(id) {
  const bookshelf = await apiGetOne(id);

  setState({ editingId: id });
  fillForm(bookshelf);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// // Update an existing bookshelf
export async function updatebookshelf(id, data) {
  const res = await apiUpdate(id, data);
  if (res.ok) {
    showAlert("Updated!");
    resetForm();
    setState({ editingId: null });
    loadbookshelves();
  }
}

// Delete a bookshelf
export async function deletebookshelfAction(id) {
  if (!confirm("Delete this bookshelf?")) return;

  const res = await apiDelete(id);
    if (res.ok) {
    showAlert("Deleted!");
    loadbookshelves();
  }
}