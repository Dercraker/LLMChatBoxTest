# LLM ChatBox Test

Un projet de chatbot moderne et élégant développé avec Vite, React, TypeScript, Tailwind CSS et Shadcn/ui.

## 🚀 Technologies

- **Vite** - Outil de build ultra-rapide
- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS v4** - Framework CSS utilitaire
- **Shadcn/ui** - Composants UI réutilisables et stylisés

## 📦 Installation

```bash
npm install
```

## 🛠️ Développement

Lancez le serveur de développement :

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## 🏗️ Build

Pour créer une version de production :

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`

## 🧹 Linting

Pour vérifier la qualité du code :

```bash
npm run lint
```

## 📝 Fonctionnalités

- Interface de chat moderne et responsive
- Zone de messages avec distinction visuelle entre utilisateur et bot
- Champ de texte avec textarea redimensionnable
- Envoi de messages par clic ou touche Entrée
- Support de Shift+Entrée pour les nouvelles lignes
- Horodatage des messages
- Défilement automatique vers les nouveaux messages
- Design élégant avec dégradés et animations
- Support du mode sombre (via Tailwind)

## 🎨 Personnalisation

Les composants UI se trouvent dans `src/components/ui/` et peuvent être facilement personnalisés. Les variables de couleur sont définies dans `src/index.css` et peuvent être modifiées selon vos besoins.

## 📂 Structure du projet

```
src/
├── components/
│   ├── ui/           # Composants UI réutilisables (Button, Card, Textarea)
│   └── ChatBot.tsx   # Composant principal du chatbot
├── lib/
│   └── utils.ts      # Fonctions utilitaires (cn pour classNames)
├── App.tsx           # Composant racine
├── main.tsx          # Point d'entrée
└── index.css         # Styles globaux et configuration Tailwind
```

## 📄 Licence

MIT

