# Aimé Endaye — Portfolio Data & Data Engineering

> Site web portfolio présentant mes projets en Data Science, Data Analyse et Data Engineering.  
> Conçu pour les recruteurs souhaitant évaluer rapidement mes compétences techniques.

---

## À propos

Passionné par la donnée et autodidacte dans l'âme, je me forme au métier de **Data Engineer** au sein de DSR School / OpenClassrooms. Mon parcours combine apprentissage intensif sur Dataquest, Udemy et des projets techniques concrets couvrant l'ensemble de la chaîne de la donnée : collecte, transformation, stockage, orchestration, IA générative et visualisation.

Ce portfolio regroupe **23 projets** allant des fondamentaux Python aux architectures cloud hybrides AWS, en passant par les pipelines orchestrés avec Kestra, les entrepôts dbt et les assistants RAG.

---

## Stack technique

### Langages
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![SQL](https://img.shields.io/badge/SQL-4479A1?style=flat&logo=postgresql&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

### Data Engineering & Orchestration
![dbt](https://img.shields.io/badge/dbt-FF694B?style=flat&logo=dbt&logoColor=white)
![Kestra](https://img.shields.io/badge/Kestra-6E40C9?style=flat&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Apache Spark](https://img.shields.io/badge/Apache%20Spark-E25A1C?style=flat&logo=apachespark&logoColor=white)
![DuckDB](https://img.shields.io/badge/DuckDB-FFF000?style=flat&logoColor=black)

### Cloud & Infrastructure
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazonaws&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)

### IA & Machine Learning
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=flat&logoColor=white)
![Mistral AI](https://img.shields.io/badge/Mistral%20AI-FF7000?style=flat&logoColor=white)
![FAISS](https://img.shields.io/badge/FAISS-0467DF?style=flat&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat&logo=scikitlearn&logoColor=white)

### Data Science & Visualisation
![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=flat&logo=numpy&logoColor=white)
![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=flat&logo=streamlit&logoColor=white)
![Power BI](https://img.shields.io/badge/Power%20BI-F2C811?style=flat&logo=powerbi&logoColor=black)
![Plotly](https://img.shields.io/badge/Plotly-3F4F75?style=flat&logo=plotly&logoColor=white)

---

## Projets

### Data Engineering & Architecture

| Projet | Description | Stack |
|---|---|---|
| [GreenCoop – Entrepôt dbt & Docker](greencoop-dbt/) | Pipeline dbt en 3 couches (staging / intermediate / marts) pour transformer des données météo de stations de mesure | dbt · SQL · PostgreSQL · Docker |
| [Architecture Hybride Cloud AWS – InduTechData](indutech-infra-cloud/) | Conception d'une infra hybride on-premise / AWS avec streaming temps réel Redpanda + Spark | AWS · Redpanda · Spark · Docker |
| [Orchestration Pipeline Data – Kestra](kestra-pipeline/) | Pipeline de données vins orchestré avec Kestra : nettoyage ERP+Web+Liaison, calcul CA, z-score, export CSV | Kestra · DuckDB · Python · SQL |
| [Sport Data Solution – Pipeline BI](sport-data-solution/) | POC end-to-end : calcul automatisé de primes sportives et journées bien-être, vérification Google Maps, dashboard Power BI | Python · Kestra · PostgreSQL · Power BI |

### Intelligence Artificielle & NLP

| Projet | Description | Stack |
|---|---|---|
| [Assistant RAG – Événements Culturels](rag-evenements-culturels/) | Chatbot RAG capable de recommander des événements culturels OpenAgenda en langage naturel | LangChain · Mistral AI · FAISS · Python |

### Data Science & Analyse

| Projet | Description | Stack |
|---|---|---|
| [Analyse Morpho-Évolutive Humaine](evolution_capacite_cranienne_data_analyse/) | Analyse SCRUM de l'évolution de la capacité crânienne humaine : nettoyage, statistiques, visualisations | Python · Pandas · Seaborn · Agile |
| [Dashboard Capacité Crânienne](evolution_capacite_cranienne_streamlit/) | Application Streamlit interactive avec carte mondiale, histogrammes, boxplots et corrélations | Streamlit · Plotly · Folium · Pandas |
| [Dashboard COVID-19](covid19-streamlit-dashboard/) | Tableau de bord épidémiologique interactif sur les données COVID-19 mondiales | Streamlit · Plotly · Pandas |
| [Analyse Films TMDb](movie-data-analytics-streamlit/) | Application web d'analyse et visualisation d'une base de films TMDb avec filtres dynamiques | Streamlit · Plotly · Pandas |
| [Prédiction Énergétique – ML](energy-prediction-machine-learning-model/) | Modèle de machine learning pour prédire la consommation énergétique | scikit-learn · Pandas · Matplotlib |
| [Analyse Football Européen](european-football-sql-analysis/) | Analyse approfondie des matchs européens : statistiques, tendances, prédictions | Python · Pandas · Matplotlib · Seaborn |
| [Analyse Centrales Électriques](analyse_centrales_electriques_europe/) | Visualisation des centrales électriques européennes avec Matplotlib, Seaborn et Bokeh | Python · Matplotlib · Seaborn · Bokeh |
| [Analyse Campagne Marketing Bancaire](analyse-campagne-marketing-bancaire/) | Analyse d'une campagne marketing d'une banque pour identifier les clients cibles | Python · Pandas · Seaborn |
| [Analyse Applications Mobiles](Guided%20Project_%20Profitable%20App%20Profiles%20for%20the%20App%20Store%20and%20Google%20Play%20Markets/) | Identification des types d'apps rentables sur App Store et Google Play | Python · Pandas · Jupyter |
| [Exploration Hacker News](Hacker%20News%20–%20Analyse%20de%20l'engagement%20des%20publications/) | Comparaison Ask HN vs Show HN pour maximiser l'engagement | Python · Pandas · Jupyter |

### Bases de Données & SQL

| Projet | Description | Stack |
|---|---|---|
| [Analyse Cinématographique SQL](analyse-sql-locations-films/) | Requêtes avancées sur une base de données de location de films (type Sakila) | Python · SQL · Pandas · Jupyter |
| [Immobilier – Analyse SQL](base-donnees-immobilier-analyse-sql/) | Analyse d'une base de données immobilière avec modélisation et requêtes SQL | SQL · Python · Pandas |
| [Football Européen SQL](european-football-sql-analysis/) | Analyse SQL sur les résultats de matchs européens | SQL · Python · Jupyter |
| [Migration MongoDB](medical-records-migration-mongodb/) | Migration de données de dossiers médicaux vers MongoDB | MongoDB · Python |
| [Architecture OLAP Supermarché](audit-architecture-olap-supermarket/) | Audit et conception d'une architecture OLAP pour un supermarché | SQL · Data Warehouse |

### Développement & Outils

| Projet | Description | Stack |
|---|---|---|
| [Amazon Product Scraper](amazon-product-scraper/) | Scraping automatisé de produits Amazon avec gestion des doublons et export CSV | Selenium · Python · CSV |
| [Spotify API – Extraction](spotify-api-data-extraction/) | Extraction et analyse de données musicales via l'API Spotify | Python · API · Pandas |
| [Projet SCRUM Biodiversité](scrum-data-project-biodiversity/) | Application de la méthode SCRUM sur un projet data biodiversité | Python · Agile · SCRUM |

---

## Structure du dépôt

```
Portfolio/
│
├── index.html                          # Page d'accueil du portfolio
├── styles/
│   ├── main.css                        # Styles globaux
│   └── projet.css                      # Styles des pages projet
├── projets/                            # Pages HTML de présentation des projets
│
├── greencoop-dbt/                      # Entrepôt de données dbt + Docker
├── indutech-infra-cloud/               # Architecture hybride AWS InduTechData
├── kestra-pipeline/                    # Pipeline orchestré Kestra (vins)
├── rag-evenements-culturels/           # Assistant RAG OpenAgenda
├── sport-data-solution/                # Pipeline BI avantages sportifs
├── diplome/                            # Diplômes et certifications (PDF)
│
└── [autres dossiers projets]/          # Notebooks, scripts, datasets
```

---

## Diplômes & Certifications

- Formation **Data Engineer** — OpenClassrooms (2025–2026)
- Certifications techniques : **Python · SQL · HTML/CSS**
- Formations complémentaires : Dataquest · Udemy · DSR School

Voir le dossier [`diplome/`](diplome/) pour les attestations complètes.

---

## Me contacter

[![GitHub](https://img.shields.io/badge/GitHub-ENDAYEaime-181717?style=flat&logo=github)](https://github.com/ENDAYEaime)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Aimé%20Endaye-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/aime-endaye-2a57b0150)
[![Email](https://img.shields.io/badge/Email-aimemz0295@gmail.com-EA4335?style=flat&logo=gmail&logoColor=white)](mailto:endayeaime@gmail.com)

---

*Portfolio développé en HTML/CSS — déployable via GitHub Pages.*
