# Mon Portfolio

Ce portfolio est un site web statique conçu pour présenter mes projets aux recruteurs. Il est construit avec HTML et CSS, et peut être facilement déployé sur GitHub Pages.

## Structure du projet

```
.
├── index.html           # Page d'accueil
├── styles/             # Dossier des styles CSS
│   ├── main.css        # Styles principaux
│   └── projet.css      # Styles spécifiques aux pages de projets
├── projets/            # Dossier contenant les pages de projets
│   └── projet1.html    # Example de page de projet
└── images/             # Dossier pour les images
```

## Comment ajouter un nouveau projet

1. Créez une nouvelle page HTML dans le dossier `projets/` en copiant le modèle de `projet1.html`
2. Modifiez le contenu pour correspondre à votre projet
3. Ajoutez les captures d'écran dans le dossier `images/`
4. Mettez à jour le lien dans la section projets de `index.html`

## Déploiement sur GitHub Pages

1. Créez un nouveau repository sur GitHub
2. Initialisez Git dans ce dossier :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Liez votre repository local à GitHub :
   ```bash
   git remote add origin https://github.com/votre-username/votre-repo.git
   git branch -M main
   git push -u origin main
   ```
4. Allez dans les paramètres de votre repository sur GitHub
5. Dans la section "Pages", sélectionnez la branche "main" comme source
6. Votre site sera disponible à l'adresse : https://votre-username.github.io/votre-repo/

## Personnalisation

- Modifiez les couleurs dans `styles/main.css` en changeant les variables CSS dans `:root`
- Ajoutez vos informations de contact dans `index.html`
- Personnalisez le design en modifiant les fichiers CSS
- Ajoutez vos propres images et captures d'écran

## Conseils pour un bon portfolio

1. Gardez les descriptions de projets concises et pertinentes
2. Incluez des captures d'écran de qualité
3. Mettez en avant les technologies utilisées
4. Ajoutez des liens vers le code source et les démos en direct
5. Maintenez le contenu à jour
6. Optimisez les images pour le web
7. Testez le site sur différents appareils
