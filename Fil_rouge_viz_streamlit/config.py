import streamlit as st
import pandas as pd

@st.cache_data
def load_data():
    """Load and cache the dataset
    Returns:
        pd.DataFrame: Loaded dataframe or None if loading fails
    """
    try:
        # Load the data from the correct file
        df = pd.read_csv('Evolution_DataSets_clean.csv')
        return df
    except Exception as e:
        st.error(f"Erreur lors du chargement des données: {str(e)}")
        return None

def init_session_state():
    """Initialize session state variables"""
    if 'data' not in st.session_state:
        st.session_state.data = load_data()
    if 'filtered_data' not in st.session_state:
        st.session_state.filtered_data = st.session_state.data.copy() if st.session_state.data is not None else None
    if 'filters_applied' not in st.session_state:
        st.session_state.filters_applied = False

def init_filters():
    """Initialize the filter section in the sidebar"""
    init_session_state()
    
    with st.sidebar:
        st.header("Filtres d'Analyse")
        
        # Bouton pour réinitialiser les filtres
        if st.button(" Réinitialiser les filtres"):
            st.session_state.filtered_data = st.session_state.data.copy() if st.session_state.data is not None else None
            st.session_state.filters_applied = False
            st.rerun()
        
        # Séparateur
        st.markdown("---")
        
        # Application des filtres
        filtered_df = apply_filters(st.session_state.data)
        if filtered_df is not None:
            st.session_state.filtered_data = filtered_df

def apply_filters(df):
    """Apply filters to the dataframe based on user selection
    Args:
        df (pd.DataFrame): Input dataframe
    Returns:
        pd.DataFrame: Filtered dataframe
    """
    if df is None:
        return None
        
    filtered_df = df.copy()
    applied_filters = False

    # ─── Filtres Catégoriels ───────────────────────────────────────
    categorical_cols = filtered_df.select_dtypes(include=['object', 'category']).columns
    st.sidebar.subheader(" Filtres Catégoriels")
    for col in categorical_cols:
        if filtered_df[col].nunique() < 50:  # Limite pour éviter trop d'options
            key = f"filter_cat_{col}"
            selected = st.sidebar.multiselect(
                f"Filtrer par {col}",
                options=sorted(filtered_df[col].unique()),
                default=[],
                key=key
            )
            if selected:
                filtered_df = filtered_df[filtered_df[col].isin(selected)]
                applied_filters = True

    # ─── Filtres Numériques ────────────────────────────────────────
    numeric_cols = filtered_df.select_dtypes(include=['int64', 'float64']).columns
    st.sidebar.markdown("---")
    st.sidebar.subheader("Filtres Numériques")
    for col in numeric_cols:
        min_val, max_val = float(filtered_df[col].min()), float(filtered_df[col].max())
        if min_val != max_val:
            delta = max_val - min_val
            key = f"filter_num_{col}"
            if pd.api.types.is_integer_dtype(filtered_df[col]):
                step = max(1, int(delta/100))
                vals = st.sidebar.slider(
                    f"Plage de {col}",
                    int(min_val), int(max_val),
                    (int(min_val), int(max_val)),
                    step=step,
                    key=key
                )
            else:
                step = delta/100.0
                vals = st.sidebar.slider(
                    f"Plage de {col}",
                    min_val, max_val,
                    (min_val, max_val),
                    step=step,
                    format="%.2f",
                    key=key
                )
            if vals != (min_val, max_val):
                filtered_df = filtered_df[(filtered_df[col]>=vals[0]) & (filtered_df[col]<=vals[1])]
                applied_filters = True

    # ─── Affichage des métriques ────────────────────────────────────
    st.sidebar.markdown("---")
    st.sidebar.subheader("Statistiques des Filtres")
    
    if applied_filters:
        st.sidebar.metric(
            "Observations filtrées", 
            f"{len(filtered_df):,}", 
            delta=f"{len(filtered_df) - len(df):,} obs.",
            delta_color="inverse"
        )
        st.sidebar.metric(
            "Pourcentage des données", 
            f"{(len(filtered_df)/len(df)*100):.1f}%"
        )
    else:
        st.sidebar.metric("Total observations", f"{len(df):,}")

    st.session_state.filters_applied = applied_filters
    return filtered_df

def get_filtered_data():
    """Get the filtered dataframe based on session state
    Returns:
        pd.DataFrame: Filtered dataframe
    """
    init_session_state()
    return st.session_state.filtered_data

def display_filter_info():
    """Display filter information in the main content area"""
    if st.session_state.filters_applied:
        st.info(
            f"Filtres appliqués : {len(st.session_state.filtered_data):,} observations sur {len(st.session_state.data):,} "
            f"({(len(st.session_state.filtered_data)/len(st.session_state.data)*100):.1f}% des données)"
        )
