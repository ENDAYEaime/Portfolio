import streamlit as st
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import plotly.express as px
import plotly.graph_objects as go
import scipy.stats as stats
import numpy as np
from config import init_filters, get_filtered_data, display_filter_info

# Configuration de la page
st.set_page_config(
    page_title="Visualisation des Données",
    page_icon="",
    layout="wide"
)

# Chargement du CSS personnalisé
with open('static/style.css') as f:
    st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)

# Titre principal
st.title("Visualisation des Données")

# Guide d'utilisation
with st.expander("Guide d'utilisation des visualisations", expanded=False):
    st.markdown("""
    ### Comment utiliser cette page de visualisation ?
    
    Cette page vous offre trois types d'analyses différentes :
    
    1. **Distribution des Variables**
       - Choisissez entre variables catégorielles ou numériques
       - Pour les variables catégorielles : visualisez les distributions avec des graphiques en barres
       - Pour les variables numériques : explorez les distributions avec histogrammes et boîtes à moustaches
    
    2. **Évolution Temporelle**
       - Sélectionnez une variable temporelle pour l'axe X
       - Choisissez une variable à analyser pour l'axe Y
       - Option : ajoutez une variable de coloration pour plus de détails
       - Les graphiques sont interactifs : zoom, survol, sélection
    
    3. **Analyse Multivariée**
       - Comparez plusieurs variables entre elles
       - Créez des matrices de corrélation
       - Explorez les relations entre variables
    
    ### Astuces d'utilisation
    - Utilisez les filtres dans la barre latérale pour affiner vos analyses
    - Survolez les graphiques pour voir les détails
    - Double-cliquez pour réinitialiser le zoom
    - Utilisez la légende pour masquer/afficher des éléments
    """)

# Initialisation des filtres
init_filters()
df = get_filtered_data()

