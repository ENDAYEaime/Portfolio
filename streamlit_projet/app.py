import streamlit as st
import pandas as pd
import plotly.express as px
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# Configuration de la page
st.set_page_config(
    page_title="Analyse de Films TMDb",
    layout="wide"
)

# Titre de l'application
st.title("Analyse de Films TMDb")
st.markdown("---")

# Fonction pour charger les données
@st.cache_data
def load_data():
    try:
        # Chargement des fichiers
        movies_df = pd.read_csv('data/TMDb_Dataset.csv')
        actors_df = pd.read_csv('data/Birth_Actors.csv')
        
        # Affichage des colonnes pour debug
        st.write("Colonnes disponibles dans movies_df:", movies_df.columns.tolist())
        st.write("Aperçu des premières lignes:", movies_df.head())
        
        return movies_df, actors_df
    except Exception as e:
        st.error(f"Erreur lors du chargement des données: {e}")
        return None, None

# Chargement des données
movies_df, actors_df = load_data()

if movies_df is not None and actors_df is not None:
    st.header("Aperçu des données")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Films")
        st.write(f"Nombre total de films: {len(movies_df)}")
    
    with col2:
        st.subheader("Acteurs")
        st.write(f"Nombre total d'acteurs: {len(actors_df)}")

    # Onglets pour différentes visualisations
    tabs = [" Analyses Générales", "Acteurs", " Films"]
    tab1, tab2, tab3 = st.tabs(tabs)
    
    with tab1:
        st.subheader("Analyses Générales")
        st.info("Les visualisations seront ajoutées après vérification de la structure des données")
    
    with tab2:
        st.subheader("Analyse des Acteurs")
        st.dataframe(actors_df.head())
    
    with tab3:
        st.subheader("Analyse des Films")
        st.dataframe(movies_df.head())

else:
    st.error("Impossible de charger les données. Veuillez vérifier que les fichiers sont présents dans le dossier 'data'.")

# Footer
st.markdown("---")
st.markdown("### À propos")
st.markdown("""
Cette application a été développée pour analyser les données de films de TMDb.
Elle permet d'explorer les tendances, les statistiques et les relations entre différents aspects du cinéma.
""") 