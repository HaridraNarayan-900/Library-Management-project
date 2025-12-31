import { $ } from "./dom.js";

// ================================
// LOAD HTML COMPONENT
// ================================

export async function loadComponent(selector, url) {
  const target = $(selector) || document.querySelector(selector);
  if (!target) {
    console.warn(`Selector "${selector}" not found in DOM.`);
    return;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to load component from "${url}": ${res.status}`);
      return;
    }

    const html = await res.text();
    target.innerHTML = html;

    // Execute inline scripts in loaded HTML
    target.querySelectorAll("script").forEach((script) => {
      const newScript = document.createElement("script");
      if (script.src) newScript.src = script.src;
      else newScript.textContent = script.textContent;

      document.body.appendChild(newScript);
      script.remove();
    });
  } catch (err) {
    console.error(`Error loading component from "${url}":`, err);
  }
}
