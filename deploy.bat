@echo off
REM 🚀 Script de despliegue automatizado para Firebase (Windows)
REM Uso: deploy.bat

echo.
echo 🔴 DEPLOYING H.A.T.E.R_S BIOPUNK 2099 TO FIREBASE 🔴
echo.

REM Verificar Firebase CLI
where firebase >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Firebase CLI no encontrado
    echo Instala con: npm install -g firebase-tools
    exit /b 1
)

REM PASO 1: Compilar frontend
echo.
echo 🔨 Paso 1/3: Compilando frontend...
cd app
call npm run build
cd ..
echo ✅ Frontend compilado

REM PASO 2: Verificar configuración
echo.
echo 🔑 Paso 2/3: Verificando configuración de OpenAI...
firebase functions:config:get > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  API Key de OpenAI no configurada
    echo Por favor, ejecuta primero:
    echo firebase functions:config:set openai.key="sk-proj-..."
    exit /b 1
)
echo ✅ API Key configurada

REM PASO 3: Desplegar
echo.
echo 🚀 Paso 3/3: Desplegando a Firebase...
call firebase deploy

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║          ✅ DESPLIEGUE COMPLETADO EXITOSAMENTE       ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo Frontend:  https://biopunk-2099.web.app
echo Backend:   https://us-central1-biopunk-2099.cloudfunctions.net
echo.
echo 🧪 Testear en: https://biopunk-2099.web.app
echo.
echo 📊 Ver logs: firebase functions:log
echo.
pause
