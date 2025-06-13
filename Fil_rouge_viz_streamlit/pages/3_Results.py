import streamlit as st
import pandas as pd
import plotly.express as px
from config import init_filters, get_filtered_data

# Configuration de la page
st.set_page_config(
    page_title="Résultats et Conclusions",
    page_icon="",
    layout="wide"
)

# Chargement du CSS personnalisé
with open('static/style.css') as f:
    st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)

# Titre
st.title("Résultats de l'Analyse de la Capacité Crânienne")

# Guide d'utilisation
with st.expander("Guide d'utilisation de la page des résultats", expanded=False):
    st.markdown("""
    Cette page présente une synthèse complète de l'analyse des données :
    1. **Indicateurs clés** : Résumé des métriques principales
    2. **Visualisations** : Graphiques temporels, géographiques et anatomiques
    3. **Conclusions** : Ce que nous avons appris
    4. **Implications** : Ce que cela signifie pour la recherche
    5. **Limites** : Les points à garder à l'esprit
    """)

# Initialisation des filtres dans la sidebar
init_filters()
df = get_filtered_data()

if df is not None:
    # Détection automatique de la colonne temporelle
    time_col = None
    for col in df.columns:
        if col.lower().replace(" ", "").replace("-", "").replace("_", "") in [
            "time(mya)", "timemya", "time(ma)", "timema"
        ]:
            time_col = col
            break

    # Résumé introductif
    st.markdown("""
    ## Synthèse de l'Analyse

    Cette étude explore les facteurs influençant la capacité crânienne chez les hominidés, en combinant 
    des données morphologiques, comportementales, environnementales et temporelles.
    """)

    # Indicateurs Clés
    st.header("Indicateurs Clés")
    col1, col2, col3 = st.columns(3)
    brain_col = 'Cranial_Capacity_(cm³)' if 'Cranial_Capacity_(cm³)' in df.columns else df.columns[1]
    with col1:
        st.metric("Capacité Moyenne", f"{df[brain_col].mean():.0f} cm³")
    with col2:
        st.metric("Capacité Max", f"{df[brain_col].max():.0f} cm³")
    with col3:
        st.metric("Spécimens étudiés", len(df))

    # Évolution temporelle
    if time_col:
        st.header("Évolution Temporelle")
        st.caption(f"Colonne temporelle utilisée : `{time_col}`")
        fig = px.scatter(
            df, x=time_col, y=brain_col,
            title="Évolution de la Capacité Crânienne au Fil du Temps",
            labels={time_col: "Temps (Millions d'années)", brain_col: "Capacité Crânienne (cm³)"},
            trendline="ols", template="plotly_white"
        )
        fig.update_layout(xaxis=dict(autorange='reversed'))
        st.plotly_chart(fig, use_container_width=True)
    else:
        st.info("Colonne temporelle absente du dataset. Impossible d'afficher l'évolution temporelle.")

    # Corrélations Anatomiques
    st.header("Corrélations Anatomiques")
    anatomical_cols = ['Height_(cm)', 'Weight_(kg)', 'Skull_Length_(mm)', 'Skull_Width_(mm)']
    anatomical_cols = [col for col in anatomical_cols if col in df.columns]
    for col in anatomical_cols:
        fig = px.scatter(
            df, x=col, y=brain_col,
            title=f"{col} vs Capacité Crânienne",
            labels={col: col, brain_col: "Capacité Crânienne (cm³)"},
            trendline="ols", template="plotly_white"
        )
        st.plotly_chart(fig, use_container_width=True)

    # Analyse géographique
    if 'Current_Country' in df.columns:
        st.header("Moyenne par Pays")
        geo_df = df.groupby("Current_Country")[brain_col].mean().reset_index()
        fig = px.bar(
            geo_df.sort_values(brain_col, ascending=False),
            x="Current_Country", y=brain_col,
            labels={"Current_Country": "Pays", brain_col: "Capacité Moyenne (cm³)"},
            title="Capacité Crânienne Moyenne par Pays",
            template="plotly_white"
        )
        st.plotly_chart(fig, use_container_width=True)

    # Conclusions principales
    st.header("Conclusions Principales")
    st.success("""
    Notre étude révèle plusieurs facteurs influents sur l'évolution de la capacité crânienne des hominidés. 
    En croisant les données anatomiques, géographiques et temporelles, plusieurs **tendances fortes** se dégagent.
    """)

    st.markdown("""
    ### 1. Tendances Évolutives
    - Une **progression nette** au fil du temps, avec un cerveau moyen passant de moins de 500 cm³ à plus de 1 300 cm³.
    - Des **ruptures évolutives** marquées, suggérant des sauts cognitifs plutôt que des transitions linéaires.

    ### 2. Corrélations Anatomiques
    - La taille corporelle (`Height_(cm)`) et la largeur du crâne sont **positivement corrélées** à la capacité crânienne.
    - Les individus bipèdes et à squelette raffiné présentent généralement un cerveau plus volumineux.

    ### 3. Facteurs Environnementaux
    - Les **régions comme l'Afrique de l'Est** montrent des valeurs crâniennes plus élevées, reflet d'un développement évolutif majeur.
    - Le type d'habitat pourrait jouer un rôle indirect à travers la mobilité, l'alimentation et l'adaptation.

    ### 4. Données comportementales
    - Bien que peu nombreuses, les données montrent que les **usagers d'outils** ont souvent une capacité cérébrale plus élevée, 
      soutenant l'idée d'un lien entre technologie et cognition.
    """)

    # Implications
    st.header("Implications et Perspectives")
    st.markdown("""
    #### Pour la recherche
    - Confirme l'hypothèse d'un **cerveau évolutif**, en lien avec posture, morphologie et environnement.
    - Met en évidence des **coévolutions** entre le cerveau et d'autres fonctions : locomotion, alimentation, complexité sociale.

    #### Recommandations futures
    - Étendre les analyses à des données génétiques et comportementales plus fines
    - Intégrer des modèles d'intelligence artificielle pour prédire l'évolution crânienne
    """)
