document.getElementById('edit-profesor-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = "{{ profesor._id }}";
    const data = {
        nombre: document.getElementById('nombre').value,
        profesion: document.getElementById('profesion').value,
        adscripcion: document.getElementById('adscripcion').value,
        fecha_ingreso: document.getElementById('fecha_ingreso').value,
        tiempo_determinado: document.getElementById('tiempo_determinado').value,
        periodo_actual: document.getElementById('periodo_actual').value,
        horas_a: parseInt(document.getElementById('horas_a').value),
        horas_b: parseInt(document.getElementById('horas_b').value),
        total_horas: parseInt(document.getElementById('total_horas').value),
        cargo: document.getElementById('cargo').value,

        asignatura1: document.getElementById('asignatura1').value,
        grupo1: document.getElementById('grupo1').value,
        horas1: document.getElementById('horas1').value,

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

        asignatura2: document.getElementById('asignatura2').value,
        grupo2: document.getElementById('grupo2').value,
        horas2: document.getElementById('horas2').value,

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

        asignatura3: document.getElementById('asignatura3').value,
        grupo3: document.getElementById('grupo3').value,
        horas3: document.getElementById('horas3').value,

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

        asignatura4: document.getElementById('asignatura4').value,
        grupo4: document.getElementById('grupo4').value,
        horas4: document.getElementById('horas4').value,

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

        asignatura5: document.getElementById('asignatura5').value,
        grupo5: document.getElementById('grupo5').value,
        horas5: document.getElementById('horas5').value,

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

        asignatura6: document.getElementById('asignatura6').value,
        grupo6: document.getElementById('grupo6').value,
        horas6: document.getElementById('horas6').value,

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

        asignatura7: document.getElementById('asignatura7').value,
        grupo7: document.getElementById('grupo7').value,
        horas7: document.getElementById('horas7').value,

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

        asignatura8: document.getElementById('asignatura8').value,
        grupo8: document.getElementById('grupo8').value,
        horas8: document.getElementById('horas8').value,

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
    };

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

document.addEventListener('DOMContentLoaded', function() {
    //TOTAL DE HORAS GRUPO
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
    // Función para cargar datos y asignar horas
    function setupAsignatura(asignaturaId, horasId, dataListId) {
        fetch('/asignaturas/json')
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
                document.getElementById(horasId).value = '';
            }
            updateTotalHoras(); // Llamar a updateTotalHoras cuando se actualiza el campo
        });
    }

    // Configurar autocompletado y horas para Asignatura 1
    setupAsignatura('asignatura1', 'horas1', 'asignatura-list1');

    // Configurar autocompletado y horas para Asignatura 2
    setupAsignatura('asignatura2', 'horas2', 'asignatura-list2');

    // Configurar autocompletado y horas para Asignatura 3
    setupAsignatura('asignatura3', 'horas3', 'asignatura-list3');

    // Configurar autocompletado y horas para Asignatura 4
    setupAsignatura('asignatura4', 'horas4', 'asignatura-list4');

    // Configurar autocompletado y horas para Asignatura 5
    setupAsignatura('asignatura5', 'horas5', 'asignatura-list5');

    // Configurar autocompletado y horas para Asignatura 6
    setupAsignatura('asignatura6', 'horas6', 'asignatura-list6');

    // Configurar autocompletado y horas para Asignatura 7
    setupAsignatura('asignatura7', 'horas7', 'asignatura-list7');

    // Configurar autocompletado y horas para Asignatura 8
    setupAsignatura('asignatura8', 'horas8', 'asignatura-list8');

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