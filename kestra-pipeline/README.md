# Orchestration de Pipeline Data avec Kestra – Analyse Vins

Pipeline de données complet orchestré avec **Kestra** pour analyser et rapprocher des données de vente de vins issues de trois systèmes sources (ERP, Web, fichier de liaison), calculer le chiffre d'affaires et identifier les vins premium par analyse statistique (z-score).

Projet réalisé dans le cadre du parcours **Data Engineer — OpenClassrooms (2026)**.

---

## Contexte

L'entreprise dispose de trois sources de données hétérogènes sur ses ventes de vins :
- un **ERP** contenant le catalogue produits avec prix et stocks ;
- un fichier **Web** avec les ventes en ligne (avec doublons) ;
- un fichier de **liaison** permettant de faire le lien entre les deux systèmes.

L'objectif est de fusionner ces sources, calculer le chiffre d'affaires total et segmenter les vins en deux catégories : **premium** (z-score > 2) et **ordinaires**.

---

## Architecture du pipeline

```
Fichier_erp.xlsx       Fichier_web.xlsx       fichier_liaison.xlsx
       │                      │                        │
       ▼                      ▼                        ▼
  nettoyage_erp         nettoyage_web          nettoyage_liaison
  (01_nettoyage_erp.sql) (02_web.sql)          (03_liaison.sql)
       │                      │                        │
       └──────────────────────┴────────────────────────┘
                              │
                         fusion_systemes
                         (04_fusion_systemes.sql)
                              │
                         calcul_ca
                    (05_calcul_chiffre_affaires.sql)
                              │
                         calcul_zscore
                         (06_calcul_zscore.py)
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
        export_premium               export_ordinaire
   (07_export_vins_premium.py)  (08_export_vins_ordinaires.py)
               │                             │
               ▼                             ▼
      outputs/vins_premium.csv    outputs/vins_ordinaires.csv
               │                             │
               └──────────────┬──────────────┘
                              ▼
                    verification_finale
                    (requête DuckDB : comptages + CA total)
```

Le pipeline se déclenche automatiquement **le 15 de chaque mois à 9h00**.

---

## Étapes du pipeline

| Étape | Script | Description |
|---|---|---|
| 1. Nettoyage ERP | `01_nettoyage_erp.sql` | Import, tests d'import, détection de valeurs manquantes, nettoyage |
| 2. Nettoyage Web | `02_web.sql` | Nettoyage des ventes web, suppression des doublons |
| 3. Nettoyage Liaison | `03_liaison.sql` | Normalisation du fichier de correspondance |
| 4. Fusion | `04_fusion_systemes.sql` | Jointure des 3 sources dans `dataset_final` |
| 5. Chiffre d'affaires | `05_calcul_chiffre_affaires.sql` | Calcul du CA = prix × quantité vendue |
| 6. Z-score | `06_calcul_zscore.py` | Identification des vins premium (z-score > 2) |
| 7. Export premium | `07_export_vins_premium.py` | Export CSV des vins avec z-score > 2 |
| 8. Export ordinaires | `08_export_vins_ordinaires.py` | Export CSV des vins standards |
| 9. Vérification | Requête SQL DuckDB | Comptages finaux + CA total + nb vins millésimés |

---

## Stack technique

| Technologie | Rôle |
|---|---|
| Kestra | Orchestration des tâches (workflow YAML déclaratif) |
| DuckDB | Base de données analytique in-process |
| Python (pandas) | Calcul statistique (z-score), exports CSV |
| SQL | Transformations et nettoyage des données |
| Docker / Docker Compose | Conteneurisation de Kestra et de l'environnement |

---

## Structure du projet

```
kestra-pipeline/
│
├── Ochestration_pipeline_Endaye_aime/    # Livrables principaux
│   ├── Endaye_aime_1_diagramme_02_06_26/ # Diagramme d'architecture
│   ├── Endaye_aime_2_workflow/
│   │   ├── workflow.yaml                 # Flow Kestra principal
│   │   └── outputs/                      # CSV de résultats
│   └── Endaye_aime_3_test/
│       ├── script/                       # Scripts SQL et Python
│       └── résultats.png                 # Capture du résultat final
│
├── Project_kestra/                       # Projet Docker complet
│   ├── docker-compose.yml
│   ├── flows/
│   │   └── workflow.yaml
│   ├── data/
│   │   ├── Fichier_erp.xlsx
│   │   ├── Fichier_web.xlsx
│   │   ├── fichier_liaison.xlsx
│   │   └── pipeline.duckdb
│   ├── script/                           # Scripts SQL et Python (8 étapes)
│   └── outputs/                          # CSV exportés
│
└── bottleneck_pipeline_v2.svg            # Diagramme du goulot d'étranglement
```

---

## Installation et lancement

### Prérequis

- Docker et Docker Compose
- Python 3.10+

### 1. Lancer Kestra

```bash
cd Project_kestra
docker compose up -d
```

Kestra est accessible sur **http://localhost:8080**.

### 2. Importer le flow

Dans l'interface Kestra, créer un nouveau flow et coller le contenu de `flows/workflow.yaml`.

### 3. Déclencher le pipeline

- **Manuellement** : cliquer sur "Execute" dans l'interface Kestra
- **Automatiquement** : le trigger planifié s'exécute le 15 de chaque mois à 9h

### 4. Consulter les résultats

Les fichiers CSV sont générés dans `outputs/` :

```
outputs/vins_premium.csv     → vins avec z-score > 2 (millésimes exceptionnels)
outputs/vins_ordinaires.csv  → reste du catalogue
outputs/rapport_chiffre_affaires.csv → CA total
```

---

## Résultats attendus

La vérification finale du pipeline retourne :

| Métrique | Description |
|---|---|
| `lignes_erp` | Nombre de produits ERP après nettoyage |
| `lignes_web_nettoye` | Nombre de ventes web nettoyées |
| `lignes_web_dedoublonne` | Nombre de ventes après déduplication |
| `lignes_liaison` | Nombre de correspondances |
| `lignes_fusion` | Nombre de lignes dans le dataset final |
| `chiffre_affaires_total` | CA total calculé (€) |
| `nb_vins_millesimes` | Nombre de vins premium (z-score > 2) |

---

## Auteur

Projet réalisé par **Aimé Endaye** — parcours Data Engineer, OpenClassrooms (2026).
