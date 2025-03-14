from flask import Flask
from routes.industrial_routes import industrial_bp, export_data_auto as export_industrial
from routes.sistemas_routes import sistemas_bp, export_data_auto as export_sistemas
from routes.informatica_routes import informatica_bp, export_data_auto as export_informatica
from routes.electronica_routes import electronica_bp, export_data_auto as export_electronica
from routes.electromecanica_routes import electromecanica_bp, export_data_auto as export_electromecanica
from routes.administracion_routes import administracion_bp, export_data_auto as export_administracion
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
#INDUSTRIAL
scheduler.add_job(export_industrial, 'cron', month=5, day=30, hour=12, minute=0)  # 30 de Mayo
scheduler.add_job(export_industrial, 'cron', month=10, day=29, hour=12, minute=0) # 29 de octubre
#SISTEMAS COMPUTACIONALES
scheduler.add_job(export_sistemas, 'cron', month=5, day=30, hour=12, minute=0)  # 30 de Mayo
scheduler.add_job(export_sistemas, 'cron', month=10, day=29, hour=12, minute=0) # 29 de octubre
#INFORMATICA
scheduler.add_job(export_informatica, 'cron', month=5, day=30, hour=12, minute=0)  # 30 de Mayo
scheduler.add_job(export_informatica, 'cron', month=10, day=29, hour=12, minute=0) # 29 de octubre
#ELECTRONICA
scheduler.add_job(export_electronica, 'cron', month=5, day=30, hour=12, minute=0)  # 30 de Mayo
scheduler.add_job(export_electronica, 'cron', month=10, day=29, hour=12, minute=0) # 29 de octubre
#ELECTROMECANICA
scheduler.add_job(export_electromecanica, 'cron', month=5, day=30, hour=12, minute=0)  # 30 de Mayo
scheduler.add_job(export_electromecanica, 'cron', month=10, day=29, hour=12, minute=0) # 29 de octubre
#ADMINISTRACION
scheduler.add_job(export_administracion, 'cron', month=5, day=30, hour=12, minute=0)  # 30 de Mayo
scheduler.add_job(export_administracion, 'cron', month=10, day=29, hour=12, minute=0) # 29 de octubre


# **📌 Iniciar el planificador SOLO si no está corriendo**
if not scheduler.running:
    scheduler.start()

# **📌 Detener el programador cuando la aplicación finaliza**
atexit.register(lambda: scheduler.shutdown())

# **📌 Ejecutar la aplicación**
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8050, debug=False)
