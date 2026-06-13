import sys
import os
import importlib

sys.path.insert(0, os.path.dirname(__file__))

from utils import logger, get_connection

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
INIT_SQL = os.path.join(BASE_DIR, "sql", "init_db.sql")

STEPS = [
    "01_ingest",
    "02_quality",
    "03_transform",
    # "04_notify",  # Optionnel : notification Slack
]


def init_database():
    logger.info("--- Initialisation du schéma de base de données ---")
    with open(INIT_SQL, "r", encoding="utf-8") as f:
        sql = f.read()
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(sql)
        conn.commit()
        logger.info("Schéma initialisé avec succès.")
    finally:
        conn.close()


def run():
    logger.info("====== Pipeline Sport Data Solution : démarrage ======")

    init_database()

    for step in STEPS:
        logger.info(f"--- Étape : {step} ---")
        module = importlib.import_module(step)
        module.run()

    logger.info("====== Pipeline terminé avec succès ======")


if __name__ == "__main__":
    run()