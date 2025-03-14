//AGREGAR PROFESORES
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

        carrera1: document.getElementById('carrera1').value,
        asignatura1: document.getElementById('asignatura1').value,
        grupo1: document.getElementById('grupo1').value,
        horas1: document.getElementById('horas1').value,
        distintivo1: document.getElementById('distintivo1') ? document.getElementById('distintivo1').value : "",

        hora_inicio11: document.getElementById('hora_inicio11').value,
        hora_fin11: document.getElementById('hora_fin11').value,
        hora_inicio12: document.getElementById('hora_inicio12').value,
        hora_fin12: document.getElementById('hora_fin12').value,
        hora_inicio13: document.getElementById('hora_inicio13').value,
        hora_fin13: document.getElementById('hora_fin13').value,
        hora_inicio14: document.getElementById('hora_inicio14').value,
        hora_fin14: document.getElementById('hora_fin14').value,
        hora_inicio15: document.getElementById('hora_inicio15').value,
        hora_fin15: document.getElementById('hora_fin15').value,
        hora_inicio16: document.getElementById('hora_inicio16').value,
        hora_fin16: document.getElementById('hora_fin16').value,

        carrera2: document.getElementById('carrera2').value,
        asignatura2: document.getElementById('asignatura2').value,
        grupo2: document.getElementById('grupo2').value,
        horas2: document.getElementById('horas2').value,
        distintivo2: document.getElementById('distintivo2') ? document.getElementById('distintivo2').value : "",

        hora_inicio21: document.getElementById('hora_inicio21').value,
        hora_fin21: document.getElementById('hora_fin21').value,
        hora_inicio22: document.getElementById('hora_inicio22').value,
        hora_fin22: document.getElementById('hora_fin22').value,
        hora_inicio23: document.getElementById('hora_inicio23').value,
        hora_fin23: document.getElementById('hora_fin23').value,
        hora_inicio24: document.getElementById('hora_inicio24').value,
        hora_fin24: document.getElementById('hora_fin24').value,
        hora_inicio25: document.getElementById('hora_inicio25').value,
        hora_fin25: document.getElementById('hora_fin25').value,
        hora_inicio26: document.getElementById('hora_inicio26').value,
        hora_fin26: document.getElementById('hora_fin26').value,

        carrera3: document.getElementById('carrera3').value,
        asignatura3: document.getElementById('asignatura3').value,
        grupo3: document.getElementById('grupo3').value,
        horas3: document.getElementById('horas3').value,
        distintivo3: document.getElementById('distintivo3') ? document.getElementById('distintivo3').value : "",

        hora_inicio31: document.getElementById('hora_inicio31').value,
        hora_fin31: document.getElementById('hora_fin31').value,
        hora_inicio32: document.getElementById('hora_inicio32').value,
        hora_fin32: document.getElementById('hora_fin32').value,
        hora_inicio33: document.getElementById('hora_inicio33').value,
        hora_fin33: document.getElementById('hora_fin33').value,
        hora_inicio34: document.getElementById('hora_inicio34').value,
        hora_fin34: document.getElementById('hora_fin34').value,
        hora_inicio35: document.getElementById('hora_inicio35').value,
        hora_fin35: document.getElementById('hora_fin35').value,
        hora_inicio36: document.getElementById('hora_inicio36').value,
        hora_fin36: document.getElementById('hora_fin36').value,

        carrera4: document.getElementById('carrera4').value,
        asignatura4: document.getElementById('asignatura4').value,
        grupo4: document.getElementById('grupo4').value,
        horas4: document.getElementById('horas4').value,
        distintivo4: document.getElementById('distintivo4') ? document.getElementById('distintivo4').value : "",

        hora_inicio41: document.getElementById('hora_inicio41').value,
        hora_fin41: document.getElementById('hora_fin41').value,
        hora_inicio42: document.getElementById('hora_inicio42').value,
        hora_fin42: document.getElementById('hora_fin42').value,
        hora_inicio43: document.getElementById('hora_inicio43').value,
        hora_fin43: document.getElementById('hora_fin43').value,
        hora_inicio44: document.getElementById('hora_inicio44').value,
        hora_fin44: document.getElementById('hora_fin44').value,
        hora_inicio45: document.getElementById('hora_inicio45').value,
        hora_fin45: document.getElementById('hora_fin45').value,
        hora_inicio46: document.getElementById('hora_inicio46').value,
        hora_fin46: document.getElementById('hora_fin46').value,

        carrera5: document.getElementById('carrera5').value,
        asignatura5: document.getElementById('asignatura5').value,
        grupo5: document.getElementById('grupo5').value,
        horas5: document.getElementById('horas5').value,
        distintivo5: document.getElementById('distintivo5') ? document.getElementById('distintivo5').value : "",

        hora_inicio51: document.getElementById('hora_inicio51').value,
        hora_fin51: document.getElementById('hora_fin51').value,
        hora_inicio52: document.getElementById('hora_inicio52').value,
        hora_fin52: document.getElementById('hora_fin52').value,
        hora_inicio53: document.getElementById('hora_inicio53').value,
        hora_fin53: document.getElementById('hora_fin53').value,
        hora_inicio54: document.getElementById('hora_inicio54').value,
        hora_fin54: document.getElementById('hora_fin54').value,
        hora_inicio55: document.getElementById('hora_inicio55').value,
        hora_fin55: document.getElementById('hora_fin55').value,
        hora_inicio56: document.getElementById('hora_inicio56').value,
        hora_fin56: document.getElementById('hora_fin56').value,

        carrera6: document.getElementById('carrera6').value,
        asignatura6: document.getElementById('asignatura6').value,
        grupo6: document.getElementById('grupo6').value,
        horas6: document.getElementById('horas6').value,
        distintivo6: document.getElementById('distintivo6') ? document.getElementById('distintivo6').value : "",

        hora_inicio61: document.getElementById('hora_inicio61').value,
        hora_fin61: document.getElementById('hora_fin61').value,
        hora_inicio62: document.getElementById('hora_inicio62').value,
        hora_fin62: document.getElementById('hora_fin62').value,
        hora_inicio63: document.getElementById('hora_inicio63').value,
        hora_fin63: document.getElementById('hora_fin63').value,
        hora_inicio64: document.getElementById('hora_inicio64').value,
        hora_fin64: document.getElementById('hora_fin64').value,
        hora_inicio65: document.getElementById('hora_inicio65').value,
        hora_fin65: document.getElementById('hora_fin65').value,
        hora_inicio66: document.getElementById('hora_inicio66').value,
        hora_fin66: document.getElementById('hora_fin66').value,

        carrera7: document.getElementById('carrera7').value,
        asignatura7: document.getElementById('asignatura7').value,
        grupo7: document.getElementById('grupo7').value,
        horas7: document.getElementById('horas7').value,
        distintivo7: document.getElementById('distintivo7') ? document.getElementById('distintivo7').value : "",

        hora_inicio71: document.getElementById('hora_inicio71').value,
        hora_fin71: document.getElementById('hora_fin71').value,
        hora_inicio72: document.getElementById('hora_inicio72').value,
        hora_fin72: document.getElementById('hora_fin72').value,
        hora_inicio73: document.getElementById('hora_inicio73').value,
        hora_fin73: document.getElementById('hora_fin73').value,
        hora_inicio74: document.getElementById('hora_inicio74').value,
        hora_fin74: document.getElementById('hora_fin74').value,
        hora_inicio75: document.getElementById('hora_inicio75').value,
        hora_fin75: document.getElementById('hora_fin75').value,
        hora_inicio76: document.getElementById('hora_inicio76').value,
        hora_fin76: document.getElementById('hora_fin76').value,

        carrera8: document.getElementById('carrera8').value,
        asignatura8: document.getElementById('asignatura8').value,
        grupo8: document.getElementById('grupo8').value,
        horas8: document.getElementById('horas8').value,
        distintivo8: document.getElementById('distintivo8') ? document.getElementById('distintivo8').value : "",

        hora_inicio81: document.getElementById('hora_inicio81').value,
        hora_fin81: document.getElementById('hora_fin81').value,
        hora_inicio82: document.getElementById('hora_inicio82').value,
        hora_fin82: document.getElementById('hora_fin82').value,
        hora_inicio83: document.getElementById('hora_inicio83').value,
        hora_fin83: document.getElementById('hora_fin83').value,
        hora_inicio84: document.getElementById('hora_inicio84').value,
        hora_fin84: document.getElementById('hora_fin84').value,
        hora_inicio85: document.getElementById('hora_inicio85').value,
        hora_fin85: document.getElementById('hora_fin85').value,
        hora_inicio86: document.getElementById('hora_inicio86').value,
        hora_fin86: document.getElementById('hora_fin86').value,

        total_horas_grupo: document.getElementById('total_horas_grupo').value,

        carreraE1: document.getElementById('carreraE1').value,
        asignaturaE1: document.getElementById('asignaturaE1').value,
        grupoE1: document.getElementById('grupoE1').value,
        horasE1: document.getElementById('horasE1').value,

        hora_inicioE11: document.getElementById('hora_inicioE11').value,
        hora_finE11: document.getElementById('hora_finE11').value,
        hora_inicioE12: document.getElementById('hora_inicioE12').value,
        hora_finE12: document.getElementById('hora_finE12').value,
        hora_inicioE13: document.getElementById('hora_inicioE13').value,
        hora_finE13: document.getElementById('hora_finE13').value,
        hora_inicioE14: document.getElementById('hora_inicioE14').value,
        hora_finE14: document.getElementById('hora_finE14').value,
        hora_inicioE15: document.getElementById('hora_inicioE15').value,
        hora_finE15: document.getElementById('hora_finE15').value,
        hora_inicioE16: document.getElementById('hora_inicioE16').value,
        hora_finE16: document.getElementById('hora_finE16').value,

        carreraE2: document.getElementById('carreraE2').value,
        asignaturaE2: document.getElementById('asignaturaE2').value,
        grupoE2: document.getElementById('grupoE2').value,
        horasE2: document.getElementById('horasE2').value,

        hora_inicioE21: document.getElementById('hora_inicioE21').value,
        hora_finE21: document.getElementById('hora_finE21').value,
        hora_inicioE22: document.getElementById('hora_inicioE22').value,
        hora_finE22: document.getElementById('hora_finE22').value,
        hora_inicioE23: document.getElementById('hora_inicioE23').value,
        hora_finE23: document.getElementById('hora_finE23').value,
        hora_inicioE24: document.getElementById('hora_inicioE24').value,
        hora_finE24: document.getElementById('hora_finE24').value,
        hora_inicioE25: document.getElementById('hora_inicioE25').value,
        hora_finE25: document.getElementById('hora_finE25').value,
        hora_inicioE26: document.getElementById('hora_inicioE26').value,
        hora_finE26: document.getElementById('hora_finE26').value,

        carreraE3: document.getElementById('carreraE3').value,
        asignaturaE3: document.getElementById('asignaturaE3').value,
        grupoE3: document.getElementById('grupoE3').value,
        horasE3: document.getElementById('horasE3').value,

        hora_inicioE31: document.getElementById('hora_inicioE31').value,
        hora_finE31: document.getElementById('hora_finE31').value,
        hora_inicioE32: document.getElementById('hora_inicioE32').value,
        hora_finE32: document.getElementById('hora_finE32').value,
        hora_inicioE33: document.getElementById('hora_inicioE33').value,
        hora_finE33: document.getElementById('hora_finE33').value,
        hora_inicioE34: document.getElementById('hora_inicioE34').value,
        hora_finE34: document.getElementById('hora_finE34').value,
        hora_inicioE35: document.getElementById('hora_inicioE35').value,
        hora_finE35: document.getElementById('hora_finE35').value,
        hora_inicioE36: document.getElementById('hora_inicioE36').value,
        hora_finE36: document.getElementById('hora_finE36').value,

        carreraE4: document.getElementById('carreraE4').value,
        asignaturaE4: document.getElementById('asignaturaE4').value,
        grupoE4: document.getElementById('grupoE4').value,
        horasE4: document.getElementById('horasE4').value,

        hora_inicioE41: document.getElementById('hora_inicioE41').value,
        hora_finE41: document.getElementById('hora_finE41').value,
        hora_inicioE42: document.getElementById('hora_inicioE42').value,
        hora_finE42: document.getElementById('hora_finE42').value,
        hora_inicioE43: document.getElementById('hora_inicioE43').value,
        hora_finE43: document.getElementById('hora_finE43').value,
        hora_inicioE44: document.getElementById('hora_inicioE44').value,
        hora_finE44: document.getElementById('hora_finE44').value,
        hora_inicioE45: document.getElementById('hora_inicioE45').value,
        hora_finE45: document.getElementById('hora_finE45').value,
        hora_inicioE46: document.getElementById('hora_inicioE46').value,
        hora_finE46: document.getElementById('hora_finE46').value,

        carreraE5: document.getElementById('carreraE5').value,
        asignaturaE5: document.getElementById('asignaturaE5').value,
        grupoE5: document.getElementById('grupoE5').value,
        horasE5: document.getElementById('horasE5').value,

        hora_inicioE51: document.getElementById('hora_inicioE51').value,
        hora_finE51: document.getElementById('hora_finE51').value,
        hora_inicioE52: document.getElementById('hora_inicioE52').value,
        hora_finE52: document.getElementById('hora_finE52').value,
        hora_inicioE53: document.getElementById('hora_inicioE53').value,
        hora_finE53: document.getElementById('hora_finE53').value,
        hora_inicioE54: document.getElementById('hora_inicioE54').value,
        hora_finE54: document.getElementById('hora_finE54').value,
        hora_inicioE55: document.getElementById('hora_inicioE55').value,
        hora_finE55: document.getElementById('hora_finE55').value,
        hora_inicioE56: document.getElementById('hora_inicioE56').value,
        hora_finE56: document.getElementById('hora_finE56').value,

        carreraE6: document.getElementById('carreraE6').value,
        asignaturaE6: document.getElementById('asignaturaE6').value,
        grupoE6: document.getElementById('grupoE6').value,
        horasE6: document.getElementById('horasE6').value,

        hora_inicioE61: document.getElementById('hora_inicioE61').value,
        hora_finE61: document.getElementById('hora_finE61').value,
        hora_inicioE62: document.getElementById('hora_inicioE62').value,
        hora_finE62: document.getElementById('hora_finE62').value,
        hora_inicioE63: document.getElementById('hora_inicioE63').value,
        hora_finE63: document.getElementById('hora_finE63').value,
        hora_inicioE64: document.getElementById('hora_inicioE64').value,
        hora_finE64: document.getElementById('hora_finE64').value,
        hora_inicioE65: document.getElementById('hora_inicioE65').value,
        hora_finE65: document.getElementById('hora_finE65').value,
        hora_inicioE66: document.getElementById('hora_inicioE66').value,
        hora_finE66: document.getElementById('hora_finE66').value,

        carreraE7: document.getElementById('carreraE7').value,
        asignaturaE7: document.getElementById('asignaturaE7').value,
        grupoE7: document.getElementById('grupoE7').value,
        horasE7: document.getElementById('horasE7').value,

        hora_inicioE71: document.getElementById('hora_inicioE71').value,
        hora_finE71: document.getElementById('hora_finE71').value,
        hora_inicioE72: document.getElementById('hora_inicioE72').value,
        hora_finE72: document.getElementById('hora_finE72').value,
        hora_inicioE73: document.getElementById('hora_inicioE73').value,
        hora_finE73: document.getElementById('hora_finE73').value,
        hora_inicioE74: document.getElementById('hora_inicioE74').value,
        hora_finE74: document.getElementById('hora_finE74').value,
        hora_inicioE75: document.getElementById('hora_inicioE75').value,
        hora_finE75: document.getElementById('hora_finE75').value,
        hora_inicioE76: document.getElementById('hora_inicioE76').value,
        hora_finE76: document.getElementById('hora_finE76').value,

        carreraE8: document.getElementById('carreraE8').value,
        asignaturaE8: document.getElementById('asignaturaE8').value,
        grupoE8: document.getElementById('grupoE8').value,
        horasE8: document.getElementById('horasE8').value,

        hora_inicioE81: document.getElementById('hora_inicioE81').value,
        hora_finE81: document.getElementById('hora_finE81').value,
        hora_inicioE82: document.getElementById('hora_inicioE82').value,
        hora_finE82: document.getElementById('hora_finE82').value,
        hora_inicioE83: document.getElementById('hora_inicioE83').value,
        hora_finE83: document.getElementById('hora_finE83').value,
        hora_inicioE84: document.getElementById('hora_inicioE84').value,
        hora_finE84: document.getElementById('hora_finE84').value,
        hora_inicioE85: document.getElementById('hora_inicioE85').value,
        hora_finE85: document.getElementById('hora_finE85').value,
        hora_inicioE86: document.getElementById('hora_inicioE86').value,
        hora_finE86: document.getElementById('hora_finE86').value,

        total_horasE_grupo: document.getElementById('total_horasE_grupo').value,

        carreraC: document.getElementById('carreraC').value,
        cargo: document.getElementById('cargo').value,
        vigenciaCargo: document.getElementById('vigenciaCargo').value,
        horasC: document.getElementById('horasC').value,

        hora_inicioC11: document.getElementById('hora_inicioC11').value,
        hora_finC11: document.getElementById('hora_finC11').value,
        hora_inicioC12: document.getElementById('hora_inicioC12').value,
        hora_finC12: document.getElementById('hora_finC12').value,
        hora_inicioC13: document.getElementById('hora_inicioC13').value,
        hora_finC13: document.getElementById('hora_finC13').value,
        hora_inicioC14: document.getElementById('hora_inicioC14').value,
        hora_finC14: document.getElementById('hora_finC14').value,
        hora_inicioC15: document.getElementById('hora_inicioC15').value,
        hora_finC15: document.getElementById('hora_finC15').value,
        hora_inicioC16: document.getElementById('hora_inicioC16').value,
        hora_finC16: document.getElementById('hora_finC16').value,

    };

    fetch('/profesores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(data => alert(data.msg));
});

