import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink,
  Database,
  Code,
  BarChart3,
  Brain,
  Server,
  PieChart,
  Menu,
  X,
  ChevronDown,
  Terminal,
  Cpu,
  Activity,
  TrendingUp,
  Zap,
  Globe,
  FileCode,
  ChevronRight,
  Eye
} from 'lucide-react';

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// Detailed Projects Data
const projects = [
  {
    id: 1,
    title: "Seattle Energy Forecast",
    subtitle: "Prédiction énergétique avec ML",
    description: "Modèle de Machine Learning pour prédire la consommation énergétique annuelle des bâtiments de Seattle. Déploiement en production via API REST sur le cloud.",
    tech: ["Python", "Scikit-Learn", "BentoML", "FastAPI", "Docker", "AWS"],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
    category: "Machine Learning",
    icon: Brain,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Prédiction de consommation énergétique (kBtu)",
      "Feature engineering avancé",
      "Comparaison de modèles (Random Forest, XGBoost, Ridge)",
      "API REST déployée sur cloud",
      "Pipeline MLOps complet"
    ],
    codeSnippet: `# Feature Engineering & Model Training
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score

# Sélection des features pertinentes
features = ['BuildingAge', 'NumberFloors', 
            'PropertyGFATotal', 'ENERGYSTARScore']

# Entraînement du modèle
model = RandomForestRegressor(n_estimators=100)
scores = cross_val_score(model, X_train, y_train, cv=5)
print(f"R² Score: {scores.mean():.3f}")`
  },
  {
    id: 2,
    title: "Analyse Marketing Bancaire",
    subtitle: "Optimisation campagne téléprospection",
    description: "Analyse des facteurs influençant la souscription à une offre bancaire. Identification des profils clients les plus susceptibles de convertir après un appel téléphonique.",
    tech: ["Python", "Pandas", "Seaborn", "Matplotlib", "Jupyter"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
    category: "Business Analytics",
    icon: TrendingUp,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Analyse de 45 211 observations",
      "Profilage clients souscripteurs vs non-souscripteurs",
      "Identification des leviers de conversion",
      "Visualisations bivariées et corrélations",
      "Recommandations métier actionnables"
    ],
    codeSnippet: `# Analyse bivariée - Taux de souscription
import pandas as pd
import seaborn as sns

# Analyse par niveau d'éducation
subscription_rate = df.groupby('education')['y'].apply(
    lambda x: (x == 'yes').mean() * 100
)

# Visualisation
sns.barplot(x=subscription_rate.index, 
            y=subscription_rate.values)
plt.title('Taux de souscription par éducation')`
  },
  {
    id: 3,
    title: "Base de Données Immobilier France",
    subtitle: "Modélisation SQL & Analyse territoriale",
    description: "Conception et exploitation d'une base de données relationnelle du marché immobilier français. Analyse multi-niveaux : biens, communes, départements, régions.",
    tech: ["SQL", "SQLite", "Python", "Power BI"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    category: "Data Engineering",
    icon: Database,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Schéma relationnel normalisé",
      "Jointures multi-tables complexes",
      "Prix moyen au m² par zone",
      "Corrélation population/transactions",
      "Analyse dynamisme régional"
    ],
    codeSnippet: `-- Analyse prix moyen par département
SELECT 
    d.nom_departement,
    r.nom_region,
    ROUND(AVG(v.prix / b.surface), 2) AS prix_m2,
    COUNT(*) AS nb_transactions
FROM ventes v
JOIN biens b ON v.id_bien = b.id_bien
JOIN communes c ON b.id_commune = c.id_commune
JOIN departements d ON c.id_dept = d.id_dept
JOIN regions r ON d.id_region = r.id_region
GROUP BY d.id_dept
ORDER BY prix_m2 DESC;`
  },
  {
    id: 4,
    title: "European Football Analytics",
    subtitle: "Analyse SQL des performances",
    description: "Analyse approfondie des données de football européen : performances des ligues, consistance offensive des équipes, statistiques de buts et tendances saisonnières.",
    tech: ["SQL", "Python", "Pandas", "Matplotlib", "API REST"],
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    category: "Data Analysis",
    icon: Activity,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Analyse de 5 ligues majeures",
      "Mesure de consistance par variance",
      "Évolution saisonnière des buts",
      "Comparaison Home vs Away",
      "Intégration API météo"
    ],
    codeSnippet: `-- Analyse variance offensive par équipe
WITH team_goals AS (
    SELECT team_long_name,
           home_team_goal AS goals,
           season
    FROM Match m
    JOIN Team t ON m.home_team_api_id = t.team_api_id
)
SELECT team_long_name,
       AVG(goals) AS avg_goals,
       VARIANCE(goals) AS goal_variance
FROM team_goals
GROUP BY team_long_name
ORDER BY goal_variance ASC;`
  },
  {
    id: 5,
    title: "Spotify API Data Extraction",
    subtitle: "Extraction & structuration de données musicales",
    description: "Pipeline d'extraction de données via l'API Spotify : authentification OAuth, pagination, parsing JSON et création de DataFrames structurés.",
    tech: ["Python", "Requests", "Pandas", "Spotify API", "JSON"],
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800",
    category: "Data Engineering",
    icon: Zap,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Authentification Client Credentials",
      "Gestion pagination API (limit/offset)",
      "Parsing JSON imbriqué",
      "Conversion durée ms → mm:ss",
      "Export DataFrame structuré"
    ],
    codeSnippet: `# Extraction données artiste Spotify
import requests

def get_artist_tracks(artist_id, token):
    headers = {"Authorization": f"Bearer {token}"}
    tracks = []
    offset = 0
    
    while True:
        url = f"{BASE_URL}/artists/{artist_id}/albums"
        params = {"limit": 50, "offset": offset}
        response = requests.get(url, headers=headers, 
                               params=params)
        data = response.json()
        tracks.extend(data['items'])
        if len(data['items']) < 50:
            break
        offset += 50
    return tracks`
  },
  {
    id: 6,
    title: "Évolution Capacité Crânienne",
    subtitle: "Dashboard Streamlit interactif",
    description: "Application Streamlit pour explorer l'évolution de la capacité crânienne humaine à travers le temps, l'espace géographique et les caractéristiques morphologiques.",
    tech: ["Streamlit", "Python", "Plotly", "Folium", "Pandas", "Seaborn"],
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800",
    category: "Data Visualization",
    icon: PieChart,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "5 pages thématiques",
      "Carte interactive Folium",
      "Visualisations Plotly dynamiques",
      "Filtres interactifs",
      "Analyse statistique descriptive"
    ],
    codeSnippet: `# Dashboard Streamlit multi-pages
import streamlit as st
import plotly.express as px

st.set_page_config(page_title="Évolution Crânienne",
                   layout="wide")

# Carte interactive des spécimens
fig = px.scatter_mapbox(
    df, lat="latitude", lon="longitude",
    color="cranial_capacity",
    size="age_million_years",
    hover_name="species",
    mapbox_style="carto-darkmatter"
)
st.plotly_chart(fig, use_container_width=True)`
  },
  {
    id: 7,
    title: "Amazon Scraper Selenium",
    subtitle: "Pipeline d'extraction automatisé",
    description: "Scraper automatisé pour extraire les données produits Amazon : gestion du contenu dynamique, détection anti-bot, et export CSV structuré.",
    tech: ["Python", "Selenium", "WebDriver", "Pandas", "CSV"],
    image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800",
    category: "Data Engineering",
    icon: Terminal,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Navigation automatisée",
      "Extraction titre, prix, image",
      "Détection et gestion doublons",
      "Mode headless Chrome",
      "Export CSV pipeline-ready"
    ],
    codeSnippet: `# Scraper Amazon avec Selenium
from selenium import webdriver
from selenium.webdriver.common.by import By

options = webdriver.ChromeOptions()
options.add_argument('--headless')

driver = webdriver.Chrome(options=options)
driver.get(product_url)

# Extraction des données produit
title = driver.find_element(
    By.ID, "productTitle").text
price = driver.find_element(
    By.CLASS_NAME, "a-price-whole").text
image = driver.find_element(
    By.ID, "landingImage").get_attribute("src")`
  },
  {
    id: 8,
    title: "Migration MongoDB Médical",
    subtitle: "NoSQL & Cloud AWS",
    description: "Migration de données médicales vers MongoDB avec architecture distribuée. Conteneurisation Docker et étude de déploiement sur AWS.",
    tech: ["MongoDB", "Docker", "AWS", "Python", "NoSQL"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
    category: "Data Engineering",
    icon: Server,
    github: "https://github.com/ENDAYEaime/Portfolio",
    features: [
      "Modélisation document NoSQL",
      "Migration données relationnelles",
      "Conteneurisation Docker",
      "Architecture AWS",
      "Réplication et sharding"
    ],
    codeSnippet: `# Migration vers MongoDB
from pymongo import MongoClient
import pandas as pd

client = MongoClient("mongodb://localhost:27017")
db = client["medical_db"]

# Transformation et insertion
patients_df = pd.read_csv("patients.csv")
patients_dict = patients_df.to_dict('records')

# Insertion avec validation
result = db.patients.insert_many(patients_dict)
print(f"Inserted {len(result.inserted_ids)} docs")`
  }
];

