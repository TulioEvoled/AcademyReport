// AGREGAR PROFESORES - ELECTROMECÁNICA
document.getElementById('add-profesor-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
        nombre: document.getElementById('nombre').value,
        profesion: document.getElementById('profesion').value,
        adscripcion: document.getElementById('adscripcion').value,
        fecha_ingreso: document.getElementById('fecha_ingreso').value,
        tiempo_indeterminado: document.getElementById('tiempo_indeterminado').value,
        periodo_actual: document.getElementById('periodo_actual').value,
        horas_a: parseInt(document.getElementById('horas_a').value) || 0,
        horas_b: parseInt(document.getElementById('horas_b').value) || 0,
        total_horas: parseInt(document.getElementById('total_horas').value) || 0,
    };

    // Agregar datos de asignaturas y horarios dinámicamente
    for (let i = 1; i <= 8; i++) {
        data[`carrera${i}`] = document.getElementById(`carrera${i}`).value;
        data[`asignatura${i}`] = document.getElementById(`asignatura${i}`).value;
        data[`grupo${i}`] = document.getElementById(`grupo${i}`).value;
        data[`horas${i}`] = document.getElementById(`horas${i}`).value;
        data[`distintivo${i}`] = document.getElementById(`distintivo${i}`) ? document.getElementById(`distintivo${i}`).value : "";

        for (let j = 1; j <= 6; j++) {
            data[`hora_inicio${i}${j}`] = document.getElementById(`hora_inicio${i}${j}`).value;
            data[`hora_fin${i}${j}`] = document.getElementById(`hora_fin${i}${j}`).value;
        }
    }

    // Agregar datos de asignaturas especiales dinámicamente
    for (let i = 1; i <= 8; i++) {
        data[`carreraE${i}`] = document.getElementById(`carreraE${i}`).value;
        data[`asignaturaE${i}`] = document.getElementById(`asignaturaE${i}`).value;
        data[`grupoE${i}`] = document.getElementById(`grupoE${i}`).value;
        data[`horasE${i}`] = document.getElementById(`horasE${i}`).value;

        for (let j = 1; j <= 6; j++) {
            data[`hora_inicioE${i}${j}`] = document.getElementById(`hora_inicioE${i}${j}`).value;
            data[`hora_finE${i}${j}`] = document.getElementById(`hora_finE${i}${j}`).value;
        }
    }

    // Datos del cargo
    data["carreraC"] = document.getElementById('carreraC').value,
    data["cargo"] = document.getElementById("cargo").value;
    data["vigenciaCargo"] = document.getElementById("vigenciaCargo").value;
    data["horasC"] = document.getElementById("horasC").value;

    for (let j = 1; j <= 6; j++) {
        data[`hora_inicioC1${j}`] = document.getElementById(`hora_inicioC1${j}`).value;
        data[`hora_finC1${j}`] = document.getElementById(`hora_finC1${j}`).value;
    }

    fetch('/electromecanica/electromecanica_profesores', {  // Ruta actualizada para Electromecánica
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data => alert(data.msg));
});

// AGREGAR ASIGNATURAS - ELECTROMECÁNICA
document.getElementById('add-asignatura-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
        nombre: document.getElementById('nombre_asignatura').value,
        horas: parseInt(document.getElementById('horas_asignatura').value)
    };

    fetch('/electromecanica/electromecanica_asignaturas', {  // Ruta actualizada para Electromecánica
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(data => alert(data.msg));
});

// AGREGAR ASIGNATURAS ESPECIALES - ELECTROMECÁNICA
document.getElementById('add-asignaturaE-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
        nombre: document.getElementById('nombre_asignaturaE').value,
        horas: parseInt(document.getElementById('horas_asignaturaE').value)
    };

    fetch('/electromecanica/electromecanica_asignaturasE', {  // Ruta actualizada para Electromecánica
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(data => alert(data.msg));
});

