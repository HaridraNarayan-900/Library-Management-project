import { $, createElement } from "../utils/dom.js";

// Resets the input form to its default state for creating a new librarian
export function resetForm() {
  // Use the native .reset() method on the HTML form element
  $("librarianForm").reset();

  // Change the submit button text back to "Add librarian"
  $("submitBtn").textContent = "Add Librarian";

  // Hide the "Cancel" button, as we are no longer in 'edit' mode
  $("cancelBtn").style.display = "none";
}

// Populates the input form fields with data from a selected librarian object (for editing)
export function fillForm(librarian) {
  // Fill each input field with the corresponding property from the librarian data
  $("name").value = librarian.name;
  $("email").value = librarian.email;
  $("phone").value = librarian.phone;

  // Change the submit button text to "Update librarian"
  $("submitBtn").textContent = "Update Librarian";

  // Show the "Cancel" button, allowing the user to exit 'edit' mode
  $("cancelBtn").style.display = "inline-block";
}