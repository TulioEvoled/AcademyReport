from flask import Flask
from routes.industrial_routes import industrial_bp
from routes.sistemas_routes import sistemas_bp
from routes.informatica_routes import informatica_bp
from routes.electronica_routes import electronica_bp
from routes.electromecanica_routes import electromecanica_bp
from routes.administracion_routes import administracion_bp

app = Flask(__name__)

# Registrar Blueprints para cada carrera
app.register_blueprint(industrial_bp)

app.register_blueprint(sistemas_bp)

app.register_blueprint(informatica_bp)

app.register_blueprint(electronica_bp)

app.register_blueprint(electromecanica_bp)

app.register_blueprint(administracion_bp)

# Ejecutar la aplicación
if __name__ == '__main__':
    app.run(debug=True)