const skills = [
  {
    category: "Langages & Outils",
    icon: Code,
    items: ["Python", "SQL", "HTML/CSS", "Jupyter", "Git"],
    color: "#3b82f6"
  },
  {
    category: "Machine Learning",
    icon: Brain,
    items: ["Scikit-Learn", "Pandas", "NumPy", "TensorFlow", "Time Series"],
    color: "#8b5cf6"
  },
  {
    category: "Data Engineering",
    icon: Server,
    items: ["MongoDB", "PostgreSQL", "Docker", "ETL", "AWS"],
    color: "#10b981"
  },
  {
    category: "Visualisation",
    icon: PieChart,
    items: ["Matplotlib", "Seaborn", "Plotly", "Power BI", "Tableau"],
    color: "#f59e0b"
  },
  {
    category: "Applications Web",
    icon: Globe,
    items: ["Streamlit", "Flask", "API REST", "Scraping", "Selenium"],
    color: "#ef4444"
  },
  {
    category: "Méthodologies",
    icon: BarChart3,
    items: ["Agile/SCRUM", "Data Analysis", "BI", "Reporting"],
    color: "#6366f1"
  }
];

const contacts = [
  { name: "GitHub", url: "https://github.com/ENDAYEaime", icon: Github },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/aime-endaye-2a57b0150", icon: Linkedin },
  { name: "Email", url: "mailto:endayeaime@gmail.com", icon: Mail },
  { name: "Téléphone", url: "tel:0769107434", icon: Phone }
];

