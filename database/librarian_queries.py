from datetime import datetime
from .connection import get_connection

# Helper to convert sqlite3.Row to dict
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
    now = datetime.now().isoformat()
    with get_connection() as conn:
        cur = conn.execute(
            """INSERT INTO librarians (name, email, role, phone, hire_date, salary, created_at)
               VALUES (?, ?, ?, ?, ?, ?, ?)""",
            (
                data["name"],
                data["email"],
                data["role"],
                data.get("phone"),
                data.get("hire_date"),
                data.get("salary", 0),
                now,
            )
        )
        conn.commit()
        new_id = cur.lastrowid
    return db_get_one_librarian(new_id)

def db_update_librarian(librarian_id, data):
    now = datetime.now().isoformat()
    with get_connection() as conn:
        conn.execute(
            """UPDATE librarian
            SET name = ?, email = ?, role = ?, phone = ?,
                hire_date = ?, salary = ?,
                created_at = ?
            WHERE id = ?""",
            (
                data["name"],
                data["email"],
                data["role"],
                data.get("phone"),
                data.get("hire_date"),
                data.get("salary", 0),
                now,
                librarian_id
            )
        )
        conn.commit()
    return db_get_one_librarian(librarian_id)

def db_delete_librarian(librarian_id):
    librarian = db_get_one_librarian(librarian_id)
    if not librarian:
        return None

    with get_connection() as conn:
        conn.execute("DELETE FROM librarian WHERE id = ?", (librarian_id,))
        conn.commit()
    return librarian