# Assistant RAG – Recommandation d'Événements Culturels

Développement d'un assistant conversationnel intelligent basé sur l'architecture **RAG** (Retrieval Augmented Generation), capable de recommander des événements culturels à partir des données **OpenAgenda**. L'utilisateur pose une question en langage naturel et reçoit des recommandations personnalisées d'événements (concerts, expositions, spectacles, etc.).

Projet réalisé dans le cadre du parcours **Data Engineer — OpenClassrooms (2026)**.

---

## Contexte

OpenAgenda recense plus de 200 000 événements culturels en France. L'objectif est de rendre ce catalogue interrogeable en langage naturel, sans passer par des filtres de recherche classiques. Le système RAG permet à l'utilisateur de poser des questions comme :

- *"Donne-moi des événements pour enfants ce weekend à Paris"*
- *"Quels concerts jazz ont lieu en juin ?"*
- *"Je cherche une exposition gratuite près de Lyon"*

---

## Architecture RAG

```
Utilisateur
      │
      ▼
Question en langage naturel
      │
      ▼
Génération de l'embedding de la question
(Mistral AI – modèle mistral-embed)
      │
      ▼
Recherche par similarité dans FAISS
(Top 5 événements les plus proches sémantiquement)
      │
      ▼
Contexte injecté dans le prompt LangChain
      │
      ▼
Génération de la réponse par Mistral AI
      │
      ▼
Réponse en langage naturel à l'utilisateur
```

---

## Pipeline de construction de l'index

| Étape | Script | Description |
|---|---|---|
| 1. Collecte | `scripts/get_openagenda_events.py` | Appel API OpenAgenda → CSV brut |
| 2. Nettoyage | `notebooks/preprocessing_openagenda.ipynb` | Suppression doublons, valeurs manquantes, filtrage |
| 3. Vectorisation | `scripts/vectorisation.py` | Génération des embeddings (Mistral AI) |
| 4. Indexation | `scripts/create_faiss_index.py` | Construction de l'index FAISS |
| 5. Test FAISS | `scripts/test_faiss.py` | Vérification de la recherche sémantique |
| 6. Chatbot | `scripts/chatbot_rag.py` | Interface conversationnelle complète |

---

## Résultats

- **200 000+** événements collectés via l'API OpenAgenda
- **10 000+** événements conservés après nettoyage
- Index FAISS opérationnel (recherche en < 1 seconde)
- Chatbot RAG fonctionnel avec réponses contextualisées

---

## Stack technique

| Technologie | Rôle |
|---|---|
| Python 3.14 | Langage principal |
| OpenAgenda API | Source de données événements culturels |
| Mistral AI (`mistral-embed`) | Génération des embeddings vectoriels |
| Mistral AI (`mistral-small`) | Génération des réponses en langage naturel |
| FAISS | Index de recherche vectorielle (similitude cosinus) |
| LangChain | Orchestration du pipeline RAG |
| Pandas | Nettoyage et préparation des données |
| python-dotenv | Gestion des clés API |

---

## Structure du projet

```
rag-evenements-culturels/
│
├── projet_rag_endaye_aime/           # Version livrée (livrable)
│   ├── endaye_aime_README.md
│   ├── endaye_aime_vectorisation.py
│   ├── endaye_aime_Rapport_technique_RAG.pdf
│   ├── data/
│   │   ├── raw/                      # Données brutes OpenAgenda
│   │   ├── processed/                # Données nettoyées + embeddings
│   │   └── faiss_index/              # Index FAISS sérialisé
│   ├── scripts/                      # Pipeline complet
│   └── tests/                        # Tests de qualité RAG (RAGAS)
│
└── rag-evenements-culturels/          # Version refactorisée
    ├── app/app.py                     # Application principale
    ├── data/                          # Données et index
    ├── notebooks/                     # Notebook de prétraitement
    ├── scripts/                       # Scripts du pipeline
    ├── tests/                         # Tests RAGAS + dates
    └── requirements.txt
```

---

## Installation

### 1. Créer l'environnement virtuel

```bash
cd rag-evenements-culturels/rag-evenements-culturels
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 2. Configurer la clé API

Créer un fichier `.env` à la racine :

```env
MISTRAL_API_KEY=votre_cle_api_mistral
```

### 3. Collecter les événements

```bash
python scripts/get_openagenda_events.py
```

### 4. Vectoriser et indexer

```bash
python scripts/vectorisation.py
python scripts/create_faiss_index.py
```

### 5. Lancer le chatbot

```bash
python scripts/chatbot_rag.py
```

Exemple d'interaction :

```
Votre question : concerts gratuits à Paris ce mois-ci

Réponse : Voici 5 concerts gratuits à Paris en juin 2026 :
1. Festival Jazz à la Villette – 12 juin – Parc de la Villette
2. ...
```

---

## Tests de qualité

Le dossier `tests/` contient :
- `test_dates.py` : validation de la cohérence des dates d'événements
- `test_ragas.py` : évaluation de la qualité des réponses RAG (fidélité, pertinence, précision du contexte) avec le framework **RAGAS**
- `questions_reponses.json` : jeu de test avec questions et réponses de référence

---

## Auteur

Projet réalisé par **Aimé Endaye** — parcours Data Engineer, OpenClassrooms (2026).
