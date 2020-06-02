var dates;
if (dateArray) {
  dates = dateArray;
} else {
  dates = ['11','12','1','2','3','4','5'];
  console.log("No translation of months available. Falling back to numbers.");
}

new Chart(document.getElementById('chart_download').getContext('2d'), {
  type: 'bar',
  data: {
    labels: dates,
    datasets: [{
      label: 'Total',
      data: [414,4108,4419,10106,12647,18850],
      borderColor: 'rgb(255, 0, 0)',
      backgroundColor: 'rgba(255, 0, 0, 0.8)',
      borderWidth: 1
    },
    {
      label: 'Curse Forge',
      data: [399,3942,3757,9284,11112,17152],
      borderColor: 'rgb(255, 128, 0)',
      backgroundColor: 'rgba(255, 128, 0, 0.8)',
      borderWidth: 1
    },
    {
      label: 'Twitch App',
      data: [15,166,662,822,1535,1698],
      borderColor: 'rgb(127, 0, 255)',
      backgroundColor: 'rgba(127, 0, 255, 0.8)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
