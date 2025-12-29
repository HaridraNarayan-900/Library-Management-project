from core.responses import send_json, send_404
from core.request import parse_json_body
from services.book_service import (
    service_get_all_books,
    service_get_one_book,
    service_create_book,
    service_update_book,
    service_delete_book,
)
from services.librarian_service import (
    service_get_all_librarians,
    service_get_one_librarian,
    service_create_librarian,
    service_update_librarian,
    service_delete_librarian,
)
from services.bookshelf_service import (
    service_get_all_bookshelves,
    service_get_one_bookshelf,
    service_create_bookshelf,
    service_update_bookshelf,
    service_delete_bookshelf,
)


# -------------------------------
# BOOK CONTROLLERS
# -------------------------------

def get_all_books(handler):
    books = service_get_all_books()
    return send_json(handler, 200, books)


def get_book(handler, book_id):
    book = service_get_one_book(book_id)
    if not book:
        return send_404(handler)
    return send_json(handler, 200, book)


def create_book(handler):
    data = parse_json_body(handler)
    if not data:
        return send_json(handler, 400, {"error": "Invalid JSON"})
    
    book = service_create_book(data)
    return send_json(handler, 201, book)


def update_book(handler, book_id):
    data = parse_json_body(handler)
    if not data:
        return send_json(handler, 400, {"error": "Invalid JSON"})
    
    updated = service_update_book(book_id, data)
    if not updated:
        return send_404(handler)
    
    return send_json(handler, 200, updated)


def delete_book(handler, book_id):
    deleted = service_delete_book(book_id)
    if not deleted:
        return send_404(handler)
    
    return send_json(handler, 200, {"deleted": True})
# -------------------------------
# LIBRARIAN CONTROLLERS
# -------------------------------

def get_all_librarians(handler):
    librarians = service_get_all_librarians()
    return send_json(handler, 200, librarians)


def get_librarian(handler, librarian_id):
    librarian = service_get_one_librarian(librarian_id)
    if not librarian:
        return send_404(handler)
    return send_json(handler, 200, librarian)


def create_librarian(handler):
    data = parse_json_body(handler)
    if not data:
        return send_json(handler, 400, {"error": "Invalid JSON"})
    
    librarian = service_create_librarian(data)
    return send_json(handler, 201, librarian)


def update_librarian(handler, librarian_id):
    data = parse_json_body(handler)
    if not data:
        return send_json(handler, 400, {"error": "Invalid JSON"})
    
    updated = service_update_librarian(librarian_id, data)
    if not updated:
        return send_404(handler)
    
    return send_json(handler, 200, updated)


def delete_librarian(handler, librarian_id):
    deleted = service_delete_librarian(librarian_id)
    if not deleted:
        return send_404(handler)
    
    return send_json(handler, 200, {"deleted": True})
# -------------------------------
# BOOKSHELF CONTROLLERS
# -------------------------------

def get_all_bookshelves(handler):
    bookshelves = service_get_all_bookshelves()
    return send_json(handler, 200, bookshelves)


def get_bookshelf(handler, bookshelf_id):
    bookshelf = service_get_one_bookshelf(bookshelf_id)
    if not bookshelf:
        return send_404(handler)
    return send_json(handler, 200, bookshelf)


def create_bookshelf(handler):
    data = parse_json_body(handler)
    if not data:
        return send_json(handler, 400, {"error": "Invalid JSON"})
    
    bookshelf = service_create_bookshelf(data)
    return send_json(handler, 201, bookshelf)


def update_bookshelf(handler, bookshelf_id):
    data = parse_json_body(handler)
    if not data:
        return send_json(handler, 400, {"error": "Invalid JSON"})
    
    updated = service_update_bookshelf(bookshelf_id, data)
    if not updated:
        return send_404(handler)
    
    return send_json(handler, 200, updated)


def delete_bookshelf(handler, bookshelf_id):
    deleted = service_delete_bookshelf(bookshelf_id)
    if not deleted:
        return send_404(handler)
    
    return send_json(handler, 200, {"deleted": True})

