# Architecture Hybride Cloud AWS – InduTechData

Conception, modélisation et déploiement d'une infrastructure hybride cloud pour la société **InduTechData**, combinant ressources on-premise et services AWS. Le projet inclut un pipeline de streaming de tickets client en temps réel, de l'ingestion via RedPanda jusqu'au traitement avec Apache Spark.

Projet réalisé dans le cadre du parcours **Data Engineer — OpenClassrooms (2026)**.

---

## Contexte

InduTechData gère un parc industriel avec des systèmes on-premise existants (SQL Server ERP/CRM, SAN, Active Directory) et souhaite migrer vers une architecture hybride cloud AWS pour :
- traiter des flux de tickets de support client en temps réel ;
- centraliser les données dans un Data Lake S3 ;
- permettre des analyses SQL via Amazon Redshift ;
- conserver une connexion sécurisée avec le SI on-premise.

---

## Architecture cible (production)

```
┌─────────────────────────────────────┐
│           On-premise                │
│  SQL Server (ERP/CRM)               │
│  SAN (Logs, fichiers, IoT)          │
│  Active Directory                   │
└──────────────┬──────────────────────┘
               │
          VPN IPSec / AWS Direct Connect
               │
┌──────────────▼──────────────────────────────────────┐
│                    AWS Cloud                         │
│                                                      │
│  Redpanda (EC2/EKS) ──► Spark EMR ──► S3 (Data Lake)│
│                                           │          │
│  AWS DMS (CDC SQL Server → Redshift)      ▼          │
│                                       Redshift       │
│  AWS IAM + Directory Service                         │
└──────────────────────────────────────────────────────┘
```

---

## Implémentation locale (Docker)

Le projet déploie un pipeline de streaming dockerisé qui simule la couche d'ingestion et de traitement :

```
Producer Python (tickets client)
      │  JSON via Kafka API
      ▼
Redpanda (broker Kafka-compatible, port 9092)
      │  topic: client_tickets
      ▼
Apache Spark Structured Streaming
      │
      ▼
data/output/tickets_agg_json/
```

### Données générées par ticket

| Champ | Exemple |
|---|---|
| `ticket_id` | UUID unique |
| `client_id` | `"C4821"` |
| `created_at` | `"2026-05-08 14:32:01"` |
| `demande` | `"Erreur paiement"` |
| `type_demande` | Technique / Facturation / Compte / Livraison |
| `priorite` | Faible / Moyenne / Haute / Critique |

### Enrichissement par Spark

Spark ajoute automatiquement un champ `equipe_support` selon le `type_demande` :

| Type de demande | Équipe assignée |
|---|---|
| Technique | Support Technique |
| Facturation | Support Facturation |
| Livraison | Support Livraison |
| Compte | Support Compte |

---

## Stack technique

| Technologie | Rôle |
|---|---|
| Apache Spark 3.5.0 | Traitement streaming (Structured Streaming) |
| Redpanda | Broker de messages compatible Kafka |
| Python 3.10 | Générateur de tickets (producer) |
| Docker / Docker Compose | Conteneurisation des services |
| AWS EC2, S3, RDS, Redshift | Infrastructure cloud cible |
| AWS VPN / Direct Connect | Connexion sécurisée on-premise ↔ cloud |
| AWS DMS | Réplication CDC depuis SQL Server |

---

## Structure du projet

```
indutech-infra-cloud/
│
├── endaye_aime_projet_9_15052026/
│   ├── endaye_aime_Ticket_redpanda_spark/   # Pipeline dockerisé
│   │   ├── docker-compose.yml
│   │   ├── producer/
│   │   │   ├── Dockerfile
│   │   │   └── producer_tickets.py          # Générateur de tickets
│   │   └── spark/
│   │       ├── Dockerfile
│   │       └── spark_ticket_processing.py   # Job Spark Streaming
│   └── endaye_aime_model_infra_01_15012026/
│       ├── schèma_infra_hyb_15052026.png    # Schéma d'architecture
│       └── eval_compa_infra_hy_15052026.pdf # Rapport d'évaluation
│
├── indutech_hybrid_schema_final.svg         # Schéma final (SVG)
├── indutech_v4_final.svg
├── architecture_aws_hybrid.svg
├── infra_hy.drawio                          # Source draw.io
├── Evaluation_Compatibilite_Final.docx      # Évaluation de compatibilité
└── project_infra_hybride/                   # Sous-module git du projet Docker
```

---

## Lancement du pipeline Docker

### Prérequis

- Docker et Docker Compose
- Minimum 4 Go de RAM disponibles

### Démarrer les services

```bash
cd endaye_aime_projet_9_15052026/endaye_aime_Ticket_redpanda_spark
docker compose up --build
```

### Vérifier les logs

```bash
# Tickets envoyés par le producer (1 ticket / 2 secondes)
docker logs producer -f

# Traitement Spark
docker logs spark -f
```

### Consulter les données enrichies

```bash
ls data/output/tickets_agg_json/
```

### Arrêter les services

```bash
docker compose down
```

---

## Livrables

- Schéma d'architecture hybride (SVG / draw.io / PNG)
- Rapport d'évaluation de compatibilité on-premise ↔ cloud
- Rapport d'évaluation de l'infrastructure hybride InduTechData
- Pipeline de streaming dockerisé (Redpanda + Spark)
- Présentation technique (PPTX)

---

## Auteur

Projet réalisé par **Aimé Endaye** — parcours Data Engineer, OpenClassrooms (2026).
