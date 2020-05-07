import Chart from 'chart.js';

const createGraphs = (xS: string, yS:string):Chart[] => {
    var x:string[]|number[] = JSON.parse(xS);
    var y:number[] = JSON.parse(yS);
    var types:string[] = ["line", "radar", "bar", "horizontalBar", "polarArea", "pie", "doughnut", "label"];
    var res:Chart[] = [];
    types.forEach(element => {
        res.push(renderAGraph(x, y, element));
    });
    return res;
}

const getRandomNumbers = (n:number):number[] => {
    var res:number[] = [];
    while(n--) {
        res.push(Math.floor(Math.random()*255));
    }
    return res;
}

interface ChartData {
    plugins?: any,
    type?: string,
        data?: {
            labels: string[] | number[],
            datasets: [{
                label: string,
                data: number[],
                fill?: boolean,
                backgroundColor:string[],
                borderColor: string[],
                borderWidth: number,
                hoverBackgroundColor: string[]
            }
            ],
        },
        
        options?: ChartOptions
}

interface ChartOptions{
    responsive: boolean,
            scales?: {
                xAxes?:Object[],
                yAxes?:Object[]
            },
            legend?: any,
            plugins?: Object
}

const renderAGraph = (x: string[] | number[], y:number[], typ:string):Chart => {
    console.log(typ);
    //var ele:HTMLCanvasElement = document.getElementById(typ+"Chart") as HTMLCanvasElement;
    //var ctxL:CanvasRenderingContext2D = ele.getContext("2d");
    var ele:HTMLCanvasElement = document.createElement('canvas');
    var ctxL:CanvasRenderingContext2D = ele.getContext('2d');
    var backGroundColor: string[] = [];
    var borderColor:string[] = [];
    var hoverBackGroundColor:string[] = [];
    var chartData:ChartData = {};
    var chartOptions: ChartOptions = {responsive: true};

    if(typ === 'line' || typ === 'radar') {
        var indi:number[] = getRandomNumbers(4);
        backGroundColor.push(`rgba(${indi[0]},${indi[1]},${indi[2]}, 0.3)`);
        var temp:number = Math.floor(Math.random()*2);
        indi[temp] = indi[3];
        borderColor.push(`rgba(${indi[0]},${indi[1]},${indi[2]}, 0.3)`);
    } else if (typ === 'bar' || typ==='horizontalBar') {
        var indi:number[] = getRandomNumbers(x.length * 3);
        var i:number = 0;
        while(i<x.length) {
            backGroundColor.push(`rgba(${indi[3*i]}, ${indi[3*i+1]}, ${indi[3*i+2]},0.3)`);
            borderColor.push(`rgba(${indi[3*i]}, ${indi[3*i+1]}, ${indi[3*i+2]},0.3)`);
            i+=1;
        }
        chartOptions.scales = {};
        var tem:Object[] = [{
            "ticks": {
            "beginAtZero": true
            }
            }];
        if(typ === 'bar'){
            chartOptions.scales.yAxes = tem;
        }
        else{
            chartOptions.scales.xAxes = tem;
        }
    } else if (typ === 'polarArea' || typ === 'pie' || typ === 'doughnut' || typ==='label') {
        var indi:number[] = getRandomNumbers(x.length * 3);
        var i:number = 0;
        while(i<x.length) {
            backGroundColor.push(`rgba(${indi[3*i]}, ${indi[3*i+1]}, ${indi[3*i+2]},0.3)`);
            hoverBackGroundColor.push(`rgba(${indi[3*i]}, ${indi[3*i+1]}, ${indi[3*i+2]},0.3)`);
            i+=1;
        }
    } 

    chartData.type = typ;
    chartData.data = {
        labels: x,
        datasets: [{
            label: "Title",
                data: y,
                backgroundColor:backGroundColor,
                borderColor: borderColor,
                borderWidth: 2,
                hoverBackgroundColor: hoverBackGroundColor
        }]
    };
    if(typ==="label"){
        chartData.type = "pie";
        chartData.plugins = x;
        chartOptions = {
            responsive: true,
            legend: {
              position: 'right',
              labels: {
                padding: 20,
                boxWidth: 10
              }
            },
            plugins: {
              datalabels: {
                formatter: (value:number, ctx:any) => {
                  let sum = 0;
                  let dataArr:number[] = ctx.chart.data.datasets[0].data;
                  dataArr.map(data => {
                    sum += data;
                  });
                  let percentage = (value * 100 / sum).toFixed(2) + "%";
                  return percentage;
                },
                color: 'white',
                labels: {
                  title: {
                    font: {
                      size: '16'
                    }
                  }
                }
              }
            }
        }
    }
    chartData.options = chartOptions;
    var myChart:Chart = new Chart(ctxL, chartData);
    return myChart;
}

export default createGraphs;