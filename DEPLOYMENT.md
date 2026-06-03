# Deployment (PM2 + nginx)

Este proyecto usa:

- Backend: NestJS + TypeORM + PostgreSQL
- Frontend: Angular
- Process manager: PM2
- Reverse proxy: nginx

## 1. Build de aplicaciones

### Backend

```bash
cd backend
npm install
npm run build
```

### Frontend

```bash
cd frontend
npm install
npm run build
```

El build de Angular queda en `frontend/dist/frontend/browser`.

## 2. PM2 (backend)

Desde la raiz del repo:

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 status
```

## 3. nginx

Copiar `nginx/gestiondeproyectos.conf` al directorio de sitios de nginx (ejemplo en Linux):

```bash
sudo cp nginx/gestiondeproyectos.conf /etc/nginx/sites-available/gestiondeproyectos.conf
sudo ln -s /etc/nginx/sites-available/gestiondeproyectos.conf /etc/nginx/sites-enabled/gestiondeproyectos.conf
```

Verificar que el path `root` apunte al build real del frontend en tu servidor:

`/var/www/gestiondeproyectos/frontend/browser`

Luego:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 4. Variables de entorno backend

Asegurar que el backend tenga definidas:

- `DB_HOST`
- `DB_PORT`
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_SYNCHRONIZE`
- `DB_LOGGING`
- `JWT_SECRET`
- `PORT`

## 5. Verificacion

- Frontend: `http://TU_DOMINIO/`
- API (via nginx): `http://TU_DOMINIO/api/v1/...`
- PM2: `pm2 status`
