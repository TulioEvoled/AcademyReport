// EXPORTACIÓN EXCEL - PDF
document.getElementById('load-professors').addEventListener('click', function() {
    fetch('/informatica/informatica_profesores/json')
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

    fetch('/informatica/informatica_upload-images', {
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

    fetch('/informatica/informatica_update-text', {
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

    fetch('/informatica/informatica_update-text-a54', {
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

// EXPORTACION DE DATOS  EN EXCEL
document.getElementById('collection').addEventListener('change', function() {
    const collection = this.value;
    fetch(`/informatica/informatica_columns/${collection}`)
        .then(response => response.json())
        .then(columns => {
            const container = document.getElementById('columns-container');
            container.innerHTML = ''; // Limpiar checkboxes previos

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

            // 🔹 Agregar opciones de exportación de asignaciones si la colección es "profesores"
            if (collection === 'profesores') {
                addSpecialCheckbox(container, 'asignacion_horas_frente_grupo', 'Asignación de Horas Frente a Grupo');
                addSpecialCheckbox(container, 'asignacion_horas_descarga_otras_actividades', 'Asignación de Horas de Descarga para otras Actividades');
                addSpecialCheckbox(container, 'asignacion_horas_cargo_academico', 'Asignación de Horas de Cargo Académico');
            }
        });
});

// Función para agregar opciones especiales de asignaciones
function addSpecialCheckbox(container, id, labelText) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.name = 'columns';
    checkbox.value = id;

    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = labelText;

    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
}

// Manejar la exportación de datos
document.getElementById('export-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const collection = document.getElementById('collection').value;
    const format = document.getElementById('export-format').value;
    const columns = Array.from(document.querySelectorAll('input[name="columns"]:checked')).map(cb => cb.value);

    fetch('/informatica/informatica_export', {
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
