// components/Alert.js
import { $ } from "../utils/dom.js";

// Displays a temporary alert message (success by default, or error if specified)
export function showAlert(message, type = "success") {
  // Get the designated container element in the HTML where alerts should appear
  const container = $("alertContainer");

  // Create a new div element dynamically to hold the alert message
  const el = document.createElement("div");

  // Apply CSS classes (Tailwind CSS) for styling based on the alert type
  el.className = `
    px-6 py-3 rounded-xl shadow-lg text-white font-medium mb-4 transform transition-all duration-300
    }`;
  
  // Set the actual text content of the alert element
  el.textContent = message;
  // Add the newly created alert element to the container in the DOM
  container.appendChild(el); 
  // Set a timer to automatically remove the alert element after 4000 milliseconds (4 seconds);
    setTimeout(() => el.remove(), 3000);
}