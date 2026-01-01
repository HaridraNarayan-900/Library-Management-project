import sqlite3

DB_FILE = "library.db"

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_database():
    conn = get_connection()
    
    # Books table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            author TEXT,
            isbn TEXT,
            shelf_id INTEGER,
            created_at TEXT,
            updated_at TEXT
        )
    """)

    # Librarians table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS librarians (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            phone INTEGER,
            created_at TEXT,
            updated_at TEXT
        )
    """)

    # Bookshelves table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS bookshelves (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            location TEXT,
            description TEXT,
            created_at TEXT,
            updated_at TEXT
        )
    """)
    
    conn.commit()
    conn.close()
    print("✓ Database initialized")
