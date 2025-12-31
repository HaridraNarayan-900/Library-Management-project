// frontend/assets/js/main.js

// Import the router that handles all views and controller initialization
import { initApp } from "./app.js";

// Initialize the application when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  initApp();
});
