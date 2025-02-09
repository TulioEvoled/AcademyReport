from flask import Flask
from routes.industrial_routes import industrial_bp

app = Flask(__name__)

# Registrar Blueprints para cada carrera
app.register_blueprint(industrial_bp)

# Ejecutar la aplicación
if __name__ == '__main__':
    app.run(debug=True)
