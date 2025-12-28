// frontend/assets/js/components/BookshelfForm.js
import { $ } from "../utils/dom.js";

// ================================
// BOOKSHELF FORM HANDLERS
// ================================

// Reset the bookshelf form to default state
export function resetBookshelfForm() {
  const form = $("bookshelfForm");
  if (form) form.reset();

  // Reset submit button text
  const submitBtn = $("bookshelfSubmitBtn");
  if (submitBtn) submitBtn.textContent = "Add Bookshelf";

  // Hide cancel button
  const cancelBtn = $("bookshelfCancelBtn");
  if (cancelBtn) cancelBtn.style.display = "none";
}

// Fill the bookshelf form for editing
export function fillBookshelfForm(bookshelf) {
  if (!bookshelf) return;

  $("bookshelfName").value = bookshelf.name || "";
  $("bookshelfZone").value = bookshelf.zone || "";
  $("bookshelfCapacity").value = bookshelf.capacity ?? 0;
  $("bookshelfCurrentCount").value = bookshelf.current_count ?? 0;
  $("bookshelfLocation").value = bookshelf.location || "";

  // Change submit button text to indicate update
  const submitBtn = $("bookshelfSubmitBtn");
  if (submitBtn) submitBtn.textContent = "Update Bookshelf";

  // Show cancel button
  const cancelBtn = $("bookshelfCancelBtn");
  if (cancelBtn) cancelBtn.style.display = "block";
}

