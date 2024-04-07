from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
import passwordGenerator
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# Allow requests from all origins (you can restrict it to specific origins if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from all origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Allow the specified HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Define the request body model for the password generation endpoint
class PasswordRequest(BaseModel):
    length: int
    include_numbers: Optional[bool] = False
    include_symbols: Optional[bool] = False

# Define the endpoint to generate a random password
@app.post("/generate-password")
def generate_password_endpoint(password_request: PasswordRequest = Body(...)):
    if not isinstance(password_request.length, int) or password_request.length <= 0:
        # Return a 400 Bad Request error if the password length is invalid
        raise HTTPException(status_code=400, detail="Password length must be a positive integer")
    # Generate the random password based on the request parameters
    password = passwordGenerator.generate_password(password_request.length, password_request.include_numbers, password_request.include_symbols)
    # Return the generated password along with its length
    return {"password": password, "length": password_request.length}
