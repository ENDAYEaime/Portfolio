import streamlit as st
import pandas as pd

# Configuration de la page
st.set_page_config(
    page_title="Dashboard - Accueil",
    page_icon="",
    layout="wide"
)

# Chargement du CSS personnalisé
with open('static/style.css') as f:
    st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)

# Titre principal
st.title("Évolution de la Capacité Crânienne chez l'Homme")

# Sous-titre
st.subheader("Analyse multi-facteurs des spécimens humains à travers le temps")

# Ajout de l'image contextuelle
st.image("IM.png", use_container_width=True, caption="Illustration : évolution morphologique des hominidés")

# Chiffres clés
col1, col2, col3 = st.columns(3)
col1.metric("Spécimens", "12 000+")
col2.metric("Pays analysés", "8")
col3.metric("Capacité moyenne", "≈ 1350 cm³")

# Section À propos
st.markdown("""
## À propos de cette application

Cette plateforme interactive présente les résultats d'une **analyse approfondie de données paléoanthropologiques**.  
Elle vous permet d'explorer les **facteurs ayant influencé le développement de la capacité crânienne humaine** à travers les âges.
""")

# Objectifs
st.markdown("""
## Objectif du projet

> Identifier les facteurs **anatomiques, comportementaux, environnementaux ou temporels** qui influencent la **capacité crânienne** chez les spécimens humains, et déterminer **les traits qui lui sont corrélés** au fil du temps.

L'analyse repose sur :
- des mesures morphologiques (taille, bipédie, squelette, mâchoire…)
- des comportements (usage d'outils, migration, posture)
- des environnements (habitat, régime alimentaire, géographie)
- et des repères temporels (ancienneté fossile)
""")

# Structure
st.markdown("""
## Structure de l'application

L'application se compose de plusieurs sections accessibles via le menu latéral :

1. **Accueil**  
   Présentation du projet, objectifs, illustration, chiffres clés.

2. **Analyse exploratoire**  
   Nettoyage, statistiques descriptives, outliers, types de données.

3. **Visualisations**  
   Graphiques interactifs (histogrammes, boxplots, scatterplots, heatmaps...).

4. **Analyse géographique**  
   Cartes et comparaisons de la capacité crânienne par pays ou zones.

5. **Résultats & interprétations**  
   Synthèse des variables influentes, hypothèses validées, pistes futures.
""")

# Sidebar
st.sidebar.title("Navigation")
st.sidebar.markdown("""
Bienvenue dans le menu de navigation !  
Utilisez-le pour explorer les différentes facettes de notre projet :

- Analyse exploratoire  
- Visualisations  
- Cartes interactives  
- Résultats et conclusions
""")
