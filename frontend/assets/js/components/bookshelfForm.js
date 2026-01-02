import { $, createElement } from "../utils/dom.js";

// Resets the input form to its default state for creating a new bookshelf
export function resetForm() {
  // Use the native .reset() method on the HTML form element
  $("bookshelfForm").reset();

  // Change the submit button text back to "Add bookshelf"
  $("submitBtn").textContent = "Add Bookshelf";

  // Hide the "Cancel" button, as we are no longer in 'edit' mode
  $("cancelBtn").style.display = "none";
}

// Populates the input form fields with data from a selected bookshelf object (for editing)
export function fillForm(bookshelf) {
  // Fill each input field with the corresponding property from the bookshelf data
  $("location").value = bookshelf.location;
  $("description").value = bookshelf.position;

  // Change the submit button text to "Update bookshelf"
  $("submitBtn").textContent = "Update Bookshelf";

  // Show the "Cancel" button, allowing the user to exit 'edit' mode
  $("cancelBtn").style.display = "inline-block";
}

