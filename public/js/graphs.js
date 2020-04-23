function lineGraph(ctx, labels, confirmed, recovered, deaths) {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Confirmed',
        data: confirmed,
        fill: false,
        borderColor: '#4d79ff',
        borderWidth: 2,
        lineTension: 0.2,
      },
      {
        label: 'Recovered',
        data: recovered,
        fill: false,
        borderColor: '#8cff66',
        borderWidth: 1,
        lineTension: 0.2,
      },
      {
        label: 'Deaths',
        data: deaths,
        fill: false,
        borderColor: '#ff4d4d',
        borderWidth: 2,
        lineTension: 0.2,
      },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    },
  });
}

function barGraph(ctx, confirmed, recovered, deaths) {
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Infected', 'Recovered', 'Deaths'],
      datasets: [{
        label: 'Worldwide Summary',
        data: [confirmed, recovered, deaths],
        backgroundColor: [
          '#4d79ff',
          '#8cff66',
          '#ff4d4d',
        ],
        borderColor: [
          '#4d79ff',
          '#8cff66',
          '#ff4d4d',
        ],
        borderWidth: 2,
      }],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    },
  });
}
