import json
import google.generativeai as genai
import sys
genai.configure(api_key="AIzaSyDt-1EAmbe1qgKSBHN-1D3X72VF8XUj4g0")

doctorData = open("./data/doctor.json", "r")
patientData = open("./data/patient.json", "r")
medData = open("./data/medicine.json", "r")

# model = genai.GenerativeModel("gemini-1.5-flash")
model = genai.GenerativeModel("gemini-1.5-pro")

doctor_data = json.load(doctorData)
patient_data = json.load(patientData)
med_data = json.load(medData)

doctorData.close()
patientData.close()
medData.close()

def ai_query(query):
    response = model.generate_content("""You are an assistant in a hospital and you are responsible for helping visitors find information about the hospital.
    You have access to the following data:
    - A list of doctors with their availability status: {}.
    - A list of patients with their room numbers: {}.
    - A list of medications prescribed to patients: {}.
    You can answer the following queries:
    1. Find all free doctors.
    2. List all patients in a specific room.
    3. List all medications prescribed to a specific patient.
    4. List the stock / available amount of a certain medicine.

    If you dont have enough information to answer the query, please respond with "I don't have enough information to answer this query",
    and if the query is not recognized, please respond with "I don't understand the query",
    and if there is an error, please respond with "I encountered an error while processing the query".,
    YOU DONT NEED TO RETURN THE DATA, JUST THE ANSWER.
    AND no need to verify the result to the user, just return the answer.
    Also please note that the queries are case-insensitive.
    the user asks: "{}"
    """.format(json.dumps(doctor_data), json.dumps(patient_data), json.dumps(med_data), query))
    print(response.text)
    return response.text
