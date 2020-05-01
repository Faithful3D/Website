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
      data: [414,4522,8527,14525,22753],
      borderColor: 'rgb(255, 0, 0)',
      backgroundColor: 'rgba(255, 0, 0, 0.5)',
      borderWidth: 1
    },
    {
      label: 'Curse Forge',
      data: [399,4341,7699,13041,20396],
      borderColor: 'rgb(255, 128, 0)',
      backgroundColor: 'rgba(255, 128, 0, 0.5)',
      borderWidth: 1
    },
    {
      label: 'Twitch App',
      data: [15,181,828,1484,2357],
      borderColor: 'rgb(127, 0, 255)',
      backgroundColor: 'rgba(127, 0, 255, 0.5)',
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
