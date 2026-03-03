import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink,
  Database,
  Code,
  BarChart3,
  Brain,
  Server,
  PieChart,
  Menu,
  X,
  ChevronDown,
  Terminal,
  Cpu,
  Activity,
  TrendingUp,
  Zap,
  Globe,
  FileCode,
  ChevronRight,
  Eye,
  Film,
  Music,
  Building,
  Layers,
  BookOpen,
  Users,
  Leaf,
  GraduationCap,
  MessageSquare,
  Smartphone,
  Table,
  Calculator,
  Lightbulb,
  FlaskConical,
  HeartPulse
} from 'lucide-react';

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } }
};

// ALL 24 Projects Data
const projects = [
  {
    id: 1,
    title: "Seattle Energy Forecast",
    subtitle: "Prédiction énergétique avec ML",
    description: "Modèle de Machine Learning pour prédire la consommation énergétique annuelle des bâtiments de Seattle. Déploiement en production via API REST sur le cloud avec BentoML.",
    tech: ["Python", "Scikit-Learn", "BentoML", "FastAPI", "Docker", "AWS"],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
    category: "Machine Learning",
    icon: Brain,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Prédiction de consommation énergétique (kBtu)",
      "Feature engineering avancé",
      "Comparaison de modèles (Random Forest, XGBoost, Ridge)",
      "API REST déployée sur cloud",
      "Pipeline MLOps complet"
    ],
    codeSnippet: `# Feature Engineering & Model Training
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score

features = ['BuildingAge', 'NumberFloors', 
            'PropertyGFATotal', 'ENERGYSTARScore']

model = RandomForestRegressor(n_estimators=100)
scores = cross_val_score(model, X_train, y_train, cv=5)
print(f"R² Score: {scores.mean():.3f}")`
  },
  {
    id: 2,
    title: "Analyse Marketing Bancaire",
    subtitle: "Optimisation campagne téléprospection",
    description: "Analyse des facteurs influençant la souscription à une offre bancaire. Identification des profils clients les plus susceptibles de convertir après un appel téléphonique sur 45 211 observations.",
    tech: ["Python", "Pandas", "Seaborn", "Matplotlib", "Jupyter"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
    category: "Business Analytics",
    icon: TrendingUp,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Analyse de 45 211 observations",
      "Profilage clients souscripteurs vs non-souscripteurs",
      "Identification des leviers de conversion",
      "Visualisations bivariées et corrélations",
      "Recommandations métier actionnables"
    ],
    codeSnippet: `# Analyse bivariée - Taux de souscription
import pandas as pd
import seaborn as sns

subscription_rate = df.groupby('education')['y'].apply(
    lambda x: (x == 'yes').mean() * 100
)

sns.barplot(x=subscription_rate.index, 
            y=subscription_rate.values)
plt.title('Taux de souscription par éducation')`
  },
  {
    id: 3,
    title: "Base de Données Immobilier France",
    subtitle: "Modélisation SQL & Analyse territoriale",
    description: "Conception et exploitation d'une base de données relationnelle du marché immobilier français. Analyse multi-niveaux : biens, communes, départements, régions avec jointures complexes.",
    tech: ["SQL", "SQLite", "Python", "Power BI"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    category: "Data Engineering",
    icon: Building,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Schéma relationnel normalisé",
      "Jointures multi-tables complexes",
      "Prix moyen au m² par zone",
      "Corrélation population/transactions",
      "Analyse dynamisme régional"
    ],
    codeSnippet: `-- Analyse prix moyen par département
SELECT 
    d.nom_departement,
    r.nom_region,
    ROUND(AVG(v.prix / b.surface), 2) AS prix_m2,
    COUNT(*) AS nb_transactions
FROM ventes v
JOIN biens b ON v.id_bien = b.id_bien
JOIN communes c ON b.id_commune = c.id_commune
JOIN departements d ON c.id_dept = d.id_dept
GROUP BY d.id_dept
ORDER BY prix_m2 DESC;`
  },
  {
    id: 4,
    title: "European Football Analytics",
    subtitle: "Analyse SQL des performances",
    description: "Analyse approfondie des données de football européen : performances des ligues, consistance offensive des équipes, statistiques de buts et tendances saisonnières sur 5 ligues majeures.",
    tech: ["SQL", "Python", "Pandas", "Matplotlib", "API REST"],
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    category: "Data Analysis",
    icon: Activity,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Analyse de 5 ligues majeures",
      "Mesure de consistance par variance",
      "Évolution saisonnière des buts",
      "Comparaison Home vs Away",
      "Intégration API météo"
    ],
    codeSnippet: `-- Analyse variance offensive par équipe
WITH team_goals AS (
    SELECT team_long_name,
           home_team_goal AS goals,
           season
    FROM Match m
    JOIN Team t ON m.home_team_api_id = t.team_api_id
)
SELECT team_long_name,
       AVG(goals) AS avg_goals,
       VARIANCE(goals) AS goal_variance
FROM team_goals
GROUP BY team_long_name
ORDER BY goal_variance ASC;`
  },
  {
    id: 5,
    title: "Spotify API Data Extraction",
    subtitle: "Extraction & structuration de données musicales",
    description: "Pipeline d'extraction de données via l'API Spotify : authentification OAuth, pagination, parsing JSON et création de DataFrames structurés pour analyse musicale.",
    tech: ["Python", "Requests", "Pandas", "Spotify API", "JSON"],
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800",
    category: "Data Engineering",
    icon: Music,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Authentification Client Credentials",
      "Gestion pagination API (limit/offset)",
      "Parsing JSON imbriqué",
      "Conversion durée ms → mm:ss",
      "Export DataFrame structuré"
    ],
    codeSnippet: `# Extraction données artiste Spotify
import requests

def get_artist_tracks(artist_id, token):
    headers = {"Authorization": f"Bearer {token}"}
    tracks = []
    offset = 0
    
    while True:
        url = f"{BASE_URL}/artists/{artist_id}/albums"
        params = {"limit": 50, "offset": offset}
        response = requests.get(url, headers=headers, 
                               params=params)
        data = response.json()
        tracks.extend(data['items'])
        if len(data['items']) < 50:
            break
        offset += 50
    return tracks`
  },
  {
    id: 6,
    title: "Évolution Capacité Crânienne",
    subtitle: "Dashboard Streamlit interactif",
    description: "Application Streamlit multi-pages pour explorer l'évolution de la capacité crânienne humaine à travers le temps, l'espace géographique et les caractéristiques morphologiques.",
    tech: ["Streamlit", "Python", "Plotly", "Folium", "Pandas", "Seaborn"],
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800",
    category: "Data Visualization",
    icon: PieChart,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "5 pages thématiques",
      "Carte interactive Folium",
      "Visualisations Plotly dynamiques",
      "Filtres interactifs",
      "Analyse statistique descriptive"
    ],
    codeSnippet: `# Dashboard Streamlit multi-pages
import streamlit as st
import plotly.express as px

st.set_page_config(page_title="Évolution Crânienne",
                   layout="wide")

fig = px.scatter_mapbox(
    df, lat="latitude", lon="longitude",
    color="cranial_capacity",
    size="age_million_years",
    hover_name="species",
    mapbox_style="carto-darkmatter"
)
st.plotly_chart(fig, use_container_width=True)`
  },
  {
    id: 7,
    title: "Amazon Scraper Selenium",
    subtitle: "Pipeline d'extraction automatisé",
    description: "Scraper automatisé pour extraire les données produits Amazon : gestion du contenu dynamique, détection anti-bot, et export CSV structuré pour analyse de marché.",
    tech: ["Python", "Selenium", "WebDriver", "Pandas", "CSV"],
    image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800",
    category: "Data Engineering",
    icon: Terminal,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Navigation automatisée",
      "Extraction titre, prix, image",
      "Détection et gestion doublons",
      "Mode headless Chrome",
      "Export CSV pipeline-ready"
    ],
    codeSnippet: `# Scraper Amazon avec Selenium
from selenium import webdriver
from selenium.webdriver.common.by import By

options = webdriver.ChromeOptions()
options.add_argument('--headless')

driver = webdriver.Chrome(options=options)
driver.get(product_url)

title = driver.find_element(
    By.ID, "productTitle").text
price = driver.find_element(
    By.CLASS_NAME, "a-price-whole").text`
  },
  {
    id: 8,
    title: "Migration MongoDB Médical",
    subtitle: "NoSQL & Cloud AWS",
    description: "Migration de données médicales vers MongoDB avec architecture distribuée. Conteneurisation Docker et étude de déploiement sur AWS avec réplication.",
    tech: ["MongoDB", "Docker", "AWS", "Python", "NoSQL"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
    category: "Data Engineering",
    icon: HeartPulse,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Modélisation document NoSQL",
      "Migration données relationnelles",
      "Conteneurisation Docker",
      "Architecture AWS",
      "Réplication et sharding"
    ],
    codeSnippet: `# Migration vers MongoDB
from pymongo import MongoClient
import pandas as pd

client = MongoClient("mongodb://localhost:27017")
db = client["medical_db"]

patients_df = pd.read_csv("patients.csv")
patients_dict = patients_df.to_dict('records')

result = db.patients.insert_many(patients_dict)
print(f"Inserted {len(result.inserted_ids)} docs")`
  },
  {
    id: 9,
    title: "Audit Architecture OLAP",
    subtitle: "Data Warehouse SuperMarket",
    description: "Audit complet et optimisation d'une architecture OLAP de data warehouse pour un supermarché. Analyse des cubes, dimensions et métriques de performance.",
    tech: ["SQL", "OLAP", "Tableau", "Excel", "Data Warehouse"],
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800",
    category: "Data Engineering",
    icon: Layers,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Audit architecture existante",
      "Analyse cubes OLAP",
      "Dictionnaire de données",
      "Optimisation requêtes",
      "Rapport d'audit détaillé"
    ],
    codeSnippet: `-- Extraction cube OLAP ventes
SELECT 
    c.annee, c.mois, c.jour,
    p.categorie, p.sous_categorie,
    e.nom_employe,
    SUM(v.montant) AS total_ventes,
    COUNT(*) AS nb_transactions
FROM fait_ventes v
JOIN dim_calendrier c ON v.id_date = c.id_date
JOIN dim_produit p ON v.id_produit = p.id_produit
JOIN dim_employe e ON v.id_employe = e.id_employe
GROUP BY CUBE(c.annee, p.categorie);`
  },
  {
    id: 10,
    title: "Analyse Films TMDb",
    subtitle: "Application Streamlit cinéma",
    description: "Application web interactive pour analyser et visualiser des données de films TMDb. Filtres dynamiques, statistiques par genre et analyse des acteurs populaires.",
    tech: ["Streamlit", "Pandas", "Plotly", "TMDb API", "Python"],
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
    category: "Data Visualization",
    icon: Film,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Filtrage par année et genre",
      "Distribution des notes",
      "Top 10 films les mieux notés",
      "Évolution temporelle",
      "Métriques clés interactives"
    ],
    codeSnippet: `# Dashboard Films TMDb
import streamlit as st
import plotly.express as px

@st.cache_data
def load_data():
    movies = pd.read_csv('tmdb_movies.csv')
    return movies

movies = load_data()
genre = st.selectbox('Genre', movies['genre'].unique())

filtered = movies[movies['genre'] == genre]
fig = px.histogram(filtered, x='vote_average')
st.plotly_chart(fig)`
  },
  {
    id: 11,
    title: "Analyse Centrales Électriques Europe",
    subtitle: "Visualisation données énergétiques",
    description: "Analyse et visualisation des données sur les centrales électriques européennes. Répartition par type d'énergie, capacités installées et analyse par pays.",
    tech: ["Python", "Matplotlib", "Seaborn", "Bokeh", "Pandas"],
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800",
    category: "Data Visualization",
    icon: Zap,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Analyse capacités installées",
      "Répartition par type d'énergie",
      "Identification grandes centrales",
      "Analyse descriptive variables",
      "Visualisations interactives Bokeh"
    ],
    codeSnippet: `# Visualisation centrales électriques
import matplotlib.pyplot as plt
import seaborn as sns

# Répartition par type d'énergie
energy_types = df.groupby('primary_fuel')['capacity_mw'].sum()

plt.figure(figsize=(12, 6))
sns.barplot(x=energy_types.index, y=energy_types.values)
plt.title('Capacité installée par type énergie')
plt.xticks(rotation=45)
plt.ylabel('Capacité (MW)')`
  },
  {
    id: 12,
    title: "Hacker News Engagement",
    subtitle: "Analyse des publications",
    description: "Comparaison des publications Ask HN et Show HN pour déterminer lesquelles reçoivent le plus de commentaires et identifier les meilleures heures pour publier.",
    tech: ["Python", "Pandas", "Datetime", "Jupyter"],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800",
    category: "Data Analysis",
    icon: MessageSquare,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Analyse Ask HN vs Show HN",
      "Identification pics d'engagement",
      "Analyse temporelle des posts",
      "Statistiques commentaires",
      "Recommandations publication"
    ],
    codeSnippet: `# Analyse engagement Hacker News
from datetime import datetime

ask_posts = [post for post in hn_data 
             if post['title'].lower().startswith('ask hn')]

# Commentaires par heure
comments_by_hour = {}
for post in ask_posts:
    hour = datetime.strptime(
        post['created_at'], '%m/%d/%Y %H:%M').hour
    comments_by_hour[hour] = comments_by_hour.get(
        hour, 0) + post['num_comments']`
  },
  {
    id: 13,
    title: "Profitable App Profiles",
    subtitle: "Analyse App Store & Google Play",
    description: "Analyse des données d'applications mobiles pour identifier les profils d'apps rentables sur l'App Store et Google Play. Nettoyage des données et analyse des genres populaires.",
    tech: ["Python", "CSV", "Data Cleaning", "Jupyter"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
    category: "Data Analysis",
    icon: Smartphone,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Analyse 10 000+ applications",
      "Nettoyage données doublons",
      "Identification genres rentables",
      "Comparaison iOS vs Android",
      "Recommandations stratégiques"
    ],
    codeSnippet: `# Analyse applications rentables
def explore_data(dataset, start, end):
    for row in dataset[start:end]:
        print(row)
        print('\\n')

# Fréquence des genres
def freq_table(dataset, index):
    table = {}
    for row in dataset:
        genre = row[index]
        table[genre] = table.get(genre, 0) + 1
    return table

ios_genres = freq_table(ios_data, 11)`
  },
  {
    id: 14,
    title: "Analyse SQL Locations Films",
    subtitle: "Base de données cinéma type Sakila",
    description: "Exploration et analyse d'une base de données de films type Sakila avec Python et SQL. Statistiques, visualisations et requêtes avancées sur films, clients et locations.",
    tech: ["SQL", "Python", "Pandas", "Jupyter", "SQLite"],
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
    category: "Data Analysis",
    icon: Database,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Requêtes SQL avancées",
      "Analyse clients et locations",
      "Statistiques par catégorie",
      "Jointures multi-tables",
      "Visualisations résultats"
    ],
    codeSnippet: `-- Top films par nombre de locations
SELECT f.title, 
       COUNT(r.rental_id) AS nb_locations,
       c.name AS categorie
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
GROUP BY f.film_id
ORDER BY nb_locations DESC
LIMIT 10;`
  },
  {
    id: 15,
    title: "Analyse Système Éducatif Mondial",
    subtitle: "Données World Bank EdStats",
    description: "Analyse des données du système éducatif mondial à partir des données World Bank EdStats. Comparaison entre pays, indicateurs de performance et tendances.",
    tech: ["Python", "Pandas", "Poetry", "Jupyter", "Data Analysis"],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    category: "Data Analysis",
    icon: GraduationCap,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Analyse indicateurs éducatifs",
      "Comparaison internationale",
      "Tendances temporelles",
      "Gestion dépendances Poetry",
      "Visualisations comparatives"
    ],
    codeSnippet: `# Analyse système éducatif mondial
import pandas as pd

# Chargement données World Bank
countries = pd.read_csv('EdStatsCountry.csv')
series = pd.read_csv('EdStatsSeries.csv')

# Taux de scolarisation par région
enrollment = df.groupby('region')[
    'enrollment_rate'].mean().sort_values(ascending=False)

print(enrollment.head(10))`
  },
  {
    id: 16,
    title: "MongoDB Architecture Distribuée",
    subtitle: "NoSQL NosCités",
    description: "Conception et analyse d'une base de données NoSQL MongoDB avec architecture distribuée. Projet NosCités avec sharding, réplication et visualisation Tableau.",
    tech: ["MongoDB", "NoSQL", "Tableau", "Docker", "Python"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    category: "Data Engineering",
    icon: Server,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Architecture distribuée",
      "Sharding et réplication",
      "Modélisation documents",
      "Visualisation Tableau",
      "Performance et scalabilité"
    ],
    codeSnippet: `# Configuration MongoDB Sharding
from pymongo import MongoClient

# Connexion au cluster
client = MongoClient("mongodb://localhost:27017")

# Activation sharding
admin = client.admin
admin.command('enableSharding', 'noscites_db')

# Définition shard key
admin.command('shardCollection', 
              'noscites_db.cities',
              key={'region': 'hashed'})`
  },
  {
    id: 17,
    title: "Projet SCRUM Biodiversité",
    subtitle: "Gestion de projet Data agile",
    description: "Application des principes de gestion de projet agile SCRUM dans un projet de science des données sur la biodiversité. Cadrage, sprints et livrables.",
    tech: ["Python", "Pandas", "SCRUM", "Agile", "Jupyter"],
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    category: "Data Science",
    icon: Leaf,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Méthodologie SCRUM",
      "Cadrage projet data",
      "Planification sprints",
      "User stories data",
      "Rétrospectives et amélioration"
    ],
    codeSnippet: `# Sprint 1 - Exploration données biodiversité
import pandas as pd

# User Story 1: Charger et explorer les données
biodiversity = pd.read_csv('species_data.csv')

# Acceptance Criteria
assert biodiversity.shape[0] > 0, "Données chargées"
assert 'species' in biodiversity.columns

# Sprint Velocity tracking
sprint_points = {'completed': 21, 'planned': 25}
velocity = sprint_points['completed'] / sprint_points['planned']`
  },
  {
    id: 18,
    title: "Streamlit Data Lab",
    subtitle: "Développement d'apps Streamlit",
    description: "Projet d'apprentissage et de développement d'applications web interactives avec Streamlit. Création d'interfaces dynamiques et visualisations en temps réel.",
    tech: ["Streamlit", "Python", "Pandas", "Plotly", "Jupyter"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    category: "Data Visualization",
    icon: Globe,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Widgets interactifs",
      "Layout responsive",
      "Caching données",
      "Session state",
      "Déploiement Streamlit Cloud"
    ],
    codeSnippet: `# Application Streamlit interactive
import streamlit as st

st.set_page_config(page_title="Data Lab", 
                   layout="wide")

# Sidebar filtres
with st.sidebar:
    date_range = st.date_input("Période")
    metric = st.selectbox("Métrique", options)

# Visualisation principale
col1, col2 = st.columns(2)
with col1:
    st.metric("KPI", value, delta)
with col2:
    st.plotly_chart(fig)`
  },
  {
    id: 19,
    title: "COVID-19 Dashboard",
    subtitle: "Analyse pandémie mondiale",
    description: "Dashboard d'analyse exploratoire des données COVID-19 avec visualisations interactives des tendances mondiales, cas par pays et évolution temporelle.",
    tech: ["Python", "Pandas", "Matplotlib", "Jupyter", "EDA"],
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800",
    category: "Data Analysis",
    icon: Activity,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Analyse exploratoire complète",
      "Visualisations temporelles",
      "Comparaison entre pays",
      "Taux de mortalité/guérison",
      "Tendances et prédictions"
    ],
    codeSnippet: `# Analyse COVID-19
import pandas as pd
import matplotlib.pyplot as plt

covid_data = pd.read_csv('covid_worldwide.csv')
covid_data['date'] = pd.to_datetime(covid_data['date'])

# Évolution cas par pays
top_countries = covid_data.groupby('country')[
    'confirmed'].max().nlargest(10)

plt.figure(figsize=(12, 6))
top_countries.plot(kind='bar')
plt.title('Top 10 pays - Cas confirmés')`
  },
  {
    id: 20,
    title: "Analyse Capacité Crânienne",
    subtitle: "Projet fil rouge Data Science",
    description: "Projet complet d'analyse de données sur l'évolution humaine : étude de la capacité crânienne et des traits morphologiques à travers le temps avec méthode agile.",
    tech: ["Python", "Pandas", "Seaborn", "Matplotlib", "Jupyter"],
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800",
    category: "Data Science",
    icon: FlaskConical,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Nettoyage données paléo",
      "Analyse statistique descriptive",
      "Visualisations avancées",
      "Corrélations morphologiques",
      "Synthèse scientifique"
    ],
    codeSnippet: `# Analyse évolution capacité crânienne
import seaborn as sns

# Corrélation variables morphologiques
correlation_matrix = df[[
    'cranial_capacity', 'body_mass',
    'brain_size', 'age_million_years'
]].corr()

plt.figure(figsize=(10, 8))
sns.heatmap(correlation_matrix, annot=True, 
            cmap='coolwarm', center=0)
plt.title('Matrice de corrélation')`
  },
  {
    id: 21,
    title: "NumPy Data Lab",
    subtitle: "Exercices manipulation tableaux",
    description: "Série d'exercices pratiques pour maîtriser NumPy : manipulation de tableaux, opérations mathématiques, broadcasting et analyse de données.",
    tech: ["Python", "NumPy", "Jupyter", "Mathematics"],
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800",
    category: "Fundamentals",
    icon: Calculator,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Création et manipulation arrays",
      "Opérations vectorisées",
      "Broadcasting avancé",
      "Algèbre linéaire",
      "Statistiques descriptives"
    ],
    codeSnippet: `# Exercices NumPy
import numpy as np

# Création et manipulation
arr = np.arange(0, 100).reshape(10, 10)

# Opérations statistiques
print(f"Mean: {arr.mean()}")
print(f"Std: {arr.std()}")
print(f"Max: {arr.max()}")

# Broadcasting
normalized = (arr - arr.mean()) / arr.std()`
  },
  {
    id: 22,
    title: "Pandas Data Lab",
    subtitle: "Manipulation et nettoyage données",
    description: "Exercices pratiques Pandas couvrant lecture CSV, exploration DataFrame, filtrage, nettoyage valeurs manquantes, agrégation et groupby.",
    tech: ["Python", "Pandas", "Matplotlib", "Jupyter"],
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800",
    category: "Fundamentals",
    icon: Table,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Lecture fichiers CSV",
      "Exploration DataFrame",
      "Filtrage conditionnel",
      "Gestion valeurs manquantes",
      "Agrégation et groupby"
    ],
    codeSnippet: `# Exercices Pandas
import pandas as pd

df = pd.read_csv('data.csv')

# Exploration
print(df.head())
print(df.describe())

# Nettoyage
df['column'] = df['column'].fillna(df['column'].mean())

# Agrégation
summary = df.groupby('category').agg({
    'value': ['sum', 'mean', 'count']
})`
  },
  {
    id: 23,
    title: "Python Foundations",
    subtitle: "Fondamentaux et POO",
    description: "Projet complet de remise à niveau Python couvrant la programmation orientée objet, structures de données, gestion fichiers et bonnes pratiques.",
    tech: ["Python", "OOP", "Algorithms", "Best Practices"],
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
    category: "Fundamentals",
    icon: Code,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Programmation orientée objet",
      "Structures de données",
      "Gestion des fichiers",
      "Exceptions et erreurs",
      "Bonnes pratiques PEP8"
    ],
    codeSnippet: `# Fondamentaux Python - POO
class DataAnalyzer:
    def __init__(self, data):
        self.data = data
        self._cleaned = False
    
    def clean(self):
        self.data = [x for x in self.data if x is not None]
        self._cleaned = True
        return self
    
    def analyze(self):
        if not self._cleaned:
            self.clean()
        return {
            'mean': sum(self.data) / len(self.data),
            'count': len(self.data)
        }`
  },
  {
    id: 24,
    title: "Jupyter Notebook Guide",
    subtitle: "Tutoriel et bonnes pratiques",
    description: "Guide pratique pour maîtriser Jupyter Notebook : exécution de code, raccourcis clavier, gestion d'état et analyse de données avec exemples concrets.",
    tech: ["Jupyter", "Python", "Markdown", "Data Analysis"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    category: "Fundamentals",
    icon: BookOpen,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Installation et configuration",
      "Raccourcis clavier essentiels",
      "Cellules code et markdown",
      "Gestion de l'état",
      "Export et partage"
    ],
    codeSnippet: `# Guide Jupyter Notebook

# Cellule Markdown
# ## Titre de section
# Texte explicatif avec **gras** et *italique*

# Cellule Code
import pandas as pd

# Magic commands
%matplotlib inline
%timeit df.groupby('col').sum()

# Affichage riche
from IPython.display import display
display(df.head())`
  }
];

