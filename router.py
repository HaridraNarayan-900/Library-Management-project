from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from controllers.library import (
    get_all_books, get_book, create_book, update_book, delete_book,
    get_all_librarians, get_librarian, create_librarian, update_librarian, delete_librarian,
    get_all_bookshelves, get_bookshelf, create_bookshelf, update_bookshelf, delete_bookshelf,
)
from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers


# -------------------------------
# UI ROUTER (SPA shell + static)
# -------------------------------
FRONTEND_ROUTES = {
    "/", "/home", "/docs",
    "/books", "/librarians", "/bookshelves"
}


def handle_ui_routes(handler, path):
    if path in FRONTEND_ROUTES:
        serve_static(handler, "frontend/pages/index.html")
        return True

    if path.endswith(".html"):
        stripped = path.replace(".html", "")
        if stripped in FRONTEND_ROUTES:
            serve_static(handler, "frontend/pages/index.html")
            return True

    if path.startswith("/frontend/"):
        serve_static(handler, path.lstrip("/"))
        return True
    
    if path == "/openapi.yaml/":
        serve_static(handler,"openapi.yaml")
        return True
    
    return False


# -------------------------------
# MAIN ROUTER CLASS
# -------------------------------
class Router(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

# Consolidated GET Handler
def do_GET(self):
    path = urlparse(self.path).path

    if handle_ui_routes(self, path):
        return

# ---- Books ----
    if path == "/api/books":
        return get_all_books(self)
    if path.startswith("/api/books/"):
        book_id = int(path.split("/")[-1])
        return get_book(self, book_id)

 # ---- Librarians ----
    if path == "/api/librarians":
        return get_all_librarians(self)
    if path.startswith("/api/librarians/"):
        librarian_id = int(path.split("/")[-1])
        return get_librarian(self, librarian_id)

# ---- Bookshelves ----
    if path == "/api/bookshelves":
        return get_all_bookshelves(self)
    if path.startswith("/api/bookshelves/"):
        bookshelf_id = int(path.split("/")[-1])
        return get_bookshelf(self, bookshelf_id)

    return send_404(self)

# Consolidated POST Handler
def do_POST(self):
    if self.path == "/api/books":
        return create_book(self)
    if self.path == "/api/librarians":
        return create_librarian(self)
    if self.path == "/api/bookshelves":
        return create_bookshelf(self)
    
    return send_404(self)

# Consolidated PUT Handler
def do_PUT(self):
    path = self.path
    if path.startswith("/api/books/"):
        return update_book(self, int(path.split("/")[-1]))
    if path.startswith("/api/librarians/"):
        return update_librarian(self, int(path.split("/")[-1]))
    if path.startswith("/api/bookshelves/"):
        return update_bookshelf(self, int(path.split("/")[-1]))
    
    return send_404(self)

# Consolidated DELETE Handler
def do_DELETE(self):
    path = self.path
    if path.startswith("/api/books/"):
        return delete_book(self, int(path.split("/")[-1]))
    if path.startswith("/api/librarians/"):
        return delete_librarian(self, int(path.split("/")[-1]))
    if path.startswith("/api/bookshelves/"):
        return delete_bookshelf(self, int(path.split("/")[-1]))
    
    return send_404(self)

def log_message(self, format, *args):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] [LibraryServer] {format % args}")