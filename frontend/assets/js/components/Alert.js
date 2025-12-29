// components/Alert.js - FIXED
import { $ } from "../utils/dom.js";

// Displays a temporary alert message (success by default, or error if specified)
export function showAlert(message, type = "success") {
  // Get the designated container element in the HTML where alerts should appear
  const container = $("alertContainer");
  
  // ✅ FIX #1: Add null check - exit early if container doesn't exist
  if (!container) {
    console.warn("⚠️ Alert container not found. Message:", message);
    return;
  }

  // Create a new div element dynamically to hold the alert message
  const el = document.createElement("div");

  // ✅ FIX #2: Fixed CSS class string - removed extra closing brace
  el.className = `px-6 py-3 rounded-xl shadow-lg text-white font-medium mb-4 transform transition-all duration-300 ${
    type === "error" ? "bg-red-500" : "bg-green-500"
  }`;
  
  // Set the actual text content of the alert element
  el.textContent = message;
  
  // Add the newly created alert element to the container in the DOM
  container.appendChild(el);
  
  // Set a timer to automatically remove the alert element after 3000 milliseconds (3 seconds)
  setTimeout(() => el.remove(), 3000);
}