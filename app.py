from flask import Flask
from routes.industrial_routes import industrial_bp, export_data_auto as export_industrial
from routes.sistemas_routes import sistemas_bp
from routes.informatica_routes import informatica_bp
from routes.electronica_routes import electronica_bp
from routes.electromecanica_routes import electromecanica_bp
from routes.administracion_routes import administracion_bp
from routes.auth_routes import auth_bp
from apscheduler.schedulers.background import BackgroundScheduler
import atexit

app = Flask(__name__)
app.secret_key = "tu_clave_secreta_super_segura"

# **📌 Registrar Blueprints**
app.register_blueprint(industrial_bp)
app.register_blueprint(sistemas_bp)
app.register_blueprint(informatica_bp)
app.register_blueprint(electronica_bp)
app.register_blueprint(electromecanica_bp)
app.register_blueprint(administracion_bp)
app.register_blueprint(auth_bp)

# **📌 Inicializar el planificador de tareas**
scheduler = BackgroundScheduler()

# **📌 Agregar tareas programadas para cada carrera**
scheduler.add_job(export_industrial, 'cron', month=2, day=26, hour=9, minute=30)
scheduler.add_job(export_industrial, 'cron', month=6, day=10, hour=12, minute=0)  # 10 de junio
scheduler.add_job(export_industrial, 'cron', month=10, day=29, hour=12, minute=0)

# **📌 Iniciar el planificador SOLO si no está corriendo**
if not scheduler.running:
    scheduler.start()

# **📌 Detener el programador cuando la aplicación finaliza**
atexit.register(lambda: scheduler.shutdown())

# **📌 Ejecutar la aplicación**
if __name__ == '__main__':
    app.run(debug=True)
