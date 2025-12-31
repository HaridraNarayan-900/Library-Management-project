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

FRONTEND_ROUTES = {"/", "/home", "/docs", "/books", "/librarians", "/bookshelves"}

def handle_ui_routes(handler, path):
    if path in FRONTEND_ROUTES:
        serve_static(handler, "frontend/pages/index.html")
        return True
    if path.endswith(".html") and path[:-5] in FRONTEND_ROUTES:
        serve_static(handler, "frontend/pages/index.html")
        return True
    if path.startswith("/frontend/"):
        serve_static(handler, path.lstrip("/"))
        return True
    if path == "/openapi.yaml":
        serve_static(handler, "openapi.yaml")
        return True
    return False

def get_id_from_path(path):
    try:
        return int(path.rstrip("/").split("/")[-1])
    except (ValueError, IndexError):
        return None

class Router(BaseHTTPRequestHandler):

    def end_headers(self):
        add_cors_headers(self)
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        path = urlparse(self.path).path
        if handle_ui_routes(self, path):
            return

        if path == "/api/books":
            return get_all_books(self)
        if path.startswith("/api/books/"):
            book_id = get_id_from_path(path)
            if book_id is None:
                return send_404(self)
            return get_book(self, book_id)

        if path == "/api/librarians":
            return get_all_librarians(self)
        if path.startswith("/api/librarians/"):
            librarian_id = get_id_from_path(path)
            if librarian_id is None:
                return send_404(self)
            return get_librarian(self, librarian_id)

        if path == "/api/bookshelves":
            return get_all_bookshelves(self)
        if path.startswith("/api/bookshelves/"):
            shelf_id = get_id_from_path(path)
            if shelf_id is None:
                return send_404(self)
            return get_bookshelf(self, shelf_id)

        return send_404(self)

    def do_POST(self):
        path = urlparse(self.path).path
        if path == "/api/books":
            return create_book(self)
        if path == "/api/librarians":
            return create_librarian(self)
        if path == "/api/bookshelves":
            return create_bookshelf(self)
        return send_404(self)

    def do_PUT(self):
        path = urlparse(self.path).path
        if path.startswith("/api/books/"):
            book_id = get_id_from_path(path)
            if book_id is None:
                return send_404(self)
            return update_book(self, book_id)

        if path.startswith("/api/librarians/"):
            librarian_id = get_id_from_path(path)
            if librarian_id is None:
                return send_404(self)
            return update_librarian(self, librarian_id)

        if path.startswith("/api/bookshelves/"):
            shelf_id = get_id_from_path(path)
            if shelf_id is None:
                return send_404(self)
            return update_bookshelf(self, shelf_id)

        return send_404(self)

    def do_DELETE(self):
        path = urlparse(self.path).path
        if path.startswith("/api/books/"):
            book_id = get_id_from_path(path)
            if book_id is None:
                return send_404(self)
            return delete_book(self, book_id)

        if path.startswith("/api/librarians/"):
            librarian_id = get_id_from_path(path)
            if librarian_id is None:
                return send_404(self)
            return delete_librarian(self, librarian_id)

        if path.startswith("/api/bookshelves/"):
            shelf_id = get_id_from_path(path)
            if shelf_id is None:
                return send_404(self)
            return delete_bookshelf(self, shelf_id)

        return send_404(self)

    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [LibraryServer] {format % args}")
