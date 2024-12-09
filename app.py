from flask import Flask, request, jsonify, send_file, render_template, redirect, url_for
from pymongo import MongoClient
from bson import ObjectId
import pandas as pd
from io import BytesIO
import xlsxwriter
import pdfkit
from io import StringIO

#IMPORTS PDF INICIO
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from reportlab.lib import colors
from io import BytesIO

from reportlab.pdfgen import canvas
from reportlab.lib.units import inch

from reportlab.platypus import Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet



app = Flask(__name__)

client = MongoClient('mongodb+srv://ivan:tuliogaymer077@cluster0.bkahq7u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client.tecnologico

profesores = db['profesores']
asignaturas = db['asignaturas']
asignaturasE = db['asignaturasE']

grupos = ["NG","1101", "1102", "1151", "1152", "1181", "1201", "1202", "1251", "1252", 
          "1281", "1301", "1302", "1351", "1352", "1381", "1401", "1402", "1451", 
          "1452", "1481", "1501", "1502", "1551", "1552", "1581", "1601", "1602", 
          "1651", "1652", "1681", "1751", "1752", "1781", "1851", "1852", "1881", 
          "1951", "1952", "1981"]

horarios = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", 
            "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", 
            "21:00"]

# Rutas CRUD para profesores
@app.route('/profesores', methods=['POST'])
def add_profesor():
    data = request.json
    profesores.insert_one(data)
    return jsonify({'msg': 'Profesor añadido'}), 201

@app.route('/Add_Profesor')
def add_profesor2():
    return render_template('Add_Profesor.html')

@app.route('/profesores/<id>', methods=['GET'])
def get_profesor(id):
    profesor = profesores.find_one({'_id': ObjectId(id)})
    profesor['_id'] = str(profesor['_id'])
    return jsonify(profesor)

@app.route('/profesores/<id>', methods=['PUT'])
def update_profesor(id):
    data = request.json
    profesores.update_one({'_id': ObjectId(id)}, {'$set': data})
    return jsonify({'msg': 'Profesor actualizado'})

@app.route('/edit-profesor/<id>', methods=['GET'])
def edit_profesor(id):
    profesor = profesores.find_one({'_id': ObjectId(id)})
    profesor['_id'] = str(profesor['_id'])
    return render_template('edit_profesor.html', profesor=profesor, grupos=grupos, horarios=horarios)

@app.route('/profesores/<id>', methods=['DELETE'])
def delete_profesor(id):
    profesores.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': 'Profesor eliminado'})

@app.route('/profesores', methods=['GET'])
def get_all_profesores():
    all_profesores = list(profesores.find({}).sort("nombre", 1))
    for profesor in all_profesores:
        profesor['_id'] = str(profesor['_id'])
    return render_template('profesores.html', profesores=all_profesores)

# Rutas CRUD para asignaturas
@app.route('/asignaturas', methods=['POST'])
def add_asignatura():
    data = request.json
    asignaturas.insert_one(data)
    return jsonify({'msg': 'Asignatura añadida'}), 201

@app.route('/asignaturas/<id>', methods=['GET'])
def get_asignatura(id):
    asignatura = asignaturas.find_one({'_id': ObjectId(id)})
    asignatura['_id'] = str(asignatura['_id'])
    return jsonify(asignatura)

@app.route('/asignaturas/<id>', methods=['PUT'])
def update_asignatura(id):
    data = request.json
    nombre = data.get('nombre')
    horas = data.get('horas')

    if nombre and isinstance(horas, int):
        result = asignaturas.update_one(
            {'_id': ObjectId(id)},
            {'$set': {'nombre': nombre, 'horas': horas}}
        )

        if result.modified_count > 0:
            return jsonify({"msg": "Asignatura actualizada"}), 200
        else:
            return jsonify({"msg": "No se pudo actualizar la asignatura"}), 400
    else:
        return jsonify({"msg": "Datos inválidos"}), 400

@app.route('/edit-asignatura/<id>', methods=['GET'])
def edit_asignatura(id):
    asignatura = asignaturas.find_one({'_id': ObjectId(id)})
    asignatura['_id'] = str(asignatura['_id'])
    return render_template('edit_asignatura.html', asignatura=asignatura)

@app.route('/asignaturas/<id>', methods=['DELETE'])
def delete_asignatura(id):
    asignaturas.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': 'Asignatura eliminada'})