//AGREGAR ASIGNATURAS
document.getElementById('add-asignatura-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
        nombre: document.getElementById('nombre_asignatura').value,
        horas: parseInt(document.getElementById('horas_asignatura').value)
    };

    fetch('/asignaturas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(data => alert(data.msg));
});

//AGREGAR ASIGNATURAS ESPECIALES
document.getElementById('add-asignaturaE-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
        nombre: document.getElementById('nombre_asignaturaE').value,
        horas: parseInt(document.getElementById('horas_asignaturaE').value)
    };

    fetch('/asignaturasE', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(data => alert(data.msg));
});

// AGREGAR ADMINISTRATIVOS
document.getElementById('add-administrativo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
        nombre: document.getElementById('nombre_administrativo').value,
        cargo: document.getElementById('cargo_administrativo').value
    };

    fetch('/administrativos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(data => alert(data.msg));
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

//ELIMINAR

function deleteProfesor(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este Docente?')) {
        fetch(`/profesores/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                window.location.reload();
            } else {
                alert('Error al eliminar al Docente');
            }
        }).catch(error => {
            alert('Error al intentar eliminar al Docente');
        });
    }
}

function deleteAsignatura(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta asignatura?')) {
        fetch(`/asignaturas/${id}`, {
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

function deleteAsignaturaE(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este apoyo a la docencia?')) {
        fetch(`/asignaturasE/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                window.location.reload();
            } else {
                alert('Error al eliminar apoyo a la docencia');
            }
        }).catch(error => {
            alert('Error al intentar eliminar apoyo a la docencia');
        });
    }
}