// AGREGAR ADMINISTRATIVOS
// document.getElementById('add-administrativo-form').addEventListener('submit', function(e) {
//     e.preventDefault();
//     const data = {
//         nombre: document.getElementById('nombre_administrativo').value,
//         cargo: document.getElementById('cargo_administrativo').value
//     };
//     fetch('/administrativos', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         }).then(response => response.json())
//         .then(data => alert(data.msg));
// });

// AUTOCOMPLETADO
document.addEventListener('DOMContentLoaded', function() {
    // TOTAL DE HORAS GRUPO (para asignaturas)
    const horasInputs = document.querySelectorAll('.form-group input[type="number"]');
    const totalHorasInput = document.getElementById('total_horas_grupo');

    function updateTotalHoras() {
        let totalHoras = 0;
        horasInputs.forEach(input => {
            const value = parseInt(input.value, 10);
            if (!isNaN(value)) {
                totalHoras += value;
            }
        });
        totalHorasInput.value = totalHoras;
    }

    horasInputs.forEach(input => {
        input.addEventListener('input', updateTotalHoras);
    });

    // TOTAL DE HORAS GRUPO (para asignaturas especiales)
    const horasEInputs = document.querySelectorAll('.form-groupE input[type="number"]');
    const totalHorasEInput = document.getElementById('total_horasE_grupo');

    function updateTotalHorasE() {
        let totalHorasE = 0;
        horasEInputs.forEach(input => {
            const value = parseInt(input.value, 10);
            if (!isNaN(value)) {
                totalHorasE += value;
            }
        });
        totalHorasEInput.value = totalHorasE;
    }

    horasEInputs.forEach(input => {
        input.addEventListener('input', updateTotalHorasE);
    });

    // Función genérica para cargar datos y asignar horas desde una tabla específica (asignaturas o asignaturasE)
    function setupAsignatura(asignaturaId, horasId, dataListId, sourceUrl) {
        fetch(sourceUrl) // Recibe la URL de la fuente de datos
            .then(response => response.json())
            .then(asignaturas => {
                const dataList = document.getElementById(dataListId);
                asignaturas.forEach(asignatura => {
                    const option = document.createElement('option');
                    option.value = asignatura.nombre;
                    option.dataset.horas = asignatura.horas;
                    dataList.appendChild(option);
                });
            });

        document.getElementById(asignaturaId).addEventListener('input', function() {
            const selectedAsignatura = this.value;
            const dataList = document.getElementById(dataListId);
            const selectedOption = Array.from(dataList.options).find(option => option.value === selectedAsignatura);
            if (selectedOption) {
                document.getElementById(horasId).value = selectedOption.dataset.horas;
            } else {
                document.getElementById(horasId).value = ' ';
            }
            updateTotalHoras(); // Llamar a updateTotalHoras cuando se actualiza el campo
            updateTotalHorasE();
        });
    }

    // Configurar autocompletado y horas para asignaturas desde la tabla 'asignaturas_electromecanica'
    setupAsignatura('asignatura1', 'horas1', 'asignatura-list1', '/electromecanica/electromecanica_asignaturas/json');
    setupAsignatura('asignatura2', 'horas2', 'asignatura-list2', '/electromecanica/electromecanica_asignaturas/json');
    setupAsignatura('asignatura3', 'horas3', 'asignatura-list3', '/electromecanica/electromecanica_asignaturas/json');
    setupAsignatura('asignatura4', 'horas4', 'asignatura-list4', '/electromecanica/electromecanica_asignaturas/json');
    setupAsignatura('asignatura5', 'horas5', 'asignatura-list5', '/electromecanica/electromecanica_asignaturas/json');
    setupAsignatura('asignatura6', 'horas6', 'asignatura-list6', '/electromecanica/electromecanica_asignaturas/json');
    setupAsignatura('asignatura7', 'horas7', 'asignatura-list7', '/electromecanica/electromecanica_asignaturas/json');
    setupAsignatura('asignatura8', 'horas8', 'asignatura-list8', '/electromecanica/electromecanica_asignaturas/json');

    // Configurar autocompletado y horas para asignaturas desde la tabla 'asignaturasE_electromecanica'
    setupAsignatura('asignaturaE1', 'horasE1', 'asignaturaE-list1', '/electromecanica/electromecanica_asignaturasE/json');
    setupAsignatura('asignaturaE2', 'horasE2', 'asignaturaE-list2', '/electromecanica/electromecanica_asignaturasE/json');
    setupAsignatura('asignaturaE3', 'horasE3', 'asignaturaE-list3', '/electromecanica/electromecanica_asignaturasE/json');
    setupAsignatura('asignaturaE4', 'horasE4', 'asignaturaE-list4', '/electromecanica/electromecanica_asignaturasE/json');
    setupAsignatura('asignaturaE5', 'horasE5', 'asignaturaE-list5', '/electromecanica/electromecanica_asignaturasE/json');
    setupAsignatura('asignaturaE6', 'horasE6', 'asignaturaE-list6', '/electromecanica/electromecanica_asignaturasE/json');
    setupAsignatura('asignaturaE7', 'horasE7', 'asignaturaE-list7', '/electromecanica/electromecanica_asignaturasE/json');
    setupAsignatura('asignaturaE8', 'horasE8', 'asignaturaE-list8', '/electromecanica/electromecanica_asignaturasE/json');

    // ACABA AUTOCOMPLETADO

    // Add event listeners to buttons
    document.querySelectorAll('button[data-url]').forEach(function(button) {
        button.addEventListener('click', function() {
            var url = this.getAttribute('data-url');
            window.location.href = url;
        });
    });
});

