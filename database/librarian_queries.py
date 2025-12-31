# database/librarian_queries.py
from datetime import datetime, timezone
from .connection import get_connection

def to_dict(row):
    return dict(row) if row else None

def db_get_all_librarians():
    with get_connection() as conn:
        rows = conn.execute("SELECT * FROM librarians ORDER BY id DESC").fetchall()
        return [dict(r) for r in rows]

def db_get_one_librarian(librarian_id):
    with get_connection() as conn:
        row = conn.execute("SELECT * FROM librarians WHERE id = ?", (librarian_id,)).fetchone()
        return to_dict(row)

def db_create_librarian(data):
    now = datetime.now(timezone.utc).isoformat()
    with get_connection() as conn:
        cur = conn.execute("""
            INSERT INTO librarians (name, email, role, phone, hire_date, salary, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            data["name"],
            data["email"],
            data.get("role"),
            data.get("phone"),
            data.get("hire_date"),
            data.get("salary", 20000),
            now
        ))
        conn.commit()
        new_id = cur.lastrowid
    return db_get_one_librarian(new_id)

def db_update_librarian(librarian_id, data):
    librarian = db_get_one_librarian(librarian_id)
    if not librarian:
        return None
    now = datetime.now(timezone.utc).isoformat()
    with get_connection() as conn:
        conn.execute("""
            UPDATE librarians
            SET name = ?, email = ?, role = ?, phone = ?, hire_date = ?, salary = ?, updated_at = ?
            WHERE id = ?
        """, (
            data.get("name", librarian["name"]),
            data.get("email", librarian["email"]),
            data.get("role", librarian["role"]),
            data.get("phone", librarian["phone"]),
            data.get("hire_date", librarian["hire_date"]),
            data.get("salary", librarian["salary"]),
            now,
            librarian_id
        ))
        conn.commit()
    return db_get_one_librarian(librarian_id)

def db_delete_librarian(librarian_id):
    librarian = db_get_one_librarian(librarian_id)
    if not librarian:
        return None
    with get_connection() as conn:
        conn.execute("DELETE FROM librarians WHERE id = ?", (librarian_id,))
        conn.commit()
    return librarian


