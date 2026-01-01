import { initBookController } from "../controllers/bookController.js";
import { initLibrarianController } from "../controllers/librarianController.js";
import { initBookshelfController } from "../controllers/bookshelfController.js";

export async function router() {
  const app = document.querySelector("#app");
  const path = location.pathname;

  if (path === "/" || path === "/home") {
    app.innerHTML = await (await fetch("/frontend/pages/home.html")).text();
  } else if (path === "/books") {
    app.innerHTML = await (await fetch("/frontend/pages/books.html")).text();
    initBookController();
  } else if (path === "/librarians") {
    app.innerHTML = await (await fetch("/frontend/pages/librarian.html")).text();
    initLibrarianController();
  } else if (path === "/bookshelves") {
    app.innerHTML = await (await fetch("/frontend/pages/bookshelf.html")).text();
    initBookshelfController();
  } else {
    app.innerHTML = await (await fetch("/frontend/pages/404.html")).text();
  }
}

export function initRouterEvents() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (!link) return;
    e.preventDefault();
    history.pushState(null, "", link.href);
    router();
  });

  window.addEventListener("popstate", router);
}

