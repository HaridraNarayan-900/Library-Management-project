# database/connection.py

import sqlite3

DB_FILE = "book.db"

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_database():
    conn = get_connection()
    
# ================================
# BOOKS TABLE
# ================================
    conn.execute("""
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            course TEXT,
            year TEXT,
            created_at TEXT,
            updated_at TEXT
        )
    """)
# ================================
# LIBRARIANS TABLE
# ================================
    conn.execute("""
        CREATE TABLE IF NOT EXISTS librarians (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT ,
            role TEXT,
            phone TEXT,
            hire_date TEXT,
            salary INTTEGER DEFAULT 20,
            created_at TEXT,
            updated_at TEXT
        )
    """)
# ================================
# BOOKSHELVES TABLE
# ================================
    conn.execute("""
        CREATE TABLE IF NOT EXISTS bookshelves (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT ,
            zone TEXT ,
            capacity INTEGER DEFAULT 50,
            current_count INTEGER
    )
    """)
    conn.commit()
    conn.close()
    print("✓ Database initialized")