const skills = [
  { category: "Langages & Outils", icon: Code, items: ["Python", "SQL", "HTML/CSS", "Jupyter", "Git"], color: "#3b82f6" },
  { category: "Machine Learning", icon: Brain, items: ["Scikit-Learn", "Pandas", "NumPy", "TensorFlow", "Time Series"], color: "#8b5cf6" },
  { category: "Data Engineering", icon: Server, items: ["MongoDB", "PostgreSQL", "Docker", "ETL", "AWS"], color: "#10b981" },
  { category: "Visualisation", icon: PieChart, items: ["Matplotlib", "Seaborn", "Plotly", "Power BI", "Tableau"], color: "#f59e0b" },
  { category: "Applications Web", icon: Globe, items: ["Streamlit", "Flask", "API REST", "Scraping", "Selenium"], color: "#ef4444" },
  { category: "Méthodologies", icon: BarChart3, items: ["Agile/SCRUM", "Data Analysis", "BI", "Reporting"], color: "#6366f1" }
];

const contacts = [
  { name: "GitHub", url: "https://github.com/ENDAYEaime", icon: Github },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/aime-endaye-2a57b0150", icon: Linkedin },
  { name: "Email", url: "mailto:endayeaime@gmail.com", icon: Mail },
  { name: "Téléphone", url: "tel:0769107434", icon: Phone }
];

