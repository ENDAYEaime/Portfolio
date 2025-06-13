import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from io import StringIO
from config import init_filters, get_filtered_data, display_filter_info

# Configuration de la page
st.set_page_config(
    page_title="Analyse des Données",
    layout="wide"
)

# Chargement du CSS personnalisé
with open('static/style.css') as f:
    css = f.read()
st.markdown(f'<style>{css}</style>', unsafe_allow_html=True)

# Titre principal
st.title("Analyse Statistique du Dataset")

# Guide d'utilisation
with st.expander("Guide d'utilisation de cette page", expanded=False):
    st.markdown("""
    ### Comment utiliser cette page d'analyse ?
    
    1. **Filtres**  
       - Utilisez les filtres dans la barre latérale pour affiner votre analyse.  
       - Les filtres s'appliquent automatiquement à toutes les visualisations.  
       - Un résumé des filtres actifs est affiché en haut de la page.
    
    2. **Aperçu des Données**  
       - Consultez les métriques générales (nombre d'observations, colonnes, etc.).  
       - Cliquez sur "Voir les premières lignes" pour explorer les données brutes.  
       - Détails sur les colonnes disponibles dans la section expandable.
    
    3. **Statistiques Descriptives**  
       - Sélectionnez une variable numérique pour afficher ses métriques clés.  
       - Développez pour voir les statistiques détaillées et l'histogramme.
    
    4. **Analyse Catégorielle**  
       - Sélectionnez une variable catégorielle pour voir sa distribution.  
       - Camembert interactif et tableau de récapitulatif des catégories.
    """)

# Chargement des données
@st.cache_data
def load_data():
    try:
        return pd.read_csv('Evolution_DataSets_clean.csv')
    except Exception as e:
        st.error(f"Erreur lors du chargement des données : {e}")
        return None

df = load_data()
if df is None:
    st.error("Impossible de charger les données. Veuillez vérifier le fichier.")
    st.stop()

# Initialisation et application des filtres
init_filters()
df = get_filtered_data()
if df is None or df.empty:
    st.error("Aucune donnée après application des filtres.")
    st.stop()

# Affichage des filtres actifs
st.subheader("Filtres Actifs")
display_filter_info()

# Aperçu du dataset
st.header("Aperçu du Dataset")
c1, c2, c3 = st.columns(3)
c1.metric("Total observations", f"{len(df):,}")
c2.metric("Colonnes", f"{len(df.columns):,}")
c3.metric("Mémoire utilisée", f"{df.memory_usage().sum() / 1024**2:.1f} MB")

st.subheader("Colonnes disponibles")
st.write(", ".join(df.columns.tolist()))

with st.expander("Voir les premières lignes du dataset"):
    st.dataframe(df, use_container_width=True)

with st.expander("Informations détaillées sur les colonnes"):
    buf = StringIO()
    df.info(buf=buf)
    st.code(buf.getvalue())

# Statistiques descriptives
st.header("Statistiques Descriptives")
st.info("Sélectionnez une variable numérique ci-dessous pour voir ses statistiques détaillées")

numeric_cols = df.select_dtypes(include=['int64', 'float64']).columns.tolist()
selected_var = st.selectbox("Variable numérique", numeric_cols)

if selected_var:
    col_data = df[selected_var].dropna()
    if not col_data.empty:
        # Calcul des métriques clés
        mean = col_data.mean()
        std = col_data.std()
        median = col_data.median()
        coef_var = (std / mean * 100) if mean != 0 else np.nan

        c1, c2, c3, c4 = st.columns(4)
        c1.metric("Moyenne", f"{mean:.2f}")
        c2.metric("Médiane", f"{median:.2f}")
        c3.metric("Écart-type", f"{std:.2f}")
        c4.metric("Coef. de variation", f"{coef_var:.1f}%")

        # ← Ce bloc doit être indenté exactement comme ceci
        with st.expander("Voir les statistiques détaillées"):
            stats_df = pd.DataFrame({
                'Statistique': [
                    'Minimum', 'Maximum', 'Moyenne', 'Médiane', 'Écart-type',
                    'Skewness', 'Kurtosis', '1er quartile (25%)', '3e quartile (75%)'
                ],
                'Valeur': [
                    f"{col_data.min():.2f}",
                    f"{col_data.max():.2f}",
                    f"{mean:.2f}",
                    f"{median:.2f}",
                    f"{std:.2f}",
                    f"{col_data.skew():.2f}",
                    f"{col_data.kurtosis():.2f}",
                    f"{col_data.quantile(0.25):.2f}",
                    f"{col_data.quantile(0.75):.2f}"
                ]
            })
            st.dataframe(stats_df, use_container_width=True)

        # Et juste après, on dessine l’histogramme
        st.subheader("Distribution de la variable")
        fig = px.histogram(col_data, nbins=30,
                           title=f"Histogramme de {selected_var}",
                           labels={selected_var: selected_var},
                           template="plotly_white")
        fig.update_layout(bargap=0.1)
        st.plotly_chart(fig, use_container_width=True)

    else:
        st.warning("Aucune donnée disponible pour cette variable.")


# Analyse catégorielle
st.header("Analyse Catégorielle")
st.info("Sélectionnez une variable catégorielle pour visualiser sa distribution")

cat_cols = df.select_dtypes(include=['object']).columns.tolist()
cat_var = st.selectbox("Variable catégorielle", cat_cols)

if cat_var:
    # 1) Comptage des modalités
    counts = df[cat_var].value_counts()

    # 2) Calcul et formatage des pourcentages
    pct = counts.values / len(df) * 100
    pct_series = pd.Series(pct).round(1)
    pct_str = pct_series.astype(str).add('%')
    cat_df = pd.DataFrame({
        'Catégorie': counts.index,
        'Nombre': counts.values,
        'Pourcentage': pct_str.values
    })

    # 3) Affichage côte‐à‐côte
    left, right = st.columns([2, 1])
    with left:
        # Ici se trouve le camembert !
        pie = go.Figure(data=[go.Pie(
            labels=counts.index,
            values=counts.values,
            hole=0.3,
            textinfo='percent+label',
            textposition='inside'
        )])
        pie.update_layout(
            title=f"Distribution de {cat_var}",
            template="plotly_dark",
            height=500,
            margin=dict(t=50, b=0, l=0, r=0)
        )
        st.plotly_chart(pie, use_container_width=True)

    with right:
        st.subheader("Détails")
        st.dataframe(cat_df, use_container_width=True)
        st.metric("Nombre de catégories", len(counts))

