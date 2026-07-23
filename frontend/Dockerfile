# Étape 1 : Construction de l'application
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Étape 2 : Image de production
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Copier les fichiers générés par le build et les dépendances
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

# Exposer le port par défaut de Next.js
EXPOSE 3000
# Commande de démarrage
CMD ["npm", "run", "start"]
