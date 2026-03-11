# Synapse — Tumor Board Assistant

Synapse est une POC de hackathon conçue pour accélérer la préparation des RCP oncologiques via une architecture multi-agents.

L’idée centrale : un **Hyper-Agent Tumor Board** orchestre des agents spécialistes par organe, corrèle leurs résultats, puis produit une synthèse exploitable en réunion.

## Objectif produit

- Réduire le temps de préparation d’un dossier en RCP.
- Structurer l’analyse radiologique multi-organes.
- Mettre en évidence les corrélations inter-organes difficiles à détecter manuellement.
- Fournir une synthèse claire : évaluation globale, points de discussion, éléments manquants, conclusion.

## Fonctionnement de l’agent (vision système)

Le système est pensé en **pipeline orchestral** :

1. **Ingestion du contexte patient**
   - Dossier clinique, historique d’imagerie, examens disponibles.

2. **Activation des agents spécialistes**
   - Thorax
   - Foie
   - Ganglions
   - Os

3. **Analyse spécialisée par agent**
   - Extraction des findings.
   - Classification selon standards médicaux (ex. RECIST selon l’organe concerné).
   - Production d’un rapport structuré par sections (indication, technique, résultats, classification, conclusion, limitations).

4. **Vérification et support**
   - Contrôles de cohérence.
   - Détection des données manquantes.
   - Consolidation des niveaux de confiance.

5. **Orchestration Hyper-Agent**
   - Agrège les sorties des spécialistes.
   - Détecte les corrélations inter-organes.
   - Établit une évaluation globale de la situation.

6. **Synthèse Tumor Board**
   - Corrélations cliniquement pertinentes.
   - Points de discussion RCP.
   - Éléments à compléter.
   - Conclusion orientée décision collégiale.

## Deux modes de simulation dans l’application

### 1) Simulation complète Hyper-Agent

Le moteur orchestre tous les spécialistes, affiche leur progression d’exécution, puis présente :

- la corrélation inter-organes,
- la synthèse globale tumor board,
- les rapports détaillés de chaque agent.

### 2) Simulation ciblée sous-agent

Permet de lancer un seul agent (thorax, foie, ganglions, os) pour inspecter son rapport de manière granulaire, avant de remonter vers une synthèse globale.

## Architecture logique

Le design suit une architecture **multi-agents MCP** :

- **Couche orchestrateur** : Hyper-Agent Tumor Board.
- **Couche spécialistes** : agents organes.
- **Couche support** : récupération de contexte, guidelines, vérification qualité.

Principe d’extensibilité : ajouter une spécialité revient à ajouter un nouvel agent spécialisé dans la chaîne d’orchestration.

## Stack technique

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router

## Lancer le projet

### Prérequis

- Node.js 20+
- npm

### Installation

1. Installer les dépendances
   - `npm install`

2. Démarrer en local
   - `npm run dev`

3. Build de production
   - `npm run build`

4. Prévisualiser la build
   - `npm run preview`

## Parcours UX

- **Landing** : positionnement produit, valeur clinique, architecture.
- **Selection** : choix du patient.
- **Orchestration** : exécution agentique (globale ou ciblée), corrélations, synthèse, rapports.

## Positionnement

Synapse est un assistant de préparation RCP centré sur la lisibilité clinique, la coordination multi-spécialités et la rapidité d’analyse, avec un modèle d’orchestration prêt à évoluer vers de nouvelles spécialités.