function redirectTo(button) {
    const url = button.getAttribute('data-url');
    window.location.href = url;
}

// ELIMINAR PROFESOR - ELECTROMECÁNICA
function deleteProfesor(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este profesor?')) {
        fetch(`/electromecanica/electromecanica_profesores/${id}`, {  // Se cambia la ruta a electromecanica_profesores
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                window.location.reload();
            } else {
                alert('Error al eliminar al profesor');
            }
        }).catch(error => {
            alert('Error al intentar eliminar al profesor');
        });
    }
}

// ELIMINAR ASIGNATURA - ELECTROMECÁNICA
function deleteAsignatura(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta asignatura?')) {
        fetch(`/electromecanica/electromecanica_asignaturas/${id}`, {  // Se cambia la ruta a electromecanica_asignaturas
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                window.location.reload();
            } else {
                alert('Error al eliminar la asignatura');
            }
        }).catch(error => {
            alert('Error al intentar eliminar la asignatura');
        });
    }
}

// ELIMINAR ASIGNATURA ESPECIAL - ELECTROMECÁNICA
function deleteAsignaturaE(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta asignatura especial?')) {
        fetch(`/electromecanica/electromecanica_asignaturasE/${id}`, {  // Se cambia la ruta a electromecanica_asignaturasE
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                window.location.reload();
            } else {
                alert('Error al eliminar la asignatura especial');
            }
        }).catch(error => {
            alert('Error al intentar eliminar la asignatura especial');
        });
    }
}

// function deleteAdministrativo(id) {
//     if (confirm('¿Estás seguro de que deseas eliminar este administrativo?')) {
//         fetch(`/administrativos/${id}`, {
//             method: 'DELETE'
//         }).then(response => {
//             if (response.ok) {
//                 window.location.reload();
//             } else {
//                 alert('Error al eliminar el administrativo');
//             }
//         }).catch(error => {
//             alert('Error al intentar eliminar el administrativo');
//         });
//     }
// }

