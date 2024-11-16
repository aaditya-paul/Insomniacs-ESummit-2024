import json
from flask import Flask, request, jsonify
from gemini_file import ai_query

app = Flask(__name__)

def load_data(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

doctors_data = load_data('./data/doctor.json')
patients_data = load_data('./data/patient.json')
meds_data = [] 

def find_free_doctors(doctors):
    """Find all free doctors."""
    return [doctor for doctor in doctors if doctor.get("free", False)]

def list_patients_in_room(patients, room):
    """List all patients in a specific room."""
    return [patient for patient in patients if patient.get("room") == room]

def handle_query(query):
    """Handle user query."""
    query = query.lower()
    if "free doctors" in query:
        return find_free_doctors(doctors_data)
    elif "patients in room" in query:
        room = query.split("room")[-1].strip()
        return list_patients_in_room(patients_data, room)
    else:
        return {"error": "Query not recognized"}

# API Endpoint
@app.route('/query', methods=['POST'])
def query():
    """Handle incoming queries."""
    data = request.get_json()
    if not data or 'query' not in data:
        return jsonify({"error": "Invalid input"}), 400
    
    query_text = data['query']
    ai_query(query_text)
    response = handle_query(query_text)
    return jsonify(response)

# Run the Flask server
if __name__ == '__main__':
    app.run(debug=True)
