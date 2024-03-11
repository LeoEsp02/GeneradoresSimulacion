function productosMedios() {
    const seed1 = document.getElementById('seed1').value;
    const seed2 = document.getElementById('seed2').value;
    const iterations = 500;
  
    let resultBody = '';
    let dataPoints = [];
  
    let currentSeed1 = seed1;
    let currentSeed2 = seed2;
  
    for (let i = 1; i <= iterations; i++) {
      const multiplied = parseInt(currentSeed1) * parseInt(currentSeed2);
      const multipliedString = multiplied.toString().padStart(8, '0');
      const middleDigits = parseInt(multipliedString.substring(2, 6));
  
      resultBody += `<tr>
                      <td>${i}</td>
                      <td>${currentSeed1}</td>
                      <td>${currentSeed2}</td>
                      <td>${multipliedString}</td>
                      <td>${middleDigits}</td>
                      <td>0.${middleDigits}</td>
                    </tr>`;
      
      currentSeed1 = currentSeed2;
      currentSeed2 = middleDigits;
  
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
  