// ACTUALIZAR ASIGNATURA EN ELECTROMECÁNICA
document.addEventListener('DOMContentLoaded', function() {
    const editForm = document.getElementById('edit-form');

    // Manejar la edición de asignatura
    editForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const asignaturaId = document.getElementById('edit-id').value;
        const nombre = document.getElementById('edit-nombre').value;
        const horas = parseInt(document.getElementById('edit-horas').value);

        fetch(`/electromecanica/electromecanica_asignaturas/${asignaturaId}`, {  // Se cambia la ruta a electromecanica_asignaturas
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre: nombre, horas: horas })
            })
            .then(response => response.json())
            .then(data => {
                if (data.msg === 'Asignatura actualizada') {
                    alert('Asignatura actualizada correctamente');
                    window.location.reload();
                } else {
                    alert('Error al actualizar la asignatura');
                }
            });
    });
});

// CALCULAR TOTAL DE HORAS EN ELECTROMECÁNICA
function calcularTotalHoras() {
    let total = 0;
    // Obtener los valores de los campos Horas A y Horas B
    let horasA = document.getElementById('horas_a').value;
    let horasB = document.getElementById('horas_b').value;

    // Convertir los valores a números y calcular la suma
    total = parseFloat(horasA) || 0;
    total += parseFloat(horasB) || 0;

    // Asignar el valor calculado al campo Total de Horas
    document.getElementById('total_horas').value = total;
}

// TRANSFORMAR INPUTS A MAYÚSCULAS AUTOMÁTICAMENTE
function transformarMayusculas() {
    var inputs = document.querySelectorAll('input[type="text"]');

    inputs.forEach(function(input) {
        input.value = input.value.toUpperCase();
    });
}

// JavaScript para mostrar/ocultar el formulario en ELECTROMECÁNICA
document.addEventListener('DOMContentLoaded', function() {
    const toggleProfesorFormButton = document.getElementById('toggle-profesor-form');
    const profesorForm = document.getElementById('add-profesor-form');

    const toggleAsignaturaFormButton = document.getElementById('toggle-asignatura-form');
    const asignaturaForm = document.getElementById('add-asignatura-form');

    const toggleAsignaturaEFormButton = document.getElementById('toggle-asignaturaE-form');
    const asignaturaEForm = document.getElementById('add-asignaturaE-form');

    // Mostrar/ocultar formulario de profesores
    toggleProfesorFormButton.addEventListener('click', function() {
        profesorForm.style.display = (profesorForm.style.display === 'none' || profesorForm.style.display === '') ? 'block' : 'none';
    });

    // Mostrar/ocultar formulario de asignaturas en ELECTROMECÁNICA
    toggleAsignaturaFormButton.addEventListener('click', function() {
        asignaturaForm.style.display = (asignaturaForm.style.display === 'none' || asignaturaForm.style.display === '') ? 'block' : 'none';
    });

    // Mostrar/ocultar formulario de asignaturas especiales en ELECTROMECÁNICA
    toggleAsignaturaEFormButton.addEventListener('click', function() {
        asignaturaEForm.style.display = (asignaturaEForm.style.display === 'none' || asignaturaEForm.style.display === '') ? 'block' : 'none';
    });
});

