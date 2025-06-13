import streamlit as st
import pandas as pd
import pycountry
import folium
from streamlit_folium import st_folium
from config import init_filters, get_filtered_data, display_filter_info

# Configuration de la page
st.set_page_config(
    page_title="Analyse Géographique",
    page_icon="",
    layout="wide"
)

# Chargement du CSS personnalisé
with open('static/style.css') as f:
    st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)

# Titre principal
st.title("Analyse Géographique")

# Guide d'utilisation
with st.expander("Guide d'utilisation de l'analyse géographique", expanded=False):
    st.markdown("""
    ### Comment utiliser cette page d'analyse géographique ?
    
    Cette page vous permet d'explorer la distribution géographique de vos données :
    
    1. **Carte Interactive**
       - Survolez les pays pour voir leur nom
       - Zoomez avec la molette de la souris ou les boutons +/-
       - Déplacez-vous en maintenant le clic gauche
       - Les couleurs indiquent la densité des observations
    
    2. **Statistiques par Pays**
       - Consultez le nombre exact d'observations par pays
       - Triez les données en cliquant sur les en-têtes de colonnes
       - Utilisez la barre de recherche pour trouver un pays spécifique
    
    ### Légende des Couleurs
    - Plus la couleur est foncée, plus il y a d'observations
    - Les zones en gris clair n'ont pas de données
    
    ### Astuces
    - Utilisez les filtres dans la barre latérale pour affiner votre analyse
    - Double-cliquez sur la carte pour revenir à la vue mondiale
    - Le tableau peut être trié et filtré pour une analyse plus détaillée
    """)

# Initialisation des filtres
init_filters()
df = get_filtered_data()

if df is not None:
    # Affichage de l'état des filtres
    st.subheader("Filtres Actifs")
    display_filter_info()
    
    # ─── Comptage par pays ────────────────────────────────────
    st.info("Préparation des données géographiques...")
    obs_count = (
        df['Current_Country']
          .value_counts()
          .reset_index(name='Observation_Count')
          .rename(columns={'index': 'Current_Country'})
    )

    # ─── Conversion en ISO-3 ───────────────────────────────────
    def to_iso3(name):
        try:
            return pycountry.countries.lookup(name).alpha_3
        except:
            return None

    obs_count['iso_alpha'] = obs_count['Current_Country'].apply(to_iso3)
    obs_count = obs_count.dropna(subset=['iso_alpha'])

    # ─── Carte Folium ──────────────────────────────────────────
    st.subheader("Carte Interactive")
    st.info("""
    Explorez la répartition géographique des données :
    - Survolez un pays pour voir son nom
    - Utilisez les boutons +/- pour zoomer
    - Cliquez et faites glisser pour vous déplacer
    """)
    
    # URL du GeoJSON des pays
    world_geojson = (
        "https://raw.githubusercontent.com/python-visualization/folium/"
        "master/examples/data/world-countries.json"
    )

    # Centre et zoom de la carte
    m = folium.Map(location=[20, 0], zoom_start=2, tiles="CartoDB positron")

    # Création de la carte choroplèthe
    folium.Choropleth(
        geo_data=world_geojson,
        name="choropleth",
        data=obs_count,
        columns=["iso_alpha", "Observation_Count"],
        key_on="feature.id",
        fill_color="YlOrRd",
        fill_opacity=0.7,
        line_opacity=0.2,
        legend_name="Nombre d'observations",
        nan_fill_color="lightgray"
    ).add_to(m)

    # Tooltip au survol
    folium.GeoJson(
        world_geojson,
        style_function=lambda feature: {
            "fillOpacity": 0,
            "color": "transparent"
        },
        tooltip=folium.GeoJsonTooltip(
            fields=["name"],
            aliases=["Pays :"],
            localize=True,
            labels=True,
            sticky=False
        )
    ).add_to(m)

    # Affichage de la carte
    st_data = st_folium(m, width=1000, height=600)

    # ─── Tableau récapitulatif ────────────────────────────────
    st.subheader("Statistiques par pays")
    st.info("Consultez le nombre d'observations détaillé pour chaque pays")
    
    stats_df = obs_count.sort_values("Observation_Count", ascending=False)[
        ["Current_Country", "Observation_Count"]
    ].rename(columns={
        "Current_Country": "Pays",
        "Observation_Count": "Nombre d'observations"
    })
    
    # Affichage du tableau avec des métriques
    col1, col2 = st.columns(2)
    with col1:
        st.metric("Nombre total de pays", len(stats_df))
    with col2:
        st.metric("Total d'observations", stats_df["Nombre d'observations"].sum())
    
    st.dataframe(stats_df, use_container_width=True)

else:
    st.error("Impossible de charger les données. Veuillez vérifier le fichier de données.")
