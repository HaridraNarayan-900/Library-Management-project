# database/bookshelf_queries.py
from datetime import datetime
from .connection import get_connection

def to_dict(row):
    return dict(row) if row else None

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
        cur = conn.execute("""
            INSERT INTO bookshelves (name, zone, capacity, current_count, location, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            data["name"],
            data.get("zone"),
            data.get("capacity", 50),
            data.get("current_count", 0),
            data.get("location"),
            now
        ))
        conn.commit()
        new_id = cur.lastrowid
    return db_get_one_bookshelf(new_id)

def db_update_bookshelf(bookshelf_id, data):
    shelf = db_get_one_bookshelf(bookshelf_id)
    if not shelf:
        return None
    now = datetime.now().isoformat()
    with get_connection() as conn:
        conn.execute("""
            UPDATE bookshelves
            SET name = ?, zone = ?, capacity = ?, current_count = ?, location = ?, updated_at = ?
            WHERE id = ?
        """, (
            data.get("name", shelf["name"]),
            data.get("zone", shelf["zone"]),
            data.get("capacity", shelf["capacity"]),
            data.get("current_count", shelf["current_count"]),
            data.get("location", shelf["location"]),
            now,
            bookshelf_id
        ))
        conn.commit()
    return db_get_one_bookshelf(bookshelf_id)

def db_delete_bookshelf(bookshelf_id):
    shelf = db_get_one_bookshelf(bookshelf_id)
    if not shelf:
        return None
    with get_connection() as conn:
        conn.execute("DELETE FROM bookshelves WHERE id = ?", (bookshelf_id,))
        conn.commit()
    return shelf