# … plus haut dans ton code, juste après avoir chargé df et fait tes sélections :
brain_col = "Cranial_Capacity_(cm³)"  # ou le nom exact dans ton df
time_col  = "Time_years"             # ou la colonne temporelle que tu utilises

if df is not None:

    # Autres axes d'étude
    with st.expander("Autres axes d'étude", expanded=False):
        st.info("Perspectives pour prolonger et enrichir l'analyse")
        st.markdown("""
        ### Pistes complémentaires
        - **Données paléo-climatiques & géospatiales** : intégrer paléo-température et paléo-végétation…  
        - **Géométrie morphométrique 3D & biomécanique** : extraire des landmarks sur des scans 3D…  
        - **Paléogénétique & phylogénie comparative** : combiner données morpho. et ADN ancien…  
        - **Fouille de textes & NLP** : utiliser spaCy/transformers pour extraire données de rapports…  
        - **Apprentissage profond (Deep Learning)** : entraîner un CNN sur photos/scans de fossiles…  
        - **Modélisation multi-agents (ABM)** : simuler migrations et transmissions génétiques…  
        - **Réalité virtuelle & augmentée (VR/AR)** : rendre interactives tes analyses 3D via A-Frame, Unity…
        """)

    # Statistiques dans la barre latérale
    st.sidebar.header("Statistiques Clés")
    st.sidebar.info(f"""
    ### Capacité Crânienne
    - Moyenne : {df[brain_col].mean():.0f} cm³  
    - Médiane : {df[brain_col].median():.0f} cm³  
    - Max : {df[brain_col].max():.0f} cm³  
    - Min : {df[brain_col].min():.0f} cm³  

    ### Étendue Temporelle
    {(
        f"- {df[time_col].min():.1f} à {df[time_col].max():.1f} millions d'années"
        if time_col in df.columns else
        "Colonne temporelle absente du dataset."
    )}

    ### Pays représentés
    - {df['Current_Country'].nunique() if 'Current_Country' in df.columns else 0} pays
    """)

else:
    st.error("Impossible de charger les données. Veuillez vérifier votre dataset.")
 