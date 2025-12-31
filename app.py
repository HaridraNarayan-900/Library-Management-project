# app.py
from http.server import HTTPServer
from router import Router
from database.connection import init_database

def run_server():
    """
    Initialize the database and start the HTTP server.
    """
    # Initialize SQLite database and tables
    init_database()

    # Bind server to all interfaces on port 8000
    server_address = ("0.0.0.0", 8000)
    httpd = HTTPServer(server_address, Router)

    print("🚀 Library Management Server running at http://localhost:8000")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user.")
    finally:
        httpd.server_close()

if __name__ == "__main__":
    run_server()
