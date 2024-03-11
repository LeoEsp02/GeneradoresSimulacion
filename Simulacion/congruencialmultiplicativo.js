// Definición de un array para almacenar los datos generados
var datosGenerados = [];

// Función para generar los números pseudoaleatorios
function generarNumeros() {
    // Obtener los valores ingresados por el usuario
    var semilla = parseInt(document.getElementById('semilla').value);
    var a = parseInt(document.getElementById('a').value);
    var m = parseInt(document.getElementById('m').value);
    var iteraciones = 500; // Número predeterminado de iteraciones

    // Limpiar el array de datos generados
    datosGenerados = [];
    
    // Inicializar el valor inicial de Xn con la semilla
    var xn = semilla;

    // Bucle para generar los números pseudoaleatorios
    for (var i = 0; i < iteraciones; i++) {
        // Calcular la operación y actualizar el valor de Xn
        var operacion = `x${i + 1}=(${a}*${xn}) mod ${m}`;
        xn = (a * xn) % m;

        // Calcular el valor de r
        var r = xn / (m - 1);

        // Almacenar los datos generados en el array
        datosGenerados.push({ iteracion: i + 1, operacion: operacion, numero: xn, divisionRealizada: `(${a}*${xn})/${m - 1}`, division: r.toFixed(4) });
    }

    // Actualizar la tabla de resultados
    actualizarTabla();

    // Generar la gráfica
    generarGrafica();
}

// Función para actualizar la tabla de resultados
function actualizarTabla() {
    var tablaBody = document.querySelector('#tabla-resultados tbody');
    tablaBody.innerHTML = '';

    // Iterar sobre los datos generados y agregar filas a la tabla
    for (var i = 0; i < datosGenerados.length; i++) {
        var fila = document.createElement('tr');

        // Crear celdas para cada propiedad de los datos generados
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

        // Agregar la fila a la tabla
        tablaBody.appendChild(fila);
    }
}

// Función para generar la gráfica
function generarGrafica() {
    // Obtener las iteraciones y los valores generados
    var iteraciones = datosGenerados.map(item => item.iteracion);
    var valores = datosGenerados.map(item => item.numero);

    // Obtener el contexto del lienzo
    var ctx = document.getElementById('grafica').getContext('2d');

    // Crear el gráfico de dispersión
    var myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: iteraciones, // Etiquetas para el eje x
            datasets: [{
                label: 'Datos Generados', // Etiqueta del conjunto de datos
                data: valores, // Valores para el eje y
                backgroundColor: 'rgba(75, 192, 192, 1)', // Color de fondo
                pointRadius: 4.5, // Tamaño de los puntos
                pointHoverRadius: 8, // Tamaño de los puntos al pasar el ratón
                borderColor: 'rgba(75, 192, 192, 1)', // Color del borde
                borderWidth: 2, // Ancho del borde
                fill: false // No rellenar los puntos
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
