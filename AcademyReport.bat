@echo off
cd /d %~dp0

:: Activar el entorno virtual
echo 📌 Activando entorno virtual...
call .venv\Scripts\activate

:: Abrir el navegador después de 3 segundos
echo 🌍 Abriendo navegador en http://127.0.0.1:5000/ ...
start "" http://127.0.0.1:5000/

:: Iniciar el servidor Flask
echo 🚀 Iniciando servidor Flask...
python app.py

:: Mantener la ventana abierta hasta que el usuario cierre manualmente
echo 🛑 Presiona cualquier tecla para cerrar...
pause

