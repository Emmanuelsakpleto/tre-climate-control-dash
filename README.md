# TRE Climate Control Dashboard

Un tableau de bord moderne pour le contrôle et la surveillance des systèmes climatiques.

## Fonctionnalités

- **Surveillance en temps réel** : Affichage des statuts système, température, humidité et pression
- **Contrôle intelligent** : Panneau de contrôle avec modes automatique et manuel
- **Alertes de fuite** : Système d'alerte pour détecter les fuites dans le système
- **Graphiques de performance** : Visualisation des données de performance avec graphiques interactifs
- **Historique des événements** : Table d'historique pour suivre les événements système

## Installation

Clonez le repository et installez les dépendances :

```bash
git clone https://github.com/Emmanuelsakpleto/tre-climate-control-dash.git
cd tre-climate-control-dash
npm install
```

## Développement

Pour lancer le serveur de développement :

```bash
npm run dev
```

L'application sera disponible à l'adresse `http://localhost:5173`.

## Technologies utilisées

Ce projet utilise les technologies suivantes :

- **Vite** : Outil de build rapide pour le développement
- **TypeScript** : Langage de programmation typé
- **React** : Bibliothèque JavaScript pour les interfaces utilisateur
- **shadcn/ui** : Composants UI modernes et accessibles
- **Tailwind CSS** : Framework CSS utilitaire
- **React Query** : Gestion d'état et cache pour les requêtes
- **Recharts** : Bibliothèque de graphiques pour React

## Structure du projet

```
src/
├── components/        # Composants réutilisables
│   ├── ui/           # Composants UI de base
│   ├── Dashboard.jsx # Composant principal du tableau de bord
│   ├── StatusCard.jsx # Cartes de statut
│   ├── LeakAlert.jsx # Alertes de fuite
│   └── ...
├── data/             # Données mockées
├── hooks/            # Hooks React personnalisés
├── lib/              # Utilitaires
└── pages/            # Pages de l'application
```

## Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile l'application pour la production
- `npm run preview` : Prévisualise la version de production
- `npm run lint` : Vérifie le code avec ESLint

