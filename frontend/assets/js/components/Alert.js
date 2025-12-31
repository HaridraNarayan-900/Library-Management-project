import { $ } from "../utils/dom.js";

// ================================
// ALERT UTILITY
// ================================

/**
 * Displays a temporary alert message.
 * @param {string} message - The message to show.
 * @param {"success"|"error"} type - Type of alert; success is default.
 * @param {number} duration - Duration in ms; default 3000ms.
 */
export function showAlert(message, type = "success", duration = 3000) {
  const container = $("alertContainer");

  // Exit early if container not found
  if (!container) {
    console.warn("⚠️ Alert container not found. Message:", message);
    return;
  }

  // Create alert element
  const el = document.createElement("div");

  // Set alert classes
  el.className = `
    px-6 py-3 rounded-xl shadow-lg text-white font-medium mb-4 transform transition-all duration-300
    ${type === "error" ? "bg-red-500" : "bg-green-500"}
  `.trim();

  // Set message text
  el.textContent = message;

  // Insert alert at the top of container (latest alert first)
  container.prepend(el);

  // Animate: slide in
  el.style.opacity = "0";
  el.style.transform = "translateY(-10px)";
  requestAnimationFrame(() => {
    el.style.transition = "all 0.3s ease";
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });

  // Auto-remove after duration
  setTimeout(() => {
    // Animate out
    el.style.opacity = "0";
    el.style.transform = "translateY(-10px)";
    setTimeout(() => el.remove(), 300); // wait for animation to finish
  }, duration);
}

