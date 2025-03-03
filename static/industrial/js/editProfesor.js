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

    // Mapeo de carreras con sus respectivas URLs de asignaturas
    const carreraAsignaturas = {
        "INDUSTRIAL": "/asignaturas/json",
        "SISTEMAS COMPUTACIONALES": "/sistemas/sistemas_asignaturas/json",
        "INFORMÁTICA": "/informatica/informatica_asignaturas/json",
        "ELECTRÓNICA": "/electronica/electronica_asignaturas/json",
        "ELECTROMECÁNICA": "/electromecanica/electromecanica_asignaturas/json",
        "ADMINISTRACIÓN": "/administracion/administracion_asignaturas/json"
    };

    // Mapeo de carreras con sus respectivas URLs de asignaturas especiales
    const carreraAsignaturasE = {
        "INDUSTRIAL": "/asignaturasE/json",
        "SISTEMAS COMPUTACIONALES": "/sistemas/sistemas_asignaturasE/json",
        "INFORMÁTICA": "/informatica/informatica_asignaturasE/json",
        "ELECTRÓNICA": "/electronica/electronica_asignaturasE/json",
        "ELECTROMECÁNICA": "/electromecanica/electromecanica_asignaturasE/json",
        "ADMINISTRACIÓN": "/administracion/administracion_asignaturasE/json"
    };


    // Función para cargar asignaturas según la carrera seleccionada
    function setupAsignatura(asignaturaId, horasId, dataListId, carreraSelectId, isEspecial = false) {
        const carreraSelect = document.getElementById(carreraSelectId);
        const asignaturaInput = document.getElementById(asignaturaId);
        const horasInput = document.getElementById(horasId);
        const dataList = document.getElementById(dataListId);

        function cargarAsignaturas() {
            const carreraSeleccionada = carreraSelect.value;
            const url = isEspecial ? carreraAsignaturasE[carreraSeleccionada] : carreraAsignaturas[carreraSeleccionada];
            
            asignaturaInput.value = ""; // Limpia la asignatura al cambiar de carrera
            horasInput.value = ""; // Limpia el campo de horas también
            dataList.innerHTML = ""; // Si no hay carrera, limpiar opciones

            if (!url) {
                dataList.innerHTML = ""; // Si no hay carrera, limpiar opciones
                updateTotalHoras(); // Llamar a updateTotalHoras cuando se actualiza el campo
                updateTotalHorasE();
                return;
            }

            fetch(url)
                .then(response => response.json())
                .then(asignaturas => {
                    dataList.innerHTML = ""; // Limpiar lista previa
                    asignaturas.forEach(asignatura => {
                        const option = document.createElement('option');
                        option.value = asignatura.nombre;
                        option.dataset.horas = asignatura.horas;
                        dataList.appendChild(option);
                    });
                });
        }

        // Detectar cambios en el select de carrera para actualizar opciones de asignatura
        carreraSelect.addEventListener('change', cargarAsignaturas);
        
        // Autocompletar horas al seleccionar una asignatura
        asignaturaInput.addEventListener('input', function() {
            const selectedAsignatura = this.value;
            const selectedOption = Array.from(dataList.options).find(option => option.value === selectedAsignatura);
            horasInput.value = selectedOption ? selectedOption.dataset.horas : '';
            updateTotalHoras(); // Llamar a updateTotalHoras cuando se actualiza el campo
            updateTotalHorasE();
        });
    }

    // Configurar autocompletado de asignaturas normales
    for (let i = 1; i <= 8; i++) {
        setupAsignatura(`asignatura${i}`, `horas${i}`, `asignatura-list${i}`, `carrera${i}`);
    }

    // Configurar autocompletado de asignaturas especiales
    for (let i = 1; i <= 8; i++) {
        setupAsignatura(`asignaturaE${i}`, `horasE${i}`, `asignaturaE-list${i}`, `carreraE${i}`, true);
    }
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

