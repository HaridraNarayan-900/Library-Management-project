// ================================
// DOM UTILITY FUNCTIONS
// ================================

// Short-hand for document.getElementById
export const $ = (id) => document.getElementById(id);

// Converts an HTML string into a real DOM element
export function createElement(html) {
  if (!html || typeof html !== "string") return null;
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstChild;
}

// Append HTML string or element to a parent
export function appendTo(parent, elementOrHtml) {
  const parentEl = typeof parent === "string" ? $(parent) : parent;
  if (!parentEl) return;

  if (typeof elementOrHtml === "string") {
    const el = createElement(elementOrHtml);
    if (el) parentEl.appendChild(el);
  } else if (elementOrHtml instanceof HTMLElement) {
    parentEl.appendChild(elementOrHtml);
  }
}

// Remove all child nodes of an element
export function clearElement(parent) {
  const parentEl = typeof parent === "string" ? $(parent) : parent;
  if (parentEl) parentEl.innerHTML = "";
}

// Utility to bind event to multiple elements matching a selector
export function on(parent, event, selector, handler) {
  const parentEl = typeof parent === "string" ? $(parent) : parent;
  if (!parentEl) return;

  parentEl.addEventListener(event, function (e) {
    if (e.target.matches(selector)) {
      handler(e);
    }
  });
}
