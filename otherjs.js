
var config = {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Host:Guest Complex',
      data: data,
      backgroundColor: 'rgba(0, 119, 204, 0.3)'
    }]
  },
  responsive: true,
  aspectRatio: 1,
  options: {
    title: {display:true,text:'Equilibrium Concentration', fontSize: 30,fontFamily: "Open Sans"},
    scales: {
      yAxes: [{
        ticks:{
          fontFamily: "Open Sans",
          fontSize: 16,

        },
        gridLines: {
          display: false,
          drawTicks: true
          },
        scaleLabel: {
          fontFamily: "Open Sans",
          fontSize: 16,
          display: true,
          labelString: 'Concentration of Complex / M at Equilibrium'
        }
      }],
      xAxes: [{
          ticks:{
            fontFamily: "Open Sans",
            fontSize: 16,
            callback: function(value, index, values) {
                      expo = Math.log10(value)
                      factor = Math.pow(10,Math.round(expo))
                      value=value/factor
                      value=parseFloat(Math.round(value*100)/100).toFixed(2);

                      if (isNaN(value)) {
                        value = 0.
                      } else {
                        value = value + 'e' + Math.round(expo)
                      }
                      return value;
                  }
          },
          gridLines: {
            display: false,
            drawTicks: true
            },
          scaleLabel: {
          fontFamily: "Open Sans",
          fontSize: 16,
          display: true,
          labelString: 'Concentration of Host / M'
            }
      }],

    },
    elements: { point: { radius: 0 }
    },

  }
