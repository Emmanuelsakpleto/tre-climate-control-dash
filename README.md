# 🎨 Frontend - Tableau de bord Climatisation Hybride

Interface utilisateur moderne pour le contrôle et la surveillance du système de climatisation hybride.

## 🚀 Démarrage rapide

```bash
# Installation
npm install

# Développement
npm run dev

# Build production
npm run build

# Prévisualisation
npm run preview
```

## 🎯 Fonctionnalités

### 📊 Dashboard principal
- **État système** : Visualisation temps réel
- **Métriques** : Température, pression, débit, etc.
- **Mode actuel** : Solaire, Compression, Hybride, Auto

### 🎛️ Contrôles
- **Basculement modes** : Interface intuitive
- **Confirmation** : Prévention erreurs
- **Actions rapides** : Redémarrage, maintenance

### ⚠️ Alertes
- **Détection fuites** : Notifications temps réel
- **Géolocalisation** : Localisation précise
- **Historique** : Suivi des incidents

### 📈 Performances
- **Graphiques** : Visualisation données
- **Historique** : Tendances temporelles
- **Statistiques** : Analyse performance

## 🏗️ Architecture

```
📦 src/
├── 📂 components/
│   ├── 📄 Dashboard.jsx          # Interface principale
│   ├── 📄 StatusCard.jsx         # Cartes d'état
│   ├── 📄 ControlPanel.jsx       # Panneau de contrôle
│   ├── 📄 LeakAlert.jsx          # Alertes de fuite
│   ├── 📄 PerformanceChart.jsx   # Graphiques
│   ├── 📄 HistoryTable.jsx       # Tableau historique
│   ├── 📄 ConnectionStatus.jsx   # Statut connexion
│   └── 📂 ui/                    # Composants UI de base
├── 📂 hooks/
│   ├── 📄 useClimatisation.js    # Hook principal
│   └── 📄 use-toast.ts           # Notifications
├── 📂 services/
│   └── 📄 climatisationAPI.js    # Client API
├── 📂 data/
│   └── 📄 mockData.js            # Données de test
├── 📂 lib/
│   └── 📄 utils.ts               # Utilitaires
└── 📂 pages/
    ├── 📄 Index.tsx              # Page d'accueil
    └── 📄 NotFound.tsx           # Page 404
```

## 🎨 Technologies

- **⚡ Vite** : Build rapide et moderne
- **⚛️ React** : Bibliothèque UI
- **🎯 TypeScript** : Typage statique
- **🎨 Tailwind CSS** : Framework CSS
- **🧩 shadcn/ui** : Composants UI
- **📊 Recharts** : Graphiques
- **🔗 React Router** : Navigation

## 🔧 Configuration

### 🌐 API Backend
```javascript
// src/services/climatisationAPI.js
const API_BASE_URL = 'http://127.0.0.1:5000/api';
```

### 🎨 Thème
```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        // Couleurs personnalisées
      }
    }
  }
}
```

## 🛠️ Développement

### 📝 Scripts disponibles
- `npm run dev` : Serveur de développement
- `npm run build` : Build production
- `npm run preview` : Prévisualisation build
- `npm run lint` : Vérification code

### 🔄 Hot reload
Le serveur de développement supporte le hot reload pour une expérience fluide.

### 🧪 Tests
```bash
npm test
```

## 📱 Responsive Design

L'interface s'adapte à tous les écrans :
- **📱 Mobile** : Interface tactile optimisée
- **📱 Tablette** : Disposition adaptée
- **💻 Desktop** : Expérience complète

## 🎯 Composants principaux

### 🖥️ Dashboard
```jsx
<Dashboard />
```
Interface principale avec navigation et contenu dynamique.

### 📊 StatusCard
```jsx
<StatusCard status={systemStatus} />
```
Affiche l'état du système avec métriques temps réel.

### 🎛️ ControlPanel
```jsx
<ControlPanel 
  currentMode={mode} 
  onModeChange={handleModeChange} 
/>
```
Contrôles pour basculer entre modes.

### ⚠️ LeakAlert
```jsx
<LeakAlert 
  alerts={alerts} 
  onResolve={handleResolve} 
/>
```
Affichage des alertes de fuite.

## 🔌 Intégration API

### 🌐 Hook personnalisé
```javascript
const { 
  systemStatus, 
  isLoading, 
  error, 
  controlMode 
} = useClimatisation();
```

### 📡 Appels API
```javascript
// Récupérer l'état
const status = await climatisationAPI.getSystemStatus();

// Contrôler le mode
await climatisationAPI.controlMode('Solaire');
```

## 🎨 Personnalisation

### 🎨 Couleurs
```css
/* Mode solaire */
.solaire { @apply text-yellow-700 bg-yellow-50; }

/* Mode compression */
.compression { @apply text-blue-700 bg-blue-50; }

/* Mode hybride */
.hybride { @apply text-purple-700 bg-purple-50; }
```

### 🖼️ Icônes
```jsx
const getModeIcon = (mode) => {
  if (mode.includes('Solaire')) return '☀️';
  if (mode.includes('Compression')) return '❄️';
  if (mode.includes('Hybride')) return '⚡';
  return '🤖';
};
```

## 🚀 Déploiement

### 📦 Build
```bash
npm run build
```

### 🌐 Serveur statique
```bash
npx serve dist
```

### 🐳 Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## 🔧 Maintenance

### 📊 Monitoring
- Performance avec Lighthouse
- Erreurs JavaScript
- Temps de chargement

### 🔄 Mises à jour
```bash
# Dépendances
npm update

# Audit sécurité
npm audit fix
```

## 🤝 Contribution

1. Respecter les conventions de nommage
2. Utiliser TypeScript pour nouveaux composants
3. Tester sur différents navigateurs
4. Optimiser les performances

## 📚 Documentation

- **📖 Storybook** : Composants isolés
- **🎓 Guide style** : Conventions UI
- **🔧 API Frontend** : Hooks et services

---

**🎨 Interface moderne et intuitive pour un contrôle optimal du système de climatisation ! 🎨**