/// HORARIOS PARA ELECTROMECÁNICA
const horarios = ["", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

// Función para llenar las opciones de cada select y seleccionar el valor existente
function populateSelectOptions(selectElement, options) {
    const selectedValue = selectElement.value || selectElement.getAttribute("data-initial-value"); // Obtener el valor inicial si existe
    selectElement.innerHTML = options
        .map(hora => `<option value="${hora}" ${hora === selectedValue ? "selected" : ""}>${hora}</option>`)
        .join("");

    if (selectedValue) {
        selectElement.value = selectedValue; // Restaurar selección
    }
}

// Convertir una hora a minutos para comparación
function getMinutes(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
}

// Función para verificar solapamientos y actualizar selectores
function checkOverlapAndDisable(day) {
    let timeRanges = [];

    // Verificar solapamientos para asignaturas numeradas, con sufijo 'E' y cargo 'C'
    for (let prefix of ['', 'E', 'C']) {
        for (let asignatura = 1; asignatura <= 8; asignatura++) {
            const startSelect = document.getElementById(`hora_inicio${prefix}${asignatura}${day}`);
            const endSelect = document.getElementById(`hora_fin${prefix}${asignatura}${day}`);

            if (startSelect && endSelect) {
                const startTime = startSelect.value;
                const endTime = endSelect.value;

                if (startTime && endTime) {
                    const startMinutes = getMinutes(startTime);
                    const endMinutes = getMinutes(endTime);

                    // Verificar solapamiento
                    for (let range of timeRanges) {
                        if (
                            (startMinutes < range.end && startMinutes >= range.start) ||
                            (endMinutes <= range.end && endMinutes > range.start)
                        ) {
                            alert(`Solapamiento detectado en ${prefix === 'E' ? "asignatura especial" : (prefix === 'C' ? "cargo" : "asignatura")} ${asignatura} el día ${getDayName(day)}. Ajusta el horario.`);
                            return false;
                        }
                    }

                    // Agregar rango de horario actual
                    timeRanges.push({ start: startMinutes, end: endMinutes });
                }
            }
        }
    }

    // Deshabilitar horarios en conflicto
    for (let prefix of ['', 'E', 'C']) {
        for (let asignatura = 1; asignatura <= 8; asignatura++) {
            const startSelect = document.getElementById(`hora_inicio${prefix}${asignatura}${day}`);
            const endSelect = document.getElementById(`hora_fin${prefix}${asignatura}${day}`);

            if (startSelect && endSelect) {
                disableConflictingOptions(startSelect, endSelect, timeRanges);
            }
        }
    }

    return true;
}

// Obtener el nombre del día basado en el número (1-6)
function getDayName(day) {
    const days = {
        "1": "lunes",
        "2": "martes",
        "3": "miércoles",
        "4": "jueves",
        "5": "viernes",
        "6": "sábado"
    };
    return days[day] || "desconocido";
}

// Deshabilitar opciones en conflicto
function disableConflictingOptions(startSelect, endSelect, timeRanges) {
    const selectedStart = startSelect.value;
    const selectedEnd = endSelect.value;

    horarios.forEach(hora => {
        const minutes = getMinutes(hora);
        const startOption = startSelect.querySelector(`option[value="${hora}"]`);
        const endOption = endSelect.querySelector(`option[value="${hora}"]`);

        if (startOption) startOption.disabled = false;
        if (endOption) endOption.disabled = false;

        // Deshabilitar opciones en conflicto
        timeRanges.forEach(({ start, end }) => {
            if (minutes > start && minutes < end) {
                if (startOption) startOption.disabled = true;
                if (endOption) endOption.disabled = true;
            }
        });
    });

    startSelect.value = selectedStart;
    endSelect.value = selectedEnd;
}

// Inicializar horarios y agregar eventos de cambio para validar solapamientos
document.addEventListener("DOMContentLoaded", function() {
    const horaInicioSelects = document.querySelectorAll(".hora-inicio");
    const horaFinSelects = document.querySelectorAll(".hora-fin");

    horaInicioSelects.forEach(select => {
        select.setAttribute("data-initial-value", select.value);
        populateSelectOptions(select, horarios);
    });

    horaFinSelects.forEach(select => {
        select.setAttribute("data-initial-value", select.value);
        populateSelectOptions(select, horarios);
    });

    // Agregar evento a cada selector para revisar y actualizar horarios
    [...horaInicioSelects, ...horaFinSelects].forEach(select => {
        select.addEventListener("change", () => {
            const day = select.id.slice(-1);
            checkOverlapAndDisable(day);
        });
    });
});

// GRUPOS PARA ELECTROMECÁNICA
const gruposElectromecanica = ["", "NG", "2101", "2102", "2151", "2152", "2201", "2202", "2251", "2252",
    "2301", "2302", "2351", "2352", "2401", "2402", "2451", "2452", "2501", "2502", "2551", "2552", 
    "2601", "2602", "2651", "2652", "2751", "2752", "2851", "2852", "2951", "2952"
];

// Función para poblar las opciones en el select
function populateSelectOptions(selectElement, options) {
    selectElement.innerHTML = options.map(grupo => `<option value="${grupo}">${grupo}</option>`).join("");
}

document.addEventListener("DOMContentLoaded", function() {
    const gruposSelects = document.querySelectorAll(".group");

    // Poblar cada select con las opciones de grupos de electromecánica
    gruposSelects.forEach(select => populateSelectOptions(select, gruposElectromecanica));

    // Añadir funcionalidad para cada <select> y su correspondiente <input>
    const inputGroups = document.querySelectorAll(".input-group");
    inputGroups.forEach(group => {
        const customInput = group.querySelector(".custom-input");
        const selectElement = group.querySelector(".group");

        // Sincronizar el input personalizado con el select
        customInput.addEventListener("input", function() {
            const value = customInput.value;
            if (gruposElectromecanica.includes(value)) {
                selectElement.value = value; // Selecciona la opción en el select si coincide
            } else {
                selectElement.selectedIndex = -1; // No selecciona ninguna opción
            }
        });

        // Sincronizar el select con el input
        selectElement.addEventListener("change", function() {
            customInput.value = selectElement.value;
        });
    });
});

// LISTA DE CARRERAS PARA ELECTROMECÁNICA
const carrerasElectromecanica = ["", "ELECTROMECÁNICA", "SISTEMAS COMPUTACIONALES", "INDUSTRIAL", "INFORMÁTICA", "ELECTRÓNICA", "ADMINISTRACIÓN"];

document.addEventListener("DOMContentLoaded", function() {
    const carreraESelects = document.querySelectorAll(".careerE");
    const carreraSelects = document.querySelectorAll(".career"); // Nuevo para asignaturas normales

    // Función para poblar las opciones en el select de carreras
    carreraESelects.forEach(select => {
        select.innerHTML = carrerasElectromecanica.map(carrera => `<option value="${carrera}">${carrera}</option>`).join("");
    });

    carreraSelects.forEach(select => {  // Nuevo para asignaturas normales
        select.innerHTML = carrerasElectromecanica.map(carrera => `<option value="${carrera}">${carrera}</option>`).join("");
    });
});

///VALIDAR HORAS ASIGNADAS
let interactionCounter = 0; // Contador de interacciones

// Función para calcular horas desde hora_inicio y hora_fin
function calculateAssignedHours(prefix, asignatura) {
    let totalAssignedHours = 0;

    for (let day = 1; day <= 6; day++) {
        const startSelect = document.getElementById(`hora_inicio${prefix}${asignatura}${day}`);
        const endSelect = document.getElementById(`hora_fin${prefix}${asignatura}${day}`);

        if (startSelect && endSelect) {
            const startTime = startSelect.value;
            const endTime = endSelect.value;

            if (startTime && endTime) {
                const startMinutes = getMinutes(startTime);
                const endMinutes = getMinutes(endTime);

                totalAssignedHours += (endMinutes - startMinutes) / 60; // Convertir minutos a horas
            }
        }
    }

    return totalAssignedHours;
}

// Validar horas asignadas para todas las asignaturas
function validateWeeklyHours() {
    if (interactionCounter < 4) return; // No mostrar mensajes hasta que haya 4 interacciones

    let warnings = [];

    // Validar asignaturas normales
    for (let asignatura = 1; asignatura <= 8; asignatura++) {
        const totalHoursInput = document.getElementById(`horas${asignatura}`);
        if (totalHoursInput) {
            const totalHours = parseFloat(totalHoursInput.value) || 0;
            const assignedHours = calculateAssignedHours('', asignatura);

            if (assignedHours !== totalHours) {
                warnings.push(`Asignatura ${asignatura}: Horas asignadas (${assignedHours}) no coinciden con las configuradas (${totalHours}).`);
            }
        }
    }

    // Validar asignaturas especiales
    for (let asignatura = 1; asignatura <= 8; asignatura++) {
        const totalHoursInput = document.getElementById(`horasE${asignatura}`);
        if (totalHoursInput) {
            const totalHours = parseFloat(totalHoursInput.value) || 0;
            const assignedHours = calculateAssignedHours('E', asignatura);

            if (assignedHours !== totalHours) {
                warnings.push(`Asignatura especial ${asignatura}: Horas asignadas (${assignedHours}) no coinciden con las configuradas (${totalHours}).`);
            }
        }
    }

    // Validar horario del cargo
    const totalCargoHoursInput = document.getElementById(`horasC`);
    if (totalCargoHoursInput) {
        const totalHours = parseFloat(totalCargoHoursInput.value) || 0;
        const assignedHours = calculateAssignedHours('C', 1);

        if (assignedHours !== totalHours) {
            warnings.push(`Cargo: Horas asignadas (${assignedHours}) no coinciden con las configuradas (${totalHours}).`);
        }
    }

    if (warnings.length > 0) {
        alert(warnings.join('\n'));
    }
}

// Escuchar cambios en horarios y totales
document.addEventListener("DOMContentLoaded", function() {
    const hourSelectors = document.querySelectorAll("[id^='hora_inicio'], [id^='hora_fin'], [id^='horas']");
    hourSelectors.forEach(selector => {
        selector.addEventListener("change", () => {
            interactionCounter++; // Incrementar contador en cada interacción
            validateWeeklyHours();
        });
    });
});

// MANEJO DE HORAS DE TRANSMISIÓN PARA GRUPOS 71 EN ELECTROMECÁNICA
document.addEventListener("DOMContentLoaded", function() {
    // Obtener todos los selects de grupo
    const grupoSelects = document.querySelectorAll(".group");

    grupoSelects.forEach((select, index) => {
        select.addEventListener("change", function() {
            const grupoValue = select.value; // Obtener el valor del grupo seleccionado

            // Buscar el campo de distintivo en caso de existir
            let distintivoField = document.getElementById(`distintivo${index + 1}`);
            if (!distintivoField) {
                // Si no existe, lo creamos y lo agregamos
                distintivoField = document.createElement("input");
                distintivoField.type = "hidden"; // Oculto para el formulario
                distintivoField.id = `distintivo${index + 1}`;
                distintivoField.name = `distintivo${index + 1}`;
                select.parentElement.appendChild(distintivoField);
            }

            // Buscar el select de días asociado
            let daySelector = document.getElementById(`daySelector${index + 1}`);
            if (!daySelector) {
                // Si no existe, lo creamos y lo agregamos
                daySelector = document.createElement("select");
                daySelector.id = `daySelector${index + 1}`;
                daySelector.name = `daySelector${index + 1}`;
                daySelector.innerHTML = `
                    <option value="">Selecciona día</option>
                    <option value="1">Lunes</option>
                    <option value="2">Martes</option>
                    <option value="3">Miércoles</option>
                    <option value="4">Jueves</option>
                    <option value="5">Viernes</option>
                    <option value="6">Sábado</option>
                `;
                select.parentElement.appendChild(daySelector);
                daySelector.style.display = "none"; // Ocultarlo inicialmente
            }

            // Si el grupo seleccionado termina en "71", activar la selección de día
            if (grupoValue.endsWith("71")) {
                daySelector.style.display = "inline"; // Mostrar el selector de días

                daySelector.addEventListener("change", function() {
                    const selectedDay = daySelector.value;
                    distintivoField.value = selectedDay; // Guardar el valor en el campo oculto
                });

            } else {
                daySelector.style.display = "none"; // Ocultar selector de día si el grupo cambia
                daySelector.value = ""; // Reiniciar selección de día
                distintivoField.value = ""; // Eliminar el valor del distintivo si se cambia el grupo
            }
        });
    });
});