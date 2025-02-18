// EXPORTACIÓN EXCEL - PDF
document.getElementById('load-professors').addEventListener('click', function() {
    fetch('/administracion/administracion_profesores/json')  // Ruta actualizada a Administración
        .then(response => response.json())
        .then(profesores => {
            const containers = [
                document.getElementById('professor-list-container'),
                document.getElementById('professor-list-container-pdf')
            ];

            containers.forEach(container => {
                container.innerHTML = ''; // Limpiar la lista existente

                profesores.forEach(profesor => {
                    const div = document.createElement('div');
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = 'profesor_ids';
                    checkbox.value = profesor._id;

                    const label = document.createElement('label');
                    label.textContent = profesor.nombre;

                    div.appendChild(checkbox);
                    div.appendChild(label);
                    container.appendChild(div);
                });
            });
        });
});

// Seleccionar todos los profesores en ambos formularios
document.getElementById('select-all').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll("input[name='profesor_ids']");
    checkboxes.forEach(checkbox => checkbox.checked = true);
});

// Función para mostrar mensajes emergentes
function mostrarMensaje(texto, esError = false) {
    let mensaje = document.getElementById("mensaje");
    mensaje.textContent = texto;
    mensaje.style.display = "block";
    mensaje.style.backgroundColor = esError ? "red" : "lightgreen";
    mensaje.style.color = "white";

    setTimeout(() => { mensaje.style.display = "none"; }, 3000);
}

// Manejo de la actualización de imágenes
document.getElementById('uploadImagesForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    let formData = new FormData(this);

    fetch('/administracion/administracion_upload-images', {  // Ruta actualizada
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            mostrarMensaje(data.msg);
        })
        .catch(error => {
            mostrarMensaje("Error en la actualización de imágenes", true);
        });
});

// Manejo de la actualización de texto
document.getElementById('updateTextForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    let formData = new FormData(this);

    fetch('/administracion/administracion_update-text', {  // Ruta actualizada
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            mostrarMensaje(data.msg, data.msg.includes("Error"));
        })
        .catch(error => {
            mostrarMensaje("Error en la actualización del texto", true);
        });
});

// Manejo de la actualización de texto secundario
document.getElementById('updateTextFormDos').addEventListener('submit', function(event) {
    event.preventDefault(); 

    let formData = new FormData(this);

    fetch('/administracion/administracion_update-text-a54', {  // Ruta actualizada
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            mostrarMensaje(data.msg, data.msg.includes("Error"));
        })
        .catch(error => {
            mostrarMensaje("Error en la actualización del texto", true);
        });
});

// EXPORTACIÓN EXCEL - PDF
document.getElementById('export-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const collection = document.getElementById('collection').value;
    const columns = Array.from(document.querySelectorAll('input[name="columns"]:checked'))
        .map(checkbox => checkbox.value)
        .join(',');

    const data = {
        collection: collection,
        columns: columns
    };

    fetch('/administracion/administracion_export', {  // 🔹 Ruta actualizada para Administración
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${collection}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        });
});

// EXPORTACIÓN DE EXCEL - Carga de Columnas
document.getElementById('collection').addEventListener('change', function() {
    const collection = this.value;
    fetch(`/administracion/administracion_columns/${collection}`) // 🔹 Ruta actualizada para Administración
        .then(response => response.json())
        .then(columns => {
            const container = document.getElementById('columns-container');
            container.innerHTML = ''; 

            columns.forEach(column => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = column;
                checkbox.name = 'columns';
                checkbox.value = column;

                const label = document.createElement('label');
                label.htmlFor = column;
                label.textContent = column;

                container.appendChild(checkbox);
                container.appendChild(label);
                container.appendChild(document.createElement('br'));
            });

            // Añadir opción especial para "Asignación de Horas Frente a Grupo"
            if (collection == 'profesores') {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = 'asignacion_horas_frente_grupo';
                checkbox.name = 'columns';
                checkbox.value = 'asignacion_horas_frente_grupo';

                const label = document.createElement('label');
                label.htmlFor = 'asignacion_horas_frente_grupo';
                label.textContent = 'Asignación de Horas Frente a Grupo';

                const checkbox2 = document.createElement('input');
                checkbox2.type = 'checkbox';
                checkbox2.id = 'asignacion_horas_descarga_otras_actividades';
                checkbox2.name = 'columns';
                checkbox2.value = 'asignacion_horas_descarga_otras_actividades';

                const label2 = document.createElement('label');
                label2.htmlFor = 'asignacion_horas_descarga_otras_actividades';
                label2.textContent = 'Asignación de Horas de Descarga para otras Actividades';

                container.appendChild(checkbox);
                container.appendChild(label);
                container.appendChild(document.createElement('br'));

                container.appendChild(checkbox2);
                container.appendChild(label2);
                container.appendChild(document.createElement('br'));
            }
        });
});

// EXPORTACIÓN FINAL DE ARCHIVO
document.getElementById('export-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const collection = document.getElementById('collection').value;
    const format = document.getElementById('export-format').value;
    const columns = Array.from(document.querySelectorAll('input[name="columns"]:checked')).map(cb => cb.value);

    fetch('/administracion/administracion_export', {  // 🔹 Ruta actualizada para Administración
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ collection, columns: columns.join(',') }),
        })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${collection}.${format}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error:', error));
});