// Navbar Component
function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "À propos", href: "#about" },
    { name: "Compétences", href: "#skills" },
    { name: "Projets", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav 
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#0a1628]/95 backdrop-blur-xl border-b border-blue-500/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a 
            href="#hero" 
            data-testid="nav-logo"
            className="font-heading font-bold text-xl md:text-2xl text-blue-400 flex items-center gap-2"
          >
            <Database className="w-6 h-6" />
            ENDAYE Aimé
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium text-slate-400 hover:text-blue-400 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <button 
            data-testid="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-blue-400"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#0a1628]/95 backdrop-blur-xl border-t border-blue-500/20 py-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 font-medium text-slate-400 hover:text-blue-400 hover:bg-blue-500/10"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section 
      id="hero" 
      data-testid="hero-section"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0a1628]" />
      <div className="absolute inset-0 data-grid-bg" />
      
      {/* Blue glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 relative z-10">
        <motion.div 
          className="text-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div 
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/40 rounded-full px-5 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot" />
            <span className="text-sm text-blue-300 font-mono">Disponible pour opportunités</span>
          </motion.div>

          <motion.p 
            variants={fadeUp}
            className="text-blue-400 font-mono text-sm md:text-base tracking-widest uppercase mb-4"
          >
            Data Scientist & Analyst
          </motion.p>
          
          <motion.h1 
            variants={fadeUp}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="text-white">ENDAYE</span>{" "}
            <span className="gradient-text glow-text">Aimé</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeUp}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Transformer les <span className="text-blue-400 font-medium">données brutes</span> en insights actionnables 
            grâce à l'analyse avancée et le <span className="text-blue-400 font-medium">machine learning</span>.
          </motion.p>
          
          <motion.div 
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a 
              href="#projects"
              data-testid="cta-projects"
              className="group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-1"
            >
              <Database className="w-5 h-5" />
              Voir mes projets
              <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </a>
            <a 
              href="#contact"
              data-testid="cta-contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-blue-500/50 text-blue-400 px-8 py-4 rounded-lg font-medium hover:bg-blue-600/20 hover:border-blue-400 transition-all"
            >
              <Terminal className="w-5 h-5" />
              Me contacter
            </a>
          </motion.div>

          <motion.div 
            variants={fadeUp}
            className="grid grid-cols-3 gap-8 mt-20 max-w-xl mx-auto"
          >
            {[
              { value: "20+", label: "Projets Data", icon: Database },
              { value: "6+", label: "Technologies", icon: Code },
              { value: "2+", label: "Années XP", icon: TrendingUp }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <stat.icon className="w-6 h-6 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-heading text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-blue-500/50" />
      </motion.div>
    </section>
  );
}

// About Section
function About() {
  return (
    <section 
      id="about" 
      data-testid="about-section"
      className="py-24 md:py-32 bg-[#0d1b2a] relative"
    >
      <div className="absolute inset-0 data-grid-bg opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-blue-500" />
            <p className="text-blue-400 font-mono text-sm tracking-widest uppercase">À propos</p>
          </motion.div>
          
          <motion.h2 
            variants={fadeUp}
            className="font-heading text-4xl md:text-5xl font-semibold text-white tracking-tight mb-12"
          >
            Mon parcours <span className="gradient-text">Data</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div variants={fadeUp} className="space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                Je suis <strong className="text-blue-400">Endayé Aimé</strong>, passionné par l'informatique et la Data Science, et avant tout autodidacte. Mon parcours a été rythmé par des heures d'apprentissage sur Dataquest, où j'ai bâti mes premières compétences en Python, en statistiques et en web scraping.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Pour approfondir mes connaissances, j'ai suivi de nombreux modules sur Udemy qui m'ont permis de maîtriser l'écosystème <span className="text-blue-400">Python</span> (Pandas, NumPy, Seaborn) et les fondamentaux du <span className="text-blue-400">SQL</span>.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Aujourd'hui, je peaufine mon expertise au sein de <strong className="text-blue-400">DSR School</strong>, où je me forme de manière intensive aux méthodes et outils professionnels.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="bg-[#0a1628] border border-blue-500/30 rounded-xl p-8">
                <h3 className="font-heading text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <Activity className="w-5 h-5 text-blue-400" />
                  Formations & Certifications
                </h3>
                <ul className="space-y-5">
                  {[
                    { name: "DSR School", desc: "Formation Data Science intensive", active: true },
                    { name: "Dataquest", desc: "Python, Statistics, Web Scraping" },
                    { name: "Udemy", desc: "Data Science, Visualisation avancée" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className={`w-3 h-3 rounded-full mt-1.5 ${item.active ? 'bg-green-400 pulse-dot' : 'bg-blue-500'}`} />
                      <div>
                        <div className="font-medium text-white">{item.name}</div>
                        <div className="text-sm text-slate-500">{item.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Python", "SQL", "Pandas", "Streamlit", "Docker"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-blue-600/20 border border-blue-500/40 rounded-full text-xs font-mono text-blue-400">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Skills Section
function Skills() {
  return (
    <section 
      id="skills" 
      data-testid="skills-section"
      className="py-24 md:py-32 bg-[#0a1628] relative overflow-hidden"
    >
      <div className="absolute inset-0 data-grid-bg" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-blue-600/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-blue-500" />
            <p className="text-blue-400 font-mono text-sm tracking-widest uppercase">Expertise</p>
          </motion.div>
          
          <motion.h2 
            variants={fadeUp}
            className="font-heading text-4xl md:text-5xl font-semibold text-white tracking-tight mb-12"
          >
            Stack <span className="gradient-text">technique</span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.category}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  data-testid={`skill-card-${index}`}
                  className="group bg-[#0d1b2a] border border-blue-500/20 hover:border-blue-500/50 p-6 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${skill.color}20`, border: `1px solid ${skill.color}40` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: skill.color }} />
                    </div>
                    <h3 className="font-heading font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {skill.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span 
                        key={item}
                        className="font-mono text-xs bg-[#0a1628] text-slate-400 px-3 py-1.5 rounded-lg border border-blue-500/20 hover:border-blue-500/40 hover:text-blue-400 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Project Detail Modal
function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#0d1b2a] border border-blue-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-48 md:h-64 overflow-hidden rounded-t-2xl">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a] via-transparent to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-blue-400 font-mono text-xs uppercase">{project.category}</span>
              <h2 className="font-heading text-2xl font-bold text-white">{project.title}</h2>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-3">Description</h3>
            <p className="text-slate-300 leading-relaxed">{project.description}</p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-3">Technologies utilisées</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span 
                  key={t}
                  className="px-4 py-2 bg-blue-600/20 border border-blue-500/40 rounded-lg font-mono text-sm text-blue-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-3">Fonctionnalités & Points techniques</h3>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <ChevronRight className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Code Snippet */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <FileCode className="w-5 h-5 text-blue-400" />
              Extrait de code
            </h3>
            <div className="code-block p-4 overflow-x-auto">
              <pre className="text-slate-300 text-sm whitespace-pre-wrap">
                {project.codeSnippet}
              </pre>
            </div>
          </div>

          {/* GitHub Link */}
          <div className="pt-4 border-t border-blue-500/20">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-all hover:-translate-y-1"
            >
              <Github className="w-5 h-5" />
              Voir sur GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Projects Section
function Projects() {
  const [filter, setFilter] = React.useState("Tous");
  const [selectedProject, setSelectedProject] = React.useState(null);
  const categories = ["Tous", "Machine Learning", "Data Engineering", "Business Analytics", "Data Analysis", "Data Visualization"];

  const filteredProjects = filter === "Tous" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section 
      id="projects" 
      data-testid="projects-section"
      className="py-24 md:py-32 bg-[#0d1b2a] relative"
    >
      <div className="absolute inset-0 data-grid-bg opacity-30" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-blue-500" />
            <p className="text-blue-400 font-mono text-sm tracking-widest uppercase">Portfolio</p>
          </motion.div>
          
          <motion.h2 
            variants={fadeUp}
            className="font-heading text-4xl md:text-5xl font-semibold text-white tracking-tight mb-8"
          >
            Projets <span className="gradient-text">sélectionnés</span>
          </motion.h2>

          {/* Filter */}
          <motion.div 
            variants={fadeUp}
            className="flex flex-wrap gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-testid={`filter-${cat.toLowerCase().replace(' ', '-')}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === cat 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                    : 'bg-[#0a1628] text-slate-400 border border-blue-500/20 hover:border-blue-500/50 hover:text-blue-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.article
                  key={project.id}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  data-testid={`project-card-${index}`}
                  className="group bg-[#0a1628] border border-blue-500/20 hover:border-blue-500/50 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-video overflow-hidden bg-[#0d1b2a] relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="w-10 h-10 bg-blue-600/90 backdrop-blur rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="font-mono text-xs text-blue-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-white mt-2 mb-1 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">{project.subtitle}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 4).map((t) => (
                        <span 
                          key={t}
                          className="font-mono text-xs bg-[#0d1b2a] text-slate-400 px-2 py-1 rounded border border-blue-500/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:gap-3 transition-all">
                      <span>Voir détails</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// Contact Section
function Contact() {
  return (
    <section 
      id="contact" 
      data-testid="contact-section"
      className="py-24 md:py-32 bg-[#0a1628] relative overflow-hidden"
    >
      <div className="absolute inset-0 data-grid-bg" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-t from-blue-600/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-blue-500" />
            <p className="text-blue-400 font-mono text-sm tracking-widest uppercase">Contact</p>
            <div className="w-12 h-px bg-blue-500" />
          </motion.div>
          
          <motion.h2 
            variants={fadeUp}
            className="font-heading text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6"
          >
            Travaillons <span className="gradient-text">ensemble</span>
          </motion.h2>

          <motion.p 
            variants={fadeUp}
            className="text-lg text-slate-400 max-w-xl mx-auto mb-12"
          >
            Vous avez un projet data ? Une opportunité professionnelle ? N'hésitez pas à me contacter.
          </motion.p>

          <motion.div 
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-4"
          >
            {contacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <a
                  key={contact.name}
                  href={contact.url}
                  target={contact.url.startsWith('http') ? '_blank' : undefined}
                  rel={contact.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  data-testid={`contact-${contact.name.toLowerCase()}`}
                  className="group inline-flex items-center gap-3 bg-[#0d1b2a] border border-blue-500/30 hover:border-blue-500/60 px-6 py-4 rounded-xl font-medium text-slate-300 hover:text-blue-400 transition-all hover:-translate-y-1"
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                  {contact.name}
                  {contact.url.startsWith('http') && <ExternalLink size={14} className="text-slate-500" />}
                </a>
              );
            })}
          </motion.div>

          <motion.div 
            variants={fadeUp}
            className="mt-16 p-8 bg-[#0d1b2a] border border-blue-500/30 rounded-xl max-w-md mx-auto"
          >
            <Mail className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            <p className="text-slate-500 mb-2">Email direct</p>
            <a 
              href="mailto:endayeaime@gmail.com"
              className="font-heading text-xl text-blue-400 hover:text-blue-300 transition-colors"
            >
              endayeaime@gmail.com
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer 
      data-testid="footer"
      className="bg-[#071018] border-t border-blue-500/20 py-8"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500">
            <Database className="w-5 h-5 text-blue-500" />
            <span>© {new Date().getFullYear()} ENDAYE Aimé</span>
          </div>
          <p className="text-slate-600 text-sm">
            Portfolio Data Science • Construit avec React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  return (
    <div className="min-h-screen bg-[#0a1628]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
