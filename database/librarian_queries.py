from datetime import datetime
from .connection import get_connection

# ------------------- LIBRARIANS -------------------
def db_get_all_librarians():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM librarians ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def db_get_one_librarian(librarian_id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM librarians WHERE id=?", (librarian_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def db_create_librarian(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        "INSERT INTO librarians (name, email, phone, created_at) VALUES (?, ?, ?, ?)",
        (data["name"], data["email"], data["phone"], now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one_librarian(new_id)

def db_update_librarian(librarian_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute("""
        UPDATE librarians SET name=?, email=?, phone=?, updated_at=? WHERE id=?
    """, (data["name"], data["email"], data["phone"], now, librarian_id))
    conn.commit()
    conn.close()
    return db_get_one_librarian(librarian_id)

def db_delete_librarian(librarian_id):
    librarian = db_get_one_librarian(librarian_id)
    if not librarian:
        return None
    conn = get_connection()
    conn.execute("DELETE FROM librarians WHERE id=?", (librarian_id,))
    conn.commit()
    conn.close()
    return librarian
