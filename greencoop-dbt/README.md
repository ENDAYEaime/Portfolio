# GreenCoop – Entrepôt de Données Météo avec dbt & Docker

Projet de data engineering pour la coopérative **GreenAndCoop** : construction d'un entrepôt de données météorologique à partir de plusieurs stations de mesure, en utilisant **dbt** pour les transformations SQL et **Docker** pour l'environnement de déploiement.

Projet réalisé dans le cadre du parcours **Data Engineer — OpenClassrooms (2026)**.

---

## Contexte

GreenAndCoop collecte des données météorologiques en continu depuis plusieurs stations de mesure (température, humidité, pression atmosphérique, vent, rayonnement solaire, UV, précipitations). L'objectif est de modéliser ces données brutes dans un entrepôt structuré pour permettre des analyses fiables et reproductibles.

---

## Architecture dbt

Le projet suit une architecture en 3 couches :

```
Sources brutes (PostgreSQL schéma raw)
        │
        ▼
Staging (stg_*)
Nettoyage, typage, renommage des colonnes
        │
        ▼
Intermediate (int_*)
Jointures, déduplication, enrichissement
        │
        ▼
Marts (dim_* / fct_*)
Tables analytiques prêtes à l'emploi
```

### Modèles

| Couche | Modèle | Description |
|---|---|---|
| Staging | `stg_meteo_station_2` | Extraction et normalisation des stations (JSON → colonnes) |
| Staging | `stg_meteo_station_3` | Deuxième source de stations météo |
| Staging | `stg_meteo_station_2_observations` | Observations brutes de la station 2 |
| Marts | `dim_weather_stations` | Dimension stations : id, nom, coordonnées GPS, type |
| Marts | `fct_weather_observations` | Faits observations : température, humidité, pression, vent, UV, précipitations |

### Données collectées par observation

| Champ | Unité | Description |
|---|---|---|
| `temperature_f` | °F | Température |
| `humidity_pct` | % | Taux d'humidité |
| `pressure_in` | inHg | Pression atmosphérique |
| `wind_direction` | ° | Direction du vent |
| `wind_speed_mph` | mph | Vitesse du vent |
| `solar_wm2` | W/m² | Rayonnement solaire |
| `uv` | index | Indice UV |
| `precip_rate_in` | in/h | Taux de précipitation |
| `precip_accum_in` | in | Précipitation cumulée |

---

## Stack technique

| Technologie | Rôle |
|---|---|
| dbt (Data Build Tool) | Transformation SQL en couches |
| PostgreSQL | Base de données source et cible |
| Docker / Docker Compose | Conteneurisation de l'environnement |
| SQL | Langage de transformation |

---

## Structure du projet

```
greencoop-dbt/
├── greenandcoop/
│   ├── docker-compose.yml              # Services PostgreSQL + dbt
│   ├── logs/                           # Logs d'exécution dbt
│   └── greenandcoop_project/
│       ├── dbt_project.yml             # Configuration du projet dbt
│       ├── packages.yml                # Dépendances dbt (dbt-utils, etc.)
│       ├── models/
│       │   ├── staging/
│       │   │   ├── sources.yml         # Déclaration des sources brutes
│       │   │   ├── stg_meteo_station_2.sql
│       │   │   ├── stg_meteo_station_3.sql
│       │   │   └── stg_meteo_station_2_observations.sql
│       │   ├── intermediate/           # Modèles intermédiaires
│       │   └── marts/
│       │       ├── marts.yml           # Documentation des modèles marts
│       │       ├── dim_weather_stations.sql
│       │       └── fct_weather_observations.sql
│       ├── seeds/                      # Données de référence statiques
│       ├── snapshots/                  # Snapshots SCD type 2
│       ├── tests/                      # Tests personnalisés
│       ├── macros/                     # Macros SQL réutilisables
│       └── analyses/                   # Requêtes d'analyse ad hoc
```

---

## Installation et lancement

### Prérequis

- Docker et Docker Compose installés
- Python 3.10+

### 1. Lancer l'environnement

```bash
cd greenandcoop
docker compose up -d
```

Démarre PostgreSQL avec les données sources chargées.

### 2. Activer l'environnement dbt

```bash
source dbt-env/bin/activate
cd greenandcoop_project
```

### 3. Installer les dépendances dbt

```bash
dbt deps
```

### 4. Vérifier la connexion

```bash
dbt debug
```

### 5. Exécuter les transformations

```bash
dbt run
```

### 6. Lancer les tests

```bash
dbt test
```

### 7. Générer la documentation

```bash
dbt docs generate
dbt docs serve
```

---

## Tests dbt en place

- **Unicité** : chaque `station_id` est unique dans `dim_weather_stations`
- **Non nullité** : les champs critiques (station_id, observation_time, temperature_f) ne peuvent pas être nuls
- **Cohérence** : les observations référencent des stations existantes (intégrité référentielle)

---

## Auteur

Projet réalisé par **Aimé Endaye** — parcours Data Engineer, OpenClassrooms (2026).
