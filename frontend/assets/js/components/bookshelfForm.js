import { $ } from "../utils/dom.js";

// ================================
// BOOKSHELF FORM HANDLERS
// ================================

export function resetBookshelfForm() {
  const form = $("bookshelvesForm");
  if (form) form.reset();

  const submitBtn = $("bookshelfSubmitBtn");
  if (submitBtn) submitBtn.textContent = "Add Bookshelf";

  const cancelBtn = $("cancelBookshelfBtn");
  if (cancelBtn) cancelBtn.style.display = "none";
}

export function fillBookshelfForm(bookshelf) {
  if (!bookshelf) return;

  $("bookshelfName").value = bookshelf.name || "";
  $("bookshelfLocation").value = bookshelf.location || "";
  $("bookshelfCapacity").value = bookshelf.capacity ?? 0;
  $("bookshelfCurrentCount").value = bookshelf.current_count ?? 0;

  const submitBtn = $("bookshelfSubmitBtn");
  if (submitBtn) submitBtn.textContent = "Update Bookshelf";

  const cancelBtn = $("cancelBookshelfBtn");
  if (cancelBtn) cancelBtn.style.display = "block";
}
