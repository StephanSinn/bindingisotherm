var ctx = document.getElementById('results-graph').getContext('2d');
let searchNumber=1;
var ctxdoc = document.getElementById('results-graph-doc').getContext('2d');


var resetCanvas = function(){
  $('#results-graph').remove(); // this is my <canvas> element
  $('#graph-container').append('<canvas id="results-graph"><canvas>');
  canvas = document.querySelector('#results-graph');
  ctx = canvas.getContext('2d');

  var x = canvas.width;
  var y = canvas.height;
  ctx.font = '10pt Verdana';
  ctx.textAlign = 'center';
  ctx.fillText('This text is centered on the canvas', x, y);
};

var resetCanvas2 = function(){
  $('#results-graph-doc').remove(); // this is my <canvas> element
  $('#graph-container-doc').append('<canvas id="results-graph-doc"><canvas>');
  canvas = document.querySelector('#results-graph-doc');
  ctxdoc = canvas.getContext('2d');

  var x = canvas.width;
  var y = canvas.height;
  ctxdoc.font = '10pt Verdana';
  ctxdoc.textAlign = 'center';
  ctxdoc.fillText('This text is centered on the canvas', x, y);
};

let d=0;
let ka=1;
let h=1;
const fun1 = x=> x;
let out = Array.from(Array(51), (_,x) => fun1(x));




let chartJSon =  {
  type: 'line',
  data: {
    labels: out,
    datasets: [{
      label: 'HD',
      data: out,
      backgroundColor: "rgba(153,255,51,0.6)"
    },{
      label: 'H',
      data: out,
      backgroundColor: "rgba(51, 139, 255, 0.6)"
    }, {
      label: 'D',
      data: out,
      backgroundColor: "rgba(255,153,0,0.6)"
    }]
  },
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


  }
};


let chartJSonDoC =  {
  type: 'line',
  data: {
    labels: out,
    datasets: [{
      label: 'HD',
      data: out,
      backgroundColor: "rgba(153,255,51,0.6)"
    },{
      label: 'H',
      data: out,
      backgroundColor: "rgba(51, 139, 255, 0.6)"
    }, {
      label: 'D',
      data: out,
      backgroundColor: "rgba(255,153,0,0.6)"
    }]
  },
  options: {
    title: {display:true,text:'Degree of Complexation', fontSize: 30,fontFamily: "Open Sans"},
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
          labelString: 'Degree of Complexation '
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



  }
};


let outputField = document.getElementById('output');
let outputField2 = document.getElementById('output2');
let outputField3 = document.getElementById('output3');
let outputField4 = document.getElementById('output4');
let hostInput = document.getElementById("hostInput");
let dyeInput = document.getElementById("dyeInput");
let bindingInput = document.getElementById("bindingInput");
let calculateButton = document.getElementById('calculate')


function calculate_simulation() {
  function myXFunction(item, index, arr){
    arr[index]=item*hostInput.value/50;
  };

  function myHDFunction(item, index, arr){
    let kd=(1/ka);
    let p1=d+kd+item;
    let p2=p1/2;
    let ps=p2*p2;
    let q1=item*d;
    let pi=p2;
    arr[index]=pi-Math.sqrt((ps-q1));
  };

  function myHFunction(item, index, arr){
    let kd=(1/ka);
    let p1=d+kd+item;
    let p2=p1/2;
    let ps=p2*p2;
    let q1=item*d;
    let pi=p2;
    let pr=pi-Math.sqrt((ps-q1));
    arr[index]=item-pr;
  };

  function myDFunction(item, index, arr){
    let kd=(1/ka);
    let p1=d+kd+item;
    let p2=p1/2;
    let ps=p2*p2;
    let q1=item*d;
    let pi=p2;
    let pr=pi-Math.sqrt((ps-q1));
    arr[index]=d-pr;
  };

  function DmyDoCFunction(item, index, arr){
    arr[index]=item/d;
  };

  function HmyDoCFunction(item, index, arr){
    arr[index]=item/h;
  };

  function HDmyDoCFunction(item, index, arr){
    arr[index]=item/d;
  };

  let  outX = Array.from(Array(51), (_,x) => fun1(x));
  let  outHD = Array.from(Array(51), (_,x) => fun1(x));
  let  outH = Array.from(Array(51), (_,x) => fun1(x));
  let  outD = Array.from(Array(51), (_,x) => fun1(x));

  d=+dyeInput.value;
  h=+hostInput.value;
  ka=+bindingInput.value;

  outX.forEach(myXFunction);
  chartJSon.data.labels=outX;
  let outXDoC=outX.slice(0);
  chartJSonDoC.data.labels=outXDoC;
  outputField.innerHTML = outXDoC;

  outHD.forEach(myXFunction);
  outHD.forEach(myHDFunction);
  chartJSon.data.datasets[0].data=outHD;
  outputField2.innerHTML = chartJSon.data.datasets[0].data;
  let outHDcopy=outHD.slice(0);
  outHDcopy.forEach(HDmyDoCFunction);
  chartJSonDoC.data.datasets[0].data=outHDcopy;
  outputField2.innerHTML = outHDcopy;


  outH.forEach(myXFunction);
  outH.forEach(myHFunction);
  chartJSon.data.datasets[1].data=outH;
  outputField3.innerHTML = chartJSon.data.datasets[1].data;
  let outHcopy=outH.slice(0);
  outHcopy.forEach(HmyDoCFunction);
  chartJSonDoC.data.datasets[1].data=outHcopy;
  outputField3.innerHTML = outHcopy;


  outD.forEach(myXFunction);
  outD.forEach(myDFunction);
  chartJSon.data.datasets[2].data=outD;
  outputField4.innerHTML = chartJSon.data.datasets[2].data;
  let outDcopy=outD.slice(0);
  outDcopy.forEach(DmyDoCFunction);
  chartJSonDoC.data.datasets[2].data=outDcopy;
  outputField4.innerHTML = outDcopy;
  resetCanvas2();
  resetCanvas();
  var myChart = new Chart(ctx,chartJSon);
  var myChartDoC = new Chart(ctxdoc,chartJSonDoC);

  }

document.addEventListener("DOMContentLoaded", function() {

  calculate_simulation()

});




['M', 'T', 'W', 'T', 'F', 'S', 'S'];