function deleteAdministrativo(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este administrativo?')) {
        fetch(`/administrativos/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                window.location.reload();
            } else {
                alert('Error al eliminar el administrativo');
            }
        }).catch(error => {
            alert('Error al intentar eliminar el administrativo');
        });
    }
}

//ACTUALIZAR

document.addEventListener('DOMContentLoaded', function() {
    const editForm = document.getElementById('edit-form');

    // Handle edit form submission
    editForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const asignaturaId = document.getElementById('edit-id').value;
        const nombre = document.getElementById('edit-nombre').value;
        const horas = parseInt(document.getElementById('edit-horas').value);

        fetch(`/asignaturas/${asignaturaId}`, {
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

// JavaScript para mostrar/ocultar el formulario
document.addEventListener('DOMContentLoaded', function() {
    const toggleProfesorFormButton = document.getElementById('toggle-profesor-form');
    const profesorForm = document.getElementById('add-profesor-form');

    const toggleAsignaturaFormButton = document.getElementById('toggle-asignatura-form');
    const asignaturaForm = document.getElementById('add-asignatura-form');

    const toggleAsignaturaEFormButton = document.getElementById('toggle-asignaturaE-form');
    const asignaturaEForm = document.getElementById('add-asignaturaE-form');

    toggleProfesorFormButton.addEventListener('click', function() {
        if (profesorForm.style.display === 'none' || profesorForm.style.display === '') {
            profesorForm.style.display = 'block';
        } else {
            profesorForm.style.display = 'none';
        }
    });

    toggleAsignaturaFormButton.addEventListener('click', function() {
        if (asignaturaForm.style.display === 'none' || asignaturaForm.style.display === '') {
            asignaturaForm.style.display = 'block';
        } else {
            asignaturaForm.style.display = 'none';
        }
    });

    toggleAsignaturaEFormButton.addEventListener('click', function() {
        if (asignaturaEForm.style.display === 'none' || asignaturaEForm.style.display === '') {
            asignaturaEForm.style.display = 'block';
        } else {
            asignaturaEForm.style.display = 'none';
        }
    });
});

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

document.addEventListener("DOMContentLoaded", function() {
    const carreraESelects = document.querySelectorAll(".careerE");
    const carreraSelects = document.querySelectorAll(".career"); // Nuevo para asignaturas normales
    const carreraCSelects = document.querySelectorAll(".careerC");

    // Función para poblar las opciones en el select de carreras
    carreraESelects.forEach(select => {
        select.innerHTML = carreras.map(carrera => `<option value="${carrera}">${carrera}</option>`).join("");
    });

    carreraSelects.forEach(select => {  // Nuevo para asignaturas normales
        select.innerHTML = carreras.map(carrera => `<option value="${carrera}">${carrera}</option>`).join("");
    });

    carreraCSelects.forEach(select => {
        select.innerHTML = carreras.map(carrera => `<option value="${carrera}">${carrera}</option>`).join("");
    });
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

//MANEJO DE HORAS DE TRANSMISION GRUPOS 81
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
                    <option value="">Día de Transmisión</option>
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

            if (grupoValue.endsWith("81")) {
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