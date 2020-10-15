var dates;

if (dateArray) {
  dates = dateArray;
} 
else {
  dates = ['11','12','1','2','3','4','5','6','7','8','9','10'];
  console.log("No translation of months available. Falling back to numbers.");
}

new Chart(document.getElementById('chart_download').getContext('2d'), {
  type: 'bar',
  data: {
    labels: dates,
    datasets: [{
      label: 'Total',
      data: [ 414, 4522, 8527, 14525, 22753, 31497, 37941, 42629, 47796, 52202, 56194],
      borderColor: 'rgb(255, 0, 0)',
      backgroundColor: 'rgba(255, 0, 0, 0.5)',
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