// Navbar Component
function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "À propos", href: "#about" },
    { name: "Compétences", href: "#skills" },
    { name: "Projets", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav data-testid="navbar" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#020817]/90 backdrop-blur-xl border-b border-blue-500/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#hero" data-testid="nav-logo" className="font-heading font-bold text-xl md:text-2xl gradient-text flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <Database className="w-4 h-4 text-white" />
            </div>
            EA
          </a>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="px-4 py-2 font-medium text-slate-400 hover:text-white transition-all rounded-lg hover:bg-white/5 relative group">
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all group-hover:w-3/4 rounded-full" />
              </a>
            ))}
          </div>
          <button data-testid="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-[#020817]/95 backdrop-blur-xl border-t border-blue-500/10 py-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block py-3 px-4 font-medium text-slate-400 hover:text-white hover:bg-blue-500/10 rounded-lg mx-2">
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section id="hero" data-testid="hero-section" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Deep blue background */}
      <div className="absolute inset-0 bg-[#020817]" />
      
      {/* Animated grid */}
      <div className="absolute inset-0 data-grid-bg" />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}} />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px] animate-pulse" style={{animationDelay: '2s'}} />

      {/* Scanning line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent scan-line" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 relative z-10">
        <motion.div className="text-center" initial="initial" animate="animate" variants={stagger}>
          
          {/* Status badge */}
          <motion.div 
            variants={fadeUp} 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-400/30 rounded-full px-6 py-2.5 mb-8 backdrop-blur-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
            </span>
            <span className="text-sm text-cyan-300 font-mono tracking-wide">Disponible pour opportunités</span>
          </motion.div>

          {/* Title */}
          <motion.div variants={fadeUp} className="mb-4">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-mono tracking-[0.2em] uppercase bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/20">
              Data Science & Intelligence Artificielle
            </span>
          </motion.div>
          
          {/* Name */}
          <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
            <span className="text-white">ENDAYE</span>{" "}
            <span className="gradient-text-alt glow-text">Aimé</span>
          </motion.h1>
          
          {/* Description */}
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Transformer les <span className="text-cyan-400 font-medium">données brutes</span> en insights actionnables grâce à l'analyse avancée et le <span className="text-blue-400 font-medium">machine learning</span>.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#projects" 
              data-testid="cta-projects" 
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium overflow-hidden transition-all hover:-translate-y-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-blue-600/25"
            >
              <Database className="w-5 h-5 text-white" />
              <span className="text-white">Voir mes 24 projets</span>
              <ChevronDown size={18} className="text-white group-hover:translate-y-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              data-testid="cta-contact" 
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium border border-blue-500/40 text-blue-400 hover:border-cyan-400/60 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all backdrop-blur-sm"
            >
              <Terminal className="w-5 h-5" />
              Me contacter
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 mt-20 max-w-2xl mx-auto">
            {[
              { value: "24", label: "Projets Data", icon: Database, color: "from-cyan-400 to-blue-500" },
              { value: "15+", label: "Technologies", icon: Code, color: "from-blue-400 to-indigo-500" },
              { value: "2+", label: "Années XP", icon: TrendingUp, color: "from-indigo-400 to-purple-500" }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="relative group p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 hover:border-blue-500/30 transition-all cursor-default"
                whileHover={{ y: -5 }}
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} p-0.5`}>
                  <div className="w-full h-full rounded-xl bg-[#020817] flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="font-heading text-4xl md:text-5xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }} 
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs text-slate-600 font-mono">scroll</span>
        <ChevronDown className="w-5 h-5 text-blue-500/40" />
      </motion.div>
    </section>
  );
}

// About Section
function About() {
  const formations = [
    { name: "Master Architecte IA", school: "JEDHA", period: "09/2026 - 09/2028", current: true },
    { name: "Master Data Engineering", school: "OpenClassrooms", period: "09/2025 - 08/2026", current: true },
    { name: "Licence Data Analyst", school: "DSR School", period: "01/2025 - 07/2025", current: false },
    { name: "Formation Data", school: "Dataquest", period: "03/2024 - 11/2024", current: false },
    { name: "Biologie, Niveau Licence 3", school: "UFR de Reims", period: "09/2019 - 06/2022", current: false }
  ];

  const competencesProjet = [
    "Modélisation de bases de données (schémas en étoile, logique décisionnelle)",
    "SQL avancé et optimisation de requêtes",
    "Python pour le traitement de données (Pandas, Polars)",
    "Mise en place de pipelines ETL",
    "Réplication et sharding avec MongoDB",
    "Conteneurisation avec Docker",
    "Intégration de données via Airbyte",
    "Machine Learning (régression, feature engineering, tuning)",
    "Applications analytiques avec Streamlit"
  ];

  return (
    <section id="about" data-testid="about-section" className="py-24 md:py-32 bg-[#030d1c] relative">
      <div className="absolute inset-0 data-grid-bg opacity-50" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-blue-500" />
            <p className="text-blue-400 font-mono text-sm tracking-widest uppercase">À propos</p>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold text-white tracking-tight mb-12">
            Mon parcours <span className="gradient-text">Data</span>
          </motion.h2>
          
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Main Bio - Takes 3 columns */}
            <motion.div variants={fadeUp} className="lg:col-span-3 space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                Je m'appelle <strong className="text-blue-400">Endaye Aimé</strong>, passionné par la data et par la manière dont elle permet de structurer, analyser et optimiser des systèmes complexes.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Mon parcours a commencé dans les <strong className="text-blue-400">sciences du vivant</strong>, où j'ai développé une approche rigoureuse, analytique et méthodologique de la résolution de problèmes. Progressivement, j'ai orienté cette rigueur scientifique vers la donnée, en débutant par la data analyse à travers plusieurs projets concrets : exploration, nettoyage, visualisation, analyses statistiques et problématiques décisionnelles.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Avec le temps, mon intérêt s'est déplacé vers les fondations techniques des systèmes data. Je me spécialise aujourd'hui en <strong className="text-blue-400">Data Engineering</strong>, avec une approche orientée architecture, performance et scalabilité.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Aujourd'hui, mon objectif est d'évoluer vers des rôles d'<strong className="text-blue-400">ingénieur data</strong> et <strong className="text-blue-400">architecte IA</strong>, en concevant des architectures robustes capables d'alimenter des systèmes d'intelligence artificielle à grande échelle.
              </p>
              
              {/* Competences from projects */}
              <div className="mt-8 p-6 bg-[#020817] border border-blue-500/20 rounded-xl">
                <h4 className="font-heading text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-400" />
                  Ce sur quoi j'ai travaillé
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {competencesProjet.map((comp, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-400">
                      <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Philosophy */}
              <div className="p-6 bg-gradient-to-r from-blue-600/10 to-transparent border-l-4 border-blue-500 rounded-r-xl">
                <p className="text-blue-300 italic">
                  "Chaque projet que je réalise s'inscrit dans une logique claire : concevoir des solutions data complètes, performantes et prêtes pour la production."
                </p>
              </div>
            </motion.div>

            {/* Formation - Takes 2 columns */}
            <motion.div variants={fadeUp} className="lg:col-span-2">
              <div className="bg-[#020817] border border-blue-500/30 rounded-xl p-6 sticky top-24">
                <h3 className="font-heading text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                  Formation
                </h3>
                <ul className="space-y-4">
                  {formations.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 pb-4 border-b border-blue-500/10 last:border-0 last:pb-0">
                      <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${item.current ? 'bg-green-400 pulse-dot' : 'bg-blue-500'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white text-sm">{item.name}</div>
                        <div className="text-sm text-blue-400">{item.school}</div>
                        <div className="text-xs text-slate-500 font-mono mt-1">{item.period}</div>
                      </div>
                      {item.current && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full whitespace-nowrap">En cours</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Skills Section
function Skills() {
  return (
    <section id="skills" data-testid="skills-section" className="py-24 md:py-32 bg-[#020817] relative overflow-hidden">
      <div className="absolute inset-0 data-grid-bg" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-blue-600/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-blue-500" />
            <p className="text-blue-400 font-mono text-sm tracking-widest uppercase">Expertise</p>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold text-white tracking-tight mb-12">
            Stack <span className="gradient-text">technique</span>
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div key={skill.category} variants={fadeUp} whileHover={{ y: -8 }} data-testid={`skill-card-${index}`} className="group bg-[#0d1b2a] border border-blue-500/20 hover:border-blue-500/50 p-6 rounded-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${skill.color}20`, border: `1px solid ${skill.color}40` }}>
                      <Icon className="w-5 h-5" style={{ color: skill.color }} />
                    </div>
                    <h3 className="font-heading font-semibold text-white group-hover:text-blue-400 transition-colors">{skill.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span key={item} className="font-mono text-xs bg-[#020817] text-slate-400 px-3 py-1.5 rounded-lg border border-blue-500/20 hover:border-blue-500/40 hover:text-blue-400 transition-colors">{item}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Project Detail Modal
function ProjectModal({ project, onClose }) {
  React.useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleEscape); document.body.style.overflow = 'unset'; };
  }, [onClose]);

  if (!project) return null;
  const Icon = project.icon;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#0d1b2a] border border-blue-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a] via-transparent to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"><X size={20} /></button>
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center"><Icon className="w-6 h-6 text-white" /></div>
            <div>
              <span className="text-blue-400 font-mono text-xs uppercase">{project.category}</span>
              <h2 className="font-heading text-2xl font-bold text-white">{project.title}</h2>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-6">
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-3">Description</h3>
            <p className="text-slate-300 leading-relaxed">{project.description}</p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-3">Technologies utilisées</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (<span key={t} className="px-4 py-2 bg-blue-600/20 border border-blue-500/40 rounded-lg font-mono text-sm text-blue-400">{t}</span>))}
            </div>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-3">Fonctionnalités & Points techniques</h3>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (<li key={i} className="flex items-start gap-3 text-slate-300"><ChevronRight className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />{feature}</li>))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2"><FileCode className="w-5 h-5 text-blue-400" />Extrait de code</h3>
            <div className="code-block p-4 overflow-x-auto"><pre className="text-slate-300 text-sm whitespace-pre-wrap">{project.codeSnippet}</pre></div>
          </div>
          <div className="pt-4 border-t border-blue-500/20">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-all hover:-translate-y-1">
              <Github className="w-5 h-5" />Voir sur GitHub<ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Projects Section
