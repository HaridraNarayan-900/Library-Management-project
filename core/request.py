# core/request.py
import json

def parse_json_body(handler):
    """
    Reads JSON from HTTP request body.
    Returns a Python dict. Raises JSONDecodeError if invalid JSON.
    """
    try:
        length = int(handler.headers.get("Content-Length", 0))
        if length == 0:
            return {}
        raw = handler.rfile.read(length)
        return json.loads(raw.decode("utf-8"))
    except json.JSONDecodeError:
        return None

