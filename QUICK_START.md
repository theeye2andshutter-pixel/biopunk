# ⚡ QUICK START - DESPLIEGUE EN 5 MINUTOS

## 🚀 El Comando Mágico

**Si usas Linux/Mac:**
```bash
./deploy.sh
```

**Si usas Windows:**
```bash
deploy.bat
```

Eso es. Todo se hace automático.

---

## 📋 Si Prefieres Hacerlo Manual

### 1️⃣ Configurar API Key (1 minuto)

```bash
firebase functions:config:set openai.key="sk-proj-XC0uN2hTkKLYpzA2DehaYFVdIY1Mmljd_CgILm3dfoo8cda6ctq8RZg5X8ISwBnvABs6TsyxptT3BlbkFJ4TcLXLwa5GcsTi459KmmVrrqXPfBE6AhElwSQrhIUA17ZG-lQKfyyQM_52-jZvxZo-wruN7xQAPORT"
```

Verás: `✓ Functions config updated successfully`

### 2️⃣ Compilar (2 minutos)

```bash
cd app && npm run build && cd ..
```

### 3️⃣ Desplegar (2 minutos)

```bash
firebase deploy
```

### 4️⃣ Testear

Abre: https://biopunk-2099.web.app

---

## ✅ Qué Se Despliega

- **Frontend**: React app + todas las secciones
- **Backend**: Cloud Functions para chat con IA
- **Base de datos**: Firestore para messages
- **Storage**: Firebase Storage para imágenes

Todo integrado automáticamente.

---

## 🧪 Verificar que Funciona

1. Entra a https://biopunk-2099.web.app
2. Baja a "CHAT CLANDESTINO EN VIVO"
3. Escribe: `Hola, soy un mutante de Cusco`
4. Presiona Enter
5. Deberías ver respuesta de IA en 3-5 segundos

Si ves respuesta: ✅ **TODO FUNCIONA PERFECTO**

---

## 📊 Ver Logs en Vivo

```bash
firebase functions:log
```

O desde el Dashboard: https://console.firebase.google.com/project/biopunk-2099

---

## 🐛 Si Hay Error

### "Cannot find module 'openai'"
```bash
cd functions && npm install && cd ..
firebase deploy
```

### "Invalid API Key"
Verificar que la clave sea correcta:
```bash
firebase functions:config:get
```

### "Deployment failed"
Ver error detallado:
```bash
firebase deploy --debug
```

---

## 💰 Resumen de Costos

| Servicio | Costo |
|----------|-------|
| Hosting | Gratis |
| Cloud Functions | Gratis* |
| Firestore | Gratis* |
| OpenAI API | ~$0.15/mes |
| **TOTAL** | **Prácticamente Gratis** |

*Hasta límites generosos (2M invocaciones, 1GB datos)

---

## 📚 Documentación Completa

- **FIREBASE_DEPLOY.md** - Instrucciones detalladas
- **DEPLOYMENT.md** - Alternativas (Render, Railway)
- **LOCAL_TEST.md** - Desarrollar localmente

---

## 🎯 Estado Final

```
✅ Web en vivo:          https://biopunk-2099.web.app
✅ Chat IA funcionando:  Respuestas instantáneas
✅ Base de datos:        Firestore sincronizado
✅ Costos:               Mínimos
✅ Mantenimiento:        Automático con Firebase
```

---

**¡Listo! Tu web está en PRODUCCIÓN con chat IA integrado.**

Cualquier duda → Ver FIREBASE_DEPLOY.md

