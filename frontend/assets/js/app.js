import { initLibrarianController } from "./controllers/librarianController.js";
import { initBookshelfController } from "./controllers/bookshelfController.js";
import { initBookController } from "./controllers/bookController.js";
import { router } from "./router/viewRouter.js";

window.addEventListener("DOMContentLoaded", () => {
  router();
  initLibrarianController();
  initBookshelfController();
  initBookController();

});