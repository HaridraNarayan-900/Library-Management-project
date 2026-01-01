import { $ } from "../utils/dom.js";

export function resetBookshelfForm() {
  $("bookshelfForm")?.reset();
  $("bookshelfSubmitBtn").textContent = "Add Shelf";
  $("cancelBookshelfBtn").classList.add("hidden");
}

export function fillBookshelfForm(b) {
  $("shelfName").value = b.name || "";
  $("shelfLocation").value = b.location || "";
  $("shelfCapacity").value = b.capacity || 0;

  $("bookshelfSubmitBtn").textContent = "Update Shelf";
  $("cancelBookshelfBtn").classList.remove("hidden");
}

