#!/bin/bash

# 🚀 Script de despliegue automatizado para Firebase
# Uso: ./deploy.sh

set -e  # Salir si hay error

echo "🔴 DEPLOYING H.A.T.E.R_S BIOPUNK 2099 TO FIREBASE 🔴"
echo ""

# Verificar que Firebase CLI está instalado
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI no encontrado"
    echo "Instala con: npm install -g firebase-tools"
    exit 1
fi

# Verificar autenticación
echo "📡 Verificando autenticación con Firebase..."
firebase list > /dev/null 2>&1 || {
    echo "⚠️  No autenticado. Ejecutando: firebase login"
    firebase login
}

# PASO 1: Compilar frontend
echo ""
echo "🔨 Paso 1/3: Compilando frontend..."
cd app
npm run build
cd ..
echo "✅ Frontend compilado"

# PASO 2: Configurar API Key
echo ""
echo "🔑 Paso 2/3: Verificando configuración de OpenAI..."
CONFIG=$(firebase functions:config:get 2>/dev/null | grep openai.key || echo "")
if [ -z "$CONFIG" ]; then
    echo "⚠️  API Key de OpenAI no configurada"
    echo "Por favor, ejecuta primero:"
    echo "firebase functions:config:set openai.key='sk-proj-...'"
    exit 1
fi
echo "✅ API Key configurada"

# PASO 3: Desplegar
echo ""
echo "🚀 Paso 3/3: Desplegando a Firebase..."
firebase deploy

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║          ✅ DESPLIEGUE COMPLETADO EXITOSAMENTE       ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "Frontend:  https://biopunk-2099.web.app"
echo "Backend:   https://us-central1-biopunk-2099.cloudfunctions.net"
echo ""
echo "🧪 Testear en: https://biopunk-2099.web.app"
echo ""
echo "📊 Ver logs: firebase functions:log"
echo ""
