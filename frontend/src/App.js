import React from 'react';
import { motion } from 'framer-motion';
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
  TrendingUp
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

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

// Data
const projects = [
  {
    title: "Prédiction Énergétique ML",
    description: "Modèle de Machine Learning pour anticiper les besoins en consommation de bâtiments à partir de données historiques.",
    tech: ["Python", "Scikit-Learn", "Time Series", "API"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    category: "Machine Learning",
    icon: Brain
  },
  {
    title: "Audit Architecture OLAP",
    description: "Audit complet et optimisation d'une architecture de data warehouse pour un supermarché.",
    tech: ["SQL", "Data Warehousing", "OLAP", "Tableau"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    category: "Data Engineering",
    icon: Database
  },
  {
    title: "Dashboard COVID-19",
    description: "Dashboard Streamlit interactif visualisant les tendances mondiales de la pandémie.",
    tech: ["Python", "Streamlit", "Plotly", "Pandas"],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800",
    category: "Visualisation",
    icon: BarChart3
  },
  {
    title: "Analyse Marketing Bancaire",
    description: "Analyse data-driven des campagnes marketing pour optimiser le ROI et les taux de conversion.",
    tech: ["Python", "Pandas", "Seaborn", "BI"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
    category: "Business Analytics",
    icon: TrendingUp
  },
  {
    title: "Évolution Capacité Crânienne",
    description: "Application Streamlit pour explorer l'évolution de la capacité crânienne humaine à travers le temps.",
    tech: ["Streamlit", "Folium", "Plotly", "Data Science"],
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800",
    category: "Data Science",
    icon: Activity
  },
  {
    title: "Scraping Amazon Selenium",
    description: "Pipeline automatisé d'extraction de données produits Amazon pour l'analyse de marché.",
    tech: ["Python", "Selenium", "Web Scraping", "CSV"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    category: "Data Engineering",
    icon: Terminal
  },
  {
    title: "Analyse Films TMDb",
    description: "Application web interactive pour analyser et visualiser des données de films TMDb.",
    tech: ["Streamlit", "Pandas", "Plotly", "API"],
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
    category: "Visualisation",
    icon: PieChart
  },
  {
    title: "Migration MongoDB Médical",
    description: "Migration de données médicales vers MongoDB avec Docker et déploiement AWS.",
    tech: ["MongoDB", "Docker", "AWS", "Python"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    category: "Data Engineering",
    icon: Server
  }
];

const skills = [
  {
    category: "Langages & Outils",
    icon: Code,
    items: ["Python", "SQL", "HTML/CSS", "Jupyter", "Git"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    category: "Machine Learning",
    icon: Brain,
    items: ["Scikit-Learn", "Pandas", "NumPy", "TensorFlow", "Time Series"],
    color: "from-purple-500 to-pink-500"
  },
  {
    category: "Data Engineering",
    icon: Server,
    items: ["MongoDB", "PostgreSQL", "Docker", "ETL", "AWS"],
    color: "from-green-500 to-emerald-500"
  },
  {
    category: "Visualisation",
    icon: PieChart,
    items: ["Matplotlib", "Seaborn", "Plotly", "Power BI", "Tableau"],
    color: "from-orange-500 to-amber-500"
  },
  {
    category: "Applications Web",
    icon: Database,
    items: ["Streamlit", "Flask", "API REST", "Scraping", "Selenium"],
    color: "from-red-500 to-rose-500"
  },
  {
    category: "Méthodologies",
    icon: BarChart3,
    items: ["Agile/SCRUM", "Data Analysis", "BI", "Reporting"],
    color: "from-indigo-500 to-violet-500"
  }
];

const contacts = [
  { name: "GitHub", url: "https://github.com/ENDAYEaime", icon: Github },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/aime-endaye-2a57b0150", icon: Linkedin },
  { name: "Email", url: "mailto:endayeaime@gmail.com", icon: Mail },
  { name: "Téléphone", url: "tel:0769107434", icon: Phone }
];

// Animated background particles
function DataParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

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
          ? 'bg-slate-900/95 backdrop-blur-xl border-b border-blue-500/20 shadow-lg shadow-blue-500/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a 
            href="#hero" 
            data-testid="nav-logo"
            className="font-heading font-bold text-xl md:text-2xl gradient-text flex items-center gap-2"
          >
            <Cpu className="w-6 h-6 text-blue-400" />
            ENDAYE Aimé
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                data-testid={`nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
                className="font-medium text-slate-400 hover:text-blue-400 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            data-testid="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-blue-400"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-blue-500/20 py-4"
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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
      <div className="absolute inset-0 data-grid-bg" />
      <DataParticles />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 relative z-10">
        <motion.div 
          className="text-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          {/* Status badge */}
          <motion.div 
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-8"
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
            Transformer les <span className="text-blue-400">données brutes</span> en insights actionnables 
            grâce à l'analyse avancée et le <span className="text-blue-400">machine learning</span>.
          </motion.p>
          
          <motion.div 
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a 
              href="#projects"
              data-testid="cta-projects"
              className="group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1"
            >
              <Database className="w-5 h-5" />
              Voir mes projets
              <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </a>
            <a 
              href="#contact"
              data-testid="cta-contact"
              className="inline-flex items-center justify-center gap-2 border border-blue-500/50 text-blue-400 px-8 py-4 rounded-lg font-medium hover:bg-blue-500/10 hover:border-blue-400 transition-all"
            >
              <Terminal className="w-5 h-5" />
              Me contacter
            </a>
          </motion.div>

          {/* Stats */}
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

      {/* Scroll indicator */}
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
      className="py-24 md:py-32 bg-slate-900/50 relative"
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
              <p className="text-lg text-slate-400 leading-relaxed">
                Je suis <strong className="text-white">Endayé Aimé</strong>, passionné par l'informatique et la Data Science, et avant tout autodidacte. Mon parcours a été rythmé par des heures d'apprentissage sur Dataquest, où j'ai bâti mes premières compétences en Python, en statistiques et en web scraping.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Pour approfondir mes connaissances, j'ai suivi de nombreux modules sur Udemy qui m'ont permis de maîtriser l'écosystème <span className="text-blue-400">Python</span> (Pandas, NumPy, Seaborn) et les fondamentaux du <span className="text-blue-400">SQL</span>.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Aujourd'hui, je peaufine mon expertise au sein de <strong className="text-white">DSR School</strong>, où je me forme de manière intensive aux méthodes et outils professionnels.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="bg-slate-800/50 backdrop-blur border border-blue-500/20 rounded-xl p-8">
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

              {/* Tech stack mini */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["Python", "SQL", "Pandas", "Streamlit", "Docker"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs font-mono text-blue-400">
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
      className="py-24 md:py-32 bg-slate-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 data-grid-bg" />
      
      {/* Glowing background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-blue-500/10 to-transparent" />

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
                  variants={scaleIn}
                  whileHover={{ y: -8, scale: 1.02 }}
                  data-testid={`skill-card-${index}`}
                  className="group bg-slate-900/80 backdrop-blur border border-slate-700/50 hover:border-blue-500/50 p-6 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} p-0.5`}>
                      <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <h3 className="font-heading font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {skill.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span 
                        key={item}
                        className="font-mono text-xs bg-slate-800 text-slate-400 px-3 py-1.5 rounded-lg border border-slate-700/50 hover:border-blue-500/30 hover:text-blue-400 transition-colors"
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

// Projects Section
function Projects() {
  const [filter, setFilter] = React.useState("Tous");
  const categories = ["Tous", "Machine Learning", "Data Engineering", "Visualisation", "Business Analytics", "Data Science"];

  const filteredProjects = filter === "Tous" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section 
      id="projects" 
      data-testid="projects-section"
      className="py-24 md:py-32 bg-slate-900/50 relative"
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
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                    : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-blue-500/50 hover:text-blue-400'
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
                  key={project.title}
                  variants={scaleIn}
                  whileHover={{ y: -8 }}
                  data-testid={`project-card-${index}`}
                  className="group bg-slate-900/80 backdrop-blur border border-slate-700/50 hover:border-blue-500/50 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden bg-slate-800 relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="w-10 h-10 bg-blue-600/90 backdrop-blur rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="font-mono text-xs text-blue-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-white mt-2 mb-3 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((t) => (
                        <span 
                          key={t}
                          className="font-mono text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Contact Section
function Contact() {
  return (
    <section 
      id="contact" 
      data-testid="contact-section"
      className="py-24 md:py-32 bg-slate-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 data-grid-bg" />
      
      {/* Glowing background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-t from-blue-500/10 to-transparent" />

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
                  className="group inline-flex items-center gap-3 bg-slate-900/80 backdrop-blur border border-slate-700/50 hover:border-blue-500/50 px-6 py-4 rounded-xl font-medium text-slate-300 hover:text-blue-400 transition-all hover:-translate-y-1"
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
            className="mt-16 p-8 bg-slate-900/50 backdrop-blur border border-blue-500/20 rounded-xl max-w-md mx-auto"
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
      className="bg-slate-950 border-t border-slate-800 py-8"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500">
            <Cpu className="w-5 h-5 text-blue-500" />
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
    <div className="min-h-screen bg-slate-950">
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
