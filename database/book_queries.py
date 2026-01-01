# Actual SQL queries — Create, Read, Update, Delete (CRUD)

from datetime import datetime
from .connection import get_connection

def db_get_all_books():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM books ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def db_get_one_book(book_id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM books WHERE id = ?", (book_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def db_create_book(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        "INSERT INTO books (title, author, isbn, shelf_id, created_at) VALUES (?, ?, ?, ?, ?)",
        (data["title"], data["author"], data["isbn"], data.get("shelf_id"), now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one_book(new_id)

def db_update_book(book_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute("""
        UPDATE books SET title=?, author=?, isbn=?, shelf_id=?, updated_at=? WHERE id=?
    """, (data["title"], data["author"], data["isbn"], data.get("shelf_id"), now, book_id))
    conn.commit()
    conn.close()
    return db_get_one_book(book_id)

def db_delete_book(book_id):
    book = db_get_one_book(book_id)
    if not book:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM books WHERE id=?", (book_id,))
    conn.commit()
    conn.close()
    return book


