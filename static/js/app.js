// EXPORTACION DE EXCEL
document.getElementById('collection').addEventListener('change', function() {
    const collection = this.value;
    fetch(`/columns/${collection}`)
        .then(response => response.json())
        .then(columns => {
            const container = document.getElementById('columns-container');
            container.innerHTML = ''; // Clear previous checkboxes
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

            // Añadir el checkbox especial para Asignación de Horas Frente a Grupo
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
                label2.textContent = 'Asiganción de Horas de Descarga para otras Actividades';

                container.appendChild(checkbox);
                container.appendChild(label);
                container.appendChild(document.createElement('br'));

                container.appendChild(checkbox2);
                container.appendChild(label2);
                container.appendChild(document.createElement('br'));
            }
        });
});

document.getElementById('export-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const collection = document.getElementById('collection').value;
    const format = document.getElementById('export-format').value;
    const columns = Array.from(document.querySelectorAll('input[name="columns"]:checked')).map(cb => cb.value);

    fetch('/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ collection, columns: columns.join(',') }), // Join columns as a comma-separated string
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

//EXPORTAR ARCHIVO EXCEL
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

    fetch('/export', {
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
    if (confirm('¿Estás seguro de que deseas eliminar este profesor?')) {
        fetch(`/profesores/${id}`, {
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
    if (confirm('¿Estás seguro de que deseas eliminar esta asignatura especial?')) {
        fetch(`/asignaturasE/${id}`, {
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



// GRUPOS
const grupos = ["", "NG", "1101", "1102", "1151", "1152", "1181", "1201", "1202", "1251", "1252",
    "1281", "1301", "1302", "1351", "1352", "1381", "1401", "1402", "1451",
    "1452", "1481", "1501", "1502", "1551", "1552", "1581", "1601", "1602",
    "1651", "1652", "1681", "1751", "1752", "1781", "1851", "1852", "1881",
    "1951", "1952", "1981"
];

// Función para poblar las opciones en el select
function populateSelectOptions(selectElement, options) {
    selectElement.innerHTML = options.map(grupo => `<option value="${grupo}">${grupo}</option>`).join("");
}

document.addEventListener("DOMContentLoaded", function() {
    const gruposSelects = document.querySelectorAll(".group");

    // Poblar cada select con las opciones de grupos
    gruposSelects.forEach(select => populateSelectOptions(select, grupos));

    // Añadir funcionalidad para cada <select> y su correspondiente <input>
    const inputGroups = document.querySelectorAll(".input-group");
    inputGroups.forEach(group => {
        const customInput = group.querySelector(".custom-input");
        const selectElement = group.querySelector(".group");

        // Sincronizar el input personalizado con el select
        customInput.addEventListener("input", function() {
            const value = customInput.value;
            if (grupos.includes(value)) {
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
    if (interactionCounter < 4) return; // No mostrar mensajes hasta que haya dos interacciones

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

//EXPORTACION EXCEL - PDF
// Cargar la lista de profesores en ambos formularios
document.getElementById('load-professors').addEventListener('click', function() {
    fetch('/profesores/json')
        .then(response => response.json())
        .then(profesores => {
            const containers = [
                document.getElementById('professor-list-container'),
                document.getElementById('professor-list-container-pdf')
            ];

            containers.forEach(container => {
                container.innerHTML = ''; // Limpiar la lista existente

                profesores.forEach(profesor => {
                    // Crear cada elemento de la lista
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

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => { mensaje.style.display = "none"; }, 3000);
}

// Manejo de la actualización de imágenes
document.getElementById('uploadImagesForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar recarga

    let formData = new FormData(this);

    fetch('/upload-images', {
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
    event.preventDefault(); // Evitar recarga

    let formData = new FormData(this);

    fetch('/update-text', {
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