@app.route('/asignaturas/json', methods=['GET'])
def get_all_asignaturas_json():
    all_asignaturas = list(asignaturas.find({}))
    for asignatura in all_asignaturas:
        asignatura['_id'] = str(asignatura['_id'])
    return jsonify(all_asignaturas)

# Ruta para obtener todas las asignaturas y renderizar el template
@app.route('/asignaturas', methods=['GET'])
def get_all_asignaturas():
    all_asignaturas = list(asignaturas.find({}).sort("nombre", 1))
    for asignatura in all_asignaturas:
        asignatura['_id'] = str(asignatura['_id'])
    return render_template('asignaturas.html', asignaturas=all_asignaturas)

# Rutas CRUD para asignaturas especiales
@app.route('/asignaturasE', methods=['POST'])
def add_asignaturaE():
    data = request.json
    asignaturasE.insert_one(data)
    return jsonify({'msg': 'Asignatura Especial añadida'}), 201

@app.route('/asignaturasE/<id>', methods=['GET'])
def get_asignaturaE(id):
    asignaturaE = asignaturasE.find_one({'_id': ObjectId(id)})
    asignaturaE['_id'] = str(asignaturaE['_id'])
    return jsonify(asignaturaE)

@app.route('/asignaturasE/<id>', methods=['PUT'])
def update_asignaturaE(id):
    data = request.json
    nombre = data.get('nombre')
    horas = data.get('horas')

    if nombre and isinstance(horas, int):
        result = asignaturasE.update_one(
            {'_id': ObjectId(id)},
            {'$set': {'nombre': nombre, 'horas': horas}}
        )

        if result.modified_count > 0:
            return jsonify({"msg": "Asignatura Especial actualizada"}), 200
        else:
            return jsonify({"msg": "No se pudo actualizar la Asignatura Especial"}), 400
    else:
        return jsonify({"msg": "Datos inválidos"}), 400

@app.route('/edit-asignaturaE/<id>', methods=['GET'])
def edit_asignaturaE(id):
    asignaturaE = asignaturasE.find_one({'_id': ObjectId(id)})
    asignaturaE['_id'] = str(asignaturaE['_id'])
    return render_template('edit_asignaturaE.html', asignaturaE=asignaturaE)

@app.route('/asignaturasE/<id>', methods=['DELETE'])
def delete_asignaturaE(id):
    asignaturasE.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': 'Asignatura Especial eliminada'})

@app.route('/asignaturasE/json', methods=['GET'])
def get_all_asignaturasE_json():
    all_asignaturasE = list(asignaturasE.find({}))
    for asignaturaE in all_asignaturasE:
        asignaturaE['_id'] = str(asignaturaE['_id'])
    return jsonify(all_asignaturasE)

# Ruta para obtener todas las asignaturas y renderizar el template
@app.route('/asignaturasE', methods=['GET'])
def get_all_asignaturasE():
    all_asignaturasE = list(asignaturasE.find({}).sort("nombre", 1))
    for asignaturaE in all_asignaturasE:
        asignaturaE['_id'] = str(asignaturaE['_id'])
    return render_template('asignaturasE.html', asignaturasE=all_asignaturasE)

