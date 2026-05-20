# =========================
# BUILD STAGE
# =========================

FROM node:20-alpine AS build

WORKDIR /app



# =========================
# INSTALL DEPENDENCIES
# =========================

COPY package*.json ./

RUN npm install



# =========================
# COPY PROJECT FILES
# =========================

COPY . .



# =========================
# BUILD REACT FRONTEND
# =========================

RUN npm run build



# =========================
# PRODUCTION RUNTIME
# =========================

FROM node:20-alpine

WORKDIR /app



# =========================
# INSTALL RUNTIME DEPS
# =========================

COPY package*.json ./

RUN npm install --omit=dev



# =========================
# COPY BUILT FRONTEND
# =========================

COPY --from=build /app/dist ./dist



# =========================
# COPY BACKEND
# =========================

COPY server ./server



# =========================
# COPY DATA
# =========================

COPY server/data ./server/data



# =========================
# ENVIRONMENT
# =========================

ENV PORT=3000



# =========================
# EXPOSE PORT
# =========================

EXPOSE 3000



# =========================
# START EXPRESS SERVER
# =========================

CMD ["node", "server/index.js"]