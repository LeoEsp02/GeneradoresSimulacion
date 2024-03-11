function metodoModificador() {
    const seed = document.getElementById('seed1').value;
    const constant = document.getElementById('modifier').value; // Obtiene la constante
    const iterations = document.getElementById('iterations').value;
  
    let resultBody = '';
    let dataPoints = [];
  
    let currentSeed = seed;
  
    for (let i = 1; i <= iterations; i++) {
      const multiplied = parseInt(currentSeed) * constant; // Usa la constante en el cálculo
      let multipliedString = multiplied.toString();
      
      // Añade ceros a la izquierda si es necesario para tener 8 números
      while (multipliedString.length < 8) {
        multipliedString = '0' + multipliedString;
      }
  
      const middleDigits = parseInt(multipliedString.substring(2, 6));
  
      resultBody += `<tr>
                      <td>${i}</td>
                      <td>${currentSeed}</td>
                      <td>${constant}</td>
                      <td>${multipliedString}</td>
                      <td>${middleDigits}</td>
                      <td>0.${middleDigits}</td>
                    </tr>`;
  
      // Actualiza la semilla sin agregar ceros
      currentSeed = middleDigits.toString();
      
      // Agrega el punto de datos para la gráfica
      dataPoints.push({ x: i, y: middleDigits });
    }
  
    // Actualiza la tabla
    document.getElementById('resultBody').innerHTML = resultBody;
  
    // Dibuja la gráfica de dispersión sin líneas
    drawScatterChart(dataPoints);
  }
  
  function drawScatterChart(dataPoints) {
    const ctx = document.getElementById('scatterChart').getContext('2d');
  
    // Destruye la gráfica existente si hay una
    if (window.myScatterChart) {
      window.myScatterChart.destroy();
    }
  
    window.myScatterChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Dígitos Medios',
          pointBackgroundColor: 'rgb(75, 192, 192)',
          pointBorderColor: 'rgba(0, 0, 0, 0)', // Sin líneas
          pointRadius: 5,
          data: dataPoints,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
  