// Aquí almacenaremos los datos generados
var datosGenerados = [];

// Esta función se llama cuando queremos generar una nueva serie de números pseudoaleatorios
function generarNumeros() {
    // Obtenemos los valores que el usuario ha ingresado en la página HTML
    var semilla = parseInt(document.getElementById('semilla').value);
    var a = parseInt(document.getElementById('a').value);
    var m = parseInt(document.getElementById('m').value);
    var c = parseInt(document.getElementById('c').value);
    var iteraciones = 500; // Cuántos números queremos generar

    // Limpiamos los datos anteriores
    datosGenerados = [];

    // Comenzamos con la semilla
    var xn = semilla;

    // Ahora vamos a hacer los cálculos para generar los números pseudoaleatorios
    for (var i = 0; i < iteraciones; i++) {
        // Aquí aplicamos la fórmula del método de congruencia lineal
        xn = (a * xn + c) % m;

        // Guardamos los detalles de este cálculo
        var operacion = `x${i + 1}=(${a}*${xn}+${c}) mod ${m}`;
        var r = xn / 99; // Hacemos una división modificada para el método
        datosGenerados.push({ iteracion: i + 1, operacion: operacion, numero: xn, divisionRealizada: `(${a}*${xn}+${c})/99`, division: r.toFixed(4) });
    }

    // Después de generar los números, actualizamos la tabla y generamos la gráfica
    actualizarTabla();
    generarGrafica();
}

// Función para actualizar la tabla con los datos generados
function actualizarTabla() {
    // Seleccionamos el cuerpo de la tabla en HTML
    var tablaBody = document.querySelector('#tabla-resultados tbody');
    // Limpiamos la tabla antes de actualizarla
    tablaBody.innerHTML = '';

    // Ahora agregamos los datos generados a la tabla
    for (var i = 0; i < datosGenerados.length; i++) {
        var fila = document.createElement('tr');

        // Creamos celdas para cada dato generado
        var celdaIteracion = document.createElement('td');
        celdaIteracion.textContent = datosGenerados[i].iteracion;
        fila.appendChild(celdaIteracion);

        var celdaOperacion = document.createElement('td');
        celdaOperacion.textContent = datosGenerados[i].operacion;
        fila.appendChild(celdaOperacion);

        var celdaNumero = document.createElement('td');
        celdaNumero.textContent = datosGenerados[i].numero;
        fila.appendChild(celdaNumero);

        var celdaDivisionRealizada = document.createElement('td');
        celdaDivisionRealizada.textContent = datosGenerados[i].divisionRealizada;
        fila.appendChild(celdaDivisionRealizada);

        var celdaDivision = document.createElement('td');
        celdaDivision.textContent = datosGenerados[i].division;
        fila.appendChild(celdaDivision);

        tablaBody.appendChild(fila);
    }
}

// Función para generar la gráfica de dispersión
function generarGrafica() {
    // Extraemos los datos necesarios para la gráfica
    var iteraciones = datosGenerados.map(item => item.iteracion);
    var valores = datosGenerados.map(item => item.numero);

    // Configuran y generan la gráfica utilizando Chart.js
    var ctx = document.getElementById('grafica').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: iteraciones,
            datasets: [{
                label: 'Datos Generados',
                data: valores,
                backgroundColor: 'rgba(75, 192, 192, 1)',
                pointRadius: 5,
                pointHoverRadius: 8, 
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {
                    type: 'linear',
                    position: 'left'
                }
            }
        }
    });
}
