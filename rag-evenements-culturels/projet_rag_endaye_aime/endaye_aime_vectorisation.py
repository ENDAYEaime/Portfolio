from mistralai import Mistral
from dotenv import load_dotenv
from tqdm import tqdm
import pandas as pd
import time
import os

load_dotenv()

api_key = os.getenv("MISTRAL_API_KEY")
print("Clé chargée :", api_key[:10] if api_key else "AUCUNE CLÉ")

client = Mistral(api_key=api_key)

df = pd.read_csv("data/processed/evenements_openagenda_clean.csv")

texts = (
    df["titre"].fillna("") + " " + df["description"].fillna("")
).tolist()

BATCH_SIZE = 32
embeddings = []

for i in tqdm(range(0, len(texts), BATCH_SIZE)):
    batch = texts[i : i + BATCH_SIZE]

    while True:
        try:
            response = client.embeddings.create(
                model="mistral-embed",
                inputs=batch,
            )
            embeddings.extend([r.embedding for r in response.data])
            time.sleep(0.5)
            break
        except Exception as e:
            if "429" in str(e):
                print("\nRate limit — attente 60s...")
                time.sleep(60)
            else:
                raise

df["embedding"] = embeddings

df.to_pickle("data/processed/evenements_openagenda_embeddings.pkl")

print("\nEmbeddings sauvegardés")
print("Nombre lignes :", len(df))
print("Dimension embedding :", len(df["embedding"].iloc[0]))
