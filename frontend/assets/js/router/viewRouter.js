import { initBookController } from "/frontend/assets/js/controllers/bookController.js";
import { initBookshelfController } from "/frontend/assets/js/controllers/bookshelfController.js";
import { initLibrarianController } from "/frontend/assets/js/controllers/librarianController.js";
import { showAlert } from "/frontend/assets/js/components/Alert.js";

// ================================
// LOAD VIEW INTO #APP CONTAINER
// ================================
async function loadView(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path} (${res.status})`);
    const html = await res.text();
    const app = document.querySelector("#app");
    if (!app) throw new Error("#app container not found in DOM");
    app.innerHTML = html;
  } catch (err) {
    console.error(err);
    showAlert("Failed to load page.", "error");
    document.querySelector("#app").innerHTML = "<h2 class='text-center mt-10'>Error loading page.</h2>";
  }
}

// ================================
// ROUTER
// ================================
export async function router() {
  const path = window.location.pathname;

  try {
    // Home routes
    if (path === "/" || path === "/home" || path === "/index.html") {
      await loadView("/frontend/pages/home.html");
    }

    // Books Management
    else if (path === "/books") {
      await loadView("/frontend/pages/books.html");
      initBookController(); // Initialize book CRUD
    }

    // Librarians Management
    else if (path === "/librarians") {
      await loadView("/frontend/pages/librarian.html");
      initLibrarianController(); // Initialize librarian CRUD
    }

    // Bookshelves Management
    else if (path === "/bookshelves") {
      await loadView("/frontend/pages/bookshelf.html");
      initBookshelfController(); // Initialize bookshelf CRUD
    }

    // API routes (no view needed)
    else if (path.startsWith("/api/")) {
      return; // Services handle API calls
    }

    // 404 - fallback page
    else {
      await loadView("/frontend/pages/404.html");
    }
  } catch (err) {
    console.error("Routing error:", err);
    showAlert("Failed to navigate page.", "error");
  }
}

// ================================
// LINK EVENTS (Prevent reload)
// ================================
export function initRouterEvents() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (!link) return;

    e.preventDefault();
    const href = link.href;

    if (href) {
      history.pushState(null, "", href);
      router();
    }
  });

  // Support browser back/forward buttons
  window.addEventListener("popstate", router);
}

// ================================
// INIT ROUTER
// ================================
export function initRouter() {
  initRouterEvents();
  router(); // Load initial route
}
