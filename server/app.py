import json
from flask import Flask, request, jsonify
from general_purpose import ai_query
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# API Endpoint
@app.route('/query', methods=['POST'])
def query():
    """Handle incoming queries."""
    data = request.get_json()
    if not data or 'query' not in data:
        return jsonify({"error": "Invalid input"}), 400
    
    query_text = data['query']
    try:
        res = ai_query(query_text)
        print(query)
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the server
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