if df is not None:
    # Affichage de l'état des filtres
    st.subheader("Filtres Actifs")
    display_filter_info()
    
    # Création des sections principales
    st.subheader("Type d'Analyse")
    section = st.radio(
        "Sélectionnez le type d'analyse que vous souhaitez effectuer",
        ["Distribution des Variables", "Évolution Temporelle", "Analyse Multivariée"],
        horizontal=True,
        help="Choisissez le type d'analyse que vous souhaitez effectuer sur vos données"
    )
    
    if section == "Distribution des Variables":
        # Séparation des variables catégorielles et numériques
        categorical_cols = df.select_dtypes(include=['object', 'category']).columns
        numeric_cols = df.select_dtypes(include=['int64', 'float64']).columns
        
        # Création des onglets pour séparer les types de variables
        tab1, tab2 = st.tabs(["Variables Catégorielles", "Variables Numériques"])
        
        # Onglet Variables Catégorielles
        with tab1:
            st.header("Distribution des Variables Catégorielles")
            st.info("Visualisez la répartition des différentes catégories dans vos données")
            
            if len(categorical_cols) > 0:
                selected_cat_var = st.selectbox(
                    "Sélectionnez la variable catégorielle à analyser",
                    categorical_cols,
                    key='cat_var',
                    help="Choisissez la variable dont vous voulez voir la distribution"
                )
                
                # Préparation des données
                value_counts = df[selected_cat_var].value_counts()
                df_plot = pd.DataFrame({
                    'Catégorie': value_counts.index,
                    'Nombre': value_counts.values
                }).sort_values('Nombre', ascending=True)
                
                # Configuration du style Seaborn
                plt.style.use("dark_background")
                plt.figure(figsize=(12, 8))
                
                # Création du graphique avec Seaborn
                sns.barplot(data=df_plot, 
                           x='Catégorie', 
                           y='Nombre',
                           color='skyblue')
                
                # Personnalisation du graphique
                plt.title(f"Distribution de {selected_cat_var}", pad=20)
                plt.xlabel("Habitat")
                plt.ylabel("Nombre d'échantillons")
                
                # Rotation des étiquettes à 45 degrés
                plt.xticks(rotation=45, ha='right')
                
                # Ajustement de la mise en page avec plus d'espace en bas
                plt.tight_layout(pad=2.0)
                
                # Affichage du graphique dans Streamlit
                st.pyplot(plt)
                plt.close()
                
                # Affichage des statistiques
                col1, col2 = st.columns(2)
                with col1:
                    st.write("**Fréquences des valeurs**")
                    st.dataframe(df_plot.set_index('Catégorie'), use_container_width=True)
                
                with col2:
                    st.write("**Pourcentages**")
                    df_plot['Pourcentage'] = (df_plot['Nombre'] / df_plot['Nombre'].sum() * 100).round(2)
                    st.dataframe(df_plot.set_index('Catégorie')[['Pourcentage']], use_container_width=True)
            else:
                st.info("Aucune variable catégorielle trouvée dans le dataset")
        
        # Onglet Variables Numériques
        with tab2:
            st.header("Distribution des Variables Numériques")
            st.info("Analysez la distribution statistique de vos données numériques")
            
            if len(numeric_cols) > 0:
                selected_num_var = st.selectbox(
                    "Sélectionnez la variable numérique à analyser",
                    numeric_cols,
                    key='num_var',
                    help="Choisissez la variable dont vous voulez voir la distribution"
                )
                
                # Configuration du style pour les variables numériques
                plt.style.use("dark_background")
                fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 10), height_ratios=[2, 1])
                
                # Histogramme
                sns.histplot(data=df, x=selected_num_var, ax=ax1, color='skyblue')
                ax1.set_title(f"Distribution de {selected_num_var}")
                
                # Box plot
                sns.boxplot(data=df, x=selected_num_var, ax=ax2, color='skyblue')
                ax2.set_title("Boîte à moustaches")
                
                # Ajustement de la mise en page
                plt.tight_layout()
                
                # Affichage du graphique dans Streamlit
                st.pyplot(fig)
                plt.close()
                
                # Statistiques descriptives
                st.write("**Statistiques descriptives**")
                stats_df = pd.DataFrame({
                    'Métrique': ['Moyenne', 'Médiane', 'Écart-type', 'Minimum', 'Maximum'],
                    'Valeur': [
                        round(df[selected_num_var].mean(), 2),
                        round(df[selected_num_var].median(), 2),
                        round(df[selected_num_var].std(), 2),
                        round(df[selected_num_var].min(), 2),
                        round(df[selected_num_var].max(), 2)
                    ]
                })
                st.dataframe(stats_df.set_index('Métrique'), use_container_width=True)
            else:
                st.info("Aucune variable numérique trouvée dans le dataset")
    
    elif section == "Évolution Temporelle":
        st.header("Évolution Temporelle des Variables")
        st.info("""
        Analysez l'évolution de vos données dans le temps
        - Choisissez une variable temporelle pour l'axe X
        - Sélectionnez une variable à analyser pour l'axe Y
        - Optionnel : ajoutez une variable de coloration pour plus de détails
        """)
        
        # Séparation des variables numériques et temporelles
        numeric_cols = df.select_dtypes(include=['int64', 'float64']).columns
        categorical_cols = df.select_dtypes(include=['object', 'category']).columns
        
        # Identification des colonnes temporelles
        time_related_words = ['year', 'month', 'date', 'time', 'année', 'mois', 'jour', 'temps']
        time_cols_list = [col for col in df.columns if any(word in col.lower() for word in time_related_words)]
        
        if not time_cols_list:
            st.warning("⚠️ Aucune variable temporelle détectée. Toutes les variables numériques seront disponibles pour l'axe X.")
            time_cols_list = numeric_cols.tolist()
        
        # Sélection des variables
        col1, col2 = st.columns(2)
        with col1:
            time_cols = st.selectbox(
                "Sélectionnez la variable temporelle (axe X)",
                time_cols_list,
                key='time_var'
            )
        with col2:
            analysis_var = st.selectbox(
                "Sélectionnez la variable à analyser (axe Y)",
                [col for col in numeric_cols if col != time_cols],
                key='analysis_var'
            )
        
        # Option pour ajouter une variable de coloration
        use_color = st.checkbox("Ajouter une variable de coloration", value=False)
        if use_color:
            color_var = st.selectbox(
                "Variable de coloration (ex: Diet, Habitat...)",
                categorical_cols,
                key='color_var'
            )
        
        if time_cols and analysis_var:
            # Configuration du style
            plt.style.use("dark_background")
            
            if use_color and color_var:
                # Création du graphique avec coloration
                fig, ax = plt.subplots(figsize=(12, 6))
                
                # Création du nuage de points coloré par catégorie
                sns.scatterplot(data=df.sort_values(time_cols, ascending=True), 
                              x=time_cols, 
                              y=analysis_var,
                              hue=color_var,
                              s=20,  # Taille des points réduite à 20
                              alpha=1,
                              marker='o',
                              edgecolor='none',
                              ax=ax) 
                
                # Ajout des lignes de tendance par catégorie
                categories = df[color_var].unique()
                for category in categories:
                    cat_data = df[df[color_var] == category].sort_values(time_cols, ascending=True)
                    sns.regplot(data=cat_data,
                              x=time_cols,
                              y=analysis_var,
                              scatter=False,
                              label=f'Tendance - {category}',
                              line_kws={'alpha': 0.7, 'linewidth': 2},
                              ax=ax)
            
            else:
                # Graphique original sans coloration
                fig, ax = plt.subplots(figsize=(12, 6))
                
                # Trier les données par ordre chronologique
                df_sorted = df.sort_values(time_cols, ascending=True)
                
                sns.scatterplot(data=df_sorted, 
                              x=time_cols, 
                              y=analysis_var, 
                              color='skyblue',
                              s=10,  # Taille des points réduite à 20
                              alpha=1,
                              marker='o',
                              edgecolor='none',
                              ax=ax)
                
                sns.regplot(data=df_sorted,
                          x=time_cols,
                          y=analysis_var,
                          scatter=False,
                          color='orange',
                          line_kws={'alpha': 0.7, 'linewidth': 2},
                          ax=ax)

            # Personnalisation commune du graphique
            plt.title(f"Évolution de {analysis_var} en fonction de {time_cols}", pad=20)
            plt.xlabel(time_cols)
            plt.ylabel(analysis_var)
            
            # Forcer l'inversion de l'axe X
            ax.set_xlim(ax.get_xlim()[::-1])
            
            # Personnalisation de la grille
            ax.grid(True, alpha=0.2)
            
            # Rotation des étiquettes
            plt.xticks(rotation=45, ha='right')
            
            # Ajustement de la mise en page
            plt.tight_layout(pad=2.0)
            
            # Affichage du graphique
            st.pyplot(fig)
            plt.close()
            
            # Statistiques par groupe si une variable de coloration est utilisée
            if use_color and color_var:
                st.subheader(f"Statistiques par {color_var}")
                stats_by_group = df.groupby(color_var)[analysis_var].agg([
                    ('Moyenne', 'mean'),
                    ('Médiane', 'median'),
                    ('Écart-type', 'std'),
                    ('Minimum', 'min'),
                    ('Maximum', 'max')
                ]).round(2)
                st.dataframe(stats_by_group, use_container_width=True)
                # ANOVA pour tester les différences entre groupes
                categories = df[color_var].unique()
                f_stat, p_value = stats.f_oneway(*[df[df[color_var]==cat][analysis_var].values 
                                                 for cat in categories])
                
                col1, col2 = st.columns(2)
                with col1:
                    st.metric(
                        label="Statistique F",
                        value=f"{f_stat:.2f}",
                        help="Test ANOVA - Plus la valeur est élevée, plus les différences entre groupes sont importantes"
                    )
                with col2:
                    st.metric(
                        label="P-valeur",
                        value=f"{p_value:.4f}",
                        help="Une p-valeur < 0.05 indique des différences significatives entre les groupes"
                    )
                
                if p_value < 0.05:
                    st.info(f"Il existe des différences significatives dans {analysis_var} entre les différents groupes de {color_var}")
                else:
                    st.info(f"Pas de différences significatives dans {analysis_var} entre les groupes de {color_var}")
            
            # Statistiques générales
            st.subheader("Statistiques d'évolution")
            evolution_stats = df.groupby(time_cols)[analysis_var].agg(['mean', 'min', 'max']).round(2)
            evolution_stats.columns = ['Moyenne', 'Minimum', 'Maximum']
            st.dataframe(evolution_stats, use_container_width=True)
            
            # Analyse de tendance
            st.subheader("Analyse de la tendance")
            col1, col2 = st.columns(2)
            
            with col1:
                first_value = df.groupby(time_cols)[analysis_var].mean().iloc[0]
                last_value = df.groupby(time_cols)[analysis_var].mean().iloc[-1]
                total_change = ((last_value - first_value) / first_value * 100).round(2)
                
                st.metric(
                    label="Variation totale",
                    value=f"{total_change}%",
                    delta=total_change
                )
            
            with col2:
                rolling_mean = df.groupby(time_cols)[analysis_var].mean().rolling(window=2).mean()
                trend = "↗️ Croissante" if rolling_mean.iloc[-1] > rolling_mean.iloc[-2] else "↘️ Décroissante"
                
                st.metric(
                    label="Tendance actuelle",
                    value=trend
                )
    
    else:  # Section Analyse Multivariée
        st.header("Analyse Multivariée")
        
        # Séparation des variables catégorielles et numériques
        categorical_cols = df.select_dtypes(include=['object', 'category']).columns
        numeric_cols = df.select_dtypes(include=['int64', 'float64']).columns
        
        # Sélection du type de variable pour l'axe X
        x_type = st.radio(
            "Type de variable pour l'axe X",
            ["Catégorielle", "Numérique"],
            horizontal=True
        )
        
        # Sélection de la variable X selon le type choisi
        if x_type == "Catégorielle":
            x_var = st.selectbox("Variable en X (Catégories)", categorical_cols, key='x_var')
            remaining_cols = [col for col in categorical_cols if col != x_var]
        else:
            x_var = st.selectbox("Variable en X (Numérique)", numeric_cols, key='x_var')
            remaining_cols = categorical_cols  # Pour le groupement, on utilise toujours les catégories
        
        # Sélection multiple des variables de groupement
        num_vars = st.slider("Nombre de variables de groupement", 1, len(remaining_cols), 1)
        
        selected_vars = []
        cols = st.columns(num_vars)
        for i, col in enumerate(cols):
            with col:
                available_vars = [v for v in remaining_cols if v not in selected_vars]
                var = st.selectbox(f"Variable de groupement {i+1}", 
                                 available_vars,
                                 key=f'var_{i}')
                selected_vars.append(var)
        
        if x_var and selected_vars:
            # Configuration du style
            plt.style.use("dark_background")
            
            # Création des sous-graphiques
            fig, axes = plt.subplots(len(selected_vars), 1, 
                                   figsize=(12, 6*len(selected_vars)),
                                   squeeze=False)
            
            # Création des visualisations pour chaque variable
            for idx, (ax, hue_var) in enumerate(zip(axes.flat, selected_vars)):
                if x_type == "Catégorielle":
                    # Histogramme empilé avec Seaborn pour variables catégorielles
                    sns.histplot(data=df, 
                               x=x_var, 
                               hue=hue_var, 
                               multiple="stack",
                               ax=ax)
                    
                    # Personnalisation du graphique
                    ax.set_title(f"Distribution de {hue_var} par {x_var}", pad=20)
                    ax.set_xlabel(x_var)
                    ax.set_ylabel("Nombre d'observations")
                else:
                    # Histogrammes pour variables numériques avec coloration par catégorie
                    categories = df[hue_var].unique()
                    n_categories = len(categories)
                    custom_palette = sns.color_palette("husl", n_colors=n_categories)
                    
                    for cat, color in zip(categories, custom_palette):
                        cat_data = df[df[hue_var] == cat]
                        sns.histplot(data=cat_data,
                                   x=x_var,
                                   color=color,
                                   alpha=0.5,
                                   label=f"{cat} ({len(cat_data)} obs.)",
                                   ax=ax)
                    
                    # Personnalisation du graphique
                    ax.set_title(f"Distribution de {x_var} par {hue_var}", pad=20)
                    ax.set_xlabel(x_var)
                    ax.set_ylabel("Nombre d'observations")
                    
                    # Amélioration de la légende
                    ax.legend(title=hue_var,
                            bbox_to_anchor=(1.15, 1),
                            loc='upper left',
                            borderaxespad=0,
                            frameon=True,
                            fancybox=True,
                            shadow=True)
                
                # Rotation des étiquettes
                ax.tick_params(axis='x', rotation=45)
            
            # Ajustement de la mise en page
            plt.tight_layout(pad=2.0)
            
            # Affichage du graphique
            st.pyplot(fig)
            plt.close()
            
            # Analyses statistiques pour chaque variable
            for hue_var in selected_vars:
                st.subheader(f"Analyse de {hue_var}")
                
                if x_type == "Catégorielle":
                    # Table de contingence pour variables catégorielles
                    contingency_table = pd.crosstab(df[x_var], df[hue_var])
                    st.write("**Table de contingence**")
                    st.dataframe(contingency_table, use_container_width=True)
                    
                    # Calcul des pourcentages
                    percentage_table = pd.crosstab(df[x_var], df[hue_var], normalize='index') * 100
                    percentage_table = percentage_table.round(2)
                    st.write("**Distribution en pourcentage**")
                    st.dataframe(percentage_table, use_container_width=True)
                    
                    # Test statistique (Chi-2)
                    chi2, p_value = stats.chi2_contingency(contingency_table)[:2]
                    
                    col1, col2 = st.columns(2)
                    with col1:
                        st.metric(
                            label="Chi-2",
                            value=f"{chi2:.2f}",
                            help="Plus la valeur est élevée, plus la relation est forte"
                        )
                    with col2:
                        st.metric(
                            label="P-valeur",
                            value=f"{p_value:.4f}",
                            help="Une p-valeur < 0.05 indique une relation significative"
                        )
                else:
                    # Statistiques descriptives pour variables numériques
                    stats_by_group = df.groupby(hue_var)[x_var].agg([
                        ('Moyenne', 'mean'),
                        ('Médiane', 'median'),
                        ('Écart-type', 'std'),
                        ('Minimum', 'min'),
                        ('Maximum', 'max')
                    ]).round(2)
                    
                    st.write("**Statistiques par groupe**")
                    st.dataframe(stats_by_group, use_container_width=True)
                    
                    # Test ANOVA
                    groups = [group for name, group in df.groupby(hue_var)[x_var]]
                    f_stat, p_value = stats.f_oneway(*groups)
                    
                    col1, col2 = st.columns(2)
                    with col1:
                        st.metric(
                            label=f"F-statistic ({x_var} vs {hue_var})",
                            value=f"{f_stat:.2f}",
                            help="Test ANOVA - Plus la valeur est élevée, plus les différences entre groupes sont importantes"
                        )
                    with col2:
                        st.metric(
                            label="P-valeur",
                            value=f"{p_value:.4f}",
                            help="Une p-valeur < 0.05 indique des différences significatives entre les groupes"
                        )
                
                # Interprétation
                if p_value < 0.05:
                    st.info(f"Il existe une relation significative entre {x_var} et {hue_var}")
                else:
                    st.info(f"Pas de relation significative détectée entre {x_var} et {hue_var}")
                
                st.markdown("---") 