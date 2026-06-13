# Assistant RAG – Recommandation d'événements culturels

## Présentation du projet

Ce projet a pour objectif de développer un assistant conversationnel intelligent capable de recommander des événements culturels à partir des données OpenAgenda.

L'application repose sur une architecture RAG (Retrieval Augmented Generation) combinant :

* OpenAgenda pour la collecte des événements ;
* Mistral AI pour la génération des embeddings et des réponses ;
* FAISS pour la recherche sémantique ;
* LangChain pour l'orchestration du pipeline RAG.

Le système permet à un utilisateur de poser une question en langage naturel et d'obtenir des recommandations pertinentes basées sur les événements indexés.

---

# Architecture du projet

```text
Utilisateur
      │
      ▼
Question
      │
      ▼
Embedding de la question
      │
      ▼
Recherche dans FAISS
      │
      ▼
Événements pertinents
      │
      ▼
LangChain
      │
      ▼
Mistral AI
      │
      ▼
Réponse générée
```

---

# Technologies utilisées

* Python 3.14
* Pandas
* NumPy
* OpenAgenda API
* Mistral AI
* LangChain
* FAISS
* Pickle
* Dotenv

---

# Structure du projet

```text
rag-evenements-culturels/
│
├── app/
│   └── app.py
│
├── data/
│   ├── raw/
│   │   └── evenements_openagenda_france.csv
│   │
│   ├── processed/
│   │   ├── evenements_openagenda_clean.csv
│   │   └── evenements_openagenda_embeddings.pkl
│   │
│   └── faiss_index/
│       ├── index.faiss
│       └── metadata.pkl
│
├── notebooks/
│   └── preprocessing_openagenda.ipynb
│
├── scripts/
│   ├── get_openagenda_events.py
│   ├── vectorisation.py
│   ├── create_faiss_index.py
│   ├── test_faiss.py
│   └── chatbot_rag.py
│
├── tests/
│   └── test_dates.py
│
├── .env
├── README.md
└── requirements.txt
```

---

# Installation

Créer un environnement virtuel :

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Installer les dépendances :

```bash
./.venv/bin/python -m pip install -r requirements.txt
```

---

# Configuration

Créer un fichier `.env` à la racine du projet :

```env
MISTRAL_API_KEY=votre_cle_api
```

---

# Étapes du pipeline

## 1. Collecte des données

Récupération des événements culturels depuis l'API OpenAgenda.

```bash
./.venv/bin/python scripts/get_openagenda_events.py
```

Résultat :

```text
data/raw/evenements_openagenda_france.csv
```

---

## 2. Nettoyage et préparation

Nettoyage des données :

* suppression des colonnes inutiles ;
* gestion des valeurs manquantes ;
* suppression des doublons ;
* filtrage des événements pertinents.

Résultat :

```text
data/processed/evenements_openagenda_clean.csv
```

---

## 3. Génération des embeddings

Création des représentations vectorielles à l'aide du modèle :

```text
mistral-embed
```

Lancement :

```bash
./.venv/bin/python scripts/vectorisation.py
```

Résultat :

```text
data/processed/evenements_openagenda_embeddings.pkl
```

---

## 4. Création de la base vectorielle

Indexation des embeddings avec FAISS.

```bash
./.venv/bin/python scripts/create_faiss_index.py
```

Résultat :

```text
data/faiss_index/index.faiss
data/faiss_index/metadata.pkl
```

---

## 5. Test de la recherche sémantique

```bash
./.venv/bin/python scripts/test_faiss.py
```

Exemple :

```text
Question : concert gratuit à Paris
```

Résultat :

```text
Top 5 événements les plus pertinents
```

---

## 6. Lancement du chatbot RAG

```bash
./.venv/bin/python scripts/chatbot_rag.py
```

Exemple :

```text
Votre question :
Donne-moi des événements pour enfants
```

Réponse :

```text
Liste d'événements recommandés avec date,
lieu et description.
```

---

# Résultats obtenus

* Plus de 200 000 événements collectés.
* Plus de 10 000 événements conservés après nettoyage.
* Génération des embeddings avec Mistral.
* Indexation des événements avec FAISS.
* Chatbot RAG fonctionnel capable de recommander des événements culturels.

---

# Auteur

Aimé Endaye

Projet réalisé dans le cadre de la formation Data Engineer OpenClassrooms.
