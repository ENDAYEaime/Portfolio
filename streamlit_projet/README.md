# Visualisation de données cinématographiques avec Streamlit

## Description
Application web interactive permettant d'explorer et de visualiser des données de films issues de la base de données TMDb (The Movie Database).

## Fonctionnalités
- Visualisation interactive des données de films
- Filtres personnalisables (année, genre, popularité, etc.)
- Analyses statistiques des films et acteurs
- Interface utilisateur intuitive

## Installation

1. Cloner le repository
```bash
git clone [url-du-repo]
```

2. Installer les dépendances
```bash
pip install -r requirements.txt
```

3. Lancer l'application
```bash
streamlit run app.py
```

## Structure du projet
- `app.py` : Application Streamlit principale
- `data/` : Dossier contenant les datasets
- `requirements.txt` : Liste des dépendances Python

## Données
Les données proviennent de TMDb (The Movie Database) et incluent :
- Informations sur les films
- Informations sur les acteurs
- Métriques de performance

## Installation

1. Clonez ce dépôt :
```bash
git clone <votre-repo>
cd <votre-dossier>
```

2. Installez les dépendances :
```bash
pip install -r requirements.txt
```

3. Téléchargez les données TMDb et placez les fichiers suivants dans le dossier du projet :
- tmdb_movies.csv
- tmdb_credits.csv

## 🎮 Utilisation

1. Lancez l'application :
```bash
streamlit run app.py
```

2. Ouvrez votre navigateur à l'adresse indiquée (généralement http://localhost:8501)

## Fonctionnalités

- Filtrage des films par année et genre
- Visualisation de la distribution des notes
- Top 10 des films les mieux notés
- Évolution temporelle du nombre de films
- Métriques clés (nombre de films, note moyenne, budget moyen)

## Technologies utilisées

- Python
- Streamlit
- Pandas
- Plotly
- Seaborn
- Matplotlib

## Licence

Ce projet est réalisé dans le cadre d'un exercice Data Rockstars. 