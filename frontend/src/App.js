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
  ChevronDown
} from 'lucide-react';

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// Data
const projects = [
  {
    title: "Prédiction Énergétique ML",
    description: "Modèle de Machine Learning pour anticiper les besoins en consommation de bâtiments à partir de données historiques.",
    tech: ["Python", "Scikit-Learn", "Time Series", "API"],
    image: "https://images.unsplash.com/photo-1760112783563-514867b4c2ed?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwyfHxmdXR1cmlzdGljJTIwZGlnaXRhbCUyMGRhdGElMjB3YXZlcyUyMGJsdWUlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc3MjU1ODU1M3ww&ixlib=rb-4.1.0&q=85",
    category: "Machine Learning"
  },
  {
    title: "Audit Architecture OLAP",
    description: "Audit complet et optimisation d'une architecture de data warehouse pour un supermarché.",
    tech: ["SQL", "Data Warehousing", "OLAP", "Tableau"],
    image: "https://images.unsplash.com/photo-1770278856325-e313d121ea16?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBvZmZpY2UlMjBsYXB0b3AlMjBkYXRhJTIwYW5hbHlzaXN8ZW58MHx8fHwxNzcyNTU4NTI2fDA&ixlib=rb-4.1.0&q=85",
    category: "Data Engineering"
  },
  {
    title: "Dashboard COVID-19",
    description: "Dashboard Streamlit interactif visualisant les tendances mondiales de la pandémie.",
    tech: ["Python", "Streamlit", "Plotly", "Pandas"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    category: "Visualisation"
  },
  {
    title: "Analyse Marketing Bancaire",
    description: "Analyse data-driven des campagnes marketing pour optimiser le ROI et les taux de conversion.",
    tech: ["Python", "Pandas", "Seaborn", "Business Intelligence"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    category: "Business Analytics"
  },
  {
    title: "Évolution Capacité Crânienne",
    description: "Application Streamlit pour explorer l'évolution de la capacité crânienne humaine à travers le temps.",
    tech: ["Streamlit", "Folium", "Plotly", "Data Science"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    category: "Data Science"
  },
  {
    title: "Scraping Amazon Selenium",
    description: "Pipeline automatisé d'extraction de données produits Amazon pour l'analyse de marché.",
    tech: ["Python", "Selenium", "Web Scraping", "CSV"],
    image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800",
    category: "Data Engineering"
  },
  {
    title: "Analyse Films TMDb",
    description: "Application web interactive pour analyser et visualiser des données de films TMDb.",
    tech: ["Streamlit", "Pandas", "Plotly", "API"],
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
    category: "Visualisation"
  },
  {
    title: "Migration MongoDB Médical",
    description: "Migration de données médicales vers MongoDB avec Docker et déploiement AWS.",
    tech: ["MongoDB", "Docker", "AWS", "Python"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    category: "Data Engineering"
  }
];

const skills = [
  {
    category: "Langages & Outils",
    icon: Code,
    items: ["Python", "SQL", "HTML/CSS", "Jupyter Notebook", "Git"]
  },
  {
    category: "Machine Learning",
    icon: Brain,
    items: ["Scikit-Learn", "Pandas", "NumPy", "TensorFlow", "Time Series"]
  },
  {
    category: "Data Engineering",
    icon: Server,
    items: ["MongoDB", "PostgreSQL", "Docker", "ETL Pipelines", "AWS"]
  },
  {
    category: "Visualisation",
    icon: PieChart,
    items: ["Matplotlib", "Seaborn", "Plotly", "Power BI", "Tableau"]
  },
  {
    category: "Applications Web",
    icon: Database,
    items: ["Streamlit", "Flask", "API REST", "Web Scraping", "Selenium"]
  },
  {
    category: "Méthodologies",
    icon: BarChart3,
    items: ["Agile/SCRUM", "Data Analysis", "Business Intelligence", "Reporting"]
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a 
            href="#hero" 
            data-testid="nav-logo"
            className="font-heading font-bold text-xl md:text-2xl text-primary"
          >
            ENDAYE Aimé
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                data-testid={`nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
                className="font-medium text-slate-600 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            data-testid="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t py-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 font-medium text-slate-600 hover:text-primary hover:bg-slate-50"
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
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white pt-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <motion.div 
          className="text-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.p 
            variants={fadeUp}
            className="text-primary font-mono text-sm md:text-base tracking-widest uppercase mb-4"
          >
            Data Scientist & Analyst
          </motion.p>
          
          <motion.h1 
            variants={fadeUp}
            className="font-heading text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6"
          >
            ENDAYE Aimé
          </motion.h1>
          
          <motion.p 
            variants={fadeUp}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Transformer les données brutes en insights actionnables grâce à l'analyse avancée et le machine learning.
          </motion.p>
          
          <motion.div 
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a 
              href="#projects"
              data-testid="cta-projects"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary-hover transition-all hover:-translate-y-0.5"
            >
              Voir mes projets
              <ChevronDown size={18} />
            </a>
            <a 
              href="#contact"
              data-testid="cta-contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-medium hover:bg-primary hover:text-white transition-all"
            >
              Me contacter
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={fadeUp}
            className="grid grid-cols-3 gap-8 mt-20 max-w-xl mx-auto"
          >
            <div className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-bold text-primary">20+</div>
              <div className="text-sm text-slate-500 mt-1">Projets</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-bold text-primary">5+</div>
              <div className="text-sm text-slate-500 mt-1">Technologies</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-bold text-primary">2+</div>
              <div className="text-sm text-slate-500 mt-1">Années XP</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// About Section
function About() {
  return (
    <section 
      id="about" 
      data-testid="about-section"
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p 
            variants={fadeUp}
            className="text-primary font-mono text-sm tracking-widest uppercase mb-4"
          >
            À propos
          </motion.p>
          
          <motion.h2 
            variants={fadeUp}
            className="font-heading text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-12"
          >
            Mon parcours
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div variants={fadeUp} className="space-y-6">
              <p className="text-lg text-slate-600 leading-relaxed">
                Je suis <strong className="text-slate-900">Endayé Aimé</strong>, passionné par l'informatique et la Data Science, et avant tout autodidacte. Mon parcours a été rythmé par des heures d'apprentissage sur Dataquest, où j'ai bâti mes premières compétences en Python, en statistiques et en web scraping.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Pour approfondir mes connaissances, j'ai suivi de nombreux modules sur Udemy (data science, visualisation avancée) qui m'ont permis de maîtriser l'écosystème Python (Pandas, NumPy, Seaborn) et les fondamentaux du SQL.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Aujourd'hui, je peaufine mon expertise au sein de <strong className="text-slate-900">DSR School</strong>, où je me forme de manière intensive aux méthodes et outils professionnels.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-surface-light p-8 rounded-sm">
              <h3 className="font-heading text-xl font-semibold text-slate-900 mb-6">Formations & Certifications</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-slate-900">DSR School</div>
                    <div className="text-sm text-slate-500">Formation Data Science intensive</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-slate-900">Dataquest</div>
                    <div className="text-sm text-slate-500">Python, Statistics, Web Scraping</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-slate-900">Udemy</div>
                    <div className="text-sm text-slate-500">Data Science, Visualisation avancée</div>
                  </div>
                </li>
              </ul>
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
      className="py-24 md:py-32 bg-surface-light"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p 
            variants={fadeUp}
            className="text-primary font-mono text-sm tracking-widest uppercase mb-4"
          >
            Expertise
          </motion.p>
          
          <motion.h2 
            variants={fadeUp}
            className="font-heading text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-12"
          >
            Compétences techniques
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.category}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  data-testid={`skill-card-${index}`}
                  className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-slate-900">{skill.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span 
                        key={item}
                        className="font-mono text-xs bg-surface-light text-slate-600 px-3 py-1.5 rounded-full"
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
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p 
            variants={fadeUp}
            className="text-primary font-mono text-sm tracking-widest uppercase mb-4"
          >
            Portfolio
          </motion.p>
          
          <motion.h2 
            variants={fadeUp}
            className="font-heading text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-8"
          >
            Projets sélectionnés
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-light text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.title}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                data-testid={`project-card-${index}`}
                className="group bg-white border border-slate-100 rounded-sm overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="aspect-video overflow-hidden bg-slate-100">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="font-mono text-xs text-primary uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-slate-900 mt-2 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((t) => (
                      <span 
                        key={t}
                        className="font-mono text-xs bg-surface-light text-slate-600 px-2 py-1 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
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
      className="py-24 md:py-32 bg-surface-light"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center"
        >
          <motion.p 
            variants={fadeUp}
            className="text-primary font-mono text-sm tracking-widest uppercase mb-4"
          >
            Contact
          </motion.p>
          
          <motion.h2 
            variants={fadeUp}
            className="font-heading text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6"
          >
            Travaillons ensemble
          </motion.h2>

          <motion.p 
            variants={fadeUp}
            className="text-lg text-slate-600 max-w-xl mx-auto mb-12"
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
                  className="inline-flex items-center gap-3 bg-white border border-slate-200 px-6 py-4 rounded-full font-medium text-slate-700 hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all"
                >
                  <Icon size={20} />
                  {contact.name}
                  {contact.url.startsWith('http') && <ExternalLink size={14} />}
                </a>
              );
            })}
          </motion.div>

          <motion.div 
            variants={fadeUp}
            className="mt-16 p-8 bg-white rounded-sm max-w-md mx-auto"
          >
            <p className="text-slate-600 mb-2">Email direct</p>
            <a 
              href="mailto:endayeaime@gmail.com"
              className="font-heading text-xl text-primary hover:underline"
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
      className="bg-slate-900 text-white py-8"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <p className="text-slate-400">
          © {new Date().getFullYear()} ENDAYE Aimé - Portfolio Data Science
        </p>
      </div>
    </footer>
  );
}

// Main App
function App() {
  return (
    <div className="min-h-screen">
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
