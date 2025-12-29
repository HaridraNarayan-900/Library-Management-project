# reset_db.py
import os
from database.connection import init_database

def reset_database():
    # Delete old database
    db_file = "book.db"
    if os.path.exists(db_file):
        os.remove(db_file)
        print(f"✓ Deleted old database: {db_file}")
    
    # Create new database with correct schema
    print("Creating new database...")
    init_database()

if __name__ == "__main__":
    reset_database()