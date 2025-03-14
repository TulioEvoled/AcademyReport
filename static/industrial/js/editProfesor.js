document.addEventListener("DOMContentLoaded", function () {
    const editForm = document.getElementById("edit-profesor-form");

    editForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar envío inmediato del formulario

        const confirmacion = confirm("¿Estás seguro de que deseas actualizar los datos del Docente?");
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
            total_horas_grupo: document.getElementById('total_horas_grupo').value,
            total_horasE_grupo: document.getElementById('total_horasE_grupo').value,
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

let lastModifiedSelect = null; // Guardará el último select modificado

// Función para llenar los select con opciones de horarios
function populateSelectOptions(selectElement, options) {
    const selectedValue = selectElement.value || selectElement.getAttribute("data-initial-value");
    selectElement.innerHTML = options
        .map(hora => `<option value="${hora}" ${hora === selectedValue ? "selected" : ""}>${hora}</option>`)
        .join("");

    if (selectedValue && options.includes(selectedValue)) {
        selectElement.value = selectedValue;
    }
}

// Convertir hora a minutos para comparación
function getMinutes(timeString) {
    if (!timeString) return null;
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
}

// Función para verificar solapamientos y validar la lógica de horarios
function checkOverlapAndDisable(day) {
    let timeRanges = [];

    for (let prefix of ['', 'E', 'C']) { // '' = Asignatura normal, 'E' = Apoyo a la docencia, 'C' = Cargo Académico
        for (let asignatura = 1; asignatura <= 8; asignatura++) {
            const startSelect = document.getElementById(`hora_inicio${prefix}${asignatura}${day}`);
            const endSelect = document.getElementById(`hora_fin${prefix}${asignatura}${day}`);

            if (startSelect && endSelect) {
                const startTime = startSelect.value;
                const endTime = endSelect.value;

                if (startTime && endTime) {
                    const startMinutes = getMinutes(startTime);
                    const endMinutes = getMinutes(endTime);

                    // ✅ Verificar que la hora de inicio sea menor que la de fin
                    if (startMinutes >= endMinutes) {
                        alert(`⚠️ Error en ${getCategoryName(prefix)} ${asignatura} el día ${getDayName(day)}.\n\n⏳ La hora de inicio (${startTime}) debe ser menor que la hora de fin (${endTime}).`);

                        // Borrar solo el último select modificado
                        if (lastModifiedSelect) {
                            lastModifiedSelect.value = "";
                        }
                        return false;
                    }

                    // 🔄 Verificar si hay solapamiento con horarios ya registrados
                    for (let range of timeRanges) {
                        if (
                            (startMinutes < range.end && endMinutes > range.start) || // Solapamiento parcial o total
                            (startMinutes === range.start && endMinutes === range.end) // Exactamente el mismo horario
                        ) {
                            alert(`⚠️ Solapamiento detectado en ${getCategoryName(prefix)} ${asignatura} el día ${getDayName(day)}.\n\n⏳ Conflicto con ${getCategoryName(range.prefix)} ${range.asignatura} en el horario ${range.startTime} - ${range.endTime}.\n\nSe ha eliminado el horario ingresado.`);

                            // ❌ Borrar solo el select **modificado recientemente**
                            if (lastModifiedSelect) {
                                lastModifiedSelect.value = "";
                            }
                            return false;
                        }
                    }

                    // 📌 Guardar el horario actual para futuras comparaciones
                    timeRanges.push({
                        start: startMinutes,
                        end: endMinutes,
                        startTime: startTime,
                        endTime: endTime,
                        asignatura: asignatura,
                        prefix: prefix
                    });
                }
            }
        }
    }

    // Deshabilitar horarios en conflicto
    disableConflictingOptions(day, timeRanges);

    return true;
}

// Función para deshabilitar horarios en conflicto
function disableConflictingOptions(day, timeRanges) {
    for (let prefix of ['', 'E', 'C']) {
        for (let asignatura = 1; asignatura <= 8; asignatura++) {
            const startSelect = document.getElementById(`hora_inicio${prefix}${asignatura}${day}`);
            const endSelect = document.getElementById(`hora_fin${prefix}${asignatura}${day}`);

            if (startSelect && endSelect) {
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

                // Restaurar selección del usuario si sigue siendo válida
                startSelect.value = horarios.includes(selectedStart) ? selectedStart : "";
                endSelect.value = horarios.includes(selectedEnd) ? selectedEnd : "";
            }
        }
    }
}

// Función para obtener el nombre del día
function getDayName(dayNumber) {
    const days = {
        '1': 'Lunes',
        '2': 'Martes',
        '3': 'Miércoles',
        '4': 'Jueves',
        '5': 'Viernes',
        '6': 'Sábado'
    };
    return days[dayNumber] || 'Día desconocido';
}

// Función para obtener el tipo de asignación basado en el prefijo
function getCategoryName(prefix) {
    switch (prefix) {
        case 'E':
            return "Apoyo a la Docencia";
        case 'C':
            return "Cargo Académico";
        default:
            return "Asignatura";
    }
}

// Inicializar eventos
document.addEventListener("DOMContentLoaded", function() {
    const horaInicioSelects = document.querySelectorAll(".hora-inicio");
    const horaFinSelects = document.querySelectorAll(".hora-fin");

    horaInicioSelects.forEach(select => {
        select.setAttribute("data-initial-value", select.value);
        populateSelectOptions(select, horarios);
        select.addEventListener("change", () => {
            lastModifiedSelect = select; // Guardamos el select modificado
            const day = select.id.slice(-1);
            checkOverlapAndDisable(day);
        });
    });

    horaFinSelects.forEach(select => {
        select.setAttribute("data-initial-value", select.value);
        populateSelectOptions(select, horarios);
        select.addEventListener("change", () => {
            lastModifiedSelect = select; // Guardamos el select modificado
            const day = select.id.slice(-1);
            checkOverlapAndDisable(day);
        });
    });

    [...horaInicioSelects, ...horaFinSelects].forEach(select => {
        select.addEventListener("change", () => {
            const day = select.id.slice(-1);
            checkOverlapAndDisable(day);
        });
    });
});


// GRUPOS POR CARRERA
const gruposPorCarrera = {
    "INDUSTRIAL": ["", "NG", "1101", "1102", "1151", "1152", "1181", "1201", "1202", "1251", "1252", "1281", "1301", "1302", "1351", "1352", "1381", "1401", "1402", "1451", "1452", "1481", "1501", "1502", "1551", "1552", "1581", "1601", "1602", "1651", "1652", "1681", "1751", "1752", "1781", "1851", "1852", "1881", "1951", "1952", "1981"],
    "SISTEMAS COMPUTACIONALES": ["", "NG", "4101", "4102", "4151", "4152", "4171", "4201", "4202", "4251", "4252", "4271", "4301", "4302", "4351", "4352", "4371", "4401", "4402", "4451", "4452", "4471", "4501", "4502", "4551", "4552", "4571", "4601", "4602", "4651", "4652", "4671", "4751", "4752", "4771", "4851", "4852", "4871", "4951", "4952", "4971"],
    "INFORMÁTICA": ["", "NG", "6101", "6102", "6151", "6152", "6201", "6202", "6251", "6252", "6301", "6302", "6351", "6352", "6401", "6402", "6451", "6452", "6501","6502", "6551", "6552", "6601", "6602", "6651", "6652", "6751", "6752", "6851", "6852", "6951", "6952"],
    "ELECTRÓNICA": ["", "NG", "3101", "3102", "3151", "3152", "3201", "3202", "3251", "3252", "3301", "3302", "3351", "3352", "3401", "3402", "3451", "3452", "3501", "3502", "3551", "3552", "3601", "3602", "3651", "3652", "3751", "3752", "3851", "3852", "3951", "3952"],
    "ELECTROMECÁNICA": ["", "NG", "2101", "2102", "2151", "2152", "2201", "2202", "2251", "2252", "2301", "2302", "2351", "2352", "2401", "2402", "2451", "2452", "2501", "2502", "2551", "2552", "2601", "2602", "2651", "2652", "2751", "2752", "2851", "2852", "2951", "2952"],
    "ADMINISTRACIÓN": ["", "NG", "9101", "9102", "9151", "9152", "9201", "9202", "9251", "9252", "9301", "9302", "9351", "9352", "9401", "9402", "9451", "9452", "9501","9502", "9551", "9552", "9601", "9602", "9651", "9652", "9751", "9752", "9851", "9852", "9951", "9952"]
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

// Función para validar horas asignadas de una asignatura específica
function validateAssignedHours(prefix, asignatura) {
    let warnings = [];

    // Validar asignaturas normales
    if (prefix === '') {
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
    if (prefix === 'E') {
        const totalHoursInput = document.getElementById(`horasE${asignatura}`);
        if (totalHoursInput) {
            const totalHours = parseFloat(totalHoursInput.value) || 0;
            const assignedHours = calculateAssignedHours('E', asignatura);

            if (assignedHours !== totalHours) {
                warnings.push(`Apoyo a la docencia ${asignatura}: Horas asignadas (${assignedHours}) no coinciden con las configuradas (${totalHours}).`);
            }
        }
    }

    // Validar horario del cargo
    if (prefix === 'C') {
        const totalCargoHoursInput = document.getElementById(`horasC`);
        if (totalCargoHoursInput) {
            const totalHours = parseFloat(totalCargoHoursInput.value) || 0;
            const assignedHours = calculateAssignedHours('C', 1);

            if (assignedHours !== totalHours) {
                warnings.push(`Cargo: Horas asignadas (${assignedHours}) no coinciden con las configuradas (${totalHours}).`);
            }
        }
    }

    if (warnings.length > 0) {
        alert(warnings.join('\n'));
    } else {
        alert("✅ Las horas asignadas son correctas.");
    }
}

// Agregar eventos a los botones de validación al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    for (let i = 1; i <= 8; i++) {
        // Botones para asignaturas normales
        const button = document.getElementById(`validateButton${i}`);
        if (button) {
            button.addEventListener("click", () => validateAssignedHours('', i));
        }

        // Botones para apoyo a la docencia
        const buttonE = document.getElementById(`validateButtonE${i}`);
        if (buttonE) {
            buttonE.addEventListener("click", () => validateAssignedHours('E', i));
        }
    }

    // Botón para validar cargo académico
    const buttonC = document.getElementById(`validateButtonC`);
    if (buttonC) {
        buttonC.addEventListener("click", () => validateAssignedHours('C', 1));
    }
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

document.querySelectorAll(".btn-limpiar-tabla").forEach(button => {
    button.addEventListener("click", function(event) {
        const confirmacion = confirm("⚠️ ¿Estás seguro de limpiar los datos de la tabla? Esta acción no se puede deshacer.");

        if (!confirmacion) {
            event.preventDefault(); // Si el usuario cancela, no se ejecuta la limpieza
            return;
        }

        // Obtener la clase de la tabla desde el atributo data-tabla del botón
        const tablaClase = this.getAttribute("data-tabla");

        if (tablaClase) {
            limpiarTabla(tablaClase);
        }
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

document.getElementById("btn-limpiar-todos").addEventListener("click", function () {
    const confirmacion = confirm("⚠️ ¿Estás seguro de limpiar TODOS los horarios? Esta acción no se puede deshacer.");
    if (!confirmacion) return; // Si cancela, no hace nada

    // Lista de clases que representan las tablas de horarios
    const tablasHorarios = ["form-group", "form-groupE", "form-groupC"];

    tablasHorarios.forEach(className => {
        limpiarTabla(className);
    });

    alert("Todos los horarios han sido limpiados correctamente.");
});

// Función para limpiar la tabla
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
}