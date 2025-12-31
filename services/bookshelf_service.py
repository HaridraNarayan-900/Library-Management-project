from database.bookshelf_queries import (
    db_get_all_bookshelves, db_get_one_bookshelf, db_create_bookshelf,
    db_update_bookshelf, db_delete_bookshelf
)

def service_get_all_bookshelves():
    return db_get_all_bookshelves()

def service_get_one_bookshelf(bookshelf_id):
    return db_get_one_bookshelf(bookshelf_id)

def service_create_bookshelf(data):
    if not isinstance(data, dict):
        return None
    return db_create_bookshelf(data)

def service_update_bookshelf(bookshelf_id, data):
    if not isinstance(data, dict):
        return None
    return db_update_bookshelf(bookshelf_id, data)

def service_delete_bookshelf(bookshelf_id):
    return db_delete_bookshelf(bookshelf_id)


