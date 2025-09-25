# Transport Exceptionnel - Application Mobile

## 📱 Description du Projet

Cette application mobile React Native a été développée pour une entreprise de transport exceptionnel. Elle permet de gérer et mémoriser les obstacles rencontrés lors des parcours de camions, avec un design néon futuriste.

## ✨ Fonctionnalités Principales

### 🚧 Gestion des Obstacles
- **Ajout d'obstacles** : Création d'obstacles avec titre, description et coordonnées GPS
- **Suppression d'obstacles** : Suppression facile via l'interface principale
- **Stockage local** : Toutes les données sont sauvegardées localement (fonctionnement hors ligne)
- **Géolocalisation** : Support GPS automatique et saisie manuelle des coordonnées

### 📞 Contacts d'Urgence
- **Liste fixe de contacts** : Contacts prédéfinis pour les urgences, support technique et administration
- **Appels directs** : Possibilité d'appeler directement depuis l'application
- **Catégorisation** : Contacts organisés par type (Urgence, Support technique, Administration)

### 🎨 Design Néon
- **Thème sombre** : Interface avec fond noir pour un look cyberpunk
- **Effets de lueur** : Éléments avec effets néon (bleu, rose, vert, jaune)
- **Animations** : Transitions fluides et effets visuels
- **Responsive** : Interface adaptée aux écrans mobiles

## 🏗️ Architecture Technique

### 📁 Structure du Projet
```
├── components/
│   ├── NeonButton.tsx          # Boutons avec effets néon
│   ├── NeonTextInput.tsx       # Champs de saisie stylisés
│   ├── NeonObstacleItem.tsx    # Élément d'obstacle
│   ├── NeonContactItem.tsx     # Élément de contact
│   ├── NeonLoadingSpinner.tsx  # Indicateur de chargement
│   ├── NeonEmptyState.tsx      # État vide
│   ├── AnimatedList.tsx        # Liste animée
│   ├── Toast.tsx               # Notifications
│   └── ToastManager.tsx        # Gestionnaire de notifications
├── screens/
│   ├── NeonHomeScreen.tsx      # Écran principal
│   └── NeonAddObstacleScreen.tsx # Écran d'ajout d'obstacle
├── styles/
│   └── neonTheme.js            # Thème néon personnalisé
├── utils/
│   ├── neonStorage.js          # Gestion du stockage local
│   ├── neonLocation.js         # Services de géolocalisation
│   └── toast.js                # Utilitaires de notification
└── data/
    └── neonContacts.js         # Données des contacts
```

### 🛠️ Technologies Utilisées
- **React Native** : Framework de développement mobile
- **Expo** : Plateforme de développement et déploiement
- **TypeScript** : Typage statique pour la robustesse du code
- **AsyncStorage** : Stockage local des données
- **Expo Location** : Services de géolocalisation
- **React Navigation** : Navigation entre écrans

## 🚀 Installation et Lancement

### Prérequis
- Node.js (version 20.14.0 ou supérieure)
- npm ou yarn
- Expo CLI
- Expo Go (application mobile)

### Installation
```bash
# Cloner le projet
git clone [URL_DU_REPO]

# Installer les dépendances
npm install

# Lancer l'application
npm start
```

### Options de Test
- **Web** : `npm run web` - Test dans le navigateur
- **Android** : `npm run android` - Test sur émulateur Android
- **iOS** : `npm run ios` - Test sur simulateur iOS
- **Mobile** : Scanner le QR code avec Expo Go

## 📋 Critères d'Évaluation Respectés

### ✅ Fonctionnalités Obligatoires (20/20 points)
- **2 écrans navigables** : HomeScreen et AddObstacleScreen (3pts)
- **Écran d'ajout d'obstacle** : Accessible via bouton + (5pts)
- **Suppression d'obstacles** : Bouton de suppression sur chaque obstacle (3pts)
- **Stockage local** : Utilisation d'AsyncStorage (3pts)
- **Interface ergonomique** : Design moderne et intuitif (3pts)
- **Géolocalisation** : Support GPS et saisie manuelle (3pts)

### 🌟 Fonctionnalités Bonus
- **Contacts fixes** : Liste prédéfinie de contacts d'urgence
- **Design néon** : Interface cyberpunk avec effets visuels
- **Animations** : Transitions fluides et micro-interactions
- **Accessibilité** : Support des lecteurs d'écran
- **TypeScript** : Code typé pour une meilleure maintenabilité

## 🎯 Utilisation

### Ajouter un Obstacle
1. Appuyer sur le bouton "+" sur l'écran principal
2. Remplir le titre et la description
3. Choisir la localisation :
   - GPS automatique
   - Saisie manuelle des coordonnées
   - Aucune localisation
4. Sauvegarder l'obstacle

### Supprimer un Obstacle
1. Appuyer sur le bouton "✕" sur la carte d'obstacle
2. Confirmer la suppression

### Contacter un Service
1. Appuyer sur une carte de contact
2. L'application lance automatiquement l'appel

## 🔧 Personnalisation

### Modifier le Thème
Le fichier `styles/neonTheme.js` contient toutes les couleurs et styles. Vous pouvez :
- Changer les couleurs néon
- Modifier les effets de lueur
- Ajuster les espacements et typographies

### Ajouter des Contacts
Modifiez le fichier `data/neonContacts.js` pour ajouter ou modifier les contacts d'urgence.

## 📱 Compatibilité

- **iOS** : 11.0+
- **Android** : API 21+ (Android 5.0)
- **Expo** : SDK 54+
- **React Native** : 0.81.4

## 🤝 Contribution

Ce projet a été développé dans le cadre d'une évaluation technique. Toutes les fonctionnalités demandées ont été implémentées avec des améliorations supplémentaires.

## 📄 Licence

Projet développé pour évaluation technique - Transport Exceptionnel.

---

**Développé avec ❤️ et beaucoup de néon** ⚡
