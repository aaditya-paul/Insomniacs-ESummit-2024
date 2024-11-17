import json
from flask import Flask, request, jsonify
from general_purpose import ai_query, clear_memory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# API Endpoint
@app.route('/add/patient', methods=['POST'])
def add_or_update_patient():
    """Handle adding or updating a doctor or staff."""
    print("Processing request to add or update doctor/staff data")
    data = request.get_json()
    if not data or 'uid' not in data:
        return jsonify({"error": "Invalid input"}), 400

    try:
        with open('./hospital/patient.json', 'r+') as file:
            try:
                file_data = json.load(file)  # Load existing data
            except json.JSONDecodeError:
                file_data = []  # Initialize an empty list if the file is empty

            # Check if any entry with the same uid exists and remove it
            file_data = [entry for entry in file_data if entry.get('uid') != data['uid']]

            # Add the new data
            file_data.append(data)
            file.seek(0)  # Reset the file pointer to the start
            json.dump(file_data, file, indent=4)  # Write updated data
            file.truncate()  # Remove any leftover data
        
        return jsonify({"message": "Data added or updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/add/medicine', methods=['POST'])
def add_or_update_medicine():
    """Handle adding or updating a doctor or staff."""
    print("Processing request to add or update med data")
    data = request.get_json()
    if not data or 'uid' not in data:
        return jsonify({"error": "Invalid input"}), 400

    try:
        with open('./hospital/medicine.json', 'r+') as file:
            try:
                file_data = json.load(file)  # Load existing data
            except json.JSONDecodeError:
                file_data = []  # Initialize an empty list if the file is empty

            # Check if any entry with the same uid exists and remove it
            file_data = [entry for entry in file_data if entry.get('uid') != data['uid']]

            # Add the new data
            file_data.append(data)
            file.seek(0)  # Reset the file pointer to the start
            json.dump(file_data, file, indent=4)  # Write updated data
            file.truncate()  # Remove any leftover data
        
        return jsonify({"message": "Data added or updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/add/staff', methods=['POST'])
def add_or_update_staff():
    """Handle adding or updating a doctor or staff."""
    print("Processing request to add or update staff data")
    data = request.get_json()
    if not data or 'uid' not in data:
        return jsonify({"error": "Invalid input"}), 400

    try:
        with open('./hospital/staff.json', 'r+') as file:
            try:
                file_data = json.load(file)  # Load existing data
            except json.JSONDecodeError:
                file_data = []  # Initialize an empty list if the file is empty

            # Check if any entry with the same uid exists and remove it
            file_data = [entry for entry in file_data if entry.get('uid') != data['uid']]

            # Add the new data
            file_data.append(data)
            file.seek(0)  # Reset the file pointer to the start
            json.dump(file_data, file, indent=4)  # Write updated data
            file.truncate()  # Remove any leftover data
        
        return jsonify({"message": "Data added or updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/add/doctor', methods=['POST'])
def add_or_update_doctor():
    """Handle adding or updating a doctor or staff."""
    print("Processing request to add or update doctor data")
    data = request.get_json()
    if not data or 'uid' not in data:
        return jsonify({"error": "Invalid input"}), 400

    try:
        with open('./hospital/doctor.json', 'r+') as file:
            try:
                file_data = json.load(file)  # Load existing data
            except json.JSONDecodeError:
                file_data = []  # Initialize an empty list if the file is empty

            # Check if any entry with the same uid exists and remove it
            file_data = [entry for entry in file_data if entry.get('uid') != data['uid']]

            # Add the new data
            file_data.append(data)
            file.seek(0)  # Reset the file pointer to the start
            json.dump(file_data, file, indent=4)  # Write updated data
            file.truncate()  # Remove any leftover data
        
        return jsonify({"message": "Data added or updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/clear-memory', methods=['POST'])
def clear():
    """Handle clear memory requests."""
    print("Clearing memory")
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
        print(query_text)
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the server
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
