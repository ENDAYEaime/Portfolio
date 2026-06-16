# GreenAndCoop – Projet dbt : Modélisation des Données Météo

Ce dossier contient le projet **dbt** de GreenAndCoop, qui transforme les données météorologiques brutes issues de plusieurs stations de mesure en un entrepôt de données structuré et testé.

---

## Commandes principales

```bash
# Installer les dépendances
dbt deps

# Vérifier la connexion à la base de données
dbt debug

# Exécuter tous les modèles
dbt run

# Lancer les tests de qualité
dbt test

# Générer et consulter la documentation
dbt docs generate
dbt docs serve
```

---

## Modèles

### Staging (`models/staging/`)

| Modèle | Source | Description |
|---|---|---|
| `stg_meteo_station_2` | `raw.meteo_station_2` | Extraction des stations depuis JSON imbriqué |
| `stg_meteo_station_3` | `raw.meteo_station_3` | Deuxième source de stations |
| `stg_meteo_station_2_observations` | `raw.meteo_station_2` | Observations brutes (température, vent, UV…) |

### Marts (`models/marts/`)

| Modèle | Type | Description |
|---|---|---|
| `dim_weather_stations` | Dimension | Référentiel des stations (id, nom, GPS, type) |
| `fct_weather_observations` | Fait | Observations dédupliquées avec index sur station_id et observation_time |

---

## Sources déclarées

Définies dans `models/staging/sources.yml` :

- `raw.meteo_test`
- `raw.meteo_station_2`
- `raw.meteo_station_3`

---

## Ressources dbt

- [Documentation dbt](https://docs.getdbt.com/docs/introduction)
- [dbt Discourse](https://discourse.getdbt.com/)
- [Slack community](https://community.getdbt.com/)
