import os
import pickle
import numpy as np
import pandas as pd
import faiss

# Fichiers
EMBEDDINGS_FILE = "data/processed/evenements_openagenda_embeddings.pkl"
OUTPUT_DIR = "data/faiss_index"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Charger les embeddings
df = pd.read_pickle(EMBEDDINGS_FILE)

print("Colonnes :", df.columns.tolist())
print("Nombre de lignes :", len(df))

# Transformer la colonne embedding en tableau numpy
embeddings = np.array(df["embedding"].tolist()).astype("float32")

print("Shape embeddings :", embeddings.shape)

# Création de l'index FAISS
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)

# Ajouter les vecteurs dans FAISS
index.add(embeddings)

print("Nombre de vecteurs indexés :", index.ntotal)

# Sauvegarder l'index FAISS
faiss.write_index(index, f"{OUTPUT_DIR}/index.faiss")

# Sauvegarder les métadonnées
metadata_columns = [col for col in df.columns if col != "embedding"]
metadata = df[metadata_columns].to_dict(orient="records")

with open(f"{OUTPUT_DIR}/metadata.pkl", "wb") as f:
    pickle.dump(metadata, f)

print("Index FAISS sauvegardé dans :", OUTPUT_DIR)