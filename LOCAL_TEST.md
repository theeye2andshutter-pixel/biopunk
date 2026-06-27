# 🧪 TESTEAR EL CHAT EN VIVO LOCALMENTE

## Setup Rápido (5 minutos)

### Terminal 1: Backend
```bash
cd server
npm install
npm start
```
Deberías ver:
```
🔴 Nodo de Red Neural activo en puerto 5000
📡 Sector Cusco 2099 — Zona Sombra: ONLINE
```

### Terminal 2: Frontend
```bash
cd app
# Cambiar app/.env a desarrollo:
# VITE_API_URL=http://localhost:5000

npm run dev
```
Abre: http://localhost:5173

---

## Test Manual del Chat

1. **Entra a** http://localhost:5173
2. **Espera a que cargue** (boot sequence ~10s)
3. **Baja a la sección** "CHAT CLANDESTINO EN VIVO"
4. **Escribe un mensaje**, ej:
   ```
   ¿Dónde puedo esconderme de BIOMODS?
   ```
5. **Presiona Enter**
6. **Espera respuesta** (debe llegar en 3-5 segundos)

### Ejemplos de Mensajes para Probar

| Mensaje | Esperado |
|---------|----------|
| `¿Dónde puedo esconderme de BIOMODS?` | Respuesta sobre PTLLCT o resistencia |
| `Habla sobre el álbum` | Respuesta elevando hype sobre música |
| `¿Qué es la Resina de San Pedro?` | Explicación sobre el lore |
| `Socorro, me persiguen` | Respuesta paranoica |

---

## Test de Prefijos Especiales

Estos comandos especiales NO llaman a OpenAI, usan lógica local:

```
HTRS Mi mensaje aquí
ALC Mi mensaje aquí
BIO Mi mensaje aquí
/CLEAR_LOGS (limpia Firestore)
```

**Ejemplo:**
```
HTRS Vamos a liberar la carne
```

---

## Monitoreo

### Ver logs del backend:
```bash
# Terminal del servidor, deberías ver:
POST /api/chat - 200ms
```

### Ver logs del frontend:
```
F12 → Console → Verifica que no haya errores
F12 → Network → Busca petición a http://localhost:5000/api/chat
```

---

## Troubleshooting

### ❌ "Cannot POST /api/chat"
- [ ] ¿Backend está corriendo? (ver puerto 5000)
- [ ] ¿VITE_API_URL = http://localhost:5000?

### ❌ "Error de sincronización"
- [ ] ¿Tienes OPENAI_API_KEY en server/.env?
- [ ] ¿La clave es válida?
- [ ] ¿Tienes créditos en OpenAI?

### ❌ "CORS error"
- [ ] Backend debe tener `cors()` habilitado (ya está)
- [ ] Verificar que URLs coinciden exactamente

### ❌ Respuesta muy lenta (>10s)
- [ ] OpenAI API puede estar lenta
- [ ] Reintentar en 1 minuto
- [ ] Verificar status de OpenAI: https://status.openai.com

---

## Test de Performance

```bash
# Terminal 1: Backend
cd server && npm start

# Terminal 2: Frontend
cd app && npm run dev

# Terminal 3: Ver requests
curl http://localhost:5000/health
# Respuesta: {"status":"Nodo activo"}
```

---

## Debugging Avanzado

### Ver request/response completo:
```bash
# En Terminal 1 (añadir a server/server.js):
console.log('Request:', req.body);
console.log('Response:', replyText);
```

### Medir latencia:
```javascript
// En browser console:
console.time('neural-chat');
// ... enviar mensaje ...
console.timeEnd('neural-chat');
```

---

## Cuando esté listo para producción:

1. Desplegar backend a Render/Railway
2. Actualizar `app/.env`:
   ```
   VITE_API_URL=https://haters-neural-server.onrender.com
   ```
3. `npm run build && firebase deploy --only hosting`

