import os
from dotenv import load_dotenv

# Load .env from parent directory
load_dotenv(dotenv_path='../.env')  # 👈 point to .env in root folder

# Get the API key
api_key = os.getenv("OPENROUTER_API_KEY")

print("API Key is:", api_key)
