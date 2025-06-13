import time
import csv
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# --- Configuration du navigateur ---
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36")
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

# --- Fichier CSV de destination ---
csv_file = "canapes_clean.csv"

# --- Liste des URLs d'affiliation à scraper ---
urls = [ 
    "https://amzn.to/3H7ps4V",
    "https://amzn.to/3YVuAzd",
    "https://amzn.to/4k9cNwS",
    "https://amzn.to/3FlGD2g",
    "https://amzn.to/43JPjZq",
    "https://amzn.to/43aZCWk",
    "https://amzn.to/4jnjCdc",
    "https://amzn.to/3FvSsTn",
    "https://amzn.to/3SWYTSt",
    "https://amzn.to/4jj3bP0",
    "https://amzn.to/4joal4D",
    "https://amzn.to/4jhDaiU",
]

# --- Charger les URLs déjà présentes dans le CSV pour éviter les doublons ---
produits_existants = set()
if os.path.exists(csv_file):
    with open(csv_file, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if "Lien d'affiliation" in row:
                produits_existants.add(row["Lien d'affiliation"])

def extract_product_title():
    """Extrait le titre du produit"""
    try:
        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "productTitle"))
        )
        return element.text.strip()
    except (TimeoutException, NoSuchElementException):
        return ""

def extract_main_image():
    """Extrait l'URL de l'image principale"""
    try:
        image = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.ID, "landingImage"))
        )
        return image.get_attribute("src")
    except:
        return ""

def extract_couleur():
    """Extrait la couleur du produit Amazon, en essayant plusieurs méthodes, y compris le titre et la description."""
    couleurs_connues = [
        "noir", "blanc", "gris", "beige", "bleu", "vert", "rouge", "jaune", "marron", "rose",
        "violet", "orange", "turquoise", "crème", "ivoire", "chocolat", "anthracite", "taupe",
        "bordeaux", "camel", "kaki", "argent", "doré", "cuivre", "multicolore"
    ]
    # 1. Méthode principale (variation_color_name)
    try:
        couleur = driver.find_element(By.CSS_SELECTOR, "#variation_color_name .selection")
        if couleur.text.strip():
            return couleur.text.strip()
    except:
        pass
    # 2. Méthode alternative (data-feature-name)
    try:
        couleur = driver.find_element(By.CSS_SELECTOR, "[data-feature-name='color_name'] .selection")
        if couleur.text.strip():
            return couleur.text.strip()
    except:
        pass
    # 3. Méthode alternative (po-color_name)
    try:
        couleur = driver.find_element(By.CSS_SELECTOR, ".po-color_name .po-break-word")
        if couleur.text.strip():
            return couleur.text.strip()
    except:
        pass
    # 4. Chercher la couleur dans le titre
    try:
        titre = extract_product_title().lower()
        for couleur in couleurs_connues:
            if couleur in titre:
                return couleur.capitalize()
    except:
        pass
    # 5. Chercher la couleur dans la description
    try:
        description = ""
        try:
            description = driver.find_element(By.ID, "productDescription").text.lower()
        except:
            # Parfois la description est ailleurs
            description = driver.find_element(By.ID, "feature-bullets").text.lower()
        for couleur in couleurs_connues:
            if couleur in description:
                return couleur.capitalize()
    except:
        pass
    # 6. Dernier recours : parenthèses à la fin du titre
    try:
        titre = extract_product_title()
        import re
        match = re.search(r"\(([^)]+)\)$", titre)
        if match:
            return match.group(1)
    except:
        pass
    # 7. Rien trouvé
    print("⚠️ Couleur non trouvée pour ce produit.")
    return ""

def scrape_amazon_product(url):
    """Scrape un produit Amazon et retourne seulement les 4 colonnes spécifiées"""
    try:
        driver.get(url)
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "productTitle")))
        time.sleep(2)

        # Ne récupérer que les 4 colonnes demandées
        product_data = {
            "Lien d'affiliation": url,
            "Titre de l'article": extract_product_title(),
            "Couleur": extract_couleur(),
            "Image URL": extract_main_image(),
        }

        return product_data
    except Exception as e:
        print(f"Erreur lors du scraping de {url}: {str(e)}")
        return None

# --- Liste des produits à ajouter ---
produits = []

# --- Définir les colonnes fixes (dans l'ordre) ---
colonnes = ["Lien d'affiliation", "Titre de l'article", "Couleur", "Image URL"]

# --- Scraping des nouvelles URLs uniquement ---
for url in urls:
    if url in produits_existants:
        print(f"❌ Déjà présent, ignoré : {url}")
        continue

    try:
        print(f"🔍 Scraping : {url}")
        produit = scrape_amazon_product(url)
        if produit:
            produits.append(produit)
            produits_existants.add(url)
            titre = produit.get("Titre de l'article", "")
            titre_court = titre[:50] if titre else "Titre non trouvé"
            print(f"✅ Ajouté : {titre_court}...")
    except Exception as e:
        print(f"❌ Erreur sur {url} : {e}")

driver.quit()

# --- Enregistrement final dans le fichier CSV ---
if produits:
    write_mode = "a" if os.path.exists(csv_file) else "w"
    with open(csv_file, mode=write_mode, newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=colonnes, quoting=csv.QUOTE_MINIMAL)
        if write_mode == "w":
            writer.writeheader()
        for produit in produits:
            writer.writerow(produit)

print(f"\n✅ Scraping terminé. {len(produits)} produit(s) ajouté(s).")
print(f"📄 Données enregistrées dans : {csv_file}")
print(f"📊 Colonnes : {', '.join(colonnes)}") 