// Main entrypoint for frontend
import { initBookController } from "./controllers/bookController.js";
import { initLibrarianController } from "./controllers/librarianController.js";
import { initBookshelfController } from "./controllers/bookshelfController.js";
import { router } from "./router/viewRouter.js";

// Initialize app on page load
window.addEventListener("DOMContentLoaded", () => {
  router();
  initBookController();
  initLibrarianController();
  initBookshelfController();
});