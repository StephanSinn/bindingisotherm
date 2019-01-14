var ctx = document.getElementById('results-graph').getContext('2d');
let searchNumber=1;



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
  }
};


document.addEventListener("DOMContentLoaded", function() {

  let outputField = document.getElementById('output');
  let outputField2 = document.getElementById('output2');
  let outputField3 = document.getElementById('output3');
  let outputField4 = document.getElementById('output4');
  let hostInput = document.getElementById("hostInput");
  let dyeInput = document.getElementById("dyeInput");
  let bindingInput = document.getElementById("bindingInput");
  let calculateButton = document.getElementById('calculate')

  calculateButton.addEventListener('click', function (event) {
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

    let  outX = Array.from(Array(51), (_,x) => fun1(x));
    let  outHD = Array.from(Array(51), (_,x) => fun1(x));
    let  outH = Array.from(Array(51), (_,x) => fun1(x));
    let  outD = Array.from(Array(51), (_,x) => fun1(x));

    d=+dyeInput.value;
    h=+hostInput.value;
    ka=+bindingInput.value;

    outX.forEach(myXFunction);
    chartJSon.data.labels=outX;
    outputField.innerHTML = chartJSon.data.labels;

    outHD.forEach(myXFunction);
    outHD.forEach(myHDFunction);
    chartJSon.data.datasets[0].data=outHD;
    outputField2.innerHTML = chartJSon.data.datasets[0].data;

    outH.forEach(myXFunction);
    outH.forEach(myHFunction);
    chartJSon.data.datasets[1].data=outH;
    outputField3.innerHTML = chartJSon.data.datasets[1].data;

    outD.forEach(myXFunction);
    outD.forEach(myDFunction);
    chartJSon.data.datasets[2].data=outD;
    outputField4.innerHTML = chartJSon.data.datasets[2].data;



    resetCanvas();
    var myChart = new Chart(ctx,chartJSon);
    });

});


['M', 'T', 'W', 'T', 'F', 'S', 'S'];
