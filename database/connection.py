# database/connection.py
import sqlite3

DB_FILE = "book.db"

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_database():
    conn = get_connection()
    
    # -------------------------------
    # BOOKS TABLE
    # -------------------------------
    conn.execute("""
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            isbn TEXT,
            category TEXT,
            total_copies INTEGER DEFAULT 1,
            available_copies INTEGER DEFAULT 1,
            published_year TEXT,
            created_at TEXT,
            updated_at TEXT
        )
    """)
    
    # -------------------------------
    # LIBRARIANS TABLE
    # -------------------------------
    conn.execute("""
        CREATE TABLE IF NOT EXISTS librarians (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            role TEXT,
            phone TEXT,
            hire_date TEXT,
            salary INTEGER DEFAULT 20000,
            created_at TEXT,
            updated_at TEXT
        )
    """)
    
    # -------------------------------
    # BOOKSHELVES TABLE
    # -------------------------------
    conn.execute("""
        CREATE TABLE IF NOT EXISTS bookshelves (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            zone TEXT,
            capacity INTEGER DEFAULT 50,
            current_count INTEGER DEFAULT 0,
            location TEXT,
            created_at TEXT,
            updated_at TEXT
        )
    """)
    
    conn.commit()
    conn.close()
    print("✓ Database initialized successfully")


# Initialize DB if run directly
if __name__ == "__main__":
    init_database()
