# =========================
# BUILD STAGE
# =========================

FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# =========================
# PRODUCTION RUNTIME
# =========================

FROM node:20-alpine

WORKDIR /app


# =========================
# INSTALL SERVER DEPENDENCIES
# =========================

COPY package*.json ./

RUN npm install --omit=dev


# =========================
# COPY SERVER + BUILT FRONTEND
# =========================

COPY --from=build /app/dist ./dist

COPY server ./server

COPY data ./data


# =========================
# ENVIRONMENT
# =========================

ENV PORT=3000


# =========================
# EXPOSE APPLICATION PORT
# =========================

EXPOSE 3000


# =========================
# START SERVER
# =========================

CMD ["node", "server/index.js"]