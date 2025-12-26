import {
  apiGetAll,
  apiGetOne, 
  apiCreate, 
  apiUpdate, 
  apiDelete }
from "../services/librarianService.js";

import { showAlert } from "../components/Alert.js";
import { renderlibrarianTable } from "../components/librarianTable.js";
import { resetForm, fillForm } from "../components/librarianForm.js";

import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

// Setup event listeners and load initial data
// Initialize the main logic and set up all necessary event listeners
export function initlibrarianController() {
  // Start by fetching and displaying all librarian data immediately upon load
  loadlibrarians();

  // --- Handle Form Submissions ---

  // Attach a listener to the 'submit' event of the librarian input form
  $("librarianForm").addEventListener("submit", async (e) => {
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
      ? await updatelibrarian(editingId, data) // If editingId exists, update the librarian
      : await createNewlibrarian(data);        // Otherwise, create a new librarian
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


// Fetch all librarian data from the API and update the user interface
export async function loadlibrarians() {
  // Get references to the loading spinner and the main data table elements
  const spinner = $("loadingSpinner");
  const table = $("librariansTableContainer");

  // Show the spinner and hide the table to indicate a loading state
  spinner.style.display = "block";
  table.style.display = "none";

  // Asynchronously fetch all librarian records from the backend API
  const librarians = await apiGetAll();

  // Store the retrieved librarian array in the application's global state
  setState({ librarians });
  // Render the fetched librarian data into the HTML table structure
  renderlibrarianTable(librarians);

  // Hide the spinner and show the table now that the data is loaded and displayed
  spinner.style.display = "none";
  table.style.display = "block";
}


// Create a new librarian
 export async function createNewlibrarian(data) {
   const res = await apiCreate(data);
   if (res.ok) {
     showAlert("librarian added!");
     resetForm();
     loadlibrarians();
   }
 }

// Load a librarian into the form for editing
 export async function editlibrarian(id) {
   const librarian = await apiGetOne(id);

   setState({ editingId: id });
   fillForm(librarian);

   window.scrollTo({ top: 0, behavior: "smooth" });
 }

// // Update an existing librarian
 export async function updatelibrarian(id, data) {
   const res = await apiUpdate(id, data);
   if (res.ok) {
     showAlert("Updated!");
     resetForm();
     setState({ editingId: null });
     loadlibrarians();
   }
 }

// Delete a librarian
 export async function deletelibrarianAction(id) {
   if (!confirm("Delete this librarian?")) return;

   const res = await apiDelete(id);
    if (res.ok) {
     showAlert("Deleted!");
    loadlibrarians();
  }
}