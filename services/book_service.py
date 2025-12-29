from database.book_queries import (
    db_get_all_books,
    db_get_one_book,
    db_create_book,
    db_update_book,
    db_delete_book,
)

def service_get_all_books():
    return db_get_all_books()


def service_get_one_book(book_id):
    return db_get_one_book(book_id)


def service_create_book(data):
    if not isinstance(data, dict):
        return None
    return db_create_book(data)


def service_update_book(book_id, data):
    if not isinstance(data, dict):
        return None
    return db_update_book(book_id, data)


def service_delete_book(book_id):
    return db_delete_book(book_id)
