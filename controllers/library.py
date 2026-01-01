# Handlers are responsible for dealing with HTTP details (headers, body, methods)

import json
from core.responses import send_json, send_404
from core.request import parse_json_body
from services.book_service import (
    service_get_all_books
    , service_get_one_book
    , service_create_book
    , service_update_book
    , service_delete_book
)
from services.librarian_service import (
    service_get_all_librarians
    , service_get_one_librarian
    , service_create_librarian
    , service_update_librarian
    , service_delete_librarian
)
from services.bookshelf_service import (
    service_get_all_bookshelves
    , service_get_one_bookshelf
    , service_create_bookshelf
    , service_update_bookshelf
    , service_delete_bookshelf
)
def get_all_books(handler):
    return send_json(handler, 200, service_get_all_books())
def get_all_librarians(handler):
    return send_json(handler, 200, service_get_all_librarians())
def get_all_bookshelves(handler):
    return send_json(handler, 200, service_get_all_bookshelves())

def get_book(handler, book_id):
    book = service_get_one_book(book_id)
    return send_json(handler, 200, book) if book else send_404(handler)
def get_librarian(handler, librarian_id):
    librarian = service_get_one_librarian(librarian_id)
    return send_json(handler, 200, librarian) if librarian else send_404(handler)
def get_bookshelf(handler, bookshelf_id):
    bookshelf = service_get_one_bookshelf(bookshelf_id)
    return send_json(handler, 200, bookshelf) if bookshelf else send_404(handler)

def create_book(handler):
    data = parse_json_body(handler)
    new_book = service_create_book(data)
    return send_json(handler, 201, new_book)
def create_librarian(handler):
    data = parse_json_body(handler)
    new_librarian = service_create_librarian(data)
    return send_json(handler, 201, new_librarian)
def create_bookshelf(handler):
    data = parse_json_body(handler)
    new_bookshelf = service_create_bookshelf(data)
    return send_json(handler, 201, new_bookshelf)

def update_book(handler, book_id):
    data = parse_json_body(handler)
    updated = service_update_book(book_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)
def update_librarian(handler, librarian_id):
    data = parse_json_body(handler)
    updated = service_update_librarian(librarian_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)
def update_bookshelf(handler, bookshelf_id):
    data = parse_json_body(handler)
    updated = service_update_bookshelf(bookshelf_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)

def delete_book(handler, book_id):
    deleted = service_delete_book(book_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)
def delete_librarian(handler, librarian_id):
    deleted = service_delete_librarian(librarian_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)
def delete_bookshelf(handler, bookshelf_id):
    deleted = service_delete_bookshelf(bookshelf_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)