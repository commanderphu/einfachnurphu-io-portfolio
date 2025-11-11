# ----------------------------------------
# 🧠 Next.js 15 + PNPM Dev Container mit Cache
# Für lokale Entwicklung auf Cisco
# ----------------------------------------
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# User-Mapping für Volume-Rechte
ARG USER_ID=1000
ARG GROUP_ID=1000

# Node User anpassen
RUN deluser --remove-home node && \
    addgroup -g ${GROUP_ID} node && \
    adduser -D -u ${USER_ID} -G node node

# WICHTIG: Erst Rechte setzen, dann als node User arbeiten
RUN chown -R node:node /app

# Ab hier als node User
USER node

# Dependencies kopieren und installieren
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# App-Files kopieren
COPY --chown=node:node . .

# Build-Verzeichnisse erstellen (als node User)
RUN mkdir -p .velite .next public/static

EXPOSE 3000

CMD ["pnpm", "dev"]