function Projects() {
  const [filter, setFilter] = React.useState("Tous");
  const [selectedProject, setSelectedProject] = React.useState(null);
  const categories = ["Tous", "Machine Learning", "Data Engineering", "Business Analytics", "Data Analysis", "Data Visualization", "Data Science", "Fundamentals"];

  const filteredProjects = filter === "Tous" ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" data-testid="projects-section" className="py-24 md:py-32 bg-[#030d1c] relative">
      <div className="absolute inset-0 data-grid-bg opacity-30" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-blue-500" />
            <p className="text-blue-400 font-mono text-sm tracking-widest uppercase">Portfolio</p>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
            Mes <span className="gradient-text">24 Projets</span>
          </h2>
          <p className="text-slate-400 mb-8">Cliquez sur un projet pour voir les détails, le code et le lien GitHub</p>
          
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} data-testid={`filter-${cat.toLowerCase().replace(' ', '-')}`} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-[#020817] text-slate-400 border border-blue-500/20 hover:border-blue-500/50 hover:text-blue-400'}`}>
                {cat} {cat === "Tous" && `(${projects.length})`}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProjects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.article 
                  key={project.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -6 }} 
                  data-testid={`project-card-${index}`} 
                  className="group bg-[#020817] border border-blue-500/20 hover:border-blue-500/50 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer" 
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-video overflow-hidden bg-[#0d1b2a] relative">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <div className="w-9 h-9 bg-blue-600/90 backdrop-blur rounded-lg flex items-center justify-center"><Icon className="w-4 h-4 text-white" /></div>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-9 h-9 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center"><Eye className="w-4 h-4 text-white" /></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="font-mono text-xs text-blue-400 uppercase tracking-wider">{project.category}</span>
                    <h3 className="font-heading text-base font-semibold text-white mt-1 mb-1 group-hover:text-blue-400 transition-colors line-clamp-1">{project.title}</h3>
                    <p className="text-xs text-slate-500 mb-3 line-clamp-1">{project.subtitle}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((t) => (<span key={t} className="font-mono text-xs bg-[#0d1b2a] text-slate-500 px-2 py-0.5 rounded">{t}</span>))}
                      {project.tech.length > 3 && <span className="font-mono text-xs text-slate-600">+{project.tech.length - 3}</span>}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
      <AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>
    </section>
  );
}

