from datetime import datetime
from .connection import get_connection

# Helper to convert sqlite3.Row to dict
def to_dict(row):
    return dict(row) if row else None
# ================================
# BOOKSHELVES QUERIES
# ================================
def db_get_all_bookshelves():
    with get_connection() as conn:
        rows = conn.execute("SELECT * FROM bookshelves ORDER BY id DESC").fetchall()
        return [dict(r) for r in rows]

def db_get_one_bookshelf(bookshelf_id):
    with get_connection() as conn:
        row = conn.execute("SELECT * FROM bookshelves WHERE id = ?", (bookshelf_id,)).fetchone()
        return to_dict(row)

def db_create_bookshelf(data):
    now = datetime.now().isoformat()
    with get_connection() as conn:
        cur = conn.execute(
        """INSERT INTO bookshelves (name, zone, capacity, current_count, location, created_at)
        VALUES (?, ?, ?, ?, ?, ?)""",
        (
            data["name"],
            data["zone"],
            data.get("capacity", 50),
            data.get("current_count", 0),
            data.get("location"),
            now,
        )
    )
    conn.commit()
    new_id = cur.lastrowid
    return db_get_one_bookshelf(new_id)

def db_update_bookshelf(bookshelf_id, data):
    now = datetime.now().isoformat()
    with get_connection() as conn:
        conn.execute(
            """UPDATE bookshelves
            SET name = ?, zone = ?, capacity = ?, current_location = ?,
                current_count = ?, location = ?,
            WHERE id = ?""",
            (
                data["name"],
                data["zone"],
                data.get("capacity", 50),
                data.get("current_count", 0),
                data.get("location"),
                now,
                bookshelf_id
            )
        )
        conn.commit()
    return db_get_one_bookshelf(bookshelf_id)

def db_delete_bookshelf(bookshelf_id):
    bookshelf = db_get_one_bookshelf(bookshelf_id)
    if not bookshelf :
        return None

    with get_connection() as conn:
        conn.execute("DELETE FROM bookshelves WHERE id = ?", (bookshelf_id,))
        conn.commit()
    return bookshelf