import { initBookController } from "/frontend/assets/js/controllers/bookController.js";
import { initBookshelfController } from "/frontend/assets/js/controllers/bookshelfController.js";
import { initLibrarianController } from "/frontend/assets/js/controllers/librarianController.js";


// Load a view into #app container
async function loadView(path) {
  const html = await fetch(path).then(res => res.text());
  document.querySelector("#app").innerHTML = html;
}

// Decide which view to load based on URL
export async function router() {
  const path = window.location.pathname;

  // Home routes
  if (path === "/" || path === "/home" || path === "/index.html") {
    await loadView("/frontend/pages/home.html");
  }
  
  // Books Management
  else if (path === "/books") {
    await loadView("/frontend/pages/books.html");
    initBookController();
  }

  // Librarians Management
  else if (path === "/librarians") {
    await loadView("/frontend/pages/librarian.html");
    initLibrarianController();
  }

  // Bookshelves Management
  else if (path === "/bookshelves") {
    await loadView("/frontend/pages/bookshelf.html");
    initBookshelfController();
  }

  // API routes (open in new tab, no controller needed)
  else if (path.startsWith("/api/")) {
    // API calls handled by services, no view needed
    return;
  }
  // 404
  else {
    await loadView("/frontend/pages/404.html");
  }
}

// Make links work without page reload
export function initRouterEvents() {
  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(null, "", e.target.href);
      router();
    }
  });

  // Back/forward buttons support
  window.addEventListener("popstate", router);
}

// Initialize router on page load
export function initRouter() {
  initRouterEvents();
  router(); // Load initial route
}
