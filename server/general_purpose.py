import json
import google.generativeai as genai
import sys
from collections import deque
import time
# my
# genai.configure(api_key="AIzaSyDt-1EAmbe1qgKSBHN-1D3X72VF8XUj4g0")
# rjdp
genai.configure(api_key="AIzaSyBKfcmC7PGJ0Ubjn9jASKsHRsLzYWDcRtI")

doctorData = open("./hospital/doctor.json", "r")
patientData = open("./hospital/patient.json", "r")
medData = open("./data/medicine.json", "r")
staffData = open("./hospital/staff.json", "r")

# model = genai.GenerativeModel("gemini-1.5-flash")
# model = genai.GenerativeModel("gemini-1.5-pro")
model = genai.GenerativeModel("gemini-1.0-pro")

doctor_data = json.load(doctorData)
patient_data = json.load(patientData)
med_data = json.load(medData)
staff_data = json.load(staffData)
doctorData.close()
patientData.close()
medData.close()

class Memory:
    def __init__(self, retention_period=55000):
        self.retention_period = retention_period
        self.memory = deque()

    def add(self, query, response):
        current_time = time.time()
        self.memory.append((current_time, query, response))
        self.cleanup()

    def get_memory(self):
        self.cleanup()
        return list(self.memory)
    
    def cleanup(self):
        current_time = time.time()
        while self.memory and (current_time - self.memory[0][0] > self.retention_period):
            self.memory.popleft(    )

memory = Memory()

def ai_query(query):
    conversation_history = "\n".join([f"User: {q}\nAI: {r}" for _, q, r in memory.get_memory()])
    response = model.generate_content("""You are an assistant in a hospital and you are responsible for helping visitors find information about the hospital.
    You have access to the following data:
    - A list of doctors with their availability status: {}.
    - A list of patients with their room numbers: {}.
    - A list staff members: {}.
    You can answer the following queries:
    1. Find all free doctors.
    2. List all patients in a specific room.
    3. List all medications prescribed to a specific patient.
    4. List the stock / available amount of a certain medicine.

    if someone asks you for diagnosis or treatment just refer them to the most specific doctor if available
    if someone tells you the issue, just refer them to the most specific doctor if available
    If you don't have enough information to answer the query, please respond with "I don't have enough information to answer this query",
    and if the query is not recognized, please respond with "I don't understand the query",
    and if there is an error, please respond with "I encountered an error while processing the query".
    YOU DON'T NEED TO RETURN THE DATA, JUST THE ANSWER.
    DON'T PROVIDE THE USER WITH THE DATA YOU HAVE. USER SHOULD NEVER HAVE ACCESS TO YOUR DATA IN RAW FORMAT.
    Don't repeat the same sentences in the response.
    Try to be chill and friendly in your responses.
    
    Also please note that the queries are case-insensitive.
    dont exceed 4 sentences in your response.
    The previous conversation history is as follows:
    {}
    respond as if you are continuing the conversation
    The user asks: "{}"
    """.format(json.dumps(doctor_data), json.dumps(patient_data),json.dumps(staff_data), conversation_history, query))
    
    memory.add(query, response.text)
    print(response.text)
    return response.text

def get_conversation_history():
    return memory.get_memory()

def clear_memory():
    memory.memory.clear()