# Generar Excel
@app.route('/export', methods=['POST'])
def export_data():
    data = request.json
    selected_columns = data['columns'].split(',')
    collection_name = data['collection']
    export_format = data.get('format', 'xlsx')
    collection = db[collection_name]

    cursor = collection.find({})
    df = pd.DataFrame(list(cursor))

    # Reemplazar valores NaN e Inf en el DataFrame antes de exportarlo
    df = df.replace([float('inf'), -float('inf')], 0).fillna('')

    # Verificar si hay datos en el DataFrame
    if df.empty:
        return {"message": "No hay datos para exportar"}, 400

    # Mapeos de nombres de columnas
    profesores_column_mapping = {
        "Nombre": "nombre",
        "Profesion": "profesion",
        "Adscripción": "adscripcion",
        "Fecha de ingreso": "fecha_ingreso",
        "Tiempo determinado": "tiempo_determinado",
        "Periodo actual": "periodo_actual",
        "Horas A": "horas_a",
        "Horas B": "horas_b",
        "Total de Horas": "total_horas",
    }

    column_mapping = profesores_column_mapping if collection_name == 'profesores' else {}

    # Filtrar las columnas seleccionadas y mapear a nombres internos
    selected_columns_db = [column_mapping[col] for col in selected_columns if col in column_mapping]

    # Verificar columnas dinámicas para asignación de horas
    for i in range(1, 9):
        for field in [f'asignatura{i}', f'grupo{i}', f'horas{i}']:
            if field not in df.columns:
                df[field] = None  # Agregar columna vacía si no existe

    output = BytesIO()

    if export_format == 'xlsx':
        # Exportar a formato XLSX
        with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
            workbook = writer.book
            worksheet = workbook.add_worksheet('Sheet1')
            format_header = workbook.add_format({'bold': True, 'align': 'center', 'bg_color': '#f4cccc'})
            format_centered = workbook.add_format({'align': 'center'})

            # Definir encabezados
            headers = [col for col in selected_columns if col in profesores_column_mapping]
            if 'asignacion_horas_frente_grupo' in selected_columns:
                headers.append('Asignación de Horas Frente a Grupo')
            worksheet.write_row('A1', headers, format_header)

            # Combinar celdas para 'Asignación de Horas Frente a Grupo' si está seleccionado
            if 'asignacion_horas_frente_grupo' in selected_columns:
                worksheet.merge_range('K1:S1', 'Asignación de Horas Frente a Grupo', format_header)

            # Escribir datos
            row_num = 1
            for index, row in df.iterrows():
                col_num = 0
                for col in headers:
                    if col in profesores_column_mapping:
                        db_col = profesores_column_mapping[col]
                        if db_col in row:
                            worksheet.write(row_num, col_num, row[db_col])
                    col_num += 1

                if 'asignacion_horas_frente_grupo' in selected_columns:
                    asignaciones_headers = ['Asignatura', 'Grupo', 'Horas', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
                    worksheet.write_row(row_num, col_num, asignaciones_headers, format_header)

                    for i in range(1, 9):
                        asignatura = row.get(f'asignatura{i}', '')
                        grupo = row.get(f'grupo{i}', '')
                        horas = row.get(f'horas{i}', 0) if row.get(f'horas{i}') else 0

                        if asignatura or grupo or horas:
                            worksheet.write_string(row_num + i, col_num, asignatura)
                            worksheet.write_string(row_num + i, col_num + 1, grupo)
                            worksheet.write_number(row_num + i, col_num + 2, float(horas))
                            worksheet.write_string(row_num + i, col_num + 3, f"{row.get(f'hora_inicio{i}1', '')} {row.get(f'hora_fin{i}1', '')}")
                            worksheet.write_string(row_num + i, col_num + 4, f"{row.get(f'hora_inicio{i}2', '')} {row.get(f'hora_fin{i}2', '')}")
                            worksheet.write_string(row_num + i, col_num + 5, f"{row.get(f'hora_inicio{i}3', '')} {row.get(f'hora_fin{i}3', '')}")
                            worksheet.write_string(row_num + i, col_num + 6, f"{row.get(f'hora_inicio{i}4', '')} {row.get(f'hora_fin{i}4', '')}")
                            worksheet.write_string(row_num + i, col_num + 7, f"{row.get(f'hora_inicio{i}5', '')} {row.get(f'hora_fin{i}5', '')}")
                            worksheet.write_string(row_num + i, col_num + 8, f"{row.get(f'hora_inicio{i}6', '')} {row.get(f'hora_fin{i}6', '')}")

                    worksheet.write_string(row_num + 9, col_num + 1, "Total:")
                    worksheet.write_number(row_num + 9, col_num + 2, float(row.get('total_horas_grupo', 0)) if row.get('total_horas_grupo') else 0)

                row_num += 10  # Avanzar 10 filas para el próximo profesor

        output.seek(0)
        return send_file(
            output,
            as_attachment=True,
            download_name=f"{collection_name}.xlsx",
            mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        )

    elif export_format == 'csv':
        # Exportar a formato CSV, incluyendo las asignaciones de horas
        csv_output = StringIO()
        if 'asignacion_horas_frente_grupo' in selected_columns:
            # Agregar columnas dinámicas para la asignación de horas
            for i in range(1, 9):
                df[f'Asignatura {i}'] = df[f'asignatura{i}']
                df[f'Grupo {i}'] = df[f'grupo{i}']
                df[f'Horas {i}'] = df[f'horas{i}']

        df.to_csv(csv_output, index=False, encoding='utf-8-sig')
        csv_output.seek(0)
        return send_file(
            csv_output,
            as_attachment=True,
            download_name=f"{collection_name}.csv",
            mimetype='text/csv',
        )

    return {"message": "Formato no soportado"}, 400




# COLUMNAS DE LAS TABLAS
@app.route('/columns/<collection_name>', methods=['GET'])
def get_columns(collection_name):
    if collection_name == 'profesores':
        columns = [
            "Nombre",
            "Profesion",
            "Adscripción",
            "Fecha de ingreso",
            "Tiempo determinado",
            "Periodo actual",
            "Horas A",
            "Horas B",
            "Total de Horas",
            "Cargo"
        ]
    elif collection_name == 'asignaturas':
        columns = [
            # Añade las columnas de la colección 'asignaturas' aquí
            "Nombre",  # Ejemplo
            "Horas",  # Ejemplo
            # Agrega más columnas según corresponda
        ]
    else:
        return jsonify({"error": "Colección no encontrada"}), 404

    return jsonify(columns)


@app.route('/index')
def index():
    return render_template('index.html')

# Ruta para la página principal
@app.route('/')
def principal():
    return render_template('principal.html')


# RECEMOS
@app.route('/reporte/<id_profesor>', methods=['GET'])
def reporte(id_profesor):
    profesor = profesores.find_one({'_id': ObjectId(id_profesor)})  # Obtén los datos
    rendered = render_template('exportar.html', profesor=profesor)  # Renderiza la vista
    pdf = pdfkit.from_string(rendered, False)  # Convierte a PDF

    response = make_response(pdf)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = f'inline; filename=reporte_{id_profesor}.pdf'
    return response

#RUTA PDF INICIO

@app.route('/profesores/pdf', methods=['GET'])
def generate_pdf_template():
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter

    # Encabezado
    c.setFont("Helvetica-Bold", 16)
    c.drawString(1 * inch, height - 1 * inch, "Reporte de Profesor")

    # Asignación de Academia (Tabla 1)
    table1_data = [["Asignatura", "Grupo", "Horas", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]]
    table1 = Table(table1_data, colWidths=[1.2 * inch] * 9)
    table1.setStyle(TableStyle([
        ('GRID', (0, 0), (-1, -1), 1, 'black'),
        ('BACKGROUND', (0, 0), (-1, 0), '#D3D3D3'),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ]))
    table1.wrapOn(c, width, height)
    table1.drawOn(c, 1 * inch, height - 2 * inch)

    # Asignación de Horas Frente a Grupo (Tabla 2)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(1 * inch, height - 4.5 * inch, "Asignación de Horas Frente a Grupo")
    table2_data = [["Actividad", "Horas"]]
    table2 = Table(table2_data, colWidths=[4 * inch, 1.5 * inch])
    table2.setStyle(TableStyle([
        ('GRID', (0, 0), (-1, -1), 1, 'black'),
        ('BACKGROUND', (0, 0), (-1, 0), '#D3D3D3'),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ]))
    table2.wrapOn(c, width, height)
    table2.drawOn(c, 1 * inch, height - 5 * inch)

    # Asignación de Horas de Descarga para Otras Actividades (Tabla 3)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(1 * inch, height - 6.5 * inch, "Asignación de Horas de Descarga para Otras Actividades")
    table3_data = [["Actividad", "Horas"]]
    table3 = Table(table3_data, colWidths=[4 * inch, 1.5 * inch])
    table3.setStyle(TableStyle([
        ('GRID', (0, 0), (-1, -1), 1, 'black'),
        ('BACKGROUND', (0, 0), (-1, 0), '#D3D3D3'),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ]))
    table3.wrapOn(c, width, height)
    table3.drawOn(c, 1 * inch, height - 7 * inch)

    # Asignación de Horas de Presidente y Secretario de Academia (Tabla 4)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(1 * inch, height - 8.5 * inch, "Asignación de Horas de Presidente y Secretario de Academia")
    table4_data = [["Rol", "Horas"]]
    table4 = Table(table4_data, colWidths=[4 * inch, 1.5 * inch])
    table4.setStyle(TableStyle([
        ('GRID', (0, 0), (-1, -1), 1, 'black'),
        ('BACKGROUND', (0, 0), (-1, 0), '#D3D3D3'),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ]))
    table4.wrapOn(c, width, height)
    table4.drawOn(c, 1 * inch, height - 9 * inch)

    c.save()
    buffer.seek(0)

    return send_file(buffer, as_attachment=False, mimetype='application/pdf')

#RUTA PDF FIN

if __name__ == '__main__':
    app.run(debug=True)
