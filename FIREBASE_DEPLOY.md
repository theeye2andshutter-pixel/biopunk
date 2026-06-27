# 🚀 DESPLIEGUE CON FIREBASE - GUÍA PASO A PASO

## ✨ Lo Bueno: TODO en Firebase

- ✅ Frontend + Backend en el mismo proyecto
- ✅ No necesitas Render.com, Railway, etc.
- ✅ Chat en vivo funcional
- ✅ Gratis hasta cierto uso

---

## 📋 PREREQUISITOS

1. **Tener Firebase CLI instalado**
   ```bash
   npm install -g firebase-tools
   ```
   
2. **Tener cuenta en Firebase** (https://firebase.google.com)

3. **Proyecto Firebase creado** (ya existe: `biopunk-2099`)

---

## 🔑 PASO 1: Configurar la API Key de OpenAI

### En tu terminal:
```bash
firebase functions:config:set openai.key="sk-proj-XC0uN2hTkKLYpzA2DehaYFVdIY1Mmljd_CgILm3dfoo8cda6ctq8RZg5X8ISwBnvABs6TsyxptT3BlbkFJ4TcLXLwa5GcsTi459KmmVrrqXPfBE6AhElwSQrhIUA17ZG-lQKfyyQM_52-jZvxZo-wruN7xQAPORT"
```

**Espera a que diga:**
```
✓ Functions config updated successfully
```

Esto guarda la clave de forma segura en Firebase (no en el código).

---

## 🔐 PASO 2: Verificar Autenticación

```bash
firebase login
```

Si ya estás logueado, solo presiona Enter. Si no:
1. Se abrirá el navegador
2. Autoriza a Firebase CLI
3. Vuelve a la terminal

---

## 📦 PASO 3: Compilar el Frontend

```bash
cd app
npm run build
cd ..
```

Deberías ver un carpeta `app/dist` con los archivos compilados.

---

## 🚀 PASO 4: DESPLEGAR TODO

Este comando despliega:
- ✅ Frontend (en hosting)
- ✅ Backend (en Cloud Functions)
- ✅ Configuración de CORS

```bash
firebase deploy
```

**Espera a ver:**
```
✓ Deploy complete!

Project Console: https://console.firebase.google.com/project/biopunk-2099/overview
Hosting URL: https://biopunk-2099.web.app
```

---

## ✅ LISTO

Tu web está en vivo con chat IA integrado:
- **Frontend**: https://biopunk-2099.web.app
- **Backend**: https://us-central1-biopunk-2099.cloudfunctions.net/neuralChat
- **Ambos conectados automáticamente**

---

## 🧪 TESTEAR

1. Abre https://biopunk-2099.web.app
2. Ve a "CHAT CLANDESTINO EN VIVO"
3. Escribe: `¿Dónde puedo esconderme de BIOMODS?`
4. Presiona Enter
5. Espera respuesta de IA (3-5 segundos)

---

## 📊 Ver Logs

### Logs del Backend (Cloud Functions):
```bash
firebase functions:log
```

O en:
https://console.firebase.google.com/project/biopunk-2099/functions/logs

### Logs del Frontend:
Abre la web → F12 → Console

---

## 🔧 DEVELOPMENT LOCAL

Si quieres desarrollar localmente antes de desplegar:

```bash
# Terminal 1: Emular Firebase
firebase emulators:start --only functions,hosting

# Terminal 2: Frontend dev
cd app
npm run dev
```

Accede a http://localhost:5000

---

## 💰 COSTOS

- **Hosting**: Gratis (hasta 10GB/mes)
- **Cloud Functions**: Gratis (hasta 2M de invocaciones/mes)
- **OpenAI API**: ~$0.15 por millón de tokens
  - Ejemplo: 100 usuarios × 10 mensajes = ~$0.15/mes

**Total**: Prácticamente GRATIS hasta escalar

---

## ⚠️ Si Algo Falla

### Error: "Cannot read OPENAI_API_KEY"
```bash
firebase functions:config:get
```
Si está vacío, vuelve al PASO 1 y configura la clave.

### Error: "Deployment failed"
```bash
firebase deploy --debug
```
Verás errores detallados.

### Error: "Chat no responde"
1. Abre F12 → Console
2. Busca errores
3. Si dice "403 Forbidden", la API key es inválida
4. Vuelve a PASO 1 con una clave nueva

### Error: "Functions not updating"
```bash
firebase functions:delete neuralChat
firebase deploy
```

---

## 📱 Resumen Rápido

**Una sola línea que hace TODO:**

```bash
firebase deploy
```

Eso es. Tu web + IA chat estará en vivo.

---

## 🎯 Estado Final

```
✅ Frontend: https://biopunk-2099.web.app
✅ Backend: Cloud Functions activado
✅ Chat IA: Funcionando
✅ Costos: Mínimos
✅ Mantenimiento: Cero
```

¿Dudas? Ver DEPLOYMENT.md para más opciones.

