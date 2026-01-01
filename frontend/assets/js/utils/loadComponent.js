import { $, clearElement, appendTo } from "./dom.js";
import { renderBooks } from "./bookshelf.js";
import { renderLibrarians } from "./librarian.js";

// Map of routes to HTML files
const routes = {
  "/": "home.html",
  "/home": "home.html",
  "/books": "books.html",
  "/librarians": "librarian.html",
  "/bookshelf": "bookshelf.html",
};

// Main container to load content
const containerId = "app"; // Make sure your index.html has <div id="app"></div>

// Fetch and load HTML content
export async function loadComponent(route) {
  const path = routes[route] || "404.html";
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error("Page not found");

    const html = await res.text();
    clearElement(containerId);
    appendTo(containerId, html);

    // Initialize CRUD functions based on loaded page
    if (route === "/books") renderBooks();
    else if (route === "/librarians") renderLibrarians();
    else if (route === "/bookshelf") renderBooks();
  } catch (err) {
    console.error(err);
    clearElement(containerId);
    appendTo(containerId, "<h2>404 - Page Not Found</h2>");
  }
}

// Navigation function to change route without reload
export function navigateTo(route) {
  window.history.pushState({}, "", route);
  loadComponent(route);
}

// Handle browser back/forward
window.addEventListener("popstate", () => {
  loadComponent(window.location.pathname);
});

// Setup navigation links (any link with data-link attribute)
export function initRouter() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (link) {
      e.preventDefault();
      navigateTo(link.getAttribute("href"));
    }
  });

  // Load initial route
  loadComponent(window.location.pathname);
}
