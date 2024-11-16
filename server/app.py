import json
from flask import Flask, request, jsonify
from general_purpose import ai_query,clear_memory
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# API Endpoint
@app.route('/add/doctor', methods=['POST'])
def add_data():
    """Handle adding data to a JSON file."""
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid input"}), 400

    try:
        # Open the file in append mode to directly add the new data
        with open('data.json', 'r+') as file:
            try:
                file_data = json.load(file)  # Load existing data
            except json.JSONDecodeError:
                file_data = []  # Initialize an empty list if file is empty or corrupted
            
            file_data.append(data)  # Add new data
            file.seek(0)  # Reset file pointer to the start
            json.dump(file_data, file, indent=4)  # Write updated data
            file.truncate()  # Remove remaining old data if any
        
        return jsonify({"message": "Data added successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

app.add_url_rule('/add', 'add_data', add_data, methods=['POST'])

@app.route('/clear-memory', methods=['POST'])
def clear():
    """Handle clear memory requests."""
    print("clearing memory")
    clear_memory()
    return jsonify({"message": "Memory cleared"}), 200

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
