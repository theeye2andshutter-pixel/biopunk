# 🔴 NODO NEURAL CLANDESTINO - SERVIDOR IA

Backend que ejecuta el sistema de IA para el chat del foro "LA NUEVA CARNE" en Cusco 2099.

## Setup

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Crea un archivo `.env` en la raíz del servidor con:
```
OPENAI_API_KEY=tu_clave_openai_aqui
PORT=5000
```

**Nota:** La clave de API ya está en el `.env` provided. Asegúrate de que sea válida y tenga créditos disponibles.

### 3. Iniciar el servidor
```bash
npm start
```

O en modo desarrollo (recarga automática):
```bash
npm run dev
```

El servidor estará activo en `http://localhost:5000`

## API Endpoints

### POST `/api/chat`
Envía un mensaje y recibe una respuesta del nodo neural.

**Request:**
```json
{
  "userMessage": "¿Dónde me puedo esconder de BIOMODS?",
  "userAlias": "NERVIO_CUSCO_2099"
}
```

**Response:**
```json
{
  "reply": "> Huye a PTLLCT, NERVIO_CUSCO_2099. El micelio negro te ocultará."
}
```

### GET `/health`
Verifica que el servidor esté activo.

**Response:**
```json
{
  "status": "Nodo activo"
}
```

## Notas

- El modelo usado es `gpt-4o-mini` (rápido y económico)
- Las respuestas están limitadas a 100 tokens
- El prompt del sistema contiene todo el lore de Cusco 2099
- Las respuestas siempre empiezan con `>`

## Troubleshooting

**Error: "OPENAI_API_KEY not found"**
- Asegúrate que `.env` existe en la raíz del servidor
- Verifica que la variable `OPENAI_API_KEY` está configurada correctamente

**Error: "Cannot connect to http://localhost:5000"**
- El frontend intenta conectar al servidor en `http://localhost:5000`
- Asegúrate de ejecutar el servidor antes de acceder al chat
- Verifica que el puerto 5000 no esté siendo usado por otro proceso

**Error: "Invalid API Key"**
- La clave de OpenAI puede haber expirado
- Verifica que tengas créditos disponibles en tu cuenta de OpenAI
- Genera una nueva clave si es necesario
