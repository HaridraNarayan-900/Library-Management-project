# core/responses.py
import json
from core.middleware import add_cors_headers

def send_json(handler, status, data):
    """Send a JSON response with given HTTP status."""
    handler.send_response(status)
    add_cors_headers(handler)
    handler.send_header("Content-Type", "application/json")
    handler.end_headers()
    handler.wfile.write(json.dumps(data).encode("utf-8"))

def send_404(handler):
    """Send 404 JSON response."""
    handler.send_response(404)
    add_cors_headers(handler)
    handler.send_header("Content-Type", "application/json")
    handler.end_headers()
    handler.wfile.write(json.dumps({"error": "Not found"}).encode("utf-8"))

def send_400(handler, message="Bad Request"):
    """Send 400 JSON response."""
    handler.send_response(400)
    add_cors_headers(handler)
    handler.send_header("Content-Type", "application/json")
    handler.end_headers()
    handler.wfile.write(json.dumps({"error": message}).encode("utf-8"))

