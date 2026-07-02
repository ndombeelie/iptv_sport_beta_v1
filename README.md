# README — Guide d'installation (FR

Ce guide explique comment configurer et lancer le projet en local, exécuter les migrations et préparer un build pour la production.

## Prérequis
- Node.js (v18+ recommandé)
- pnpm (version indiquée dans package.json : pnpm@9.x)
- MySQL / MariaDB (ou accès à une instance distante)
- Expo CLI (pour développement mobile) — optionnel pour exécution web/Android/iOS
- (Optionnel) Compte S3 ou storage compatible pour stocker les médias

## Récupération du dépôt
```bash
git clone https://github.com/eliendombe/iptv_sport_beta_v1.git
cd iptv_sport_beta_v1
```

## Installation des dépendances
```bash
pnpm install
```

> Le projet utilise pnpm (packageManager défini dans package.json). Si vous utilisez npm/yarn, adaptez les commandes.

## Configuration des variables d'environnement
Copiez un fichier .env.example (à créer si absent) et remplissez les valeurs nécessaires :
- NODE_ENV=development
- PORT=3000
- DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DB_NAME
- STORAGE_ENDPOINT=...
- STORAGE_ACCESS_KEY=...
- STORAGE_SECRET_KEY=...
- JWT_SECRET=...
- COOKIE_NAME=...
- OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET (si OAuth)

Exemple minimal `.env.local` :
```
DATABASE_URL="mysql://root:password@127.0.0.1:3306/iptv_db"
PORT=3000
NODE_ENV=development
```

## Développement local (serveur + app Metro)
Le projet a deux processus en parallèle — le serveur API et Metro pour Expo :

```bash
pnpm run dev
```

Ce script exécute en parallèle :
- pnpm run dev:server — démarre le serveur Express (tsx watch server/_core/index.ts)
- pnpm run dev:metro — démarre Metro / Expo pour l'app (port 8081)

Accès utiles :
- API health : http://localhost:3000/api/health
- tRPC : http://localhost:3000/api/trpc (endpoint tRPC)
- Expo : interface Metro (http://localhost:8081)

### Notes pour le serveur
- Le serveur start automatiquement sur PORT (ou cherche un port disponible si celui-ci est occupé) — voir server/_core/index.ts.
- CORS : le serveur reflète l'origine pour autoriser les requêtes cross‑origin en dev (attention en production).

## Base de données & migrations
Le projet utilise Drizzle + drizzle-kit.

Générer les fichiers de migration / exécuter les migrations :
```bash
pnpm run db:push
```

(Inspectez drizzle.config.ts pour la configuration de connexion et le dossier des migrations.)

Si vous préférez exécuter manuellement :
- Créer la base (mysql / client)
- Lancer les migrations générées par drizzle‑kit

## Build & Production
1. Générer le bundle serveur :
```bash
pnpm run build
```

(Le bundle est généré dans `dist/` — script `build` utilise esbuild sur server/_core/index.ts)

2. Lancer en production :
```bash
NODE_ENV=production node dist/index.js
```

ou via un process manager / container Docker.

### Docker (exemple minimal)
Créer un Dockerfile léger pour le serveur et une image distincte pour l'app si nécessaire. Assurez-vous d'exécuter les migrations au démarrage ou via pipeline CI.

## Intégration front → back (exemples)
1) tRPC client (extrait — à adapter dans app/):
```ts
// client/trpc.ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../server/routers';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/trpc',
      fetch: fetch,
    }),
  ],
});
```

Utilisation dans React (exemple fonctionnel):
```ts
const { data } = await trpc.system.getSomething.query();
```

2) Axios (pour upload direct ou endpoints REST):
```ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // si cookies utilisés
});

await api.post('/auth/login', { email, password });
```

3) Drizzle (exemple de connexion serveur)
```ts
// server/db.ts (exemple)
import { connect } from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from '../drizzle/schema';

const conn = await connect({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export const db = drizzle(conn, { schema });
```

## Checklist avant mise en production
- [ ] Variables d'environnement en place (secrets, DB, storage)
- [ ] Migrations exécutées sur la base de production (drizzle-kit)
- [ ] HTTPS activé (certificats)
- [ ] CORS limité aux origines nécessaires
- [ ] Rotation & stockage sécurisé des secrets
- [ ] Logs centralisés et monitoring configurés
- [ ] Sauvegardes DB automatiques et restauration testée
- [ ] Tests unitaires et E2E passés dans CI
- [ ] Politique de rate limiting sur endpoints sensibles
- [ ] Scan de vulnérabilités des dépendances
- [ ] Audit des endpoints d'upload (validation, size limits)

## Dépannage / debugging rapide
- Vérifier `PORT` et conflits (server/_core/index.ts détecte port occupé)
- Logs serveur : console par défaut — configurer pino/winston pour production
- Problèmes de DB : vérifier `DATABASE_URL` et accès réseau au serveur MySQL
- Storage : tester via outils S3 (s3cmd / aws cli) les clés et endpoint

## Ressources utiles dans le dépôt
- server/_core/index.ts — point d'entrée serveur
- server/routers.ts — définition du AppRouter tRPC
- drizzle.config.ts & dossier drizzle/ — configuration des migrations
- package.json — scripts utiles (dev, build, db:push, android/ios, qr)

---

Si vous voulez, je peux :
- Générer ces fichiers directement dans le dépôt (PR),
- Ajouter un `.env.example` complet basé sur les variables détectées,
- Rédiger un exemple Dockerfile et fichier GitHub Actions pour CI/CD.
