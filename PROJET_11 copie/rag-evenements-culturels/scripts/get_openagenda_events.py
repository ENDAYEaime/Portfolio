import requests
import pandas as pd

# =====================================================
# 1. Paramètres généraux
# =====================================================

API_KEY = "096c2909ee0345018cbaa944dd664c54"

AGENDAS_URL = "https://api.openagenda.com/v2/agendas"

MAX_AGENDAS = 1000
SIZE = 100

events = []
agendas = []


# =====================================================
# 2. Récupération des agendas OpenAgenda
# =====================================================

offset_agendas = 0

while len(agendas) < MAX_AGENDAS:

    params_agendas = {
        "key": API_KEY,
        "size": SIZE,
        "offset": offset_agendas
    }

    response = requests.get(AGENDAS_URL, params=params_agendas)
    data = response.json()

    current_agendas = data.get("agendas", [])

    if not current_agendas:
        break

    agendas.extend(current_agendas)

    print(f"{len(agendas)} agendas récupérés")

    offset_agendas += SIZE

agendas = agendas[:MAX_AGENDAS]

print(f"\nTotal agendas sélectionnés : {len(agendas)}")


# =====================================================
# 3. Récupération de tous les événements des agendas
# =====================================================

for agenda in agendas:

    agenda_uid = agenda.get("uid")
    agenda_title = agenda.get("title")

    events_url = f"https://api.openagenda.com/v2/agendas/{agenda_uid}/events"

    offset_events = 0
    nb_events_agenda = 0

    while True:

        params_events = {
            "key": API_KEY,
            "size": SIZE,
            "offset": offset_events
        }

        response = requests.get(events_url, params=params_events)
        data = response.json()

        current_events = data.get("events", [])

        if not current_events:
            break

        for event in current_events:

            location = event.get("location", {})
            timings = event.get("timings", [])
            first_timing = timings[0] if timings else {}

            events.append({
                "agenda_uid": agenda_uid,
                "agenda": agenda_title,
                "event_uid": event.get("uid"),
                "titre": event.get("title", {}).get("fr"),
                "description": event.get("description", {}).get("fr"),
                "date_debut": first_timing.get("begin"),
                "date_fin": first_timing.get("end"),
                "date": event.get("firstTiming"),
                "lieu": location.get("name"),
                "ville": location.get("city"),
                "region": location.get("region"),
                "departement": location.get("department"),
                "pays": location.get("country"),
                "latitude": location.get("latitude"),
                "longitude": location.get("longitude"),
                "type_evenement": str(event.get("keywords", {}))
            })

        nb_events_agenda += len(current_events)
        offset_events += SIZE

    print(
        f"Agenda traité : {agenda_title} | "
        f"{nb_events_agenda} événements | "
        f"Total général : {len(events)}"
    )


# =====================================================
# 4. Création du DataFrame brut
# =====================================================

df = pd.DataFrame(events)

print("\nDimensions du dataset brut :")
print(df.shape)

print("\nColonnes :")
print(df.columns)


# =====================================================
# 5. Sauvegarde brute
# =====================================================

df.to_csv(
    "data/raw/evenements_openagenda_france_brut.csv",
    index=False
)

print("\nCSV sauvegardé : data/raw/evenements_openagenda_france_brut.csv")