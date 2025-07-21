from flask import Blueprint, request, render_template, redirect, url_for, session, flash, jsonify, render_template_string
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from bson import ObjectId

# Crear Blueprint de autenticación
auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

# Conexión a MongoDB
client = MongoClient("Link con Cluster de MongoBD")
db = client.tecnologico
administrativos = db['administrativos']

# Decorador para requerir autenticación
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'usuario' not in session:
            return redirect(url_for('auth.login_form'))
        return f(*args, **kwargs)
    return wrap

# Decorador para requerir permisos de superadministrador
def root_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if session.get('usuario') != 'root':  # Ahora verificamos por usuario, no por cargo
            return jsonify({"error": "Acceso denegado"}), 403
        return f(*args, **kwargs)
    return wrap

# Middleware dinámico para verificar si el usuario tiene permiso de acceso a su carrera
def login_required(carrera):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if 'usuario' not in session:
                return redirect(url_for('auth.login'))
            elif session['usuario'] != "root" and session['usuario'].lower() != carrera.lower():
                return redirect(url_for('auth.login_form')), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# Ruta para mostrar el formulario de login
@auth_bp.route('/login', methods=['GET'])
def login_form():
    return render_template('auth/login.html')

# Mapeo de carreras a cargos administrativos
cargo_mapping = {
    "INDUSTRIAL": ["JEFA DE DIVISIÓN DE ING. INDUSTRIAL", "JEFE DE DIVISIÓN DE ING. INDUSTRIAL"],
    "ELECTRÓNICA": ["JEFA DE DIVISIÓN DE ING. ELECTRÓNICA", "JEFE DE DIVISIÓN DE ING. ELECTRÓNICA"],
    "ELECTROMECÁNICA": ["JEFA DE DIVISIÓN DE ING. ELECTROMECÁNICA", "JEFE DE DIVISIÓN DE ING. ELECTROMECÁNICA"],
    "SISTEMAS COMPUTACIONALES": ["JEFA DE DIVISIÓN DE ING. EN SISTEMAS COMPUTACIONALES", "JEFE DE DIVISIÓN DE ING. EN SISTEMAS COMPUTACIONALES"],
    "INFORMÁTICA": ["JEFA DE DIVISIÓN DE ING. INFORMÁTICA", "JEFE DE DIVISIÓN DE ING. INFORMÁTICA"],
    "ADMINISTRACIÓN": ["JEFA DE DIVISIÓN DE ING. ADMINISTRACIÓN", "JEFE DE DIVISIÓN DE ING. ADMINISTRACIÓN"],
    "DIRECCIÓN": ["DIRECTOR GENERAL", "DIRECTORA GENERAL", "ENCARGADA DEL DESPACHO DE DIRECCIÓN ACADÉMICA", "ENCARGADO DEL DESPACHO DE DIRECCIÓN ACADÉMICA", "DIRECTOR ACADÉMICO", "DIRECTORA ACADÉMICA"]
}

# **📌 Redirección por usuario**
user_redirects = {
    "Sistemas": "sistemas.principal",
    "Industrial": "industrial.principal",
    "Administracion": "administracion.principal",
    "Electronica": "electronica.principal",
    "Electromecanica": "electromecanica.principal",
    "Informatica": "informatica.principal",
    "root": "auth.admin_dashboard"
}

# **📌 Ruta para procesar el login**
@auth_bp.route('/login', methods=['POST'])
def login():
    usuario = request.form.get('usuario')
    contraseña = request.form.get('contraseña')

    user = administrativos.find_one({'usuario': usuario})

    if user and check_password_hash(user['contraseña'], contraseña):
        session['usuario'] = usuario
        session['cargo'] = user['cargo']

        return jsonify({"success": True, "redirect_url": url_for(user_redirects.get(usuario, 'auth.login_form'))})

    # 📌 Si las credenciales son incorrectas, enviar error con código 401
    return jsonify({"success": False, "error": "Usuario o contraseña incorrectos."}), 401


# **📌 Ruta para cerrar sesión**
@auth_bp.route('/logout')
def logout():
    session.clear()
    flash("Sesión cerrada correctamente", "success")
    return redirect(url_for('auth.login_form'))

# ------------------- ADMINISTRACIÓN DE USUARIOS (Solo Root) -------------------

@auth_bp.route('/admin_dashboard')
@root_required
def admin_dashboard():
    users = list(administrativos.find({}, {"_id": 1, "nombre": 1, "usuario": 1, "cargo": 1}))
    return render_template('auth/admin_dashboard.html', users=users, cargo_mapping = cargo_mapping)

# **📌 Agregar Usuario**
@auth_bp.route('/add_user', methods=['POST'])
@root_required
def add_user():
    nombre = request.form.get('nombre')
    usuario = request.form.get('usuario')
    contraseña = generate_password_hash(request.form.get('contraseña'))
    cargo = request.form.get('cargo')

    if administrativos.find_one({'usuario': usuario}):
        flash("Usuario ya existe", "error")
        return redirect(url_for('auth.admin_dashboard'))

    administrativos.insert_one({"nombre": nombre, "usuario": usuario, "contraseña": contraseña, "cargo": cargo})
    flash("Usuario agregado exitosamente", "success")
    return redirect(url_for('auth.admin_dashboard'))

# **📌 Editar Usuario**
@auth_bp.route('/edit_user/<usuario>', methods=['POST'])
@root_required
def edit_user(usuario):
    nuevo_nombre = request.form.get('nombre')
    nuevo_cargo = request.form.get('cargo')
    nueva_contraseña = request.form.get('contraseña')

    update_data = {"nombre": nuevo_nombre, "cargo": nuevo_cargo}

    if nueva_contraseña:
        update_data["contraseña"] = generate_password_hash(nueva_contraseña)

    administrativos.update_one({"usuario": usuario}, {"$set": update_data})

    flash("Usuario actualizado correctamente", "success")
    return jsonify({"msg": "Usuario actualizado correctamente"}), 200

# **📌 Eliminar Usuario**
@auth_bp.route('/delete_user/<usuario>', methods=['POST'])
@root_required
def delete_user(usuario):
    if usuario == "root":
        flash("No puedes eliminar al superadministrador", "error")
        return redirect(url_for('auth.admin_dashboard'))

    administrativos.delete_one({"usuario": usuario})
    flash("Usuario eliminado", "success")
    return redirect(url_for('auth.admin_dashboard'))
