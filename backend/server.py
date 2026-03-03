from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Portfolio API is running"}

@app.get("/api/info")
async def get_info():
    return {
        "name": "ENDAYE Aimé",
        "title": "Data Scientist & Analyst",
        "email": "endayeaime@gmail.com",
        "github": "https://github.com/ENDAYEaime",
        "linkedin": "https://www.linkedin.com/in/aime-endaye-2a57b0150"
    }
