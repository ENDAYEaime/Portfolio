import faiss
import pickle
import numpy as np
import os
from mistralai import Mistral
from dotenv import load_dotenv

load_dotenv()

# Charger FAISS
index = faiss.read_index("data/faiss_index/index.faiss")

# Charger métadonnées
with open("data/faiss_index/metadata.pkl", "rb") as f:
    metadata = pickle.load(f)

# Client Mistral pour les embeddings (même modèle que vectorisation.py)
client = Mistral(api_key=os.getenv("MISTRAL_API_KEY"))

question = "concert gratuit à Paris"

import time

while True:
    try:
        response = client.embeddings.create(model="mistral-embed", inputs=[question])
        query_embedding = np.array([response.data[0].embedding], dtype="float32")
        break
    except Exception as e:
        if "429" in str(e):
            print("Rate limit — attente 60s...")
            time.sleep(60)
        else:
            raise

k = 5

distances, indices = index.search(query_embedding, k)

print("\nQuestion :", question)
print("\nRésultats :")

for i in indices[0]:
    print("\n------------------")
    print("Titre :", metadata[i].get("titre"))
    print("Date :", metadata[i].get("date"))
    print("Ville :", metadata[i].get("ville"))
    description = metadata[i].get("description") or ""
    print("Description :", description[:200])
