# 🚀 GUÍA DE DESPLIEGUE - H.A.T.E.R_S BIOPUNK 2099

## Frontend (Ya desplegado ✅)
**URL:** https://biopunk-2099.web.app

## Backend (Debe desplegarse manualmente)

### Opción 1: Desplegar a Render.com (Recomendado)

#### Pasos:
1. **Ir a** [render.com](https://render.com)
2. **Conectar tu repo de GitHub**
3. **Crear nuevo Web Service**
4. **Configurar:**
   - **Name**: `haters-neural-server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `server`

5. **Agregar variable de entorno:**
   - **Key**: `OPENAI_API_KEY`
   - **Value**: Tu clave de OpenAI (sk-proj-XC0uN...)

6. **Deploy**
7. **Copiar la URL del servidor** (ej: `https://haters-neural-server.onrender.com`)
8. **Actualizar** `app/.env`:
   ```
   VITE_API_URL=https://haters-neural-server.onrender.com
   ```
9. **Recompiler y desplegar frontend:**
   ```bash
   cd app
   npm run build
   firebase deploy --only hosting
   ```

---

### Opción 2: Desplegar a Railway.app

1. **Ir a** [railway.app](https://railway.app)
2. **Conectar GitHub**
3. **Crear proyecto desde repo**
4. **Configurar variables de entorno** en Railway Dashboard
5. **Deploy automático**

---

### Opción 3: Desplegar local (Desarrollo)

```bash
# Terminal 1: Backend
cd server
npm install
npm start
# Corre en http://localhost:5000

# Terminal 2: Frontend (ya compilado, se sirve desde Firebase)
# O para desarrollo local:
cd app
npm run dev
# Acceso a http://localhost:5173
```

---

## ¿Cómo funciona el chat en vivo?

1. **Usuario entra a la web** → https://biopunk-2099.web.app
2. **Escribe mensaje en el chat** del foro
3. **Frontend envía a** `{API_URL}/api/chat` con:
   - `userMessage`: lo que escribió
   - `userAlias`: su alias (ej: NERVIO_CUSCO_2099)
4. **Backend (OpenAI) responde** como SISTEMA_NODO o H.A.T.E.R_S
5. **Respuesta aparece en el chat** con sonidos de glitch

---

## Troubleshooting

### Error: "Cannot connect to neural server"
- **Problema**: El frontend no puede alcanzar el backend
- **Solución**: Verificar que `VITE_API_URL` en `app/.env` apunta a la URL correcta del servidor desplegado
- **Verificar**: Ir a `{API_URL}/health` en el navegador

### Error: "Invalid OpenAI API Key"
- **Problema**: La clave de OpenAI es inválida o expiró
- **Solución**: Actualizar `OPENAI_API_KEY` en el servidor (Render/Railway Dashboard)

### Error: "CORS blocked request"
- **Problema**: El frontend y backend tienen orígenes diferentes
- **Verificar**: El servidor tiene `cors()` habilitado en `server/server.js`
- **Solución**: Asegurar que ambas URLs están correctamente configuradas

---

## Monitoreo

### Ver logs del servidor:
- **Render**: Dashboard → Logs
- **Railway**: Dashboard → Logs
- **Local**: Terminal donde está corriendo `npm start`

### Ver errores del frontend:
- **Console**: F12 → Console tab
- **Network**: F12 → Network tab para ver llamadas a `/api/chat`

---

## Seguridad

⚠️ **IMPORTANTE**: 
- **NUNCA** commitear `.env` con la clave de OpenAI a GitHub
- Usar `.env.example` como template
- Las variables de entorno deben configurarse en el dashboard del hosting

---

## Costos

- **Firebase Hosting**: Gratis (~10GB/mes)
- **OpenAI API**: Pago por uso (~$0.15 por 1M tokens con gpt-4o-mini)
- **Render/Railway**: ~$7-10/mes para servidor básico

