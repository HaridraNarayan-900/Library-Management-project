from database.librarian_queries import (
    db_get_all_librarians,
    db_get_one_librarian,
    db_create_librarian,
    db_update_librarian,
    db_delete_librarian,
)
# -------------------------------
# LIBRARIAN SERVICES
# -------------------------------
def service_get_all_librarians():
    return db_get_all_librarians()


def service_get_one_librarian(librarian_id):
    return db_get_one_librarian(librarian_id)


def service_create_librarian(data):
    return db_create_librarian(data)


def service_update_librarian(librarian_id, data):
    return db_update_librarian(librarian_id, data)


def service_delete_librarian(librarian_id):
    return db_delete_librarian(librarian_id)