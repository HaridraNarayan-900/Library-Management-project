from datetime import datetime
from .connection import get_connection

# -------------------------------
# HELPERS
# -------------------------------
def to_dict(row):
    return dict(row) if row else None


# ================================
# BOOK QUERIES
# ================================
def db_get_all_books():
    with get_connection() as conn:
        rows = conn.execute(
            "SELECT * FROM books ORDER BY id DESC"
        ).fetchall()
        return [dict(row) for row in rows]


def db_get_one_book(book_id):
    with get_connection() as conn:
        row = conn.execute(
            "SELECT * FROM books WHERE id = ?",
            (book_id,)
        ).fetchone()
        return to_dict(row)


def db_create_book(data):
    now = datetime.now().isoformat()

    with get_connection() as conn:
        cur = conn.execute(
            """INSERT INTO books (
                title,
                author,
                isbn,
                category,
                total_copies,
                available_copies,
                published_year,
                created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                data["title"],
                data["author"],
                data.get("isbn"),
                data.get("category"),
                data.get("total_copies", 1),
                data.get("available_copies", 1),
                data.get("published_year"),
                now,
            )
        )
        conn.commit()
        new_id = cur.lastrowid

    return db_get_one_book(new_id)


def db_update_book(book_id, data):
    now = datetime.now().isoformat()

    book = db_get_one_book(book_id)
    if not book:
        return None

    with get_connection() as conn:
        conn.execute(
            """UPDATE books
            SET title = ?,
                author = ?,
                isbn = ?,
                category = ?,
                total_copies = ?,
                available_copies = ?,
                published_year = ?,
                updated_at = ?
            WHERE id = ?""",
            (
                data.get("title", book["title"]),
                data.get("author", book["author"]),
                data.get("isbn", book["isbn"]),
                data.get("category", book["category"]),
                data.get("total_copies", book["total_copies"]),
                data.get("available_copies", book["available_copies"]),
                data.get("published_year", book["published_year"]),
                now,
                book_id,
            )
        )
        conn.commit()

    return db_get_one_book(book_id)


def db_delete_book(book_id):
    with get_connection() as conn:
        cur = conn.execute(
            "DELETE FROM books WHERE id = ?",
            (book_id,)
        )
        conn.commit()
    return cur.rowcount > 0
