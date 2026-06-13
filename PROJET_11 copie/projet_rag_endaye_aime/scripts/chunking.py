import pandas as pd
from langchain_text_splitters import RecursiveCharacterTextSplitter

INPUT_FILE = "data/processed/evenements_openagenda_clean.csv"
OUTPUT_FILE = "data/processed/evenements_openagenda_chunks.csv"

df = pd.read_csv(INPUT_FILE)
print(f"Dataset chargé : {df.shape}")


def clean_field(value) -> str:
    """Retourne une chaîne propre : ignore les valeurs nulles, dicts vides ou '{}'."""
    if pd.isna(value):
        return ""
    s = str(value).strip()
    if s in ("{}", "[]", "nan", "None"):
        return ""
    return s


def format_date(value) -> str:
    """Formate la date en JJ/MM/AAAA si possible, sinon retourne la valeur brute."""
    raw = clean_field(value)
    if not raw:
        return ""
    try:
        return pd.to_datetime(raw).strftime("%d/%m/%Y")
    except Exception:
        return raw


def build_event_text(row) -> str:
    """Construit un texte descriptif naturel pour l'événement, optimisé pour l'embedding."""
    titre = clean_field(row.get("titre"))
    description = clean_field(row.get("description"))
    date = format_date(row.get("date"))
    lieu = clean_field(row.get("lieu"))
    ville = clean_field(row.get("ville"))
    type_ev = clean_field(row.get("type_evenement"))

    parts = []

    if titre:
        parts.append(f"Événement : {titre}.")
    if description:
        parts.append(description)
    if date:
        parts.append(f"Date : {date}.")
    if lieu and ville:
        parts.append(f"Lieu : {lieu}, {ville}.")
    elif lieu:
        parts.append(f"Lieu : {lieu}.")
    elif ville:
        parts.append(f"Ville : {ville}.")
    if type_ev:
        parts.append(f"Catégorie : {type_ev}.")

    return " ".join(parts)


text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100,
    separators=["\n\n", "\n", ". ", " ", ""],
)

chunks = []
skipped = 0

for _, row in df.iterrows():
    texte = build_event_text(row)

    # Ignorer les événements sans contenu utile
    if len(texte.strip()) < 30:
        skipped += 1
        continue

    # Ne pas découper les textes déjà courts
    if len(texte) <= text_splitter._chunk_size:
        morceaux = [texte]
    else:
        morceaux = text_splitter.split_text(texte)

    date_formatted = format_date(row.get("date"))

    for i, chunk in enumerate(morceaux):
        chunks.append({
            "event_uid": clean_field(row.get("event_uid")),
            "chunk_id": f"{clean_field(row.get('event_uid'))}_{i}",
            "chunk_text": chunk,
            "titre": clean_field(row.get("titre")),
            "description": clean_field(row.get("description")),
            "date": date_formatted,
            "lieu": clean_field(row.get("lieu")),
            "ville": clean_field(row.get("ville")),
            "latitude": row.get("latitude"),
            "longitude": row.get("longitude"),
            "type_evenement": clean_field(row.get("type_evenement")),
        })

df_chunks = pd.DataFrame(chunks)
df_chunks.to_csv(OUTPUT_FILE, index=False)

print(f"Événements ignorés (contenu vide) : {skipped}")
print(f"Chunks créés : {len(df_chunks)}")
print(f"Chunks par événement (moy.) : {len(df_chunks) / max(1, len(df) - skipped):.2f}")
print(f"Fichier sauvegardé : {OUTPUT_FILE}")
