// Agregar un evento al formulario para prevenir el envío por defecto
document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    
    // Obtener los valores de las semillas desde los campos de entrada
    var seed1 = parseInt(document.getElementById('seed1').value);
    var seed2 = parseInt(document.getElementById('seed2').value);
    var seed3 = parseInt(document.getElementById('seed3').value);
    var seed4 = parseInt(document.getElementById('seed4').value);
    var seed5 = parseInt(document.getElementById('seed5').value);

    // Generar los números pseudoaleatorios
    var numbers = [];
    var m = 100;
    numbers.push(seed1, seed2, seed3, seed4, seed5); // Agregar las semillas al array de números

    // Generar los siguientes números pseudoaleatorios utilizando el método congruencial aditivo
    for (var i = 5; i < 500; i++) {
        var newNumber = (numbers[i-1] + numbers[i-2] + numbers[i-3] + numbers[i-4] + numbers[i-5]) % m;
        numbers.push(newNumber);
    }

    // Calcular los valores de r (números pseudoaleatorios entre 0 y 1)
    var rValues = [];
    for (var i = 5; i < numbers.length; i++) {
        var r = (numbers[i] % m) / (m - 1);
        rValues.push(r.toFixed(4)); // Redondear a 4 decimales y agregar al array de r
    }

    // Actualizar la tabla de resultados con los números generados y sus operaciones correspondientes
    var tabla = document.querySelector('#tabla-resultados tbody');
    tabla.innerHTML = ''; // Limpiar el contenido de la tabla antes de agregar los nuevos datos
    for (var i = 0; i < rValues.length; i++) {
        var row = tabla.insertRow(); // Insertar una nueva fila en la tabla
        var iteracionCell = row.insertCell(0); // Insertar celdas para cada columna
        var operacionCell = row.insertCell(1);
        var numeroCell = row.insertCell(2);
        var divisionCell = row.insertCell(3);
        var rCell = row.insertCell(4);

        // Asignar los valores a cada celda de la fila
        iteracionCell.textContent = i + 1;
        operacionCell.textContent = "X" + (i + 6) + " = (X" + (i + 5) + " + X" + (i + 4) + " + X" + (i + 3) + " + X" + (i + 2) + " + X" + (i + 1) + ") mod " + m;
        numeroCell.textContent = numbers[i + 5];
        divisionCell.textContent = "(X" + (i + 6) + " % " + m + ") / (" + m + " - 1)";
        rCell.textContent = rValues[i];
    }

    // Dibujar la gráfica de dispersión utilizando Chart.js
    var ctx = document.getElementById('chart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'scatter', // Tipo de gráfico
        data: {
            datasets: [{ // Conjunto de datos para la gráfica
                label: 'Puntos', // Etiqueta del conjunto de datos
                data: rValues.map((value, index) => ({ x: index + 1, y: parseFloat(value) })), // Datos para la gráfica
                borderColor: 'blue', // Color del borde
                backgroundColor: 'blue', // Color de fondo
                pointRadius: 4, // Tamaño de los puntos
                pointHoverRadius: 6, // Tamaño de los puntos al pasar el ratón
                fill: false // No rellenar los puntos
            }]
        },
        options: {
            scales: {
                xAxes: [{ // Configuración del eje x
                    type: 'linear', // Tipo de escala
                    position: 'bottom' // Posición del eje
                }],
                yAxes: [{ // Configuración del eje y
                    ticks: {
                        beginAtZero: true // Empezar en cero
                    }
                }]
            }
        }
    });
});
