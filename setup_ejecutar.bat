@echo off
cd /d %~dp0

:: Crear y activar el entorno virtual
if not exist .venv (
    echo 📌 Creando entorno virtual...
    python -m venv .venv
)

echo 📌 Activando entorno virtual...
call .venv\Scripts\activate

:: Instalar dependencias del proyecto
echo 📌 Instalando dependencias...
pip install --upgrade pip
pip install -r requirements.txt

:: Abrir el navegador después de 3 segundos
echo 🌍 Abriendo navegador en http://127.0.0.1:5000/ ...
start "" http://127.0.0.1:5000/

:: Iniciar el servidor Flask
echo 📌 Iniciando servidor Flask...
python app.py

pause
