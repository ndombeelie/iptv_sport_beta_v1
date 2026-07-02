# Documentation générale

Ce document central regroupe la vision, les conventions et les guides rapides pour contribuer, développer et maintenir le projet.

## Objectif du projet
Application mobile pour consommation IPTV (flux vidéo) avec backend pour gestion des utilisateurs, des flux, des métadonnées et du stockage des médias. L'architecture est orientée mobile-first avec une API tRPC/Express et une base MySQL gérée via Drizzle.

## Arborescence importante (extraits)
- app/ — code client Expo (screens, navigation, hooks, composants)
- server/ — API et code serveur (bootstrap, routers, stockage, db)
  - server/_core/index.ts — point d'entrée Express / tRPC
  - server/routers.ts — composition des routers tRPC
  - server/db.ts — initialisation Drizzle / MySQL
  - server/storage.ts — proxy stockage
- drizzle/ — définitions de schema & migrations (drizzle-kit)
- shared/ — constantes et types partagés
- scripts/ — utilitaires (ex: génération QR)

## Conventions de code
- TypeScript strict (tsconfig.json)
- Validation de schémas côté serveur avec zod
- Usage de React Query pour gestion du cache côté client
- Privilégier fonctions pures et petits composants réutilisables
- Tests unitaires avec Vitest

## Environnement et variables d'environnement (suggestions)
Variables courantes (adapter à votre configuration) :
- NODE_ENV=development|production
- PORT=3000
- DATABASE_URL=mysql://user:pass@host:port/dbname
- STORAGE_ENDPOINT (S3), STORAGE_ACCESS_KEY, STORAGE_SECRET_KEY
- JWT_SECRET / OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET
- COOKIE_SECRET / COOKIE_NAME

Documenter précisément les variables réelles dans un fichier .env.example.

## Tests
- Lancer la suite : pnpm test
- Type checking : pnpm run check
- Lint / format : pnpm run lint / pnpm run format
- Intégration DB : prévoir une base de test séparée ou fixtures

## Workflow de contribution
1. Fork → branche feature/xxxx
2. Tests unitaires et linters verts
3. PR avec description, changelog, et checklist
4. Revue, CI vert, merge via squash/merge

## Bonnes pratiques sécurité
- Ne pas committer de secrets (utiliser .env, vault)
- Toujours forcer HTTPS en production
- Taux limit sur endpoints sensibles
- Stocker tokens d'auth dans cookies HttpOnly + Secure si utilisé côté web
- Paramétrer CORS pour limiter les origines autorisées

## Surveillance & SLA
- Endpoint health (`/api/health`) pour checks
- Logs structurés (JSON) et export vers un service central
- Backup DB quotidien, tests de restauration réguliers

## Points d'intégration
- Où est le router principal ? → server/routers.ts
- Comment lancer le back en local ? → pnpm run dev:server (voir README.md)
- Où définir les migrations ? → drizzle/ et commandes `drizzle-kit`