// GRUPOS POR CARRERA
const gruposPorCarrera = {
    "INDUSTRIAL": ["", "NG", "1101", "1102", "1151", "1152", "1181", "1201", "1202", "1251", "1252", "1281", "1301", "1302", "1351", "1352", "1381", "1401", "1402", "1451", "1452", "1481", "1501", "1502", "1551", "1552", "1581", "1601", "1602", "1651", "1652", "1681", "1751", "1752", "1781", "1851", "1852", "1881", "1951", "1952", "1981"],
    "SISTEMAS COMPUTACIONALES": ["", "NG", "4101", "4102", "4151", "4152", "4171", "4201", "4202", "4251", "4252", "4271", "4301", "4302", "4351", "4352", "4371", "4401", "4402", "4451", "4452", "4471", "4501", "4502", "4551", "4552", "4571", "4601", "4602", "4651", "4652", "4671", "4751", "4752", "4771", "4851", "4852", "4871", "4951", "4952", "4971"],
    "INFORMÁTICA": ["", "NG", "6101", "6102", "6151", "6152", "6181", "6201", "6202", "6251", "6252", "6281", "6301", "6302", "6351", "6352", "6381", "6401", "6402", "6451", "6452", "6481", "6501", "6502", "6551", "6552", "6581"],
    "ELECTRÓNICA": ["", "NG", "3101", "3102", "3151", "3152", "3181", "3201", "3202", "3251", "3252", "3281", "3301", "3302", "3351", "3352", "3381"],
    "ELECTROMECÁNICA": ["", "NG", "2101", "2102", "2151", "2152", "2181", "2201", "2202", "2251", "2252", "2281", "2301", "2302", "2351", "2352", "2381"],
    "ADMINISTRACIÓN": ["", "NG", "9101", "9102", "9151", "9152", "9181", "9201", "9202", "9251", "9252", "9281", "9301", "9302", "9351", "9352", "9381"]
};

// Función para poblar los selects con los grupos según la carrera seleccionada, preservando selecciones previas
function populateGroupOptions(selectElement, carrera, previousValue) {
    const grupos = gruposPorCarrera[carrera] || [""];
    selectElement.innerHTML = grupos.map(grupo => `<option value="${grupo}">${grupo}</option>`).join("");
    selectElement.value = previousValue || ""; // Restaurar la selección anterior si existe
}

document.addEventListener("DOMContentLoaded", function() {
    const carreraSelects = document.querySelectorAll(".career");
    const carreraESelects = document.querySelectorAll(".careerE");
    
    function actualizarGrupos() {
        carreraSelects.forEach((select, index) => {
            select.addEventListener("change", () => {
                const carrera = select.value;
                const grupoSelect = document.getElementById(`grupo${index + 1}`);
                if (grupoSelect) {
                    const previousValue = grupoSelect.value; // Guardar la selección actual antes de actualizar
                    populateGroupOptions(grupoSelect, carrera, previousValue);
                }
            });
        });
    }
    
    function actualizarGruposEspeciales() {
        carreraESelects.forEach((select, index) => {
            select.addEventListener("change", () => {
                const carrera = select.value;
                const grupoSelect = document.getElementById(`grupoSelectE${index + 1}`);
                if (grupoSelect) {
                    const previousValue = grupoSelect.value;
                    populateGroupOptions(grupoSelect, carrera, previousValue);
                }
            });
        });
    }
    
    actualizarGrupos();
    actualizarGruposEspeciales();

    // Sincronización de inputs personalizados con selects de grupos
    document.querySelectorAll(".input-group").forEach(group => {
        const customInput = group.querySelector(".custom-input");
        const selectElement = group.querySelector(".group");

        // Sincronizar el input personalizado con el select
        customInput.addEventListener("input", function() {
            const value = customInput.value;
            if (Array.from(selectElement.options).map(opt => opt.value).includes(value)) {
                selectElement.value = value; // Selecciona la opción en el select si coincide
            } else {
                selectElement.selectedIndex = -1; // No selecciona ninguna opción
            }
        });

        // Sincronizar el select con el input personalizado
        selectElement.addEventListener("change", function() {
            customInput.value = selectElement.value;
        });
    });
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
