function cuadradosMedios() {
  const seed = document.getElementById('seed').value;
  const iterations = 500;
  
  let resultBody = '';
  let dataPoints = [];
  
  let currentSeed = seed;
  
  for (let i = 1; i <= iterations; i++) {
    const squared = parseInt(currentSeed) * parseInt(currentSeed);
    const squaredString = squared.toString().padStart(seed.length * 2, '0');
    const middleDigits = parseInt(squaredString.substring(seed.length / 2, seed.length + seed.length / 2));
  
    resultBody += `<tr>
                    <td>${i}</td>
                    <td>${currentSeed}</td>
                    <td>${squaredString}</td>
                    <td>${middleDigits}</td>
                    <td>0.${middleDigits}</td>
                  </tr>`;
      
    currentSeed = middleDigits.toString().padStart(seed.length, '0');
  
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
