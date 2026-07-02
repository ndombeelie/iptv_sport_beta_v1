# Architecture — Résumé technique

Ce document décrit l'architecture applicative de l'application IPTV (front mobile Expo + API Node/Express + persistance).

## Vue d'ensemble
Application mobile (Expo / React Native) — UI et logique client — communique avec une API REST / tRPC hébergée sur un serveur Node/Express. La persistance est assurée par Drizzle ORM couplé à MySQL (mysql2). Le stockage d'objets (médias, vignettes) est déporté vers un service de type S3 ou proxy de stockage. L'authentification peut reposer sur des tokens (JWT / cookies sécurisés) et des routes OAuth dédiées.

Composants principaux
- Front (app/) : Expo / React Native, navigation Expo Router, hooks et composants UI.
- API (server/_core) : Express + tRPC, routes système, OAuth, proxy stockage.
- DB (drizzle / drizzle.config.ts) : Drizzle ORM, migrations via drizzle-kit.
- Stockage (server/storage.ts + stockage distant) : proxy stockage pour uploads/streams.
- Partage (shared/) : constantes, schémas type partagés entre client et serveur.

## Diagramme de haut niveau (flux)
Client (Expo app)
  → /api/trpc  (tRPC over HTTP on Express)
    → Routers (server/routers.ts, systemRouter, auth)
      → Requêtes métiers → DB (Drizzle → MySQL)
      → Appels stockage → Storage Proxy → S3-compatible
      → OAuth flows → Provider externe

(Dev) Metro bundler sert l'app mobile en local; le back Node s'exécute séparément (scripts `dev:server` et `dev:metro` dans package.json).

## Composants & responsabilités
- app/: UI + logique client : React Query, trpc client, axios pour appels non‑trpc, screens, hooks.
- server/_core/index.ts: bootstrap Express, CORS, point d'entrée tRPC (/api/trpc), enregistrement routes OAuth et proxy stockage.
- server/routers.ts: composition des routers tRPC (system, auth, etc.).
- server/db.ts: initialisation connexion DB (Drizzle + mysql2) — points d'extension pour transactions.
- server/storage.ts: logique d'accès / proxy vers stockage d'objets.
- drizzle/: défininitions de schémas / migrations (drizzle-kit).
- shared/: constantes partagées (ex: COOKIE_NAME), types et helpers réutilisables.

## Dépendances notables
- TypeScript
- Expo / React Native
- Express
- @trpc/server / @trpc/client / @trpc/react-query
- drizzle-orm / drizzle-kit
- mysql2
- react-query (TanStack)
- zod (validation)

## Schéma de déploiement recommandé
- Backend: Node (process manager comme PM2 ou container Docker) derrière un reverse proxy (NGINX) assurant HTTPS et routage vers /api/*
- DB: MariaDB/MySQL managé avec sauvegardes et réplication si nécessaire
- Stockage: S3-compatible (AWS S3, DigitalOcean Spaces, MinIO)
- CI/CD: pipeline build/test → migrations DB → déploiement
- Monitoring: logs centralisés, health checks (/api/health), alerting

## Points d'intégration
- Tous les endpoints API démarrent par `/api/` (important pour gateway / proxy).
- tRPC expose un routeur `appRouter` (server/routers.ts) : `system`, `auth`, etc.
- Le code fournit des helpers pour cookies de session (server/_core/cookies).
- Le serveur expose `/api/health` pour vérification simple.