// Contact Section
function Contact() {
  return (
    <section id="contact" data-testid="contact-section" className="py-24 md:py-32 bg-[#020817] relative overflow-hidden">
      <div className="absolute inset-0 data-grid-bg" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-t from-blue-600/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="text-center">
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-blue-500" />
            <p className="text-blue-400 font-mono text-sm tracking-widest uppercase">Contact</p>
            <div className="w-12 h-px bg-blue-500" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
            Travaillons <span className="gradient-text">ensemble</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-xl mx-auto mb-12">
            Vous avez un projet data ? Une opportunité professionnelle ? N'hésitez pas à me contacter.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            {contacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <a key={contact.name} href={contact.url} target={contact.url.startsWith('http') ? '_blank' : undefined} rel={contact.url.startsWith('http') ? 'noopener noreferrer' : undefined} data-testid={`contact-${contact.name.toLowerCase()}`} className="group inline-flex items-center gap-3 bg-[#0d1b2a] border border-blue-500/30 hover:border-blue-500/60 px-6 py-4 rounded-xl font-medium text-slate-300 hover:text-blue-400 transition-all hover:-translate-y-1">
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                  {contact.name}
                  {contact.url.startsWith('http') && <ExternalLink size={14} className="text-slate-500" />}
                </a>
              );
            })}
          </motion.div>
          <motion.div variants={fadeUp} className="mt-16 p-8 bg-[#0d1b2a] border border-blue-500/30 rounded-xl max-w-md mx-auto">
            <Mail className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            <p className="text-slate-500 mb-2">Email direct</p>
            <a href="mailto:endayeaime@gmail.com" className="font-heading text-xl text-blue-400 hover:text-blue-300 transition-colors">endayeaime@gmail.com</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer data-testid="footer" className="bg-[#010410] border-t border-blue-500/10 py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500">
            <Database className="w-5 h-5 text-blue-500" />
            <span>© {new Date().getFullYear()} ENDAYE Aimé</span>
          </div>
          <p className="text-slate-600 text-sm">Portfolio Data Science • 24 Projets • React & Tailwind</p>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  return (
    <div className="min-h-screen bg-[#020817]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
