from datetime import datetime
from .connection import get_connection

# ------------------- BOOKSHELVES -------------------
def db_get_all_bookshelves():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM bookshelves ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def db_get_one_bookshelf(bookshelf_id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM bookshelves WHERE id=?", (bookshelf_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def db_create_bookshelf(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        "INSERT INTO bookshelves (location, description, created_at) VALUES (?, ?, ?)",
        (data["location"], data.get("description"), now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one_bookshelf(new_id)

def db_update_bookshelf(bookshelf_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute("""
        UPDATE bookshelves SET location=?, description=?, updated_at=? WHERE id=?
    """, (data["location"], data.get("description"), now, bookshelf_id))
    conn.commit()
    conn.close()
    return db_get_one_bookshelf(bookshelf_id)

def db_delete_bookshelf(bookshelf_id):
    bookshelf = db_get_one_bookshelf(bookshelf_id)
    if not bookshelf:
        return None
    conn = get_connection()
    conn.execute("DELETE FROM bookshelves WHERE id=?", (bookshelf_id,))
    conn.commit()
    conn.close()
    return bookshelf

