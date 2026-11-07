# Portafolio de Julio Bonifacio para Dokploy (tipo de build "Dockerfile", puerto 80)

# 1) Compila el sitio: Next genera HTML estático en /app/out
FROM node:24-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
# Sin auditoría ni avisos de financiamiento (llamadas de red que sobran al compilar),
# con reintentos y menos conexiones a la vez: aguanta mejor redes que cortan conexiones
RUN npm ci --no-audit --no-fund --fetch-retries=5 --fetch-timeout=60000 --maxsockets=6

COPY . .
# Dominio público (canonical, sitemap, tarjetas para redes). En Dokploy: Build-time Arguments,
# o déjalo en .env.production
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
RUN npm run build

# 2) Lo sirve Nginx (línea estable 1.30, recibe los parches de seguridad)
FROM nginx:1.30-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
