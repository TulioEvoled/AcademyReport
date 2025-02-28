document.addEventListener("DOMContentLoaded", function () {
    const editForm = document.getElementById("edit-profesor-form");

    editForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar envío inmediato del formulario

        const confirmacion = confirm("¿Estás seguro de que deseas actualizar los datos del profesor?");
        if (!confirmacion) {
            return; // Si el usuario cancela, detenemos el proceso sin enviar el formulario
        }

        // Obtener ID del profesor
        const id = window.location.pathname.split('/').pop();

        // Capturar datos del formulario
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
            carreraC: document.getElementById('carreraC').value,
            cargo: document.getElementById('cargo').value,
            vigenciaCargo: document.getElementById('vigenciaCargo').value,
            horasC: document.getElementById('horasC').value
        };

        // Recorremos las asignaturas normales (1-8)
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

    // Recorremos las asignaturas especiales (1-8)
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

    // Recorremos los horarios del cargo (1-6 días)
    for (let j = 1; j <= 6; j++) {
        data[`hora_inicioC1${j}`] = document.getElementById(`hora_inicioC1${j}`).value;
        data[`hora_finC1${j}`] = document.getElementById(`hora_finC1${j}`).value;
    }

        // Enviar datos al servidor
        fetch(`/profesores/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => alert(data.msg))
        .catch(error => console.error('Error:', error));
    });
});


//AUTOCOMPLETADO
document.addEventListener('DOMContentLoaded', function() {
    //TOTAL DE HORAS GRUPO (para asignaturas)
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

    //TOTAL DE HORAS GRUPO (para asignaturasE)
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

    // Configurar autocompletado y horas para asignaturas desde la tabla 'asignaturas'
    setupAsignatura('asignatura1', 'horas1', 'asignatura-list1', '/asignaturas/json');
    setupAsignatura('asignatura2', 'horas2', 'asignatura-list2', '/asignaturas/json');
    setupAsignatura('asignatura3', 'horas3', 'asignatura-list3', '/asignaturas/json');
    setupAsignatura('asignatura4', 'horas4', 'asignatura-list4', '/asignaturas/json');
    setupAsignatura('asignatura5', 'horas5', 'asignatura-list5', '/asignaturas/json');
    setupAsignatura('asignatura6', 'horas6', 'asignatura-list6', '/asignaturas/json');
    setupAsignatura('asignatura7', 'horas7', 'asignatura-list7', '/asignaturas/json');
    setupAsignatura('asignatura8', 'horas8', 'asignatura-list8', '/asignaturas/json');

    // Configurar autocompletado y horas para asignaturas desde la tabla 'asignaturasE'
    setupAsignatura('asignaturaE1', 'horasE1', 'asignaturaE-list1', '/asignaturasE/json');
    setupAsignatura('asignaturaE2', 'horasE2', 'asignaturaE-list2', '/asignaturasE/json');
    setupAsignatura('asignaturaE3', 'horasE3', 'asignaturaE-list3', '/asignaturasE/json');
    setupAsignatura('asignaturaE4', 'horasE4', 'asignaturaE-list4', '/asignaturasE/json');
    setupAsignatura('asignaturaE5', 'horasE5', 'asignaturaE-list5', '/asignaturasE/json');
    setupAsignatura('asignaturaE6', 'horasE6', 'asignaturaE-list6', '/asignaturasE/json');
    setupAsignatura('asignaturaE7', 'horasE7', 'asignaturaE-list7', '/asignaturasE/json');
    setupAsignatura('asignaturaE8', 'horasE8', 'asignaturaE-list8', '/asignaturasE/json');

    //ACABA AUTOCOMPLETADO

});


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

function transformarMayusculas() {
    var inputs = document.querySelectorAll('input[type="text"]');

    inputs.forEach(function(input) {
        input.value = input.value.toUpperCase();
    });
}

/// HORARIOS
const horarios = ["", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

// Función para llenar las opciones de cada select y seleccionar el valor existente
function populateSelectOptions(selectElement, options) {
    const selectedValue = selectElement.value || selectElement.getAttribute("data-initial-value"); // Obtener el valor inicial si existe
    selectElement.innerHTML = options
        .map(hora => `<option value="${hora}" ${hora === selectedValue ? "selected" : ""}>${hora}</option>`)
        .join("");

    // Asignar nuevamente el valor después de llenar las opciones
    if (selectedValue) {
        selectElement.value = selectedValue;
    }
}

// Convertir una hora a minutos para facilitar la comparación
function getMinutes(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
}

// Función para verificar solapamientos y actualizar selectores
function checkOverlapAndDisable(day) {
    let timeRanges = [];

    // Verificar solapamientos para asignaturas numeradas, con sufijo 'E' y cargo 'C'
    for (let prefix of['', 'E', 'C']) {
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
                            switch (prefix) {
                                case '':
                                    switch (day) {
                                        case '1':
                                            alert(`Solapamiento detectado para asignatura ${asignatura} el dia lunes. Ajusta el horario.`);
                                            break;
                                        case '2':
                                            alert(`Solapamiento detectado para asignatura ${asignatura} el dia martes. Ajusta el horario.`);
                                            break;
                                        case '3':
                                            alert(`Solapamiento detectado para asignatura ${asignatura} el dia miercoles. Ajusta el horario.`);
                                            break;
                                        case '4':
                                            alert(`Solapamiento detectado para asignatura ${asignatura} el dia jueves. Ajusta el horario.`);
                                            break;
                                        case '5':
                                            alert(`Solapamiento detectado para asignatura ${asignatura} el dia viernes. Ajusta el horario.`);
                                            break;
                                        case '6':
                                            alert(`Solapamiento detectado para asignatura ${asignatura} el dia sabado. Ajusta el horario.`);
                                            break;
                                    }

                                case 'E':
                                    switch (day) {
                                        case '1':
                                            alert(`Solapamiento detectado para asignatura de descarga ${asignatura} en el día lunes. Ajusta el horario.`);
                                            break;
                                        case '2':
                                            alert(`Solapamiento detectado para asignatura de descarga ${asignatura} en el día martes. Ajusta el horario.`);
                                            break;
                                        case '3':
                                            alert(`Solapamiento detectado para asignatura de descarga ${asignatura} en el día miercoles. Ajusta el horario.`);
                                            break;
                                        case '4':
                                            alert(`Solapamiento detectado para asignatura de descarga ${asignatura} en el día jueves. Ajusta el horario.`);
                                            break;
                                        case '5':
                                            alert(`Solapamiento detectado para asignatura de descarga ${asignatura} en el día viernes. Ajusta el horario.`);
                                            break;
                                        case '6':
                                            alert(`Solapamiento detectado para asignatura de descarga ${asignatura} en el día sabado. Ajusta el horario.`);
                                            break;
                                    }

                                case 'C':
                                    switch (day) {
                                        case '1':
                                            alert(`Solapamiento detectado para cargo en el día lunes. Ajusta el horario.`);
                                            break;
                                        case '2':
                                            alert(`Solapamiento detectado para cargo en el día martes. Ajusta el horario.`);
                                            break;
                                        case '3':
                                            alert(`Solapamiento detectado para cargo en el día miercoles. Ajusta el horario.`);
                                            break;
                                        case '4':
                                            alert(`Solapamiento detectado para cargo en el día jueves. Ajusta el horario.`);
                                            break;
                                        case '5':
                                            alert(`Solapamiento detectado para cargo en el día viernes. Ajusta el horario.`);
                                            break;
                                        case '6':
                                            alert(`Solapamiento detectado para cargo en el día sabado. Ajusta el horario.`);
                                            break;

                                    }

                            }
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
    for (let prefix of['', 'E', 'C']) {
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

// Deshabilitar opciones en conflicto, permitiendo que la hora de fin esté disponible como hora de inicio para otra asignatura
function disableConflictingOptions(startSelect, endSelect, timeRanges) {
    // Preservar la selección actual del usuario
    const selectedStart = startSelect.value;
    const selectedEnd = endSelect.value;

    // Actualizar cada opción en lugar de limpiar el contenido
    horarios.forEach(hora => {
        const minutes = getMinutes(hora);
        const startOption = startSelect.querySelector(`option[value="${hora}"]`);
        const endOption = endSelect.querySelector(`option[value="${hora}"]`);

        if (startOption) startOption.disabled = false;
        if (endOption) endOption.disabled = false;

        // Deshabilitar opciones en conflicto
        timeRanges.forEach(({ start, end }) => {
            // Permitir que la hora de fin de un rango sea seleccionable como hora de inicio
            if (minutes > start && minutes < end) {
                if (startOption) startOption.disabled = true;
                if (endOption) endOption.disabled = true;
            }
        });
    });

    // Restaurar la selección del usuario
    startSelect.value = selectedStart;
    endSelect.value = selectedEnd;
}

// Inicializar horarios y agregar eventos de cambio para validar solapamientos
document.addEventListener("DOMContentLoaded", function() {
    const horaInicioSelects = document.querySelectorAll(".hora-inicio");
    const horaFinSelects = document.querySelectorAll(".hora-fin");

    horaInicioSelects.forEach(select => {
        // Almacenar valor inicial en un atributo personalizado
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
            const day = select.id.slice(-1); // Obtener el día de la semana (1-6 para lunes-sábado)
            checkOverlapAndDisable(day);
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const grupos = ["", "NG", "1101", "1102", "1151", "1152", "1181", "1201", "1202", "1251", "1252",
        "1281", "1301", "1302", "1351", "1352", "1381", "1401", "1402", "1451",
        "1452", "1481", "1501", "1502", "1551", "1552", "1581", "1601", "1602",
        "1651", "1652", "1681", "1751", "1752", "1781", "1851", "1852", "1881",
        "1951", "1952", "1981"
    ];

    // Seleccionamos todos los grupos de input
    const inputGroups = document.querySelectorAll(".input-group");

    inputGroups.forEach(group => {
        const customInput = group.querySelector(".custom-input");
        const selectElement = group.querySelector(".group");

        // Poblar el select con las opciones
        populateSelectOptions(selectElement, grupos);

        // Obtener el valor del input y seleccionar la opción en el select si coincide
        const inputValue = customInput.value.trim();
        if (grupos.includes(inputValue)) {
            selectElement.value = inputValue; // Si coincide, seleccionamos en el select
        } else {
            selectElement.selectedIndex = -1; // Si no coincide, dejamos el select vacío
        }

        // Sincronizar al escribir en el input
        customInput.addEventListener("input", function() {
            const value = customInput.value.trim();
            if (grupos.includes(value)) {
                selectElement.value = value; // Si coincide, seleccionamos en el select
            } else {
                selectElement.selectedIndex = -1; // El select queda vacío
            }
        });

        // Sincronizar al cambiar el select
        selectElement.addEventListener("change", function() {
            customInput.value = selectElement.value; // Actualiza el input con el valor seleccionado
        });
    });

    // Función para poblar el select con las opciones de grupos
    function populateSelectOptions(selectElement, options) {
        selectElement.innerHTML = options
            .map(grupo => `<option value="${grupo}">${grupo}</option>`)
            .join("");
    }
});

// LISTA DE CARRERAS
const carreras = ["", "INDUSTRIAL", "SISTEMAS COMPUTACIONALES", "ELECTRÓNICA", "ELECTROMECÁNICA", "INFORMÁTICA", "ADMINISTRACIÓN"];

// Función para poblar las opciones en el select de carreras
function populateCareerSelectOptions(selectElement, options) {
    const currentValue = selectElement.getAttribute("data-current-value"); // Obtener el valor actual si existe
    selectElement.innerHTML = options.map(carrera => {
        return `<option value="${carrera}" ${carrera === currentValue ? 'selected' : ''}>${carrera}</option>`;
    }).join("");
}

document.addEventListener("DOMContentLoaded", function() {
    const carreraSelects = document.querySelectorAll(".career, .careerE"); // Selecciona todos los selects de carrera normales y especiales

    // Poblar cada select con las opciones de carreras y mantener el valor actual si existe
    carreraSelects.forEach(select => populateCareerSelectOptions(select, carreras));
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
    if (interactionCounter < 2) return; // No mostrar mensajes hasta que haya dos interacciones

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

document.addEventListener("DOMContentLoaded", function() {
    // Obtener todos los selects de grupo
    const grupoSelects = document.querySelectorAll(".group");

    grupoSelects.forEach((select, index) => {
        const fieldIndex = index + 1;
        const distintivoFieldId = `distintivo${fieldIndex}`;
        const daySelectorId = `daySelector${fieldIndex}`;

        // Obtener elementos desde el DOM
        const distintivoField = document.getElementById(distintivoFieldId);
        const daySelector = document.getElementById(daySelectorId);

        // Verificar si ya hay un valor en el distintivo
        const existingDistintivo = distintivoField ? distintivoField.value : "";

        // Mostrar el select de días si el grupo termina en "81"
        function actualizarSelector() {
            const grupoValue = select.value;

            if (grupoValue.endsWith("81")) {
                daySelector.style.display = "inline"; // Mostrar select

                // Si hay un distintivo guardado, seleccionarlo
                if (existingDistintivo) {
                    daySelector.value = existingDistintivo;
                }
            } else {
                daySelector.style.display = "none"; // Ocultar si cambia de grupo
                daySelector.value = ""; // Reiniciar la selección de día
                distintivoField.value = ""; // Limpiar distintivo
            }
        }

        // Aplicar lógica en carga inicial
        actualizarSelector();

        // Detectar cambios en el grupo seleccionado
        select.addEventListener("change", function() {
            actualizarSelector();
        });

        // Guardar el valor seleccionado del distintivo cuando cambia el día
        daySelector.addEventListener("change", function() {
            distintivoField.value = daySelector.value;
        });
    });
});

//FUNCION PARA RESETEAR DATOS DE TABLAS
function limpiarTabla(className) {
    const table = document.querySelector(`.${className}`);
    if (!table) return;

    // Buscar todos los inputs y selects dentro de la tabla
    table.querySelectorAll("input, select").forEach(element => {
        if (element.tagName === "INPUT") {
            element.value = ""; // Limpiar los campos de entrada
        } else if (element.tagName === "SELECT") {
            element.selectedIndex = 0; // Resetear selects
        }
    });
    
    alert("Los campos de la tabla han sido limpiados.");
}
